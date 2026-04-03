'use client';

import { useState } from 'react';
import css from './Register.module.css';
import * as yup from 'yup';
import { useAuthStore } from '@/lib/store/authStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterRequest } from '@/types/auth';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '@/lib/api/clientApi';
import { AxiosError } from 'axios';

type ApiError = AxiosError<{ error: string }>;

export const registrationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Enter a valid Email'),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});

export default function Register() {
  const [isPassword, setIsPassword] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);

  const togglePassword = () => setIsPassword(!isPassword);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const user = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (user) {
        setUser(user);
      }

      toast(`${user.name} registrated successfuly`);
    } catch (error) {
      toast(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Registration falls',
      );
    }
  };
  return (
    <main className={css.register}>
      <Toaster />
      <div className={css.registerBox}></div>
    </main>
  );
}
