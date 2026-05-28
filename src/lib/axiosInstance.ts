import axios from 'axios';
import { router } from '@/router';
import { useAuthStore } from '@/store/auth';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://uniblox-341902256486.asia-south1.run.app';

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  (error) => {
    if (error?.response?.status === 401) {
      const auth = useAuthStore();
      if (auth.user) {
        auth.signOut();
        router.push('/login');
      }
    }
    return Promise.reject(error);
  },
);
