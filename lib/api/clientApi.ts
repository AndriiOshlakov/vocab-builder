import { RegisterUserResponse } from '@/types/user';
import { nextServer } from './api';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';

export const getMe = async () => {
  const { data } = await nextServer.get<AuthResponse>('/users/current');
  return data;
};

export async function registerUser(params: RegisterRequest) {
  const res = await nextServer.post<RegisterUserResponse>('/register', params);
  return res.data;
}

export async function loginUser(params: LoginRequest) {
  const res = await nextServer.post<RegisterUserResponse>('/login', params);
  return res.data;
}
