import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils } from 'lucide-react';

interface CinematicIntroSplashProps {
  onComplete: () => void;
}

export default function CinematicIntroSplash({ onComplete }: CinematicIntroSplashProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Elegant timing: display title smoothly then start the soft luxury dissolve
    const timer1 = setTimeout(() => {
      setIsExiting(true);
    }, 1700);

    // Completely unmount and hand over to menu
    const timer2 = setTimeout(() => {
      setIsFinished(true);
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsFinished(true);
      onComplete();
    }, 400);
  };

  if (isFinished) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-splash-root"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.03 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.85, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        onClick={handleSkip}
        className="fixed inset-0 z-[500] bg-[#080B11] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto cursor-pointer"
        dir="ltr"
      >
        {/* Soft, warm, luxurious ambient radial glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ 
            opacity: isExiting ? 0 : 0.6,
            scale: isExiting ? 1.3 : 1 
          }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.18)_0%,_rgba(180,83,9,0.08)_40%,_transparent_70%)] pointer-events-none" 
        />

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-4xl text-center">
          
          {/* Top Word: ANDALUS - No flame icon, pure luxury typography */}
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ 
              opacity: isExiting ? 0 : 1, 
              y: isExiting ? -24 : 0, 
              scale: isExiting ? 1.02 : 1 
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[0.24em] text-white font-sans drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
              Andalus
            </h1>
          </motion.div>

          {/* Central Luxury Gold Divider Line - Placed strictly between the two words */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: isExiting ? 1.5 : 1, 
              opacity: isExiting ? 0 : 1 
            }}
            transition={{ 
              duration: 0.8, 
              delay: isExiting ? 0 : 0.25, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="w-48 sm:w-72 md:w-92 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent my-3 sm:my-5 relative"
          >
            {/* Center diamond accent */}
            <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-2.5 h-2.5 bg-amber-300 rotate-45 shadow-[0_0_14px_#F59E0B]" />
          </motion.div>

          {/* Bottom Word: RESTAURANT */}
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ 
              opacity: isExiting ? 0 : 1, 
              y: isExiting ? 20 : 0, 
              scale: isExiting ? 1.02 : 1 
            }}
            transition={{ 
              duration: 0.9, 
              delay: isExiting ? 0 : 0.1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.26em] text-amber-200/95 font-sans drop-shadow-[0_8px_24px_rgba(217,119,6,0.35)]">
              Restaurant
            </h2>
          </motion.div>

          {/* Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ 
              opacity: isExiting ? 0 : 1, 
              y: isExiting ? 16 : 0 
            }}
            transition={{ duration: 0.7, delay: isExiting ? 0 : 0.35 }}
            className="mt-6 flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
          >
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            <span>أشهى المأكولات الطازجة • ديروط</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </motion.div>

        </div>

        {/* Soft tap-to-enter hint / skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 0.7 }}
          whileHover={{ opacity: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="absolute bottom-6 px-4 py-1.5 rounded-full text-[11px] font-bold text-slate-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/15 transition-all cursor-pointer z-20"
        >
          تخطي ودخول القائمة فوراً
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
