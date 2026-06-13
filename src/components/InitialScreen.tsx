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
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
            className="flex items-center gap-3 px-8 py-4 rounded-full glass hover:bg-white/20 transition-colors"
          >
            <Heart className="w-5 h-5 text-white animate-pulse" fill="currentColor" />
            <span className="text-sm tracking-widest font-medium uppercase">
              Toque para abrir seu presente
            </span>
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
