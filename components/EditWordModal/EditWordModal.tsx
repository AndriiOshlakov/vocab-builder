'use client';

import css from './EditWordModal.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { editWord } from '@/lib/api/clientApi';
import { useEffect } from 'react';

export const editWordSchema = yup.object({
  en: yup
    .string()
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, 'Invalid English word')
    .required('English word is required'),

  ua: yup
    .string()
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, 'Invalid Ukrainian word')
    .required('Translation is required'),
});

type ApiError = AxiosError<{ error: string }>;

interface Props {
  onModalClose: () => void;
  id: string;
  category: string;
  isIrregular?: boolean;
  en: string;
  ua: string;
}

type EditWordFormData = {
  en: string;
  ua: string;
};

export default function EditWordModal({ onModalClose, id, category, isIrregular, en, ua }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(editWordSchema),
  });

  useEffect(() => {
    reset({ en, ua });
  }, [en, ua, reset]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      queryClient.invalidateQueries({ queryKey: ['allWords'] });
      queryClient.invalidateQueries({ queryKey: ['ownWords'] });
      toast.success('Word edited successfully');
      setTimeout(() => onModalClose(), 1000);
    },
  });

  const onSubmit = async (data: EditWordFormData) => {
    try {
      mutation.mutate({ id, params: { ...data, category, isIrregular } });
    } catch (error) {
      toast(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Added new word falls',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <Toaster />
      <button className={css.closeBtn} onClick={onModalClose}>
        <svg width={24} height={24} className={css.closeIcon}>
          <use href="/symbol-defs.svg#x" />
        </svg>
      </button>
      <div className={css.inputBox}>
        <div className={css.wrapper}>
          <Image width={28} height={28} alt="Flag" className={css.img} src="/uk.png" />
          <p>Ukrainian</p>
        </div>
        <input {...register('ua')} className={css.input} />
        {errors.ua && <p>{errors.ua.message}</p>}
      </div>
      <div className={css.inputBox}>
        <div className={css.wrapper}>
          <Image width={28} height={28} alt="Flag" className={css.img} src="/en.png" />
          <p>English</p>
        </div>
        <input {...register('en')} className={css.input} />
        {errors.en && <p>{errors.en.message}</p>}
      </div>
      <div className={css.btnBox}>
        <button type="submit" disabled={isSubmitting} className={css.saveBtn}>
          Save
        </button>

        <button type="button" onClick={onModalClose} className={css.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
}
