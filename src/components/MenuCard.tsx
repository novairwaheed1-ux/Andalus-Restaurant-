import React, { useState, useRef, useEffect } from 'react';
import { Star, Plus, Utensils } from 'lucide-react';
import type { MenuItem } from '../types';
import { motion } from 'motion/react';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
  onClick: () => void;
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSpinning?: boolean;
}

function MenuCardComponent({ item, index = 0, onClick, onAdd, isSpinning = false }: MenuCardProps) {
  // Compute optimized thumbnail path
  const thumbWebp = item.image.startsWith('/items/')
    ? item.image.replace('/items/', '/thumbs/')
    : item.image;

  const [imgSrc, setImgSrc] = useState(thumbWebp);
  const [errorStep, setErrorStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync if item changes
  useEffect(() => {
    setImgSrc(thumbWebp);
    setErrorStep(0);
    setIsLoaded(false);
  }, [thumbWebp]);

  // Check if image is already cached
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [imgSrc]);

  const handleImageError = () => {
    if (errorStep === 0) {
      // Step 1: try thumbnail JPG fallback
      setErrorStep(1);
      setImgSrc(thumbWebp.replace(/\.webp$/, '.jpg'));
    } else if (errorStep === 1) {
      // Step 2: try original full webp
      setErrorStep(2);
      setImgSrc(item.image);
    } else if (errorStep === 2) {
      // Step 3: try original full JPG
      setErrorStep(3);
      setImgSrc(item.image.replace(/\.webp$/, '.jpg'));
    } else {
      // Step 4: mark error
      setErrorStep(4);
      setIsLoaded(true);
    }
  };

  const originalPrice = item.discountPercent 
    ? Math.round(item.defaultPrice / (1 - item.discountPercent / 100))
    : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.22,
        delay: Math.min(index * 0.02, 0.15)
      }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="menu-card bg-white rounded-[26px] p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer shadow-[0_4px_20px_rgba(13,30,58,0.06)] hover:shadow-[0_12px_28px_rgba(13,30,58,0.12)] border border-slate-100 hover:border-slate-300 transition-all duration-200 relative group select-none overflow-hidden"
      dir="rtl"
    >
      {/* Top Badges: Discount & Rating */}
      <div className="flex justify-between items-center mb-1.5 z-10">
        {item.discountPercent ? (
          <span className="bg-rose-500 text-white text-[10.5px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
            -{item.discountPercent}%
          </span>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-1 bg-amber-50/90 px-2 py-0.5 rounded-full border border-amber-200/70">
          <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
          <span className="text-[11px] font-black text-amber-900">{item.rating}</span>
        </div>
      </div>

      {/* Food Plate Container with Non-Traditional 3D Gyro/Spin effect */}
      <div className="relative w-full aspect-square my-1.5 flex items-center justify-center">
        {/* Subtle circular plate background */}
        <div className="absolute inset-1.5 rounded-full bg-slate-100/80 -z-0 group-hover:scale-105 transition-transform duration-300" />

        {/* Shimmer loading skeleton if not yet loaded */}
        {!isLoaded && errorStep < 4 && (
          <div className="absolute inset-3 rounded-full bg-slate-200/80 animate-pulse z-0" />
        )}

        {errorStep >= 4 ? (
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-[#0D1E3A] z-10">
            <Utensils className="w-7 h-7 opacity-50" />
          </div>
        ) : (
          <motion.div 
            className="relative w-[92%] h-[92%] flex items-center justify-center will-change-transform z-10"
            animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
            transition={isSpinning ? { repeat: Infinity, duration: 0.45, ease: "linear" } : { duration: 0.2 }}
          >
            <img 
              ref={imgRef}
              src={imgSrc} 
              alt={item.name} 
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
              onLoad={() => setIsLoaded(true)}
              onError={handleImageError}
              className={`w-full h-full object-cover rounded-full drop-shadow-[0_8px_18px_rgba(13,30,58,0.16)] transition-all duration-300 group-hover:scale-105 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
          </motion.div>
        )}
      </div>

      {/* Title & Description with Clear, Crisp Arabic Typography (Zero Overlap) */}
      <div className="text-center my-2 flex flex-col justify-center gap-1">
        <h3 className="font-black text-slate-900 text-[14.5px] sm:text-[15.5px] leading-snug line-clamp-1 tracking-tight">
          {item.name}
        </h3>
        <p className="text-slate-500 text-[11.5px] font-medium leading-normal line-clamp-1 min-h-[18px]">
          {item.description || 'طبق طازج ولذيذ'}
        </p>
      </div>

      {/* Price & Add Button */}
      <div className="flex items-center justify-between mt-1 pt-2.5 border-t border-slate-100">
        <div className="flex items-baseline gap-1">
          <span className="font-black text-[17px] text-[#0D1E3A] tracking-tight">
            {item.defaultPrice} <span className="text-[10.5px] font-bold text-slate-600">ج.م</span>
          </span>
          {originalPrice && (
            <span className="text-[11.5px] text-slate-400 line-through font-medium">
              {originalPrice}
            </span>
          )}
        </div>
        <button 
          className="w-8.5 h-8.5 rounded-full bg-[#0D1E3A] hover:bg-[#1A3258] flex items-center justify-center text-white shadow-md shadow-slate-950/20 active:scale-90 transition-transform cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(e);
          }}
          title="إضافة سريعة للسلة"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

const MenuCard = React.memo(MenuCardComponent);
export default MenuCard;
