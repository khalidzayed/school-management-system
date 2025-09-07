import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getSubjects = async () => {
  const response = await api.get('/subjects');
  return response.data;
};

export const createSubject = async (data: { class_id: number; teacher_id: number | null; name: string; code: string }) => {
  const response = await api.post('/subjects', data);
  return response.data;
};

export const getStudyMaterials = async (subjectId?: number) => {
  const response = await api.get('/study-materials', {
    params: subjectId ? { subjectId } : {},
  });
  return response.data;
};