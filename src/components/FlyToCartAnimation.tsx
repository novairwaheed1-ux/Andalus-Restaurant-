import React, { useEffect, useState } from 'react';

export interface FlyItem {
  id: string;
  image: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

interface FlyToCartAnimationProps {
  flyingItems: FlyItem[];
  onComplete: (id: string) => void;
}

export const FlyToCartAnimation: React.FC<FlyToCartAnimationProps> = ({
  flyingItems,
  onComplete,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {flyingItems.map((item) => (
        <SingleFallingDish key={item.id} item={item} onComplete={() => onComplete(item.id)} />
      ))}
    </div>
  );
};

// Falling dish animation:
// - Leaves its place and drops into the cart
// - Balanced visible speed (~800ms)
// - NO black borders: pizza's own edge is its only boundary
// - NO container background: just the food itself
// - 2D spin as it falls
const SingleFallingDish: React.FC<{ item: FlyItem; onComplete: () => void }> = ({
  item,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    // Balanced speed: 800ms (واضحة ومتزنة تتيح للمستخدم رؤية حركة وسقوط الوجبة للسلة بوضوح)
    const duration = 800;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        onComplete();
      }
    };

    requestAnimationFrame(step);
  }, [onComplete]);

  const t = progress;

  // Horizontal trajectory with smooth ease-in-out
  const currentX = item.startX + (item.targetX - item.startX) * (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  // Parabolic gravity fall: gentle lift at first, then accelerated drop towards cart
  const arcLift = -40 * Math.sin(t * Math.PI);
  const currentY = item.startY + (item.targetY - item.startY) * (t * t) + arcLift;

  // 2D Rotation (دوران مثل دوران القرص)
  const rotationZ = t * 360;

  // Scales down smoothly from 1.1x to 0.25x as it approaches the cart
  const scale = Math.max(0.2, 1.1 - t * 0.85);

  const size = 100;
  const halfSize = size / 2;

  return (
    <div
      style={{
        transform: `translate3d(${currentX - halfSize}px, ${currentY - halfSize}px, 0px) scale(${scale}) rotate(${rotationZ}deg)`,
        opacity: t > 0.93 ? (1 - t) / 0.07 : 1,
        willChange: 'transform, opacity',
      }}
      className="absolute top-0 left-0 w-24 h-24 sm:w-26 sm:h-26 pointer-events-none bg-transparent"
    >
      {/* 
        NO background, NO black border:
        Just the pure circular pizza/dish itself!
      */}
      <img
        src={item.image}
        alt="falling food"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover rounded-full pointer-events-none select-none drop-shadow-xl"
      />
    </div>
  );
};
