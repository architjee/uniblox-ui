import { axiosInstance } from '@/lib/axiosInstance';
import type { UserOrder } from '@/types/api';

export function getMyOrders() {
  return axiosInstance.get<{ orders: UserOrder[] }>('/user/orders');
}
