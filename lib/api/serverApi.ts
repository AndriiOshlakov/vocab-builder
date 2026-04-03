import { nextServer } from './api';
import { AuthResponse } from '@/types/auth';

export const getMeServer = async () => {
  const { data } = await nextServer.get<AuthResponse>('/users/current');
  return data;
};
