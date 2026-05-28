import type { User } from '@/types/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { signIn as apiSignIn, signOut as apiSignOut, getSession } from '@/services/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoaded = ref(false);

  async function checkSession() {
    try {
      const { data } = await getSession();
      if (data?.user) {
        user.value = data.user;
      }
      else {
        user.value = null;
      }
    }
    catch {
      user.value = null;
    }
    finally {
      isLoaded.value = true;
    }
  }

  async function signIn(email: string, password: string) {
    const { data } = await apiSignIn(email, password);
    user.value = data.user;
  }

  async function signOut() {
    try {
      await apiSignOut();
    }
    finally {
      user.value = null;
    }
  }

  return {
    user,
    isLoaded,
    checkSession,
    signIn,
    signOut,
  };
});
