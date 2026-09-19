import React from 'react';
import { Star, Plus } from 'lucide-react';
import type { MenuItem } from '../types';
import { motion } from 'framer-motion';

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSpinning?: boolean;
  key?: string | number;
}

export default function MenuCard({ item, onClick, onAdd, isSpinning = false }: MenuCardProps) {
  const originalPrice = item.discountPercent 
    ? Math.round(item.defaultPrice / (1 - item.discountPercent / 100))
    : null;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[28px] p-4 flex flex-col cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative group active:scale-[0.98]"
      dir="rtl"
    >
      {/* Top Badges: Discount & Rating */}
      <div className="flex justify-between items-center mb-2 z-10">
        {item.discountPercent ? (
          <div className="bg-[#1A1A1A] text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-sm">
            -{item.discountPercent}%
          </div>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-[#FF5B2E] fill-[#FF5B2E]" />
          <span className="text-[12px] font-black text-slate-800">{item.rating}</span>
        </div>
      </div>

      {/* Floating Pizza Image (Spins on click) */}
      <div className="relative w-full aspect-square my-2 flex items-center justify-center">
        <motion.img 
          referrerPolicy="no-referrer" 
          src={item.image} 
          alt={item.name} 
          decoding="async"
          loading="lazy"
          className="w-[90%] h-[90%] object-cover rounded-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.16)] will-change-transform"
          animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
          transition={isSpinning ? { repeat: Infinity, duration: 0.38, ease: "linear" } : { duration: 0.2 }}
        />
      </div>

      {/* Title and Description */}
      <div className="text-center mb-3 flex-grow">
        <h3 className="font-black text-slate-900 text-[15px] mb-1 leading-snug line-clamp-1">{item.name}</h3>
        <p className="text-slate-400 text-xs font-medium line-clamp-1">{item.description}</p>
      </div>

      {/* Price & Add Button */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-black text-lg text-slate-900 tracking-tight">
            {item.defaultPrice} <span className="text-xs font-bold text-slate-600">ج.م</span>
          </span>
          {originalPrice && (
            <span className="text-xs text-slate-400 line-through font-semibold">
              {originalPrice}
            </span>
          )}
        </div>
        <button 
          className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:bg-[#FF5B2E] flex items-center justify-center text-white shadow-md active:scale-90 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(e);
          }}
          title="إضافة سريعة"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
