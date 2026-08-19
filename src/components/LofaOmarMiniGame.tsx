import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OmarFigure, AlafFigure, HugAssembly } from './HumanFigures';
import { Heart, Sparkles, RefreshCw, Moon, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audio';

type GameState = 'sad' | 'comforted' | 'saranghae' | 'love-pile' | 'drowned-in-love';

export const LofaOmarMiniGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('sad');
  const [loveCount, setLoveCount] = useState<number>(0);
  const [heartsList, setHeartsList] = useState<{ id: number; x: number; y: number }[]>([]);

  const maxHearts = 12;

  const handleComfortLofa = () => {
    setGameState('comforted');
    romanticAudio.play();
    setTimeout(() => {
      setGameState('saranghae');
    }, 1400);
  };

  const handleStartLovePile = () => {
    setGameState('love-pile');
    romanticAudio.play();
  };

  const handleAddLoveHeart = () => {
    if (gameState !== 'love-pile') return;
    romanticAudio.play();

    const newHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 160,
      y: -loveCount * 14 - 10,
    };

    const nextCount = loveCount + 1;
    setLoveCount(nextCount);
    setHeartsList((prev) => [...prev, newHeart]);

    if (nextCount >= maxHearts) {
      setTimeout(() => {
        setGameState('drowned-in-love');
        confetti({
          particleCount: 160,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#fbbf24', '#f472b6', '#a855f7'],
        });
      }, 600);
    }
  };

  const handleRestart = () => {
    setGameState('sad');
    setLoveCount(0);
    setHeartsList([]);
  };

  return (
    <section id="mini-game-section" className="relative py-24 px-4 max-w-4xl mx-auto select-none">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-sans tracking-widest uppercase mb-3">
          <Heart className="w-3.5 h-3.5 fill-pink-400" />
          <span>Interactive Mini-Story</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 font-light tracking-tight">
          Lofa & Omar’s Love
        </h2>
        <p className="font-sans text-stone-400 text-sm mt-2">
          A sweet little story made to make you smile whenever you need it.
        </p>
      </div>

      {/* Game Card Stage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative min-h-[460px] sm:min-h-[500px] p-8 sm:p-12 rounded-3xl bg-stone-900/85 border border-pink-500/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(236,72,153,0.2)] flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Game Ambient Accent */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-pink-500/10 to-transparent pointer-events-none" />

        {/* Stage Content */}
        <div className="relative z-10 my-auto flex flex-col items-center text-center w-full">
          {/* Phase 1: Sad Lofa */}
          {gameState === 'sad' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              {/* Alaf Human Figure Looking for Comfort */}
              <div className="mb-4">
                <AlafFigure pose="standing" isSmiling={false} showCelestial={true} />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-200 font-light mb-1">
                Lofa is feeling a bit down...
              </h3>
              <p className="font-sans text-stone-400 text-sm mb-6">
                Give her a gentle tap to comfort her with Omar’s warmth.
              </p>
              <button
                onClick={handleComfortLofa}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-sans font-medium text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Comfort Lofa</span>
              </button>
            </motion.div>
          )}

          {/* Phase 2: Comforted & Hug -> Saranghae & Cute Gesture */}
          {(gameState === 'comforted' || gameState === 'saranghae') && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              {/* Sweet Hug and Cute Gesture */}
              <div className="mb-4">
                {gameState === 'comforted' ? (
                  <HugAssembly isEmbracing={true} />
                ) : (
                  <div className="flex flex-col items-center">
                    <AlafFigure pose="finger-heart" isSmiling={true} showCelestial={true} showHeartGesture={true} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-200 text-xs font-serif italic flex items-center gap-1.5"
                    >
                      <span>🫰 Saranghae!</span>
                    </motion.div>
                  </div>
                )}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-pink-200 font-light mb-1">
                “I love you, Omar!”
              </h3>
              <p className="font-serif italic text-lg sm:text-xl text-rose-300 mb-1">
                “Alaf’s love is way, way better than love itself.”
              </p>
              <p className="font-arabic text-amber-200 text-lg mb-6">
                أحبك أكثر من الحب نفسه
              </p>

              <button
                onClick={handleStartLovePile}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-sans font-medium text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>See Omar’s Reaction</span>
              </button>
            </motion.div>
          )}

          {/* Phase 3: Omar Heart Eyes & Love Pile */}
          {gameState === 'love-pile' && (
            <div className="flex flex-col items-center w-full">
              {/* Omar with Heart Eyes + Alaf */}
              <div className="flex items-center justify-center gap-8 mb-4">
                {/* Omar */}
                <div className="flex flex-col items-center">
                  <OmarFigure pose="standing" isLookingAtHer={true} showCelestial={true} />
                  <span className="text-xs text-amber-300 font-sans mt-1">Omar (Heart Eyes 😍)</span>
                </div>

                {/* Heart Connection */}
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />

                {/* Alaf */}
                <div className="flex flex-col items-center">
                  <AlafFigure pose="finger-heart" isSmiling={true} showCelestial={true} showHeartGesture={true} />
                  <span className="text-xs text-rose-300 font-sans mt-1">Lofa</span>
                </div>
              </div>

              <p className="font-serif italic text-xl text-stone-100 mb-1">
                “Alaf’s love is way, way better than love itself.”
              </p>
              <p className="text-xs text-stone-400 font-sans mb-3">
                Tap the button to shower Omar’s love onto Lofa ({loveCount}/{maxHearts})
              </p>

              {/* Stack of Floating Hearts */}
              <div className="relative w-48 h-16 mb-4 flex items-center justify-center">
                {heartsList.map((h) => (
                  <motion.div
                    key={h.id}
                    initial={{ scale: 0, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    className="absolute text-2xl"
                    style={{ left: `calc(50% + ${h.x}px)`, top: `${h.y}px` }}
                  >
                    💖
                  </motion.div>
                ))}
              </div>

              <button
                onClick={handleAddLoveHeart}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-sans font-medium text-sm shadow-[0_6px_25px_rgba(244,63,94,0.4)] flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Shower More Love! ({loveCount})</span>
              </button>
            </div>
          )}

          {/* Phase 4: Overwhelmed & Drowned in Omar's Love Ending */}
          {gameState === 'drowned-in-love' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center max-w-md mx-auto"
            >
              {/* Cute Figures Hugging in Sea of Hearts */}
              <div className="relative my-4">
                <HugAssembly isEmbracing={true} />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-rose-200 font-light mb-2">
                Drowned in Omar’s Love 💕
              </h3>
              <p className="font-sans text-stone-300 text-sm sm:text-base mb-6 leading-relaxed">
                Lofa was overwhelmed by the sheer magnitude of Omar’s love that she drowned in sweetness and eternal happiness.
              </p>
              <p className="font-arabic text-amber-200 text-lg mb-6">
                أنتِ كل حياتي وروحي يا لوفة
              </p>

              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-sans transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Hug & Play Again</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
