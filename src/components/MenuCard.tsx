import React from 'react';
import { Star, Plus } from 'lucide-react';
import type { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  key?: string | number;
}

export default function MenuCard({ item, onClick, onAdd }: MenuCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[32px] p-4 flex flex-col cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 relative group"
      dir="rtl"
    >
      <div className="flex justify-between items-start mb-2 z-10">
        {item.discountPercent ? (
          <div className="bg-[#1A1A1A] text-white text-[10px] font-bold px-2 py-1 rounded-full">
            خصم {item.discountPercent}%
          </div>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-1 px-1">
          <Star className="w-3.5 h-3.5 text-[#FF5B2E] fill-[#FF5B2E]" />
          <span className="text-[12px] font-bold text-slate-800">{item.rating}</span>
        </div>
      </div>

      <div className="relative w-full aspect-square mb-4 flex items-center justify-center">
        <img referrerPolicy="no-referrer" 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ clipPath: 'circle(48% at 50% 50%)' }}
        />
      </div>

      <div className="text-center mb-4 flex-grow">
        <h3 className="font-bold text-slate-900 text-[15px] mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-slate-400 text-xs line-clamp-1">{item.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto px-1">
        <span className="font-bold text-lg text-slate-900">{item.defaultPrice} <span className="text-sm">ج.م</span></span>
        <button 
          className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(e);
          }}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
