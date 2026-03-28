export type Category = 'Keyboard' | 'Mouse' | 'Monitor' | 'Speaker' | 'RAM' | 'SSD';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  images: string[];
  specs: Record<string, string>;
  isBestSeller: boolean;
  isComboDeal?: boolean;
  isBundle?: boolean;
  stockCount: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  soldThisWeek: number;
  viewsToday: number;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'Cash on Delivery' | 'Bank Transfer';
  status: 'Pending' | 'Confirmed' | 'Shipped';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerEmail?: string;
  uid?: string;
  rating: number;
  comment: string;
  image?: string;
  createdAt: string;
}
