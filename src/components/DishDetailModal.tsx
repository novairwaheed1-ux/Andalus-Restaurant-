import React, { useState, useRef, useEffect } from 'react';
import { X, Star, Minus, Plus, ShoppingBag } from 'lucide-react';
import type { MenuItem, SizeOption, CartItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { TOPPINGS } from '../data/menuData';

interface DishDetailModalProps {
  item: MenuItem;
  onClose: () => void;
  onAdd: (item: CartItem, startX: number, startY: number) => void;
}

export default function DishDetailModal({ item, onClose, onAdd }: DishDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(item.sizes[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Initial size scale setup based on which size is selected
    if (selectedSize.id === 'small') setImageScale(0.85);
    else if (selectedSize.id === 'medium') setImageScale(1);
    else if (selectedSize.id === 'large' || selectedSize.id === 'standard') setImageScale(1.15);
  }, []);

  const handleSizeChange = (size: SizeOption) => {
    setSelectedSize(size);
    // Smooth pronounced scale animation
    if (size.id === 'small') setImageScale(0.85);
    else if (size.id === 'medium') setImageScale(1);
    else if (size.id === 'large') setImageScale(1.2);
    else setImageScale(1);
    
    // Rotate the pizza when size changes
    setRotation(prev => prev + 90); 
  };

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) ? prev.filter(id => id !== toppingId) : [...prev, toppingId]
    );
  };

  const handleAdd = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const toppingsTotal = selectedToppings.reduce((sum, id) => {
      const topping = TOPPINGS.find(t => t.id === id);
      return sum + (topping?.price || 0);
    }, 0);

    const cartItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      menuItemId: item.id,
      name: item.name,
      price: selectedSize.price + toppingsTotal,
      quantity,
      sizeId: selectedSize.id,
      sizeName: selectedSize.name,
      image: item.image,
      description: item.description,
    };
    onAdd(cartItem, centerX, centerY);
  };

  const currentPrice = selectedSize.price + selectedToppings.reduce((sum, id) => sum + (TOPPINGS.find(t => t.id === id)?.price || 0), 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex flex-col justify-end"
      dir="rtl"
    >
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white rounded-t-[40px] w-full max-h-[90vh] overflow-y-auto relative z-10 px-6 pt-8 pb-32"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{item.name}</h2>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-[#FF5B2E] fill-[#FF5B2E]' : 'text-slate-300'}`} />
              ))}
              <span className="text-sm font-bold mr-2 text-slate-700">({item.rating})</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
            <X className="w-6 h-6 text-slate-900" />
          </button>
        </div>

        {/* Big Price & Nutrition */}
        <div className="flex items-center gap-6 mb-8">
          <div className="text-[#FF5B2E] font-black text-4xl">{currentPrice} <span className="text-lg">ج.م</span></div>
          <div className="border-l-2 border-slate-100 pl-6 border-r-0">
             <div className="text-xs text-slate-400 font-semibold tracking-wider mb-1">السعرات</div>
             <div className="font-bold text-slate-800">{item.calories} سعر</div>
          </div>
        </div>

        {/* Big Rotating Image */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <motion.img referrerPolicy="no-referrer" 
              ref={imageRef}
              src={item.image} 
              alt={item.name}
              className="w-64 h-64 object-cover drop-shadow-2xl"
              style={{ clipPath: 'circle(48% at 50% 50%)' }}
              animate={{ scale: imageScale, rotate: rotation }}
              transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
            />
            {/* Topping Overlays */}
            <AnimatePresence>
              {selectedToppings.map(toppingId => {
                 const topping = TOPPINGS.find(t => t.id === toppingId);
                 if (!topping) return null;
                 const getPositions = (id: string) => {
                   if (id === 'cheese') return [{top: '25%', left: '35%'}, {top: '60%', left: '60%'}, {top: '40%', left: '50%'}, {top: '70%', left: '35%'}, {top: '30%', left: '70%'}];
                   if (id === 'mushroom') return [{top: '30%', left: '50%'}, {top: '55%', left: '35%'}, {top: '50%', left: '65%'}, {top: '70%', left: '50%'}];
                   if (id === 'meat') return [{top: '45%', left: '40%'}, {top: '35%', left: '60%'}, {top: '65%', left: '45%'}, {top: '55%', left: '65%'}];
                   if (id === 'olive') return [{top: '20%', left: '45%'}, {top: '75%', left: '50%'}, {top: '45%', left: '25%'}, {top: '50%', left: '75%'}, {top: '35%', left: '35%'}];
                   return [];
                 };
                 return (
                   <motion.div key={toppingId} className="absolute inset-0 pointer-events-none z-10" style={{ clipPath: 'circle(48% at 50% 50%)' }}>
                      {getPositions(toppingId).map((pos, i) => (
                         <motion.div
                            key={i}
                            initial={{ scale: 0, y: -50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ delay: i * 0.1, type: 'spring', bounce: 0.5 }}
                            className="absolute text-2xl drop-shadow-md"
                            style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                         >
                           {topping.icon}
                         </motion.div>
                      ))}
                   </motion.div>
                 )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Size Selector */}
        {item.sizes.length > 1 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 mb-4">الحجم</h3>
            <div className="flex bg-slate-100 p-1 rounded-full relative">
              {item.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleSizeChange(size)}
                  className={`flex-1 py-3 text-sm font-bold rounded-full transition-colors relative z-10 ${
                    selectedSize.id === size.id ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {selectedSize.id === size.id && (
                    <motion.div 
                      layoutId="size-bg"
                      className="absolute inset-0 bg-[#FF5B2E] rounded-full -z-10 shadow-lg shadow-orange-500/40"
                    />
                  )}
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Extra Topping */}
        {['pizza-it', 'pizza-or', 'sarokh', 'hawawshi', 'crepe', 'pie-sav', 'pasta'].includes(item.category) && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 mb-4">إضافات مميزة</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {TOPPINGS.map(topping => (
                <button
                  key={topping.id}
                  onClick={() => toggleTopping(topping.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all shrink-0 ${
                    selectedToppings.includes(topping.id) 
                      ? 'border-[#FF5B2E] bg-orange-50' 
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <span className="text-xl">{topping.icon}</span>
                  <span className="font-bold text-sm text-slate-700">{topping.name} (+{topping.price} ج.م)</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-12">
          <p className="text-slate-500 leading-relaxed text-sm">{item.description}</p>
        </div>

        {/* Bottom Actions Fixed */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t border-slate-100 flex items-center gap-6 z-20 pb-8" dir="rtl">
          <div className="flex items-center bg-slate-100 rounded-full p-1 w-32 justify-between">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-sm active:scale-95"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-bold text-lg text-slate-900">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-sm active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <button 
            onClick={handleAdd}
            className="flex-1 bg-[#1A1A1A] text-white rounded-full h-14 flex items-center justify-center gap-3 font-bold text-lg active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-5 h-5" />
            إضافة للسلة
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
