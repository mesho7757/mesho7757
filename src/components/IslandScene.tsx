import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OmarFigure, AlafFigure } from './HumanFigures';
import { Sun, Moon, Flame, Sparkles, RefreshCw, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

type IslandMood = 'balanced' | 'too-hot' | 'too-cold' | 'bonfire';

export const IslandScene: React.FC = () => {
  const [mood, setMood] = useState<IslandMood>('balanced');
  const [flameLevel, setFlameLevel] = useState<number>(1);

  const handleSunClick = () => {
    setMood('too-hot');
    romanticAudio.play();
  };

  const handleMoonClick = () => {
    setMood('too-cold');
    romanticAudio.play();
  };

  const handleFireClick = () => {
    setMood('balanced');
    setFlameLevel((prev) => (prev % 3) + 1);
    romanticAudio.play();
  };

  const handleBonfireClick = () => {
    setMood('bonfire');
    romanticAudio.play();
  };

  const handleReset = () => {
    setMood('balanced');
    setFlameLevel(1);
  };

  return (
    <section id="island-scene" className="relative py-24 px-4 max-w-5xl mx-auto select-none">
      <div className="text-center mb-10">
        <span className="font-arabic text-amber-200 text-lg">أنتِ قمري وأنا شمسك</span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 font-light tracking-tight mt-1">
          Our Sanctuary Island
        </h2>
        <p className="font-sans text-stone-400 text-sm mt-2 max-w-lg mx-auto">
          Two people on a tiny island surrounded by water, simply sitting together and keeping each other company.
        </p>
      </div>

      {/* Main Island Diorama Container */}
      <div
        className={`relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[480px] max-h-[620px] rounded-3xl overflow-hidden border transition-all duration-1000 shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col justify-between ${
          mood === 'too-hot'
            ? 'bg-gradient-to-b from-amber-950/80 via-rose-950/60 to-[#120a06] border-amber-500/40 shadow-amber-900/30'
            : mood === 'too-cold'
            ? 'bg-gradient-to-b from-[#050b1a] via-[#09152e] to-[#040813] border-blue-500/40 shadow-blue-950/40'
            : mood === 'bonfire'
            ? 'bg-gradient-to-b from-orange-950/90 via-red-950/70 to-[#1a0705] border-orange-500/50 shadow-orange-900/40'
            : 'bg-gradient-to-b from-[#090e1c] via-[#0d162b] to-[#060b14] border-stone-800 shadow-stone-950/50'
        }`}
      >
        {/* Sky with Celestial Sun & Moon */}
        <div className="relative z-10 w-full p-6 flex items-start justify-between">
          {/* Celestial Sun (Omar) */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSunClick}
            className="cursor-pointer group flex flex-col items-center"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: mood === 'too-hot' ? [1.1, 1.25, 1.1] : [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity },
              }}
              className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-200 shadow-[0_0_40px_rgba(251,191,36,0.6)] flex items-center justify-center text-stone-900"
            >
              <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-amber-950" />
            </motion.div>
            <span className="font-serif text-xs sm:text-sm text-amber-200 mt-2">Omar (The Sun)</span>
            <span className="text-[10px] text-amber-300/60 font-sans">Tap for warmth</span>
          </motion.div>

          {/* Center Atmosphere Status Indicator */}
          <div className="text-center px-4 py-2 rounded-2xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md max-w-xs sm:max-w-md">
            <span className="text-xs font-sans text-stone-400 block uppercase tracking-wider">
              {mood === 'balanced' && '✨ Harmony & Balanced Warmth'}
              {mood === 'too-hot' && '🔥 Too Warm — Alaf fanning herself'}
              {mood === 'too-cold' && '❄️ A Bit Chilly — Moving Closer'}
              {mood === 'bonfire' && '🎇 Enchanted Campfire Glow'}
            </span>
            <span className="text-sm font-serif italic text-stone-200">
              {mood === 'balanced' && '“Safe and sound together.”'}
              {mood === 'too-hot' && '“Omar, your sun is radiating too much heat!”'}
              {mood === 'too-cold' && '“My moon brought a cold breeze, let’s cuddle closer!”'}
              {mood === 'bonfire' && '“Sparks dancing in the starry night.”'}
            </span>
          </div>

          {/* Celestial Moon (Alaf) */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMoonClick}
            className="cursor-pointer group flex flex-col items-center"
          >
            <motion.div
              animate={{
                scale: mood === 'too-cold' ? [1.1, 1.25, 1.1] : [1, 1.05, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-stone-950 border-r-4 border-b-4 border-amber-100 shadow-[0_0_40px_rgba(199,210,254,0.6)] flex items-center justify-center text-stone-100 -rotate-45"
            >
              <Moon className="w-7 h-7 sm:w-9 sm:h-9 text-amber-100 fill-amber-100/20 rotate-45" />
            </motion.div>
            <span className="font-serif text-xs sm:text-sm text-indigo-200 mt-2">Alaf (The Moon)</span>
            <span className="text-[10px] text-indigo-300/60 font-sans">Tap for quiet cool</span>
          </motion.div>
        </div>

        {/* Ambient Rising Sparks / Embers */}
        {(mood === 'bonfire' || mood === 'balanced') && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: mood === 'bonfire' ? 24 : 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%',
                  y: '70%',
                  opacity: 1,
                  scale: Math.random() * 0.8 + 0.4,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 40}%`,
                  y: `${Math.random() * 20 + 20}%`,
                  opacity: 0,
                  scale: 0.2,
                }}
                transition={{
                  duration: Math.random() * 2.5 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeOut',
                }}
                className="absolute w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_8px_#f97316]"
              />
            ))}
          </div>
        )}

        {/* Surrounding Calm Water & Reflections */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 bg-gradient-to-t from-[#03060c] via-[#051122] to-transparent pointer-events-none">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], x: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.2),transparent_70%)]"
          />
        </div>

        {/* Center Island Mound with Omar & Alaf Human Figures Sitting by Fire */}
        <div className="relative z-20 my-auto mb-8 sm:mb-12 flex flex-col items-center">
          <div className="relative w-80 sm:w-[480px] h-32 sm:h-44 rounded-[100%] bg-gradient-to-b from-[#2e261d] via-[#1a140f] to-[#0a0705] border-t-2 border-[#5c4a38] shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex items-center justify-center">
            {/* Campfire in Center */}
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFireClick}
              onDoubleClick={handleBonfireClick}
              className="relative -top-2 sm:-top-4 z-20 cursor-pointer group flex flex-col items-center"
            >
              {/* Campfire Glow Aura */}
              <motion.div
                animate={{
                  scale: mood === 'bonfire' ? [1.3, 1.8, 1.4] : [1, 1.2, 1],
                  opacity: mood === 'bonfire' ? 0.9 : 0.6,
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -inset-4 rounded-full bg-gradient-to-tr from-orange-600/40 via-amber-500/30 to-red-500/20 blur-xl pointer-events-none"
              />

              {/* Fire Flame */}
              <motion.div
                animate={{
                  scale: mood === 'bonfire' ? [1.2, 1.4, 1.2] : [1, 1.1, 1],
                  rotate: [-3, 3, -3],
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]"
              >
                <Flame className="w-10 h-10 sm:w-14 sm:h-14 fill-orange-500 text-amber-300" />
              </motion.div>

              {/* Logs base */}
              <div className="w-8 h-2 rounded-full bg-[#3d2416] -mt-1" />
              <span className="text-[9px] font-sans text-amber-300/80 mt-1">
                Shared Warmth (Tap)
              </span>
            </motion.div>

            {/* Omar Human Figure (Sitting on left of fire with Sun floating above) */}
            <motion.div
              animate={{
                x: mood === 'balanced' ? 12 : mood === 'too-cold' ? 24 : 0,
                rotate: mood === 'too-cold' ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute left-6 sm:left-14 -top-12 sm:-top-16 flex flex-col items-center z-20"
            >
              <OmarFigure pose="sitting" size="md" showCelestial={true} isLookingAtHer={true} />
            </motion.div>

            {/* Alaf Human Figure (Sitting on right of fire with Moon floating above) */}
            <motion.div
              animate={{
                x: mood === 'balanced' ? -12 : mood === 'too-hot' ? -24 : 0,
                rotate: mood === 'too-hot' ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute right-6 sm:right-14 -top-12 sm:-top-16 flex flex-col items-center z-20"
            >
              <AlafFigure pose="sitting" size="md" showCelestial={true} isSmiling={true} />
            </motion.div>

            {/* Floating Harmony Heart in Balanced Mood */}
            {mood === 'balanced' && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -24, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 z-30 pointer-events-none"
              >
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500 drop-shadow-lg" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Island Control Bar */}
        <div className="relative z-30 p-4 border-t border-stone-800/80 bg-stone-950/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-400">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Omar & Alaf in peaceful harmony</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFireClick}
              className="px-3 py-1.5 rounded-xl bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/40 text-orange-200 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Balance Fire</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Scene</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
