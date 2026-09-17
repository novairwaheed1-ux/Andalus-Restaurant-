import { Category, MenuItem, Topping } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'الكل', icon: 'grid' },
  { id: 'pizza-it', name: 'بيتزا إيطالي', icon: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png' },
  { id: 'pizza-or', name: 'بيتزا شرقي', icon: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png' },
  { id: 'sarokh', name: 'صاروخ', icon: 'https://cdn-icons-png.flaticon.com/512/6686/6686001.png' },
  { id: 'hawawshi', name: 'حواوشي', icon: 'https://cdn-icons-png.flaticon.com/512/3274/3274099.png' },
  { id: 'crepe', name: 'كريبات', icon: 'https://cdn-icons-png.flaticon.com/512/2619/2619574.png' },
  { id: 'pie-sav', name: 'فطائر حادق', icon: 'https://cdn-icons-png.flaticon.com/512/4727/4727406.png' },
  { id: 'pie-sw', name: 'فطائر حلو', icon: 'https://cdn-icons-png.flaticon.com/512/1784/1784265.png' },
  { id: 'sandwiches', name: 'سندوتشات', icon: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
  { id: 'pasta', name: 'باستا', icon: 'https://cdn-icons-png.flaticon.com/512/1155/1155061.png' },
];

export const TOPPINGS: Topping[] = [
  { id: 'cheese', name: 'موتزاريلا', price: 15, icon: '🧀' },
  { id: 'mushroom', name: 'مشروم', price: 10, icon: '🍄' },
  { id: 'meat', name: 'لحم مفروم', price: 20, icon: '🥩' },
  { id: 'olive', name: 'زيتون', price: 5, icon: '🫒' },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- بيتزا إيطالي ---
  {
    id: 'it-meat', name: 'بيتزا لحمة إيطالي', category: 'pizza-it',
    description: 'لحمة - صوص طماطم - موتزاريلا - زيتون - فلفل',
    image: '/pizza.jpg',
    rating: 4.8, calories: 450, prepTime: '20 دقيقة', defaultPrice: 110,
    sizes: [{ id: 'small', name: 'صغير', price: 110 }, { id: 'medium', name: 'وسط', price: 140 }, { id: 'large', name: 'كبير', price: 190 }]
  },
  {
    id: 'it-chicken', name: 'بيتزا فراخ إيطالي', category: 'pizza-it',
    description: 'فراخ - صوص طماطم - موتزاريلا - زيتون - فلفل',
    image: '/pizza.jpg',
    rating: 4.7, calories: 420, prepTime: '20 دقيقة', defaultPrice: 110,
    sizes: [{ id: 'small', name: 'صغير', price: 110 }, { id: 'medium', name: 'وسط', price: 140 }, { id: 'large', name: 'كبير', price: 190 }]
  },
  {
    id: 'it-ranch', name: 'تشيكن رانش إيطالي', category: 'pizza-it',
    description: 'فراخ - صوص رانش - صوص طماطم - موتزاريلا - زيتون - فلفل',
    image: '/pizza.jpg',
    rating: 4.9, calories: 480, prepTime: '20 دقيقة', defaultPrice: 120,
    sizes: [{ id: 'small', name: 'صغير', price: 120 }, { id: 'medium', name: 'وسط', price: 150 }, { id: 'large', name: 'كبير', price: 200 }]
  },
  {
    id: 'it-bbq', name: 'تشيكن باربكيو إيطالي', category: 'pizza-it',
    description: 'فراخ - صوص باربكيو - صوص طماطم - موتزاريلا - زيتون',
    image: '/pizza.jpg',
    rating: 4.8, calories: 460, prepTime: '20 دقيقة', defaultPrice: 120,
    sizes: [{ id: 'small', name: 'صغير', price: 120 }, { id: 'medium', name: 'وسط', price: 150 }, { id: 'large', name: 'كبير', price: 200 }]
  },
  {
    id: 'it-mixcheese', name: 'ميكس جبن إيطالي', category: 'pizza-it',
    description: 'ميكس جبن - صوص طماطم - موتزاريلا - زيتون - فلفل',
    image: '/pizza.jpg',
    rating: 4.7, calories: 500, prepTime: '15 دقيقة', defaultPrice: 120,
    sizes: [{ id: 'small', name: 'صغير', price: 120 }, { id: 'medium', name: 'وسط', price: 150 }, { id: 'large', name: 'كبير', price: 220 }]
  },
  {
    id: 'it-andalus', name: 'بيتزا الأندلس إيطالي', category: 'pizza-it',
    description: 'لحمة - فراخ - سوسيس شرقي - صوص طماطم - موتزاريلا',
    image: '/pizza.jpg',
    rating: 5.0, calories: 550, prepTime: '25 دقيقة', defaultPrice: 120, discountPercent: 10,
    sizes: [{ id: 'small', name: 'صغير', price: 120 }, { id: 'medium', name: 'وسط', price: 150 }, { id: 'large', name: 'كبير', price: 220 }]
  },

  // --- بيتزا شرقي ---
  {
    id: 'or-meat', name: 'بيتزا لحمة شرقي', category: 'pizza-or',
    description: 'لحمة - صوص طماطم - موتزاريلا - زيتون - فلفل',
    image: '/pizza.jpg',
    rating: 4.6, calories: 480, prepTime: '20 دقيقة', defaultPrice: 110,
    sizes: [{ id: 'small', name: 'صغير', price: 110 }, { id: 'medium', name: 'وسط', price: 140 }, { id: 'large', name: 'كبير', price: 190 }]
  },
  {
    id: 'or-chicken', name: 'بيتزا فراخ شرقي', category: 'pizza-or',
    description: 'فراخ - صوص طماطم - موتزاريلا - زيتون - فلفل',
    image: '/pizza.jpg',
    rating: 4.7, calories: 450, prepTime: '20 دقيقة', defaultPrice: 110,
    sizes: [{ id: 'small', name: 'صغير', price: 110 }, { id: 'medium', name: 'وسط', price: 140 }, { id: 'large', name: 'كبير', price: 190 }]
  },
  
  // --- صاروخ ---
  {
    id: 'sarokh-chicken', name: 'صاروخ فراخ', category: 'sarokh',
    description: 'ساندوتش صاروخ ملفوف فراخ بتتبيلة الأندلس',
    image: '/sarokh.jpg',
    rating: 4.8, calories: 600, prepTime: '15 دقيقة', defaultPrice: 100,
    sizes: [{ id: 'standard', name: 'عادي', price: 100 }]
  },
  {
    id: 'sarokh-mix-meat', name: 'صاروخ ميكس لحوم', category: 'sarokh',
    description: 'ساندوتش صاروخ ملفوف ميكس لحوم',
    image: '/sarokh.jpg',
    rating: 4.9, calories: 700, prepTime: '15 دقيقة', defaultPrice: 140,
    sizes: [{ id: 'standard', name: 'عادي', price: 140 }]
  },

  // --- حواوشي ---
  {
    id: 'haw-meat', name: 'حواوشي لحمة', category: 'hawawshi',
    description: 'رغيف حواوشي لحمة متبلة بالفرن',
    image: '/hawawshi.jpg',
    rating: 4.7, calories: 550, prepTime: '20 دقيقة', defaultPrice: 110,
    sizes: [{ id: 'standard', name: 'عادي', price: 110 }]
  },
  {
    id: 'haw-andalus', name: 'حواوشي الأندلس', category: 'hawawshi',
    description: 'رغيف حواوشي الأندلس المميز',
    image: '/hawawshi.jpg',
    rating: 4.9, calories: 650, prepTime: '20 دقيقة', defaultPrice: 130, discountPercent: 15,
    sizes: [{ id: 'standard', name: 'عادي', price: 130 }]
  },

  // --- كريبات ---
  {
    id: 'crepe-pane', name: 'كريب بانية', category: 'crepe',
    description: 'كريب محشو قطع الدجاج البانية الكرسبي',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80',
    rating: 4.6, calories: 450, prepTime: '10 دقائق', defaultPrice: 90,
    sizes: [{ id: 'standard', name: 'عادي', price: 90 }]
  },
  {
    id: 'crepe-strips', name: 'كريب استربس', category: 'crepe',
    description: 'كريب محشو استربس الدجاج الحار',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80',
    rating: 4.8, calories: 500, prepTime: '10 دقائق', defaultPrice: 100,
    sizes: [{ id: 'standard', name: 'عادي', price: 100 }]
  },

  // --- فطائر ---
  {
    id: 'pie-mix-cheese', name: 'فطيرة مشكل جبن', category: 'pie-sav',
    description: 'فطيرة حادقة مورقة محشوة ميكس جبن',
    image: '/pie.jpg',
    rating: 4.7, calories: 600, prepTime: '25 دقيقة', defaultPrice: 120,
    sizes: [{ id: 'small', name: 'صغير', price: 120 }, { id: 'medium', name: 'وسط', price: 150 }, { id: 'large', name: 'كبير', price: 220 }]
  },
  {
    id: 'pie-sugar', name: 'فطيرة سكر ولبن', category: 'pie-sw',
    description: 'فطيرة حلوة بالسكر واللبن الدافئ',
    image: '/pie.jpg',
    rating: 4.9, calories: 400, prepTime: '15 دقيقة', defaultPrice: 60,
    sizes: [{ id: 'medium', name: 'وسط', price: 60 }, { id: 'large', name: 'كبير', price: 90 }]
  },

  // --- باستا ---
  {
    id: 'pasta-negresco', name: 'باستا نجرسكو', category: 'pasta',
    description: 'مكرونة نجرسكو بالدجاج والوايت صوص والجبن',
    image: '/pasta.jpg',
    rating: 4.8, calories: 550, prepTime: '20 دقيقة', defaultPrice: 70,
    sizes: [{ id: 'standard', name: 'طبق', price: 70 }]
  },
  {
    id: 'pasta-sausage', name: 'باستا سوسيس', category: 'pasta',
    description: 'مكرونة بالسوسيس والصلصة الغنية',
    image: '/pasta.jpg',
    rating: 4.5, calories: 500, prepTime: '15 دقيقة', defaultPrice: 75,
    sizes: [{ id: 'standard', name: 'طبق', price: 75 }]
  }
];
