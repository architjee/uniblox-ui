import type { Analytics, Coupon, Order, Reward } from '@/types/api';
import { axiosInstance } from '@/lib/axiosInstance';

export function getOrders(cursor?: number, limit = 20) {
  return axiosInstance.get<{ orders: Order[]; nextCursor: number | null }>('/admin/orders', {
    params: { cursor, limit },
  });
}

export function getRewards() {
  return axiosInstance.get<{ rewards: Reward[] }>('/admin/rewards');
}

export function generateCoupon(rewardId: number) {
  return axiosInstance.post<{ couponCode: string }>(`/admin/rewards/${rewardId}/generate`);
}

export function getCoupons() {
  return axiosInstance.get<{ coupons: Coupon[] }>('/admin/coupons');
}

export function getAnalytics() {
  return axiosInstance.get<Analytics>('/admin/analytics');
}
