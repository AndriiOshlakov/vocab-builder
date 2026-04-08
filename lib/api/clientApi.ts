import { RegisterUserResponse, User } from '@/types/user';
import { nextServer } from './api';
import { LoginRequest, RegisterRequest } from '@/types/auth';
import { AllWordsRequest, AllWordsResponse } from '@/types/words';

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/current');
  console.log(data);

  return data;
};

export async function registerUser(params: RegisterRequest) {
  const res = await nextServer.post<RegisterUserResponse>('/register', params);
  console.log(res.data);

  return res.data;
}

export async function loginUser(params: LoginRequest) {
  const res = await nextServer.post<RegisterUserResponse>('/login', params);
  return res.data;
}

export async function getAllWords({
  page,
  limit,
  category,
  isIrregular,
  keyword,
}: AllWordsRequest) {
  const response = await nextServer.get<AllWordsResponse>('/words/all', {
    params: { page, limit, category, isIrregular, keyword },
  });
  console.log(response.data);

  return response.data;
}

export async function logout() {
  await nextServer.post('/users/signout');
}
