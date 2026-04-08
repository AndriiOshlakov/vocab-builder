import { nextServer } from './api';
import { AuthResponse } from '@/types/auth';

export const getMeServer = async () => {
  const { data } = await nextServer.get<AuthResponse>('/users/current');
  console.log('GET ME SERVER', data);

  return data;
};
