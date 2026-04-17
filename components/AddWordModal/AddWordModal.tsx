'use client';

import { useForm, useWatch } from 'react-hook-form';
import css from './AddWordModal.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { createWord } from '@/lib/api/clientApi';
import toast, { Toaster } from 'react-hot-toast';
import { Word } from '@/types/words';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

export const addWordSchema = yup.object({
  en: yup
    .string()
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, 'Invalid English word')
    .required('English word is required'),

  ua: yup
    .string()
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, 'Invalid Ukrainian word')
    .required('Translation is required'),

  category: yup.string().required('Category is required'),

  isIrregular: yup.boolean().when('category', {
    is: 'verb',
    then: (schema) => schema.required('Choose verb type'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

interface Prop {
  onModalClose: () => void;
}

type ApiError = AxiosError<{ error: string }>;

export default function AddWordModal({ onModalClose }: Prop) {
  const [isOpen, setIsOpen] = useState(true);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addWordSchema),
  });

  const isIrregular = useWatch({ control, name: 'isIrregular' });

  const category = useWatch({
    control,
    name: 'category',
  });

  const isVerb = category === 'verb';

  // 🔥 очищаємо radio якщо не verb
  useEffect(() => {
    if (category !== 'verb') {
      setValue('isIrregular', undefined);
    }
  }, [category, setValue]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      queryClient.invalidateQueries({ queryKey: ['allWords'] });
      queryClient.invalidateQueries({ queryKey: ['ownWords'] });
      toast.success('Word added successfully');
      setTimeout(() => onModalClose(), 1000);
    },
  });

  const onSubmit = async (data: Word) => {
    try {
      mutation.mutate(data);
    } catch (error) {
      toast(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Added new word falls',
      );
    }
  };

  const categories = [
    'verb',
    'participle',
    'noun',
    'adjective',
    'pronoun',
    'numerals',
    'adverb',
    'preposition',
    'conjunction',
    'phrasal verb',
    'functional phrase',
  ];

  return (
    <div className={css.formContainer}>
      <Toaster />
      <button className={css.closeBtn} onClick={onModalClose}>
        <svg width={32} height={32}>
          <use href="/symbol-defs.svg#x" />
        </svg>
      </button>
      <h1 className={css.title}>Add word</h1>
      <p className={css.text}>
        Adding a new word to the dictionary is an important step in enriching the language base and
        expanding the vocabulary.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.categoryBox}>
          <label className={css.categoryLabel}>
            <select
              {...register('category')}
              className={css.select}
              onClick={() => setIsOpen(!isOpen)}
            >
              <option value="" className={css.non}>
                Choose category
              </option>
              {categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p>{errors.category.message}</p>}
            {isOpen && (
              <svg className={css.icon} width={20} height={20}>
                <use href="/symbol-defs.svg#chevron-down" />
              </svg>
            )}
            {!isOpen && (
              <svg className={css.icon} width={20} height={20}>
                <use href="/symbol-defs.svg#chevron-up" />
              </svg>
            )}
          </label>

          {/* 👇 RADIO тільки для verb */}
          {isVerb && (
            <div className={css.radioBox}>
              <input type="hidden" {...register('isIrregular')} />
              <label className={css.radio}>
                <input
                  type="radio"
                  checked={isIrregular === false}
                  onChange={() => setValue('isIrregular', false)}
                />
                Regular
              </label>

              <label className={css.radio}>
                <input
                  type="radio"
                  checked={isIrregular === true}
                  onChange={() => setValue('isIrregular', true)}
                />
                Irregular
              </label>

              {errors.isIrregular && <p>{errors.isIrregular.message}</p>}
            </div>
          )}
          {isIrregular === true && (
            <p className={css.subText}>
              Such data must be entered in the format I form-II form-III form.
            </p>
          )}
        </div>
        <div className={css.inputBox}>
          <div className={css.wrapper}>
            <Image width={28} height={28} alt="Flag" className={css.img} src="/uk.png" />
            <p>Ukrainian</p>
          </div>
          <input placeholder="Translation" {...register('ua')} className={css.input} />
          {errors.ua && <p>{errors.ua.message}</p>}
        </div>
        <div className={css.inputBox}>
          <div className={css.wrapper}>
            <Image width={28} height={28} alt="Flag" className={css.img} src="/en.png" />
            <p>English</p>
          </div>
          <input placeholder="English word" {...register('en')} className={css.input} />
          {errors.en && <p>{errors.en.message}</p>}
        </div>
        <div className={css.btnBox}>
          <button type="submit" disabled={isSubmitting} className={css.addBtn}>
            Add
          </button>

          <button type="button" onClick={onModalClose} className={css.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
