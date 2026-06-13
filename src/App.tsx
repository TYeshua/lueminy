import { useState, useRef } from 'react';
import { InitialScreen } from './components/InitialScreen';
import { HeroSection } from './components/HeroSection';
import { BentoGallery } from './components/BentoGallery';
import { ClimaxLetter } from './components/ClimaxLetter';
import Lightfall from './components/Lightfall';
import { TouchHearts } from './components/TouchHearts';
import { DiscreetSubtitles } from './components/DiscreetSubtitles';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    setIsStarted(true);
    if (audioRef.current) {
      // Começa o áudio com volume suave (fade in pode ser feito via web audio api, mas volume inicial já ajuda)
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  return (
    <main className="bg-transparent min-h-screen font-sans antialiased text-white selection:bg-white/30 relative overflow-hidden">
      <TouchHearts />
      
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Lightfall
          colors={['#ffb3c6', '#ff8fab', '#fb6f92']}
          backgroundColor="#15050e"
          speed={0.4}
          streakCount={3}
          streakWidth={1.5}
          streakLength={1.5}
          glow={1}
          density={0.5}
          twinkle={1.2}
          zoom={2.5}
          backgroundGlow={0.6}
          opacity={1}
          mouseInteraction
          mouseStrength={0.5}
          mouseRadius={1.5}
        />
      </div>

      <div className="relative z-10 flex flex-col w-full">
        {/* Audio Element */}
      {/* Crie a pasta public/audio e coloque a música self_aware.mp3 lá */}
      <audio ref={audioRef} src="/audio/self_aware.mp3" loop preload="auto" />

      {/* Sincronizador de Legendas */}
      <DiscreetSubtitles audioRef={audioRef} />

      {/* Initial Bypass Screen */}
      <InitialScreen isVisible={!isStarted} onStart={handleStart} />

      {/* Main Content Flow */}
      {isStarted && (
        <div className="flex flex-col w-full max-w-[500px] mx-auto shadow-2xl shadow-black/50 overflow-x-hidden relative z-20 bg-transparent">
          <HeroSection />
          <BentoGallery />
          <ClimaxLetter />
        </div>
      )}
      </div>
    </main>
  );
}

export default App;
