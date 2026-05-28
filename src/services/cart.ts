import type { CartItem } from '@/types/api';
import { axiosInstance } from '@/lib/axiosInstance';

export function getCart() {
  return axiosInstance.get<{ items: CartItem[] }>('/cart');
}

export function addToCart(productId: number, quantity: number) {
  return axiosInstance.post<{ message: string }>('/cart/add', { productId, quantity });
}

export function checkout(couponCode?: string) {
  return axiosInstance.post<{ message: string; orderId: number }>('/cart/checkout', { couponCode });
}
