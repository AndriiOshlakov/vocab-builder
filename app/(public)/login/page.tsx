'use client';

import { useState } from 'react';
import css from './Login.module.css';
import * as yup from 'yup';
import { useAuthStore } from '@/lib/store/authStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginRequest } from '@/types/auth';
import toast, { Toaster } from 'react-hot-toast';
import { loginUser } from '@/lib/api/clientApi';
import { AxiosError } from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo/Logo';
import { useRouter } from 'next/navigation';

type ApiError = AxiosError<{ error: string }>;

export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required('Email is required'),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      'Password must contain at least 6 letters and 1 number (min 7 chars)',
    )
    .required('Password is required'),
});

export default function Login() {
  const [isPassword, setIsPassword] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const togglePassword = () => setIsPassword(!isPassword);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const user = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (user) {
        setUser(user);
      }

      toast(`${user.name} logined successfuly`);
      router.push('/dictionary');
    } catch (error) {
      const err = error as ApiError;

      if (err.response?.status === 401) {
        toast('Invalid email or password');
        return;
      }

      toast(err.response?.data?.error ?? err.message ?? 'Login failed');
    }
  };
  return (
    <main className={css.register}>
      <Toaster />
      <div className={css.logoBox}>
        <Logo />
      </div>
      <div className={css.registerBox}>
        <Image
          src="/registerMob.png"
          width={247}
          height={191}
          alt="Guys"
          className={css.registerImgMob}
        />
        <Image
          src="/registerDesc.png"
          width={498}
          height={435}
          alt="Guys"
          className={css.registerImgDesc}
        />
        <p className={css.registerBoxText}>Word · Translation · Grammar · Progress</p>
      </div>
      <div className={css.formBox}>
        <h1 className={css.title}>Login</h1>
        <p className={css.text}>Please enter your login details to continue using our service:</p>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.inputsBox}>
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
              Login
            </button>
            <Link href={'/register'} className={css.link}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
