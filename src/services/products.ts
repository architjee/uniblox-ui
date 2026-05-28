import type { Product } from '@/types/api';
import { axiosInstance } from '@/lib/axiosInstance';

export function getProducts() {
  return axiosInstance.get<{ products: Product[] }>('/products');
}
