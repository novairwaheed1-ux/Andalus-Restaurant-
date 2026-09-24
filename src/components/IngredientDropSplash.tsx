import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface SplashTrigger {
  id: string;
  x: number;
  y: number;
}

interface Particle {
  id: number;
  type: 'mozzarella' | 'basil' | 'olive' | 'crumb';
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotate: number;
  rotateDelta: number;
  scale: number;
  delay: number;
  duration: number;
}

interface IngredientDropSplashProps {
  splashTriggers: SplashTrigger[];
  onComplete: (id: string) => void;
}

export default function IngredientDropSplash({ splashTriggers, onComplete }: IngredientDropSplashProps) {
  if (splashTriggers.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
      <AnimatePresence>
        {splashTriggers.map((trigger) => (
          <SingleSplashBurst
            key={trigger.id}
            trigger={trigger}
            onDone={() => onComplete(trigger.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

const SingleSplashBurst: React.FC<{
  trigger: SplashTrigger;
  onDone: () => void;
}> = ({ trigger, onDone }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // 5 curated, hyper-performant high-contrast ingredient particles
    const types: ('mozzarella' | 'basil' | 'olive' | 'crumb')[] = [
      'mozzarella',
      'basil',
      'olive',
      'mozzarella',
      'crumb'
    ];

    const generated: Particle[] = types.map((type, index) => {
      const angle = (index / types.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const distance = 45 + Math.random() * 50;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance + 35; // natural gravity curve

      return {
        id: index,
        type,
        x: 0,
        y: 0,
        targetX,
        targetY,
        rotate: Math.random() * 360,
        rotateDelta: (Math.random() - 0.5) * 360,
        scale: 0.8 + Math.random() * 0.3,
        delay: index * 0.02,
        duration: 0.65,
      };
    });

    setParticles(generated);

    const timer = setTimeout(() => {
      onDone();
    }, 750);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'absolute',
        left: trigger.x,
        top: trigger.y,
      }}
      className="pointer-events-none transform-gpu"
    >
      {/* Central Micro Flash */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0.7 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute -top-7 -left-7 w-14 h-14 rounded-full bg-amber-400/25 pointer-events-none"
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: 0,
            y: 0,
            scale: 0.2,
            rotate: p.rotate,
            opacity: 1,
          }}
          animate={{
            x: p.targetX,
            y: [0, p.targetY * 0.35 - 18, p.targetY],
            scale: [0.3, p.scale, p.scale * 0.6],
            rotate: p.rotate + p.rotateDelta,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.16, 0.85, 0.35, 1],
          }}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
        >
          {/* 1. Mozzarella Droplet */}
          {p.type === 'mozzarella' && (
            <div className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
                <path
                  d="M12 2C8 7 4 11 4 16a8 8 0 0016 0c0-5-4-9-8-14z"
                  fill="#FDE047"
                  stroke="#CA8A04"
                  strokeWidth="1.2"
                />
                <circle cx="10" cy="14" r="2.5" fill="#FEF08A" />
              </svg>
            </div>
          )}

          {/* 2. Basil Leaf */}
          {p.type === 'basil' && (
            <div className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
                <path
                  d="M12 2C6 5 3 11 5 18c4 3 11 2 15-3C22 8 17 3 12 2z"
                  fill="#15803D"
                  stroke="#166534"
                  strokeWidth="1.2"
                />
                <path d="M7 16c3-3 6-7 9-11" stroke="#86EFAC" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          )}

          {/* 3. Sliced Olive Ring */}
          {p.type === 'olive' && (
            <div className="w-3.5 h-3.5 rounded-full border-[3px] border-[#1C1917] bg-transparent shadow-xs" />
          )}

          {/* 4. Golden Crust Crumb */}
          {p.type === 'crumb' && (
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-700 to-amber-400 shadow-xs" />
          )}
        </motion.div>
      ))}
    </div>
  );
};
