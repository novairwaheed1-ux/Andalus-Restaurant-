import { MenuItem } from '../types';

/**
 * Determines whether a dish can logically accept savory toppings
 * (like extra melted mozzarella, seasoned ground meat, or sliced olives).
 * Strictly distinguishes savory foods (pizzas, savory pies, hawawshi, etc.)
 * from sweet desserts (sweet feteer, sweet crepes, nutella, etc.).
 */
export function isSavoryDishForToppings(item: MenuItem): boolean {
  if (!item) return false;

  // 1. Explicit sweet categories in Andalus menu
  if (item.category === 'pie-sw' || item.category === 'crepe-sw') {
    return false;
  }

  // 2. Savory categories: All Italian & Eastern pizzas, savory pies, sarokh, hawawshi, etc.
  const savoryCategories = [
    'pizza-it',   // بيتزا إيطالي
    'pizza-or',   // بيتزا شرقي
    'pie-sav',    // فطائر حادق
    'sarokh',     // صاروخ
    'hawawshi',   // حواوشي
    'pasta',      // باستا
    'bechamel',   // بشاميل
    'crepe',      // كريبات حادق
    'crepe-kono', // كريب كونو حادق
    'sandwiches'  // سندوتشات
  ];

  if (savoryCategories.includes(item.category)) {
    return true;
  }

  // 3. Fallback: check category prefix
  if (item.category.startsWith('pizza') || item.category.startsWith('pie-sav')) {
    return true;
  }

  return false;
}
