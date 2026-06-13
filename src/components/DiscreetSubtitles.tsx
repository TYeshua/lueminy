import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Timestamps em segundos (estimados)
const subtitles = [
  { time: 15, text: "Sem fumaça, sem fogo" },
  { time: 18, text: "Sem silêncio se não há som" },
  { time: 22, text: "De um jeito ou de outro" },
  { time: 25, text: "Você vai acabar me apagando" },
  { time: 29, text: "Bebidas fluindo como água" },
  { time: 32, text: "Bêbados demais para apagar a luz" },
  { time: 36, text: "Vamos ficar sob as cobertas" },
  { time: 39, text: "Quem sabe como vamos terminar a noite..." },
  { time: 43, text: "Apenas não deposite suas esperanças em mim" },
  { time: 46, text: "Eu quero sentir algo" },
  { time: 50, text: "Deus, você está tão linda" },
  { time: 54, text: "Quando você me diz que me ama" },
  { time: 57, text: "Eu queria poder mentir" },
  { time: 60, text: "Mas a minha mente me atrapalha" },
  { time: 64, text: "Eu sei que você pensa que sou" },
  { time: 67, text: "Sempre autoconsciente demais" },
  { time: 71, text: "Oh, nós não daríamos certo juntos" },
  { time: 75, text: "Mas é gostoso brincar de faz de conta" },
  { time: 78, text: "Eu queria poder mentir" },
  { time: 81, text: "Mas eu sou autoconsciente demais" },
];

export function DiscreetSubtitles({ audioRef }: { audioRef: RefObject<HTMLAudioElement | null> }) {
  const [currentLine, setCurrentLine] = useState<string | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      
      // Encontra a linha atual (a última que tem um tempo menor ou igual ao tempo atual)
      // E garante que a legenda desapareça se já passou muito tempo daquela frase (ex: +3.5s)
      let activeText: string | null = null;
      
      for (let i = 0; i < subtitles.length; i++) {
        if (currentTime >= subtitles[i].time && currentTime < subtitles[i].time + 3.5) {
          activeText = subtitles[i].text;
        }
      }
      
      setCurrentLine(activeText);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [audioRef]);

  return (
    <div className="fixed bottom-24 pb-safe left-0 right-0 z-40 pointer-events-none flex justify-center px-4">
      <AnimatePresence mode="wait">
        {currentLine && (
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="px-6 py-4 rounded-full glass max-w-sm text-center relative overflow-hidden shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
          >
            {/* Brilho interno do vidro seguro para iOS */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
            
            <p className="text-[12px] tracking-[0.2em] uppercase font-bold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)] relative z-10">
              {currentLine}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
