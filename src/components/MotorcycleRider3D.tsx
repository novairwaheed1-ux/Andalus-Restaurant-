import React from 'react';
import { motion } from 'framer-motion';

interface MotorcycleRider3DProps {
  progress?: number;
  loadingText?: string;
  onFinished?: () => void;
}

export default function MotorcycleRider3D({
  progress = 100,
  loadingText = "جاري تحميل وتجهيز الموقع...",
}: MotorcycleRider3DProps) {
  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center justify-center select-none py-6">
      
      {/* 3D Perspective Stage Container */}
      <div 
        className="relative w-72 h-72 flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-b from-[#111827] via-[#1E293B] to-[#0F172A] border border-slate-700/60"
        style={{ perspective: '800px' }}
      >
        {/* Ambient Glows */}
        <div className="absolute top-4 w-40 h-40 bg-[#FF3B30]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-6 w-48 h-20 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* 3D Tilted Road Plane */}
        <div 
          className="absolute inset-x-[-20%] bottom-[-10px] h-64 bg-[#181E29] border-t-2 border-slate-600 shadow-2xl overflow-hidden"
          style={{ 
            transform: 'rotateX(55deg) translateZ(0)',
            transformOrigin: 'bottom center',
            borderRadius: '24px 24px 0 0'
          }}
        >
          {/* Side Yellow Road Kerbs */}
          <div className="absolute inset-y-0 left-6 w-3 bg-yellow-400/90 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          <div className="absolute inset-y-0 right-6 w-3 bg-yellow-400/90 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />

          {/* Animated Center Road Lines moving fast towards camera */}
          <motion.div
            animate={{ y: [0, 80] }}
            transition={{ repeat: Infinity, duration: 0.35, ease: 'linear' }}
            className="absolute inset-x-0 top-[-80px] bottom-[-80px] flex flex-col items-center justify-around pointer-events-none"
          >
            <div className="w-3 h-12 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <div className="w-3 h-12 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <div className="w-3 h-12 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <div className="w-3 h-12 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </motion.div>

          {/* Speed wind streaks on road */}
          <motion.div
            animate={{ y: [-40, 180], opacity: [0.1, 0.6, 0.1] }}
            transition={{ repeat: Infinity, duration: 0.45, ease: 'linear' }}
            className="absolute left-14 top-0 w-1 h-14 bg-cyan-300/40 rounded-full blur-[0.5px]"
          />
          <motion.div
            animate={{ y: [-60, 200], opacity: [0.2, 0.7, 0.2] }}
            transition={{ repeat: Infinity, duration: 0.4, delay: 0.15, ease: 'linear' }}
            className="absolute right-14 top-0 w-1 h-16 bg-cyan-300/40 rounded-full blur-[0.5px]"
          />
        </div>

        {/* 3D Scooter Motorcycle with Delivery Guy */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
            x: [-1.5, 1.5, -1.5],
            rotateZ: [-1, 1, -1],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.4,
            ease: 'easeInOut',
          }}
          className="relative z-20 flex flex-col items-center"
          style={{ transform: 'translateY(-10px)' }}
        >
          {/* Headlight beam on road (3D Light Cone) */}
          <div className="absolute -top-16 w-36 h-28 bg-gradient-to-t from-yellow-300/35 via-yellow-200/15 to-transparent blur-md rounded-t-full pointer-events-none" />

          {/* Front Wheel 3D with Rim & Tire Tread */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-7 h-14 bg-slate-950 rounded-full border-2 border-slate-700 shadow-2xl flex items-center justify-center relative overflow-hidden">
              {/* Rotating Rim Spokes effect */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.25, ease: 'linear' }}
                className="w-4 h-9 border border-dashed border-slate-400/60 rounded-full"
              />
            </div>
            {/* Glossy Red Mudguard */}
            <div className="w-10 h-5 bg-gradient-to-b from-[#FF453A] to-[#D70015] -mt-4 rounded-t-full border border-red-700 shadow-md" />
          </div>

          {/* Handlebars with 3D Side Mirrors and Twin Headlamp */}
          <div className="relative z-20 flex items-center justify-center -mt-2">
            {/* Left Mirror */}
            <div className="w-4 h-2.5 bg-slate-800 rounded-full border border-slate-600 -rotate-45 -mr-1 shadow-sm" />
            
            {/* Left Grip */}
            <div className="w-11 h-2.5 bg-gradient-to-r from-slate-900 to-slate-700 rounded-l-full border-t border-slate-500 shadow-sm" />
            
            {/* Headlamp cluster */}
            <div className="w-9 h-7 bg-gradient-to-b from-[#FF3B30] to-[#B71C1C] rounded-xl border border-red-600 flex items-center justify-center shadow-lg z-30">
              <div className="w-5 h-5 bg-yellow-200 rounded-full border border-yellow-400 shadow-[0_0_14px_rgba(255,230,0,0.9)] flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>

            {/* Right Grip */}
            <div className="w-11 h-2.5 bg-gradient-to-l from-slate-900 to-slate-700 rounded-r-full border-t border-slate-500 shadow-sm" />
            
            {/* Right Mirror */}
            <div className="w-4 h-2.5 bg-slate-800 rounded-full border border-slate-600 rotate-45 -ml-1 shadow-sm" />
          </div>

          {/* Delivery Rider (3D Red Helmet + Dark Visor + Red Outfit) */}
          <div className="relative z-30 flex flex-col items-center -mt-2.5">
            {/* Helmet */}
            <div className="relative w-14 h-14 bg-gradient-to-b from-[#FF3B30] via-[#E53935] to-[#B71C1C] rounded-full shadow-2xl border-2 border-red-800 flex flex-col items-center pt-2">
              {/* Gloss highlight */}
              <div className="w-8 h-2.5 bg-white/40 rounded-full -mb-0.5" />
              
              {/* Dark Visor with Cyan Reflection */}
              <div className="w-10 h-5 bg-slate-950 rounded-t-xl border-b-2 border-cyan-400/70 shadow-inner flex items-center justify-center">
                <div className="w-7 h-1.5 bg-cyan-300/80 rounded-full blur-[0.5px]" />
              </div>
            </div>

            {/* Red Courier Jacket & Shoulders */}
            <div className="w-16 h-10 bg-gradient-to-b from-[#FF3B30] to-[#C62828] rounded-t-2xl -mt-4 border-t border-red-400 shadow-xl relative flex justify-between px-1.5 pt-2">
              <div className="w-3 h-7 bg-[#B71C1C] rounded-l-md -rotate-12 -mt-3 shadow-inner" />
              <div className="w-3 h-7 bg-[#B71C1C] rounded-r-md rotate-12 -mt-3 shadow-inner" />
            </div>
          </div>

          {/* Scooter Body & Seat */}
          <div className="relative z-15 w-14 h-16 bg-gradient-to-b from-[#FF3B30] to-[#B71C1C] rounded-b-2xl -mt-4 border-x-2 border-b-2 border-red-800 shadow-2xl flex flex-col items-center pt-1">
            {/* Ergonomic Leather Seat */}
            <div className="w-10 h-9 bg-slate-900 rounded-xl border border-slate-700 shadow-inner" />
            
            {/* 3D Delivery Box / Parcel Case */}
            <div className="w-12 h-9 bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-xl border-2 border-slate-600 shadow-2xl mt-0.5 flex flex-col items-center justify-center relative">
              <div className="w-6 h-4 bg-[#FF3B30] rounded-sm flex items-center justify-center text-[9px] font-black text-white shadow-sm">
                P
              </div>
              {/* LED Taillight */}
              <div className="absolute -bottom-1 w-7 h-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(255,0,0,1)] border border-red-400" />
            </div>
          </div>

          {/* Rear Wheel */}
          <div className="w-5 h-8 bg-slate-950 rounded-full -mt-2 z-0 border border-slate-700 shadow-lg" />
        </motion.div>

        {/* 3D Badge Overlay */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center z-30">
          <div className="bg-slate-900/85 backdrop-blur-md px-3.5 py-1 rounded-full border border-slate-700/80 text-[11px] font-black text-amber-300 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>توصيل ديروط السريع • Parcel</span>
          </div>
        </div>
      </div>

      {/* Loading Bar & Indicator below the 3D Stage */}
      <div className="w-full mt-5 px-4 text-center">
        <div className="flex items-center justify-between text-xs font-black text-slate-300 mb-2">
          <span>{loadingText}</span>
          <span className="text-[#FF5B2E]" dir="ltr">{Math.round(progress)}%</span>
        </div>

        {/* Smooth Animated Progress Track */}
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#FF5B2E] via-[#FF3B30] to-yellow-400 rounded-full shadow-[0_0_8px_rgba(255,91,46,0.6)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <p className="text-[11px] text-slate-400 font-bold mt-2">
          جاري إعداد المتجر وقائمة الوجبات...
        </p>
      </div>
    </div>
  );
}
