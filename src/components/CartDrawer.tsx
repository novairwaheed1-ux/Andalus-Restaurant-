import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, CreditCard, Banknote, Smartphone } from 'lucide-react';
import type { CartItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, setItems, onCheckout }: CartDrawerProps) {
  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 0 ? 15 : 0;
  const total = subtotal + delivery;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[200]"
            onClick={onClose}
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 140, mass: 0.8 }}
            className="fixed inset-x-0 bottom-0 top-12 max-w-[440px] mx-auto bg-slate-50 rounded-t-[40px] z-[201] flex flex-col overflow-hidden shadow-2xl"
            dir="rtl"
          >
            <div className="flex flex-col items-center pt-8 pb-4 px-6 bg-slate-50 z-10">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-6" />
              <div className="flex items-center justify-between w-full">
                <div className="w-9" />
                <h2 className="text-xl font-bold text-slate-900">سلة المشتريات</h2>
                <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <p className="text-slate-500 text-sm mt-2 w-full text-center">
                {items.length} أصناف في سلتك
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img referrerPolicy="no-referrer" 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover drop-shadow-md"
                      style={{ clipPath: 'circle(48% at 50% 50%)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-[15px] leading-tight mb-1">{item.name}</h3>
                    <p className="text-[11px] text-slate-500 mb-2 line-clamp-1">{item.sizeName}</p>
                    <p className="font-bold text-lg text-[#FF5B2E]">{(item.price * item.quantity).toFixed(0)} ج.م</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 bg-slate-50 p-1 rounded-full border border-slate-100">
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-sm border border-slate-100 active:scale-90 transition-transform"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm leading-none text-slate-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-sm border border-slate-100 active:scale-90 transition-transform"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              
              {items.length === 0 && (
                <div className="text-center text-slate-400 mt-12 flex flex-col items-center gap-3">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                    <ShoppingBag className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="font-medium text-slate-500">سلة المشتريات فارغة</p>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mt-auto z-10 relative">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-500 font-medium text-sm">
                  <span>المجموع الفرعي</span>
                  <span className="text-slate-900">{subtotal.toFixed(0)} ج.م</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium text-sm">
                  <span>خدمة التوصيل</span>
                  <span className="text-slate-900">{delivery.toFixed(0)} ج.م</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-900 pt-4 border-t border-slate-100 mt-2">
                  <span>الإجمالي</span>
                  <span className="text-[#FF5B2E]">{total.toFixed(0)} ج.م</span>
                </div>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-[#FF5B2E] hover:bg-[#e0481d] text-white py-4 rounded-full font-black text-lg disabled:opacity-50 disabled:bg-slate-300 shadow-xl shadow-[#FF5B2E]/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                disabled={items.length === 0}
              >
                <span>تأكيد الطلب</span>
                <span className="text-sm font-normal bg-white/20 px-2.5 py-0.5 rounded-full">({total.toFixed(0)} ج.م)</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
