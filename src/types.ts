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
