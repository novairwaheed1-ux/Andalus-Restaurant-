import { OrderRecord } from '../types';

const STORAGE_KEY = 'andalus_orders_history_v2';
const LEGACY_STORAGE_KEY = 'andalus_order_history_v1';

export function getStoredOrders(): OrderRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    // Purge old mock demo orders if present
    if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (e) {
    console.error('Error reading order history:', e);
    return [];
  }
}

export function saveOrderToHistory(order: OrderRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredOrders();
    const updated = [order, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving order to history:', e);
  }
}

export function clearOrderHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (e) {}
}

export function getUserOrderStats(orders: OrderRecord[]) {
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const lastOrder = orders.length > 0 ? orders[0] : null;

  return {
    totalOrders,
    totalSpent,
    lastOrderDate: lastOrder ? lastOrder.formattedDate : null,
    lastOrderNumber: lastOrder ? lastOrder.orderNumber : null,
  };
}
