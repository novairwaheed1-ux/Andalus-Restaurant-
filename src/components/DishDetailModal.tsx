import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Heart, Star, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import type { MenuItem, SizeOption, CartItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { TOPPINGS } from '../data/menuData';

interface DishDetailModalProps {
  item: MenuItem;
  onClose: () => void;
  onAdd: (item: CartItem, startX: number, startY: number) => void;
}

export default function DishDetailModal({ item, onClose, onAdd }: DishDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(item.sizes[0] || { id: 'medium', name: 'وسط', price: item.defaultPrice });
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Initial size scale setup
    if (selectedSize.id === 'small') setImageScale(0.85);
    else if (selectedSize.id === 'medium') setImageScale(1);
    else if (selectedSize.id === 'large' || selectedSize.id === 'standard') setImageScale(1.15);
    
    // Mark landed quickly so rotation stops immediately once it reaches position
    const timer = setTimeout(() => {
      setHasLanded(true);
    }, 420);
    return () => clearTimeout(timer);
  }, []);

  const handleSizeChange = (size: SizeOption) => {
    setSelectedSize(size);
    if (size.id === 'small') setImageScale(0.85);
    else if (size.id === 'medium') setImageScale(1);
    else if (size.id === 'large') setImageScale(1.18);
    else setImageScale(1);
    
    // Snappy responsive spin on size change
    setRotation(prev => prev + 180);
  };

  const getSlicesText = (sizeId: string) => {
    if (sizeId === 'small') return "10' / 6 قطع";
    if (sizeId === 'large') return "14' / 10 قطع";
    return "12' / 8 قطع";
  };

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) ? prev.filter(id => id !== toppingId) : [...prev, toppingId]
    );
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(true);

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
    }

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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/55 z-[200] flex flex-col justify-end sm:justify-center items-center"
      dir="rtl"
    >
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div 
        initial={{ y: '100%', opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.65 }}
        className="bg-white rounded-t-[36px] sm:rounded-[36px] w-full max-w-[440px] max-h-[92vh] flex flex-col relative z-10 overflow-hidden shadow-2xl will-change-transform"
      >
        {/* Top Floating Action Buttons (Back + Favorite) matching the video */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2 relative z-20">
          <button 
            onClick={onClose} 
            className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-800 shadow-sm transition-transform active:scale-90"
            title="رجوع"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setIsLiked(!isLiked)} 
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all active:scale-90 ${
              isLiked ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="إضافة للمفضلة"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 pt-1 pb-6 flex-1 no-scrollbar">
          
          {/* Top Hero Grid: Title, Price, Calories, Slices on Left/Right + Giant Rotating Pizza on the other side */}
          <div className="flex items-start justify-between gap-2 mb-6 min-h-[190px] relative">
            
            {/* Details Column */}
            <div className="flex-1 z-10 pt-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-2 tracking-tight">
                {item.name}
              </h2>
              
              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-2.5">
                <Star className="w-4 h-4 text-[#FF5B2E] fill-[#FF5B2E]" />
                <span className="text-sm font-black text-slate-800">({item.rating})</span>
              </div>

              {/* Big Vibrant Price */}
              <div className="text-[#FF5B2E] font-black text-3xl sm:text-4xl mb-3 tracking-tight">
                {currentPrice} <span className="text-base font-bold text-slate-600">ج.م</span>
              </div>

              {/* Calories & Slices (Dynamically updating with size) */}
              <div className="flex flex-col gap-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100 max-w-[150px]">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">السعرات</div>
                  <div className="text-sm font-bold text-slate-800">{item.calories} سعر</div>
                </div>
                <div className="border-t border-slate-200/60 pt-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">المقاس والقطع</div>
                  <div className="text-xs font-bold text-slate-800">{getSlicesText(selectedSize.id)}</div>
                </div>
              </div>
            </div>

            {/* Giant Rotating Pizza Container (Enters spinning fast and STOPS immediately upon reaching place) */}
            <div className="w-[180px] sm:w-[200px] h-[180px] sm:h-[200px] relative flex items-center justify-center shrink-0 -mr-4 sm:-mr-2">
              <motion.div
                className="relative w-full h-full flex items-center justify-center will-change-transform"
                initial={{ rotate: 0, scale: 0.75, x: 55, opacity: 0.7 }}
                animate={{ 
                  rotate: hasLanded ? rotation : 360, 
                  scale: imageScale, 
                  x: 0, 
                  opacity: 1 
                }}
                transition={{ 
                  rotate: hasLanded 
                    ? { duration: 0.35, ease: [0.25, 1, 0.5, 1] } 
                    : { duration: 0.4, ease: [0.15, 0.85, 0.35, 1] },
                  scale: { type: 'spring', damping: 20, stiffness: 260, mass: 0.6 },
                  x: { type: 'spring', damping: 24, stiffness: 280, mass: 0.6 },
                  opacity: { duration: 0.2 }
                }}
              >
                <img 
                  ref={imageRef}
                  referrerPolicy="no-referrer" 
                  src={item.image} 
                  alt={item.name}
                  decoding="async"
                  className="w-full h-full object-cover drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)] rounded-full"
                />

                {/* Topping Overlays */}
                <AnimatePresence>
                  {selectedToppings.map(toppingId => {
                     const topping = TOPPINGS.find(t => t.id === toppingId);
                     if (!topping) return null;
                     const getPositions = (id: string) => {
                       if (id === 'cheese') return [{top: '25%', left: '35%'}, {top: '60%', left: '60%'}, {top: '40%', left: '50%'}, {top: '70%', left: '35%'}];
                       if (id === 'mushroom') return [{top: '30%', left: '50%'}, {top: '55%', left: '35%'}, {top: '50%', left: '65%'}];
                       if (id === 'meat') return [{top: '45%', left: '40%'}, {top: '35%', left: '60%'}, {top: '65%', left: '45%'}];
                       if (id === 'olive') return [{top: '20%', left: '45%'}, {top: '75%', left: '50%'}, {top: '45%', left: '25%'}];
                       return [];
                     };
                     return (
                       <motion.div key={toppingId} className="absolute inset-0 pointer-events-none z-10 rounded-full overflow-hidden">
                          {getPositions(toppingId).map((pos, i) => (
                             <motion.div
                                key={i}
                                initial={{ scale: 0, y: -40, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ delay: i * 0.08, type: 'spring', bounce: 0.5 }}
                                className="absolute text-xl drop-shadow-md"
                                style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                             >
                               {topping.icon}
                             </motion.div>
                          ))}
                       </motion.div>
                     )
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Size Selector matching video's Small, Medium, Large buttons */}
          {item.sizes.length > 1 && (
            <div className="mb-6">
              <h3 className="text-sm font-black text-slate-900 mb-3">اختر الحجم</h3>
              <div className="flex bg-slate-100 p-1.5 rounded-full relative gap-1">
                {item.sizes.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => handleSizeChange(size)}
                      className={`flex-1 py-3 text-sm font-bold rounded-full transition-all relative z-10 ${
                        isSelected ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isSelected && (
                        <motion.div 
                          layoutId="size-bg"
                          className="absolute inset-0 bg-[#FF5B2E] rounded-full -z-10 shadow-md shadow-orange-500/30"
                          transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                        />
                      )}
                      <span>{size.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Topping Chips */}
          {['pizza-it', 'pizza-or', 'sarokh', 'hawawshi', 'crepe', 'pie-sav', 'pasta'].includes(item.category) && (
            <div className="mb-6">
              <h3 className="text-sm font-black text-slate-900 mb-3">إضافات إضافية</h3>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {TOPPINGS.map(topping => {
                  const isSelected = selectedToppings.includes(topping.id);
                  return (
                    <button
                      key={topping.id}
                      onClick={() => toggleTopping(topping.id)}
                      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border transition-all shrink-0 active:scale-95 ${
                        isSelected 
                          ? 'border-[#FF5B2E] bg-orange-50 text-[#FF5B2E] shadow-sm' 
                          : 'border-slate-200/80 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-lg">{topping.icon}</span>
                      <span className="font-bold text-xs">{topping.name} (+{topping.price} ج.م)</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">عن الوجبة</h3>
            <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {item.description}
            </p>
          </div>
        </div>

        {/* Fixed Pinned Bottom Actions Bar */}
        <div className="bg-white p-4 sm:p-5 border-t border-slate-100 flex items-center gap-4 z-20 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] shrink-0" dir="rtl">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-slate-100 rounded-full p-1 w-32 justify-between shrink-0">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-sm active:scale-90 transition-transform"
              title="تقليل الكمية"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-black text-lg text-slate-900">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-sm active:scale-90 transition-transform"
              title="زيادة الكمية"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* Add To Cart Button */}
          <button 
            onClick={handleAdd}
            disabled={isAdding}
            className={`flex-1 rounded-full h-14 flex items-center justify-center gap-3 font-bold text-base sm:text-lg transition-all shadow-xl ${
              isAdding 
                ? 'bg-emerald-600 text-white scale-[0.98]' 
                : 'bg-[#1A1A1A] hover:bg-black text-white active:scale-95 hover:shadow-black/20'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-5 h-5 text-white" />
                <span>تمت الإضافة بنجاح!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5 text-[#FF5B2E]" />
                <span>إضافة للسلة ({currentPrice * quantity} ج.م)</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
