import React from 'react';
import { motion } from "motion/react";

interface MotorcycleRiderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'top-down' | 'side-profile';
  animated?: boolean;
}

export default function MotorcycleRider({ 
  size = 'md', 
  variant = 'top-down',
  animated = true 
}: MotorcycleRiderProps) {
  const dimensionClass = {
    sm: 'w-24 h-32',
    md: 'w-40 h-52',
    lg: 'w-52 h-64',
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensionClass}`}>
      {/* Moving road surface with dashed white lines matching the video frame 00:00 - 00:03 */}
      <div className="absolute inset-0 bg-[#24292E] rounded-3xl overflow-hidden shadow-inner border border-slate-700/50">
        {/* Road texture and side road curbs */}
        <div className="absolute inset-y-0 left-0 w-2.5 bg-yellow-500/80 border-r border-yellow-600" />
        <div className="absolute inset-y-0 right-0 w-2.5 bg-yellow-500/80 border-l border-yellow-600" />

        {/* Animated Dashed Road Center Line */}
        <motion.div
          animate={animated ? { y: [0, 48] } : {}}
          transition={{
            repeat: Infinity,
            duration: 0.45,
            ease: 'linear',
          }}
          className="absolute inset-x-0 top-[-48px] bottom-[-48px] flex flex-col items-center justify-around pointer-events-none"
        >
          <div className="w-2.5 h-8 bg-white/90 rounded-full shadow-sm" />
          <div className="w-2.5 h-8 bg-white/90 rounded-full shadow-sm" />
          <div className="w-2.5 h-8 bg-white/90 rounded-full shadow-sm" />
          <div className="w-2.5 h-8 bg-white/90 rounded-full shadow-sm" />
          <div className="w-2.5 h-8 bg-white/90 rounded-full shadow-sm" />
        </motion.div>

        {/* Wind motion streaks */}
        <motion.div 
          animate={animated ? { opacity: [0.2, 0.7, 0.2], y: [-10, 60] } : {}}
          transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
          className="absolute left-6 top-0 w-0.5 h-10 bg-white/40 rounded-full"
        />
        <motion.div 
          animate={animated ? { opacity: [0.3, 0.8, 0.3], y: [-20, 70] } : {}}
          transition={{ repeat: Infinity, duration: 0.5, delay: 0.2, ease: 'linear' }}
          className="absolute right-7 top-4 w-0.5 h-12 bg-white/40 rounded-full"
        />
      </div>

      {/* Scooter Rider Vehicle - Top-Down authentic perspective from video Frame 00:00 - 00:03 */}
      <motion.div
        animate={animated ? {
          y: [-2, 2, -2],
          x: [-1, 1, -1],
          rotate: [-0.6, 0.6, -0.6],
        } : {}}
        transition={{
          repeat: Infinity,
          duration: 0.35,
          ease: 'easeInOut',
        }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Headlight beam on road */}
        <div className="absolute -top-10 w-20 h-16 bg-gradient-to-t from-yellow-300/40 via-yellow-100/20 to-transparent blur-md rounded-t-full pointer-events-none" />

        {/* Front Wheel & Mudguard */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-5 h-10 bg-slate-900 rounded-full border-2 border-slate-700 shadow-lg flex items-center justify-center">
            <div className="w-1.5 h-6 bg-slate-500/50 rounded-full" />
          </div>
          {/* Red Mudguard */}
          <div className="w-7 h-4 bg-[#FF3B30] -mt-3 rounded-t-full border border-red-700 shadow-sm" />
        </div>

        {/* Handlebars with Side Mirrors and Headlight */}
        <div className="relative z-20 flex items-center justify-center -mt-2">
          {/* Left Mirror */}
          <div className="w-3 h-2 bg-slate-800 rounded-full border border-slate-600 -rotate-45 -mr-1" />
          
          {/* Left Handlebar */}
          <div className="w-8 h-2 bg-slate-800 rounded-l-full border-t border-slate-600" />
          
          {/* Headlamp center */}
          <div className="w-6 h-5 bg-[#FF3B30] rounded-full border border-red-600 flex items-center justify-center shadow-md z-30">
            <div className="w-3.5 h-3.5 bg-yellow-200 rounded-full border border-yellow-400 shadow-[0_0_8px_rgba(255,230,0,0.8)]" />
          </div>

          {/* Right Handlebar */}
          <div className="w-8 h-2 bg-slate-800 rounded-r-full border-t border-slate-600" />
          
          {/* Right Mirror */}
          <div className="w-3 h-2 bg-slate-800 rounded-full border border-slate-600 rotate-45 -ml-1" />
        </div>

        {/* Courier Driver (Helmet, Shoulders, Jacket) from top view */}
        <div className="relative z-30 flex flex-col items-center -mt-2">
          {/* Rider Helmet */}
          <div className="relative w-11 h-12 bg-gradient-to-b from-[#FF3B30] to-[#D32F2F] rounded-full shadow-lg border border-red-700 flex flex-col items-center pt-1.5">
            {/* Glossy highlight on helmet */}
            <div className="w-7 h-2 bg-white/40 rounded-full -mb-0.5" />
            
            {/* Visor (Dark shield) */}
            <div className="w-8 h-4 bg-slate-900 rounded-t-lg border-b border-cyan-400/50 shadow-inner flex items-center justify-center">
              <div className="w-6 h-1 bg-cyan-300/60 rounded-full blur-[0.5px]" />
            </div>
          </div>

          {/* Red Rider Jacket & Shoulders */}
          <div className="w-14 h-9 bg-[#E53935] rounded-t-2xl -mt-3.5 border-t border-red-400 shadow-md relative flex justify-between px-1 pt-2">
            {/* Arms holding handlebars */}
            <div className="w-2.5 h-6 bg-[#C62828] rounded-l-md transform -rotate-12 -mt-3" />
            <div className="w-2.5 h-6 bg-[#C62828] rounded-r-md transform rotate-12 -mt-3" />
          </div>
        </div>

        {/* Scooter Body & Seat */}
        <div className="relative z-15 w-12 h-14 bg-[#FF3B30] rounded-b-2xl -mt-3 border-x border-b border-red-700 shadow-xl flex flex-col items-center pt-1">
          {/* Black Scooter Seat */}
          <div className="w-8 h-8 bg-slate-900 rounded-xl border border-slate-700 shadow-inner" />
          
          {/* Rear Delivery Box / Parcel carrier from the video */}
          <div className="w-10 h-7 bg-[#2E3440] rounded-lg border-2 border-slate-600 shadow-md mt-0.5 flex items-center justify-center relative">
            <div className="w-5 h-3 bg-[#FF3B30] rounded-sm flex items-center justify-center text-[7px] font-black text-white">
              P
            </div>
            {/* Taillight */}
            <div className="absolute -bottom-1 w-5 h-1.5 bg-red-500 rounded-full shadow-[0_0_6px_rgba(255,0,0,0.9)]" />
          </div>
        </div>

        {/* Rear Wheel */}
        <div className="w-4 h-6 bg-slate-900 rounded-full -mt-2 z-0 border border-slate-700" />
      </motion.div>
    </div>
  );
}
