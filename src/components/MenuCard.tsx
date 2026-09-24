import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Star, Plus, Utensils } from 'lucide-react';
import type { MenuItem } from '../types';

export interface MenuCardProps {
  key?: React.Key;
  item: MenuItem;
  index?: number;
  onClick: () => void;
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSpinning?: boolean;
}

export default function MenuCard({ item, index = 0, onClick, onAdd, isSpinning = false }: MenuCardProps) {
  // Compute optimized thumbnail path (WebP)
  const initialThumb = item.image.startsWith('/items/')
    ? item.image.replace('/items/', '/thumbs/')
    : item.image;

  const [imgSrc, setImgSrc] = useState(initialThumb);
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // Desktop vs Mobile hover detection to maximize mobile 120fps performance
  const [canHover, setCanHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    }
  }, []);

  useEffect(() => {
    setImgSrc(item.image.startsWith('/items/') ? item.image.replace('/items/', '/thumbs/') : item.image);
    setHasError(false);
    setAttempt(0);
  }, [item.image]);

  const handleImageError = () => {
    if (attempt === 0) {
      setAttempt(1);
      setImgSrc(item.image); // Try full item image
    } else if (attempt === 1) {
      setAttempt(2);
      setImgSrc(item.image.replace(/\.webp$/, '.jpg')); // Try jpg
    } else if (attempt === 2) {
      setAttempt(3);
      setImgSrc(item.image.replace('/items/', '/thumbs/').replace(/\.webp$/, '.jpg')); // Try thumb jpg
    } else {
      setHasError(true);
    }
  };

  // rAF throttled mouse handler for silky smooth 60fps on desktop with 0 CPU stall
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      setTilt({
        rotateX: -normY * 8,
        rotateY: normX * 8,
        glareX: Math.round((x / rect.width) * 100),
        glareY: Math.round((y / rect.height) * 100),
      });
    });
  }, [canHover]);

  const handleMouseEnter = () => {
    if (!canHover) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const originalPrice = item.discountPercent 
    ? Math.round(item.defaultPrice / (1 - item.discountPercent / 100))
    : null;

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseMove={canHover ? handleMouseMove : undefined}
      onMouseEnter={canHover ? handleMouseEnter : undefined}
      onMouseLeave={canHover ? handleMouseLeave : undefined}
      style={canHover ? {
        perspective: '1000px',
      } : undefined}
      className="menu-card menu-card-wrapper w-full select-none cursor-pointer transform-gpu"
      dir="rtl"
    >
      <div
        style={canHover ? {
          transform: isHovered 
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
        } : undefined}
        className={`bg-white rounded-[26px] p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden border transition-all duration-200 active:scale-[0.98] ${
          isHovered 
            ? 'shadow-[0_16px_32px_-6px_rgba(13,30,58,0.18)] border-amber-300' 
            : 'shadow-[0_4px_16px_rgba(13,30,58,0.06)] border-slate-100/90 hover:border-slate-200'
        }`}
      >
        {/* Dynamic Specular Light Sheen (Desktop Only) */}
        {canHover && isHovered && (
          <div
            style={{
              background: `radial-gradient(circle 180px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)`,
            }}
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
          />
        )}

        {/* Top Badges: Discount & Rating */}
        <div className="flex justify-between items-center mb-1 z-10">
          {item.discountPercent ? (
            <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
              -{item.discountPercent}%
            </span>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80">
            <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
            <span className="text-[11px] font-black text-amber-900">{item.rating}</span>
          </div>
        </div>

        {/* Food Plate Container */}
        <div className="relative w-full aspect-square my-1.5 flex items-center justify-center">
          {/* Circular Plate background */}
          <div className="absolute inset-1 rounded-full bg-slate-100/90 -z-0" />

          {hasError ? (
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-[#0D1E3A] z-10">
              <Utensils className="w-7 h-7 opacity-40" />
            </div>
          ) : (
            <div 
              className={`relative w-[92%] h-[92%] flex items-center justify-center z-10 ${
                isSpinning ? 'animate-spin' : ''
              }`}
            >
              <img 
                src={imgSrc} 
                alt={item.name}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-full h-full object-cover rounded-full shadow-[0_6px_14px_rgba(13,30,58,0.12)] pointer-events-none select-none"
              />
            </div>
          )}
        </div>

        {/* Dish Title & Description */}
        <div className="my-1.5 z-10">
          <h3 className="font-black text-slate-900 text-xs sm:text-sm line-clamp-1 leading-snug">
            {item.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-1 font-medium mt-0.5">
            {item.description}
          </p>
        </div>

        {/* Bottom Price & Add to Cart Button */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100/80 z-10">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-[#0D1E3A]">
                {item.defaultPrice}
              </span>
              <span className="text-[10px] text-slate-500 font-bold">ج.م</span>
            </div>
            {originalPrice && (
              <span className="text-[9px] text-slate-400 line-through -mt-1 font-medium">
                {originalPrice} ج.م
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(e);
            }}
            aria-label={`إضافة ${item.name} إلى السلة`}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0D1E3A] hover:bg-[#1A3258] active:scale-90 text-white flex items-center justify-center shadow-md shadow-slate-950/15 transition-transform cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
