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
import Link from 'next/link';
import Image from 'next/image';

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
      <div className={css.registerBox}>
        <Image
          src="/registerMob.png"
          width={247}
          height={191}
          alt="Guys"
          className={css.registerImgMob}
        />
        <p className={css.registerBoxText}>Word · Translation · Grammar · Progress</p>
      </div>
      <div className={css.formBox}>
        <h1 className={css.title}>Register</h1>
        <p className={css.text}>
          To start using our services, please fill out the registration form below. All fields are
          mandatory:
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.inputsBox}>
            <label className={css.label}>
              <input
                placeholder="Name"
                {...register('name')}
                className={`${css.input} ${errors.name ? css.inputError : ''}`}
              />
              {errors.name && <p style={{ color: '#ef2447' }}>{errors.name.message}</p>}
            </label>
            <label className={css.label}>
              <input
                placeholder="Email"
                {...register('email')}
                className={`${css.input} ${errors.email ? css.inputError : ''}`}
              />
              {errors.email && <p style={{ color: '#ef2447' }}>{errors.email.message}</p>}
            </label>
            <label className={css.label}>
              <input
                type={isPassword ? 'password' : 'text'}
                placeholder="Password"
                {...register('password')}
                className={`${css.input} ${errors.password ? css.inputError : ''}`}
              />
              {!isPassword && (
                <svg className={css.eye} width={20} height={20} onClick={togglePassword}>
                  <use href="/symbol-defs.svg#eye-off" />
                </svg>
              )}
              {isPassword && (
                <svg className={css.eye} width={20} height={20} onClick={togglePassword}>
                  <use href="/symbol-defs.svg#eye" />
                </svg>
              )}
              {errors.password && <p style={{ color: '#ef2447' }}>{errors.password.message}</p>}
            </label>
          </div>
          <div className={css.wrapper}>
            <button type="submit" disabled={isSubmitting} className={css.btn}>
              Register
            </button>
            <Link href={'/login'} className={css.link}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
