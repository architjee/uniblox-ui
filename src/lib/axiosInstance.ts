import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://uniblox-341902256486.asia-south1.run.app';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
