import type { AuthSession, SignInResponse } from '@/types/api';
import { axiosInstance } from '@/lib/axiosInstance';

export function signIn(email: string, password: string) {
  return axiosInstance.post<SignInResponse>('/api/auth/sign-in/email', { email, password });
}

export function signOut() {
  return axiosInstance.post<{ success: boolean }>('/api/auth/sign-out', {});
}

export function getSession() {
  return axiosInstance.get<AuthSession>('/api/auth/get-session');
}
