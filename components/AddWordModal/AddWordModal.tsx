'use client';

import { useForm } from 'react-hook-form';
import css from './AddWordModal.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { createWord } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import { Word } from '@/types/words';

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

  verbType: yup.string().when('category', {
    is: 'verb',
    then: (schema) => schema.required('Choose verb type'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

interface Prop {
  onModalClose: () => void;
}

export default function AddWordModal({ onModalClose }: Prop) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addWordSchema),
  });

  const category = watch('category');
  const isVerb = category === 'verb';

  // 🔥 очищаємо radio якщо не verb
  useEffect(() => {
    if (category !== 'verb') {
      setValue('verbType', undefined);
    }
  }, [category, setValue]);

  const onSubmit = async (data: Word) => {
    try {
      await createWord(data);

      toast.success('Word added successfully');

      onModalClose(); // 👈 закрити модалку
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to add word');
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* EN */}
        <input placeholder="English word" {...register('en')} />
        {errors.en && <p>{errors.en.message}</p>}

        {/* UA */}
        <input placeholder="Translation" {...register('ua')} />
        {errors.ua && <p>{errors.ua.message}</p>}

        {/* CATEGORY */}
        <select {...register('category')}>
          {categories.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}

        {/* 👇 RADIO тільки для verb */}
        {isVerb && (
          <div>
            <label>
              <input type="radio" value="regular" {...register('verbType')} />
              Regular
            </label>

            <label>
              <input type="radio" value="irregular" {...register('verbType')} />
              Irregular
            </label>

            {errors.verbType && <p>{errors.verbType.message}</p>}
          </div>
        )}

        {/* BUTTONS */}
        <button type="submit" disabled={isSubmitting}>
          Add
        </button>

        <button type="button" onClick={onModalClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
