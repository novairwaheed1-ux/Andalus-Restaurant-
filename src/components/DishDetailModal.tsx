import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ChevronRight, Star, Minus, Plus, ShoppingBag, Check, Utensils, 
  Sparkles, X
} from 'lucide-react';
import type { MenuItem, SizeOption, CartItem } from '../types';
import { motion, AnimatePresence } from "motion/react";
import { TOPPINGS } from '../data/menuData';
import RealisticToppingsOverlay from './RealisticToppingsOverlay';
import { isSavoryDishForToppings } from '../utils/menuHelpers';

interface DishDetailModalProps {
  key?: React.Key;
  item: MenuItem;
  onClose: () => void;
  onAdd: (item: CartItem, startX: number, startY: number, startSize?: number, customImg?: string) => void;
}

export default function DishDetailModal({ item, onClose, onAdd }: DishDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(
    item.sizes[0] || { id: 'medium', name: 'وسط', price: item.defaultPrice }
  );
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [hasLanded, setHasLanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Smart check: Can this item accept savory toppings (cheese, olives, meat)?
  const canAcceptToppings = useMemo(() => isSavoryDishForToppings(item), [item]);

  // Fast instant image loading: starts with cached thumbnail from the card, then upgrades to high-res
  const cachedThumb = item.image.startsWith('/items/')
    ? item.image.replace('/items/', '/thumbs/')
    : item.image;

  const [modalImg, setModalImg] = useState(cachedThumb);
  const [imgErrorCount, setImgErrorCount] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const plateContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canAcceptToppings) {
      setSelectedToppings([]);
    }
  }, [canAcceptToppings]);

  useEffect(() => {
    const initialThumb = item.image.startsWith('/items/')
      ? item.image.replace('/items/', '/thumbs/')
      : item.image;
    setModalImg(initialThumb);
    setImgErrorCount(0);

    const highRes = new Image();
    highRes.src = item.image;
    highRes.onload = () => {
      setModalImg(item.image);
    };
  }, [item.image]);

  // Dynamic calories calculation based on size & toppings
  const baseCalories = item.calories || 450;
  const currentCalories = useMemo(() => {
    let sizeFactor = 1;
    if (selectedSize.id === 'small') sizeFactor = 0.74;
    else if (selectedSize.id === 'large') sizeFactor = 1.35;
    
    let toppingCalories = 0;
    if (canAcceptToppings) {
      selectedToppings.forEach(tId => {
        if (tId === 'cheese') toppingCalories += 80;
        else if (tId === 'meat') toppingCalories += 120;
        else if (tId === 'olive') toppingCalories += 30;
      });
    }

    return Math.round(baseCalories * sizeFactor) + toppingCalories;
  }, [baseCalories, selectedSize.id, selectedToppings, canAcceptToppings]);

  useEffect(() => {
    if (selectedSize.id === 'small') setImageScale(0.88);
    else if (selectedSize.id === 'medium') setImageScale(1);
    else if (selectedSize.id === 'large' || selectedSize.id === 'standard') setImageScale(1.12);
    
    const timer = setTimeout(() => {
      setHasLanded(true);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const handleSizeChange = (size: SizeOption) => {
    setSelectedSize(size);
    if (size.id === 'small') setImageScale(0.88);
    else if (size.id === 'medium') setImageScale(1);
    else if (size.id === 'large') setImageScale(1.12);
    else setImageScale(1);
    
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

  const handleImageError = () => {
    if (imgErrorCount === 0) {
      setImgErrorCount(1);
      setModalImg(item.image.replace('/items/', '/thumbs/'));
    } else if (imgErrorCount === 1) {
      setImgErrorCount(2);
      setModalImg(item.image.replace(/\.webp$/, '.jpg'));
    } else if (imgErrorCount === 2) {
      setImgErrorCount(3);
      setModalImg(item.image.replace('/items/', '/thumbs/').replace(/\.webp$/, '.jpg'));
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(true);

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let dishSize = 180;

    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
      dishSize = rect.width || 180;
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
      toppings: canAcceptToppings ? selectedToppings.map(id => TOPPINGS.find(t => t.id === id)?.name || id) : undefined,
    };
    const activeImg = imageRef.current?.src || modalImg;
    onAdd(cartItem, centerX, centerY, dishSize, activeImg);
  };

  const currentPrice = selectedSize.price + (canAcceptToppings ? selectedToppings.reduce(
    (sum, id) => sum + (TOPPINGS.find(t => t.id === id)?.price || 0), 
    0
  ) : 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/65 backdrop-blur-xs z-[200] flex flex-col justify-end sm:justify-center items-center"
      dir="rtl"
    >
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div 
        initial={{ y: '100%', opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-t-[36px] sm:rounded-[36px] w-full max-w-[460px] max-h-[92vh] flex flex-col relative z-10 overflow-hidden shadow-2xl"
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2 relative z-20">
          <button 
            onClick={onClose} 
            className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-800 shadow-xs transition-transform active:scale-90 cursor-pointer"
            title="رجوع"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="text-xs font-bold text-slate-400">
            تفاصيل الوجبة
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 pt-1 pb-6 flex-1 no-scrollbar">
          
          {/* Prominent Centered Food Plate Section */}
          <div className="flex flex-col items-center justify-center my-3 relative">
            
            {/* Ambient Circular Plate */}
            <div 
              ref={plateContainerRef}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full relative p-2 bg-slate-100 shadow-inner flex items-center justify-center overflow-hidden"
            >
              {/* Food Image */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center will-change-transform"
                animate={{
                  scale: imageScale,
                  rotate: hasLanded ? rotation : 360,
                }}
                transition={{
                  scale: { type: 'spring', damping: 24, stiffness: 220, mass: 0.7 },
                  rotate: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                }}
              >
                {imgErrorCount >= 4 ? (
                  <div className="w-full h-full rounded-full bg-amber-50/80 flex flex-col items-center justify-center text-[#0D1E3A] border-2 border-amber-200">
                    <Utensils className="w-14 h-14 opacity-40 mb-1" />
                    <span className="text-[11px] font-black text-slate-700">{item.name}</span>
                  </div>
                ) : (
                  <img 
                    ref={imageRef}
                    src={modalImg} 
                    alt={item.name} 
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full h-full object-cover drop-shadow-[0_12px_24px_rgba(13,30,58,0.22)] rounded-full select-none"
                  />
                )}

                {/* Toppings Micro Feedback (Non-intrusive rim ring & transient sparkle) */}
                {canAcceptToppings && (
                  <RealisticToppingsOverlay selectedToppings={selectedToppings} />
                )}
              </motion.div>
            </div>

            {/* Selected Additions Badges: Visible under the plate without covering the dish image! */}
            {canAcceptToppings && selectedToppings.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 max-w-sm px-2"
              >
                {selectedToppings.map(id => {
                  const topping = TOPPINGS.find(t => t.id === id);
                  if (!topping) return null;
                  return (
                    <span 
                      key={id} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-950 border border-amber-300/80 rounded-full text-xs font-black shadow-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{topping.name}</span>
                      <span className="text-amber-700 font-black">(+{topping.price} ج.م)</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleTopping(id); }}
                        className="hover:bg-amber-200/80 p-0.5 rounded-full text-slate-500 hover:text-slate-900 transition-colors mr-0.5 cursor-pointer"
                        title="حذف الإضافة"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </motion.div>
            )}

          </div>

          {/* Dish Header Info: Title, Rating, Price, Calories */}
          <div className="flex items-start justify-between gap-3 mb-5 mt-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-1.5 tracking-tight">
                {item.name}
              </h2>
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span className="text-sm font-black text-slate-800">({item.rating})</span>
                <span className="text-xs text-slate-400 mr-2">وقت التحضير: {item.prepTime || '20 دقيقة'}</span>
              </div>
            </div>

            {/* Price Badge */}
            <div className="text-left shrink-0">
              <div className="text-[#0D1E3A] font-black text-2xl sm:text-3xl tracking-tight">
                {currentPrice} <span className="text-sm font-bold text-slate-500">ج.م</span>
              </div>
            </div>
          </div>

          {/* Calories & Slices Chips */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">السعرات</span>
              <span className="text-sm font-black text-amber-600 transition-colors">{currentCalories} سعر</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">المقاس والقطع</span>
              <span className="text-xs font-black text-slate-900">{getSlicesText(selectedSize.id)}</span>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5 font-medium">
              {item.description}
            </p>
          )}

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="font-extrabold text-sm text-slate-900 mb-2.5">اختر الحجم</h3>
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
              {item.sizes.map((size) => {
                const isSelected = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => handleSizeChange(size)}
                    className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0D1E3A] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {size.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extra Toppings or Sweet Advisory */}
          {canAcceptToppings ? (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">إضافات وتتبيلات إضافية</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">اختر إضافاتك المفضلة دون حجب صورة الصنف الأصلي</p>
                </div>
                {selectedToppings.length > 0 ? (
                  <span className="text-[11px] font-black bg-amber-400/20 text-amber-900 border border-amber-300/80 px-2.5 py-0.5 rounded-full">
                    تم اختيار {selectedToppings.length}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                    اختياري
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOPPINGS.map((topping) => {
                  const isChecked = selectedToppings.includes(topping.id);
                  return (
                    <div
                      key={topping.id}
                      onClick={() => toggleTopping(topping.id)}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none active:scale-[0.98] ${
                        isChecked
                          ? 'border-amber-400 bg-amber-50/80 shadow-xs ring-1 ring-amber-300'
                          : 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/60 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Topping Visual Thumbnail */}
                        <div className={`w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center p-1 border transition-all shrink-0 ${
                          isChecked 
                            ? 'bg-amber-100/90 border-amber-300' 
                            : 'bg-slate-50 border-slate-200'
                        }`}>
                          <img 
                            src={topping.icon || '/toppings/melted-cheese-3d.webp'} 
                            alt={topping.name}
                            loading="eager"
                            decoding="async"
                            className="w-full h-full object-cover rounded-lg select-none pointer-events-none" 
                          />
                        </div>

                        <div>
                          <div className="font-black text-xs text-slate-900 leading-tight">{topping.name}</div>
                          <div className="text-xs text-amber-700 font-black mt-0.5">+{topping.price} ج.م</div>
                        </div>
                      </div>

                      {/* Tactile Add / Added Pill Button */}
                      <div className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all shrink-0 ${
                        isChecked 
                          ? 'bg-amber-400 text-slate-950 shadow-xs' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}>
                        {isChecked ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>مضاف</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 text-slate-500 stroke-[2.5]" />
                            <span>إضافة</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3 text-right">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-4.5 h-4.5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-black text-slate-900 mb-0.5">صنف حلو بوصفته الأصلية المتوازنة</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  يُحضر هذا الصنف بالسكر والمكونات الحلوة المخصصة، ولا يقبل الإضافات الحادقة (كالجبنة أو اللحم أو الزيتون) حفاظاً على النكهة السكرية الأصيلة.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Sticky Action Bar: Quantity + Add to Cart Button */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center gap-3 relative z-20">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-1.5 shrink-0">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-xl bg-white text-slate-800 flex items-center justify-center shadow-xs disabled:opacity-40 transition-transform active:scale-90 cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-7 text-center font-black text-sm text-slate-900">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-8 h-8 rounded-xl bg-white text-slate-800 flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add To Cart Button */}
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className="flex-1 h-12 rounded-2xl bg-[#0D1E3A] hover:bg-[#1A3258] active:scale-[0.98] text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-slate-900/20 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <span>إضافة للسلة ({currentPrice * quantity} ج.م)</span>
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
}
