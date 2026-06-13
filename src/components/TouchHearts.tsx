import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
}

export function TouchHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Pequena vibração ao tocar na tela
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(15);
      }
      
      const newHeart: HeartParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setHearts((prev) => [...prev, newHeart]);

      // Remove after animation (1.5s)
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1500);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: 0, scale: 0.2, rotate: -25 }}
            animate={{ opacity: 0, y: -120, scale: 1.5, rotate: 25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute flex items-center justify-center text-rose-500 text-2xl drop-shadow-md"
            style={{ left: heart.x - 16, top: heart.y - 16 }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
