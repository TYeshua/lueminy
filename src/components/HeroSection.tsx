import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const lyrics = [
  "Eu percebi que o tempo parou",
  "Quando nossos olhares se encontraram",
  "Tão autoconsciente, tão real",
  "Você é a luz que me guia",
  "Nossa história apenas começou"
];

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLyricIndex((prev) => (prev + 1) % lyrics.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-transparent flex flex-col justify-end">
      {/* Background with Parallax (Floating Card Style) */}
      <motion.div 
        className="absolute inset-0 z-0 origin-bottom flex items-center justify-center p-4 pt-16 pb-40"
        style={{ y, opacity }}
      >
        <div className="relative w-full h-full max-w-sm rounded-[40px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10">
          {/* Gradiente escuro para dar contraste aos textos que podem sobrepor */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 z-10" />
          <img 
            src="./L10.jpeg" 
            alt="Nossa Primeira Foto" 
            className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105"
          />
        </div>
      </motion.div>

      {/* Lyrics Player (Apple Music Style) */}
      <div className="relative z-20 w-full px-6 pb-28 flex flex-col items-center">
        <div className="h-24 flex items-center justify-center w-full max-w-md text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentLyricIndex}
              initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(12px)', y: -15 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="text-2xl md:text-4xl font-light tracking-wide text-white/95 text-glow"
            >
              {lyrics[currentLyricIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Swipe Indicator */}
      <motion.div 
        drag="y"
        dragConstraints={{ top: -50, bottom: 0 }}
        dragElastic={0.2}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium">Deslize para cima</span>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
