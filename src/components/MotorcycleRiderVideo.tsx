import React from 'react';
import { motion } from 'framer-motion';

interface MotorcycleRiderVideoProps {
  progress?: number;
  loadingText?: string;
  size?: 'normal' | 'large' | 'compact';
  fullscreen?: boolean;
}

export default function MotorcycleRiderVideo({
  progress,
  loadingText,
  size = 'normal',
  fullscreen = false,
}: MotorcycleRiderVideoProps) {
  // If compact (e.g. inside the signing-in popup dialog)
  if (size === 'compact') {
    return (
      <div className="relative w-36 h-40 rounded-2xl bg-[#374151] overflow-hidden flex items-center justify-center shadow-inner select-none">
        {/* Moving Road Lines */}
        <motion.div
          animate={{ y: [0, 48] }}
          transition={{ repeat: Infinity, duration: 0.3, ease: 'linear' }}
          className="absolute inset-x-0 top-[-48px] bottom-[-48px] flex flex-col items-center justify-around pointer-events-none"
        >
          <div className="w-1.5 h-7 bg-white/90 rounded-full" />
          <div className="w-1.5 h-7 bg-white/90 rounded-full" />
          <div className="w-1.5 h-7 bg-white/90 rounded-full" />
          <div className="w-1.5 h-7 bg-white/90 rounded-full" />
        </motion.div>

        {/* Scaled-down Motorcycle & Rider */}
        <div className="scale-75 transform">
          <motion.div
            animate={{
              y: [-1.5, 1.5, -1.5],
              x: [-0.8, 0.8, -0.8],
            }}
            transition={{ repeat: Infinity, duration: 0.25, ease: 'easeInOut' }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Front Wheel */}
            <div className="w-4 h-8 bg-[#111827] rounded-full border border-slate-600 shadow-md" />
            <div className="w-6 h-3 bg-[#E53935] -mt-2.5 rounded-t-full" />

            {/* Handlebars & Headlight */}
            <div className="relative z-20 flex items-center justify-center -mt-1.5">
              <div className="w-8 h-1.5 bg-slate-800 rounded-full" />
              <div className="absolute w-5 h-4 bg-[#E53935] rounded-md flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-[0_0_8px_rgba(255,235,59,1)]" />
              </div>
            </div>

            {/* Helmet & Courier */}
            <div className="relative z-30 flex flex-col items-center -mt-1.5">
              <div className="w-9 h-10 bg-gradient-to-b from-[#FF3B30] to-[#C62828] rounded-full border border-red-800 flex flex-col items-center pt-1 shadow-md">
                <div className="w-5 h-1.5 bg-white/40 rounded-full" />
                <div className="w-7 h-3 bg-[#0F172A] rounded-t-lg border-b border-cyan-400 mt-0.5" />
              </div>
              <div className="w-12 h-6 bg-gradient-to-b from-[#E53935] to-[#B71C1C] rounded-t-xl -mt-2" />
            </div>

            {/* Chassis & Box */}
            <div className="relative z-15 w-10 h-10 bg-[#E53935] rounded-b-xl -mt-2 flex flex-col items-center pt-0.5">
              <div className="w-7 h-5 bg-[#111827] rounded-md" />
              <div className="w-9 h-6 bg-[#1E293B] rounded-lg mt-0.5 flex items-center justify-center">
                <span className="text-[7px] font-black text-white bg-[#E53935] px-1 rounded-xs">P</span>
              </div>
            </div>
            <div className="w-3.5 h-5 bg-[#111827] rounded-full -mt-1" />
          </motion.div>
        </div>
      </div>
    );
  }

  // Full-Screen Edge-to-Edge Experience (NO phone mockup, NO phone border, NO notch)
  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-between select-none overflow-hidden bg-[#1E293B]">
      
      {/* Dynamic Animated Highway spanning edge to edge */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* Asphalt Highway Road Strip - Expands to fill screen nicely */}
        <div className="relative w-full max-w-2xl h-full bg-[#374151] shadow-2xl flex flex-col items-center overflow-hidden">
          
          {/* Left Road Curb with Hazard Diagonal Stripes */}
          <div 
            className="absolute inset-y-0 left-0 w-4 sm:w-6 shadow-md z-10"
            style={{
              background: 'repeating-linear-gradient(45deg, #D97706, #D97706 14px, #1F2937 14px, #1F2937 28px)'
            }}
          />

          {/* Right Road Curb with Hazard Diagonal Stripes */}
          <div 
            className="absolute inset-y-0 right-0 w-4 sm:w-6 shadow-md z-10"
            style={{
              background: 'repeating-linear-gradient(-45deg, #D97706, #D97706 14px, #1F2937 14px, #1F2937 28px)'
            }}
          />

          {/* Continuous Rapid Moving Center Dashed Lines (Double Highway Lanes) */}
          <motion.div
            animate={{ y: [0, 100] }}
            transition={{ repeat: Infinity, duration: 0.28, ease: 'linear' }}
            className="absolute inset-x-0 top-[-100px] bottom-[-100px] flex flex-col items-center justify-around pointer-events-none"
          >
            <div className="flex gap-4">
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </div>
            <div className="flex gap-4">
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </div>
            <div className="flex gap-4">
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </div>
            <div className="flex gap-4">
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </div>
            <div className="flex gap-4">
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <div className="w-2.5 sm:w-3 h-14 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </div>
          </motion.div>

          {/* High-Speed Wind Streaks */}
          <motion.div
            animate={{ y: [-50, 300], opacity: [0.1, 0.7, 0.1] }}
            transition={{ repeat: Infinity, duration: 0.38, ease: 'linear' }}
            className="absolute left-10 sm:left-20 top-0 w-1 h-28 bg-white/40 rounded-full blur-[0.5px]"
          />
          <motion.div
            animate={{ y: [-80, 320], opacity: [0.2, 0.8, 0.2] }}
            transition={{ repeat: Infinity, duration: 0.35, delay: 0.1, ease: 'linear' }}
            className="absolute right-10 sm:right-20 top-0 w-1 h-32 bg-white/40 rounded-full blur-[0.5px]"
          />
          <motion.div
            animate={{ y: [-30, 260], opacity: [0.1, 0.5, 0.1] }}
            transition={{ repeat: Infinity, duration: 0.42, delay: 0.2, ease: 'linear' }}
            className="absolute left-1/4 top-0 w-0.5 h-20 bg-yellow-200/40 rounded-full blur-[0.5px]"
          />
          <motion.div
            animate={{ y: [-40, 280], opacity: [0.1, 0.5, 0.1] }}
            transition={{ repeat: Infinity, duration: 0.4, delay: 0.25, ease: 'linear' }}
            className="absolute right-1/4 top-0 w-0.5 h-24 bg-yellow-200/40 rounded-full blur-[0.5px]"
          />

          {/* 
            Huge Center Delivery Motorcycle & Rider filling the screen!
            Scaled up prominently for maximum cinematic presence
          */}
          <div className="relative z-20 my-auto flex flex-col items-center scale-[1.5] sm:scale-[1.85] md:scale-[2.1] transition-transform">
            <motion.div
              animate={{
                y: [-3, 3, -3],
                x: [-1.2, 1.2, -1.2],
                rotate: [-0.9, 0.9, -0.9],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.25,
                ease: 'easeInOut',
              }}
              className="relative flex flex-col items-center"
            >
              {/* Powerful Headlight Beam cast on the road */}
              <div className="absolute -top-28 w-44 h-36 bg-gradient-to-t from-yellow-200/60 via-yellow-100/25 to-transparent blur-lg rounded-t-full pointer-events-none" />

              {/* Front Wheel & Tire */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-5 h-12 bg-[#111827] rounded-full border-2 border-slate-600 shadow-xl flex items-center justify-center">
                  <div className="w-1.5 h-8 bg-slate-400/70 rounded-full" />
                </div>
                {/* Front glossy red fender */}
                <div className="w-9 h-4 bg-[#E53935] -mt-3.5 rounded-t-full border border-red-700 shadow-sm" />
              </div>

              {/* Handlebars with Side Mirrors & High-Power Headlight */}
              <div className="relative z-20 flex items-center justify-center -mt-2">
                {/* Left Side Mirror */}
                <div className="w-4 h-2.5 bg-slate-900 rounded-full border border-slate-700 -rotate-45 -mr-1.5 shadow-xs" />
                
                {/* Left Handlebar */}
                <div className="w-12 h-2.5 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 rounded-l-full border-t border-slate-500 shadow-xs" />
                
                {/* Center Headlight Cluster */}
                <div className="w-8 h-7 bg-[#E53935] rounded-xl border border-red-700 flex items-center justify-center shadow-md z-30">
                  <div className="w-5 h-5 bg-yellow-200 rounded-full border border-yellow-400 shadow-[0_0_16px_rgba(255,235,59,1)] flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>

                {/* Right Handlebar */}
                <div className="w-12 h-2.5 bg-gradient-to-l from-slate-900 via-slate-700 to-slate-800 rounded-r-full border-t border-slate-500 shadow-xs" />
                
                {/* Right Side Mirror */}
                <div className="w-4 h-2.5 bg-slate-900 rounded-full border border-slate-700 rotate-45 -ml-1.5 shadow-xs" />
              </div>

              {/* Courier Rider with Red Helmet and Visor */}
              <div className="relative z-30 flex flex-col items-center -mt-2">
                {/* Glossy Red Helmet */}
                <div className="relative w-13 h-14 bg-gradient-to-b from-[#FF3B30] to-[#C62828] rounded-full shadow-2xl border-2 border-red-800 flex flex-col items-center pt-1.5">
                  <div className="w-8 h-2 bg-white/50 rounded-full -mb-0.5" />
                  
                  {/* Black Visor with Cyan Sheen */}
                  <div className="w-10 h-5 bg-[#0F172A] rounded-t-xl border-b-2 border-cyan-400/80 shadow-inner flex items-center justify-center">
                    <div className="w-7 h-1.5 bg-cyan-300/80 rounded-full blur-[0.5px]" />
                  </div>
                </div>

                {/* Red Courier Jacket with Shoulders */}
                <div className="w-16 h-10 bg-gradient-to-b from-[#E53935] to-[#B71C1C] rounded-t-2xl -mt-4 border-t border-red-400 shadow-lg relative flex justify-between px-2 pt-2">
                  <div className="w-3.5 h-6 bg-[#B71C1C] rounded-l-md transform -rotate-12 -mt-3 shadow-inner" />
                  <div className="w-3.5 h-6 bg-[#B71C1C] rounded-r-md transform rotate-12 -mt-3 shadow-inner" />
                </div>
              </div>

              {/* Scooter Chassis & Leather Seat */}
              <div className="relative z-15 w-14 h-15 bg-gradient-to-b from-[#E53935] to-[#B71C1C] rounded-b-2xl -mt-3 border-x-2 border-b-2 border-red-800 shadow-xl flex flex-col items-center pt-1">
                {/* Seat */}
                <div className="w-10 h-8 bg-[#111827] rounded-xl border border-slate-700 shadow-inner" />
                
                {/* Rear Parcel Delivery Box */}
                <div className="w-12 h-9 bg-[#1E293B] rounded-xl border-2 border-slate-600 shadow-xl mt-0.5 flex flex-col items-center justify-center relative">
                  <div className="w-7 h-4 bg-[#E53935] rounded-xs flex items-center justify-center text-[9px] font-black text-white shadow-xs">
                    P
                  </div>
                  {/* Glowing Red Taillight */}
                  <div className="absolute -bottom-1.5 w-8 h-2 bg-red-600 rounded-full shadow-[0_0_12px_rgba(255,0,0,1)]" />
                </div>
              </div>

              {/* Rear Wheel with Tread */}
              <div className="w-5 h-8 bg-[#111827] rounded-full -mt-2 z-0 border border-slate-700 shadow-md" />
              
              {/* Exhaust Smoke / Dust Puffs animating behind */}
              <motion.div
                animate={{
                  scale: [0.6, 1.4, 0],
                  y: [0, 16, 24],
                  opacity: [0.7, 0.3, 0],
                }}
                transition={{ repeat: Infinity, duration: 0.3, ease: 'easeOut' }}
                className="absolute -bottom-6 w-3 h-3 bg-slate-300/40 rounded-full blur-[1px] pointer-events-none"
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating Top Header Banner */}
      <header className="relative z-30 pt-8 sm:pt-10 flex flex-col items-center text-center px-4 pointer-events-none">
        <div className="inline-flex items-center gap-3 bg-slate-900/85 backdrop-blur-xl border border-slate-700/70 px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-black shadow-2xl">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span>خدمة دليفري ديروط السريعة 🛵</span>
          <span className="bg-[#E53935] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">Parcel</span>
        </div>
      </header>

      {/* Floating Bottom Loading Bar Container */}
      <footer className="relative z-30 pb-10 sm:pb-12 px-6 w-full max-w-lg mx-auto flex flex-col items-center pointer-events-none">
        {typeof progress === 'number' && (
          <div className="w-full bg-slate-900/90 backdrop-blur-xl p-5 rounded-3xl border border-slate-700/70 shadow-2xl text-center">
            <div className="flex items-center justify-between text-xs sm:text-sm font-black text-slate-100 mb-2.5">
              <span>{loadingText || "جاري فتح بوابة تسجيل الدخول..."}</span>
              <span className="text-[#FF5B2E] font-black text-base tracking-wider" dir="ltr">
                {Math.round(progress)}%
              </span>
            </div>
            
            {/* High-Visibility Progress Track */}
            <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700 shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#FF5B2E] via-[#FF3B30] to-[#E53935] rounded-full shadow-[0_0_14px_rgba(255,91,46,0.9)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <p className="text-[11px] text-slate-400 font-bold mt-2.5">
              ديروط أونلاين • أسرع دليفري وأشهى بيتزا ساخنة من الفرن
            </p>
          </div>
        )}
      </footer>

    </div>
  );
}
