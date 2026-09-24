export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  calories: number;
  prepTime: string;
  defaultPrice: number;
  discountPercent?: number;
  sizes: SizeOption[];
}

export interface SizeOption {
  id: string;
  name: string;
  price: number;
  slicesOrDetail?: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  sizeId: string;
  sizeName: string;
  image: string;
  description: string;
  toppings?: string[];
}

export interface OrderItemDetail {
  name: string;
  quantity: number;
  price: number;
  sizeName: string;
  toppings?: string[];
}

export interface OrderRecord {
  id: string;
  orderNumber: number;
  createdAt: string;
  formattedDate: string;
  items: OrderItemDetail[];
  itemsCount: number;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  status: 'received' | 'preparing' | 'on_the_way' | 'delivered';
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  userEmail?: string;
  isGuest?: boolean;
}
