import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Heart } from 'lucide-react';

interface InitialScreenProps {
  onStart: () => void;
  isVisible: boolean;
}

export function InitialScreen({ onStart, isVisible }: InitialScreenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black/40 backdrop-blur-sm"
        >
          {/* Instruções de Áudio */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center gap-3 text-white/70"
          >
            <Volume2 className="w-8 h-8 animate-pulse text-white/90" strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">Aumente o volume</span>
          </motion.div>

          {/* Botão Magnético */}
          <motion.button
            drag
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={0.2}
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
              onStart();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="glass px-8 py-4 rounded-full flex items-center gap-3 text-white/90 font-light tracking-wide text-lg"
          >
            <Heart className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            Toque para abrir seu presente
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
