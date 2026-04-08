import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
  withCredentials: true,
});
