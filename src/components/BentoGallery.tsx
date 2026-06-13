import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const poems = [
  { id: "p1", src: "./L12.jpeg", author: "Luís de Camões", text: "Amor é fogo que arde sem se ver,\né ferida que dói, e não se sente;\né um contentamento descontente,\né dor que desatina sem doer." },
  { id: "p2", src: "./L1.jpeg", author: "Vinícius de Moraes", text: "De tudo, ao meu amor serei atento\nAntes, e com tal zelo, e sempre, e tanto\nQue mesmo em face do maior encanto\nDele se encante mais meu pensamento." },
  { id: "p3", src: "./L5.jpeg", author: "Pablo Neruda", text: "Em teu abraço eu abraço o que existe,\na areia, o tempo, a árvore da chuva.\nE tudo vive para que eu viva..." },
  { id: "p4", src: "./L9.jpeg", author: "Carlos D. de Andrade", text: "O meu tempo e o teu, amada,\ntranscendem qualquer medida.\nAlém do amor, não há nada,\namar é o sumo da vida." },
  { id: "p5", src: "./L2.jpeg", author: "Cora Coralina", text: "Nas palmas de tuas mãos\nleio as linhas da minha vida.\nLinhas cruzadas, sinuosas,\ninterferindo no teu destino." },
  { id: "p6", src: "./L8.jpeg", author: "Mario Quintana", text: "Se tu me amas, ama-me baixinho\nNão o grites de cima dos telhados.\nDeixa em paz os passarinhos.\nDeixa em paz a mim!" },
  { id: "p7", src: "./L11.jpeg", author: "Castro Alves", text: "Quero um beijo sem fim,\nQue dure a vida inteira e aplaque o meu desejo!\nFerve-me o sangue. Acalma-o com teu beijo..." },
  { id: "p8", src: "./L4.jpeg", author: "Paulo Leminski", text: "amar é um elo\nentre o azul\ne o amarelo." }
];

interface BentoImageProps {
  item: typeof poems[0];
  className?: string;
  onClick: (id: string) => void;
}

const BentoImage = ({ item, className = "", onClick }: BentoImageProps) => (
  <motion.div
    layoutId={`card-container-${item.id}`}
    onClick={() => onClick(item.id)}
    drag
    dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
    dragElastic={0.15}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`relative overflow-hidden rounded-[28px] glass-dark cursor-pointer ${className}`}
  >
    <motion.img 
      layoutId={`image-${item.id}`}
      src={item.src} 
      alt="Galeria" 
      className="w-full h-full object-cover pointer-events-none transition-transform duration-[2s] hover:scale-110"
    />
  </motion.div>
);

const appleSpring = { type: "spring", stiffness: 350, damping: 35, mass: 0.8 };

export function BentoGallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedPoem = poems.find((p) => p.id === selectedId);

  return (
    <section className="w-full py-24 px-5 bg-transparent text-white flex flex-col gap-20 relative z-10">
      
      {/* Card 1: Aventuras */}
      <div className="flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pl-2"
        >
          <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-2">Aventuras</h2>
          <p className="text-3xl font-light text-glow text-white/90">Explorando o mundo</p>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4 h-[45vh]">
          <BentoImage item={poems[0]} onClick={setSelectedId} className="h-full shadow-2xl" />
          <BentoImage item={poems[1]} onClick={setSelectedId} className="h-[85%] mt-auto shadow-2xl" />
        </div>
      </div>

      {/* Card 2: Luzes da Cidade */}
      <div className="flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pl-2 text-right"
        >
          <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-2">Luzes da Cidade</h2>
          <p className="text-3xl font-light text-glow text-white/90">Nossas noites</p>
        </motion.div>
        
        <div className="flex flex-col gap-4 h-[55vh]">
          <BentoImage item={poems[2]} onClick={setSelectedId} className="h-[60%] w-full shadow-2xl" />
          <BentoImage item={poems[3]} onClick={setSelectedId} className="h-[45%] w-[75%] self-end -mt-12 relative z-10 shadow-2xl border-white/20" />
        </div>
      </div>

      {/* Card 3: Celebrações */}
      <div className="flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pl-2"
        >
          <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-2">Celebrações</h2>
          <p className="text-3xl font-light text-glow text-white/90">Alegria infinita</p>
        </motion.div>
        
        <div className="grid grid-cols-2 grid-rows-3 gap-4 h-[65vh]">
          <BentoImage item={poems[4]} onClick={setSelectedId} className="col-span-2 row-span-1 shadow-2xl" />
          <BentoImage item={poems[5]} onClick={setSelectedId} className="col-span-1 row-span-2 shadow-2xl" />
          <div className="col-span-1 row-span-2 flex flex-col gap-4">
            <BentoImage item={poems[6]} onClick={setSelectedId} className="h-full shadow-2xl" />
            <BentoImage item={poems[7]} onClick={setSelectedId} className="h-full shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Modal Expansion */}
      <AnimatePresence>
        {selectedId && selectedPoem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl"
          >
            <div 
              className="absolute inset-0" 
              onClick={() => setSelectedId(null)} 
            />
            <motion.div
              layoutId={`card-container-${selectedId}`}
              transition={appleSpring}
              className="relative w-full max-w-[400px] bg-[#111] rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 glass rounded-full text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative h-1/2 min-h-[300px] w-full shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#15050e] to-transparent z-10 h-full" />
                <motion.img
                  layoutId={`image-${selectedId}`}
                  src={selectedPoem.src}
                  className="w-full h-full object-cover"
                />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, ...appleSpring }}
                className="relative z-20 flex-1 flex flex-col items-center justify-center p-8 text-center -mt-16 bg-gradient-to-t from-black via-[#111]/90 to-transparent"
              >
                <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed italic drop-shadow-md whitespace-pre-line">
                  "{selectedPoem.text}"
                </p>
                <p className="mt-6 text-xs tracking-[0.2em] uppercase text-pink-300/80 font-semibold">
                  — {selectedPoem.author}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
