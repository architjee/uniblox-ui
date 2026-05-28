import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'products',
    component: () => import('@/views/ProductsView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/CartView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/OrdersView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'admin-analytics',
        component: () => import('@/views/admin/AnalyticsView.vue'),
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('@/views/admin/OrdersView.vue'),
      },
      {
        path: 'rewards',
        name: 'admin-rewards',
        component: () => import('@/views/admin/RewardsView.vue'),
      },
      {
        path: 'coupons',
        name: 'admin-coupons',
        component: () => import('@/views/admin/CouponsView.vue'),
      },
    ],
  },
];
