import type { User } from '@/types/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { signIn as apiSignIn, signOut as apiSignOut } from '@/services/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  async function signIn(email: string, password: string) {
    const { data } = await apiSignIn(email, password);
    token.value = data.token;
    user.value = data.user;
  }

  async function signOut() {
    try {
      await apiSignOut();
    }
    catch {
      // ignore — token is cleared regardless
    }
    finally {
      token.value = null;
      user.value = null;
    }
  }

  return {
    user,
    token,
    signIn,
    signOut,
  };
}, {
  persist: {
    key: 'uniblox-auth',
    storage: localStorage,
    pick: ['user', 'token'],
  },
});
