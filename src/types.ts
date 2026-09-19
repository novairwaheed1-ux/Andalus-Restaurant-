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
}
