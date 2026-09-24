import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RealisticToppingsOverlayProps {
  selectedToppings: string[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

export default function RealisticToppingsOverlay({ selectedToppings }: RealisticToppingsOverlayProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const prevCountRef = React.useRef(selectedToppings.length);

  useEffect(() => {
    // When a new topping is selected, trigger a subtle transient seasoning sparkle burst
    // that disappears quickly and NEVER covers or obscures the dish image!
    if (selectedToppings.length > prevCountRef.current) {
      const colors = ['#F59E0B', '#FBBF24', '#10B981', '#EF4444', '#D97706'];
      const newParticles: Particle[] = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 80,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 3,
        delay: i * 0.04,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, 700);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = selectedToppings.length;
  }, [selectedToppings.length]);

  const hasAnyTopping = selectedToppings.length > 0;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 rounded-full overflow-hidden select-none">
      {/* 
        Subtle outer rim accent ring when toppings are active.
        Leaves 100% of the food surface completely clear and unobstructed.
      */}
      <AnimatePresence>
        {hasAnyTopping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 rounded-full ring-2 ring-amber-400/50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Transient Micro-Seasoning Burst (Fades out completely in 600ms) */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.2, x: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0.9, 0],
              scale: [0.2, 1.2, 1, 0.4],
              x: p.x,
              y: p.y,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              delay: p.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: '9999px',
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
