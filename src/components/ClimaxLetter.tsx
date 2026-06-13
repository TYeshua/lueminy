import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

const letterLines = [
  "Lueminy Vitória,",
  "Cada momento ao seu lado",
  "tem sido a aventura mais incrível.",
  "Seu sorriso ilumina meus dias,",
  "e o seu abraço é o meu porto seguro.",
  "Construir essa história com você",
  "é o maior presente que a vida me deu.",
  "Feliz Dia dos Namorados."
];

export function ClimaxLetter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[120svh] w-full bg-transparent py-12 px-4 flex flex-col items-center justify-center z-10">
      {/* Background Image Card */}
      <div className="absolute inset-0 z-0 p-4 pb-8">
        <div className="relative w-full h-full rounded-[40px] overflow-hidden glass-dark border-white/5">
          <div className="absolute inset-0 bg-black/70 z-10 backdrop-blur-[2px]" />
          <img 
            src="/L12.jpeg" 
            alt="Nossa Selfie" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      </div>

      {/* Letter Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-lg gap-8 py-20 px-6 mt-10">
        <div className="flex flex-col gap-6 text-center w-full">
          {letterLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: "easeOut" }}
              className={`text-[22px] md:text-2xl font-light text-white/90 leading-relaxed tracking-wide ${index === 0 ? 'text-3xl mb-6 font-normal text-glow' : ''}`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xs font-light tracking-[0.2em] uppercase text-white/50 mb-4">Com amor,</p>
          <h3 className="text-4xl font-normal tracking-wider text-glow text-white/95">Thiago Yeshua</h3>
        </motion.div>
      </div>

      {/* Replay Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2.5 }}
        className="relative z-20 mt-auto pt-24 pb-8"
      >
        <button 
          onClick={scrollToTop}
          className="flex flex-col items-center gap-3 text-white/30 hover:text-white/80 transition-colors duration-500 group"
        >
          <RefreshCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-700 ease-in-out" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.3em]">Replay</span>
        </button>
      </motion.div>
    </section>
  );
}
