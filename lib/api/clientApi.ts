import { RegisterUserResponse, User } from '@/types/user';
import { nextServer } from './api';
import { LoginRequest, RegisterRequest } from '@/types/auth';
import {
  AllWordsRequest,
  AllWordsResponse,
  OwnWordsResponse,
  Task,
  TasksResponse,
  Word,
  WordResponse,
} from '@/types/words';

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/current');
  console.log(data);

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
  return response.data;
}

export async function getOwnWords({
  page,
  limit,
  category,
  isIrregular,
  keyword,
}: AllWordsRequest) {
  const response = await nextServer.get<OwnWordsResponse>('/words/own', {
    params: { page, limit, category, isIrregular, keyword },
  });
  return response.data;
}

export async function logout() {
  await nextServer.post('/users/signout');
}

export async function getStatistics() {
  const res = await nextServer.get<{ totalCount: number }>('/words/statistics');
  return res.data;
}

export async function createWord(params: Word) {
  const res = await nextServer.post<WordResponse>('/words/create', params);
  return res.data;
}

export async function deleteWord(id: string) {
  const res = await nextServer.delete(`/words/delete/${id}`);
  console.log(res.data);
}

export type UpdateWordParams = {
  id: string;
  params: Word;
};

export async function editWord({ id, params }: UpdateWordParams) {
  const res = await nextServer.patch(`/words/edit/${id}`, params);
  return res.data;
}

export async function addWord(id: string) {
  const res = await nextServer.post<WordResponse>(`/words/add/${id}`);
  console.log(res.data);

  return res.data;
}

export async function getTasks() {
  const res = await nextServer.get<TasksResponse>('/words/tasks');
  return res.data.tasks;
}

export async function createAnswer(params: Task[]) {
  const res = await nextServer.post('/words/answers', params);
  console.log(res.data);
  return res.data;
}
