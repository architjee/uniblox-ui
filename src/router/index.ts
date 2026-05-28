import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore();

  if (!auth.isLoaded) {
    await auth.checkSession();
  }

  const isAuthenticated = !!auth.user;
  const isAdmin = auth.user?.role === 'admin';

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    return next({ name: 'products' });
  }

  return next();
});

export { router };
