export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
  price?: number;
}

export interface Order {
  id: number;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  discountAmount?: number;
  createdAt: string;
}

export interface Reward {
  id: number;
  orderId: number;
  discount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  totalItemsPurchased: number;
  totalRevenue: number;
  totalDiscountCodes: number;
  totalDiscountGiven: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image: string | null;
}

export interface AuthSession {
  session: {
    expiresAt: string;
    token: string;
    userId: string;
  };
  user: User;
}

export interface UserOrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface UserOrder {
  id: number;
  items: UserOrderItem[];
  totalAmount: number;
  totalItems: number;
  discountAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}
