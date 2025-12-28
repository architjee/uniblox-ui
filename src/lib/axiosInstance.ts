import axios from 'axios';
import { identity } from 'lodash-es';
import { CUSTOM_ERROR_CODES, ERROR_CODE_ENUMS } from '@/constants/error';
import { router } from '@/router';
import { refreshTokenApiRequest } from '@/services/api';
import { useAuthStore } from '@/store/auth';
import { AppError } from './error';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore().tokens?.IdToken;
    if (token && config.headers.Authorization !== null) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
);

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

axiosInstance.interceptors.response.use(
  identity,
  async (error) => {
    console.warn('Response Error Object as string', JSON.stringify(error));
    console.warn('Response Error CODE', error?.response?.status);

    const status = error?.response?.status;
    const tokens = useAuthStore().tokens;
    const refreshToken = tokens?.RefreshToken;
    const email = '';
    if ([401, 403].includes(status) && refreshToken) {
      try {
        if (isRefreshing && refreshPromise) {
          await refreshPromise;
        }
        else {
          isRefreshing = true;
          refreshPromise = (async () => {
            try {
              const response = await refreshTokenApiRequest(refreshToken, email!);
              useAuthStore().tokens = response.data.tokens;
              console.warn('Token refreshed successfully');
            }
            catch (err) {
              console.error('Error refreshing token', err);
              useAuthStore().handleCredentialsLogout();
              await router.push('/');
              return Promise.reject(new AppError(CUSTOM_ERROR_CODES[ERROR_CODE_ENUMS.REFRESH_FAILED], ERROR_CODE_ENUMS.REFRESH_FAILED));
            }
            finally {
              isRefreshing = false;
              refreshPromise = null;
            }
          })();

          await refreshPromise;
        }
        const newBearerToken = useAuthStore().tokens?.IdToken;
        error.config.headers.Authorization = newBearerToken;
        return await axiosInstance(error.config);
      }
      catch (refreshError) {
        console.error(`RerfreshPromise broke which I don't think is possible`, refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
