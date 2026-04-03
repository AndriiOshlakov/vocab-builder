import { useAuthStore } from '@/lib/store/authStore';
import axios from 'axios';

export const publicApi = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
});

privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
