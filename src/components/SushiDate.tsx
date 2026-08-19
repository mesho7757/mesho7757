import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OmarFigure, AlafFigure } from './HumanFigures';
import { Sparkles, Moon, Heart, Utensils, RotateCcw, Flame } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface SushiPiece {
  id: string;
  name: string;
  emoji: string;
  svgType: 'salmon' | 'tuna' | 'maki' | 'ebi' | 'tamago';
}

const SUSHI_MENU: SushiPiece[] = [
  { id: 'salmon', name: 'Fresh Salmon', emoji: '🍣', svgType: 'salmon' },
  { id: 'tuna', name: 'Tuna Nigiri', emoji: '🍣', svgType: 'tuna' },
  { id: 'maki', name: 'Avocado Roll', emoji: '🍙', svgType: 'maki' },
  { id: 'ebi', name: 'Sweet Shrimp', emoji: '🍤', svgType: 'ebi' },
  { id: 'tamago', name: 'Golden Tamago', emoji: '🍱', svgType: 'tamago' },
];

const OMAR_DATE_RESPONSES = [
  "Take the best piece, ya rouhi... it's all for you.",
  "Watching you enjoy your food is literally my favorite view.",
  "Look at that cute smile... you deserve all the good things.",
  "Take your time, my moon. This whole table is just for us.",
  "I could sit across from you at a sushi table forever.",
  "Seeing you happy makes my entire day 100 times better.",
];

export const SushiDate: React.FC = () => {
  const [tastedCount, setTastedCount] = useState<number>(0);
  const [activeSushiId, setActiveSushiId] = useState<string | null>(null);
  const [activeMessageIndex, setActiveMessageIndex] = useState<number>(0);
  const [sparklesList, setSparklesList] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [eatenSet, setEatenSet] = useState<Set<string>>(new Set());
  const [isLeaningIn, setIsLeaningIn] = useState<boolean>(false);

  const handleSushiClick = (sushi: SushiPiece, event: React.MouseEvent | React.TouchEvent) => {
    setActiveSushiId(sushi.id);
    setIsLeaningIn(true);
    const nextCount = tastedCount + 1;
    setTastedCount(nextCount);
    setEatenSet((prev) => new Set(prev).add(sushi.id));
    setActiveMessageIndex((prev) => (prev + 1) % OMAR_DATE_RESPONSES.length);

    romanticAudio.play();

    // Gentle lean-in duration so he leans towards the table to share the moment
    setTimeout(() => {
      setIsLeaningIn(false);
    }, 2200);

    // Trigger floating sparkle effect
    const newSparkle = {
      id: Date.now() + Math.random(),
      x: Math.random() * 60 + 20,
      y: Math.random() * 40 + 30,
    };
    setSparklesList((prev) => [...prev.slice(-6), newSparkle]);

    // Complete after exploring enough pieces
    if (nextCount >= 4 && !isCompleted) {
      setTimeout(() => {
        setIsCompleted(true);
      }, 500);
    }
  };

  const handleReset = () => {
    setTastedCount(0);
    setActiveSushiId(null);
    setIsCompleted(false);
    setEatenSet(new Set());
    romanticAudio.play();
  };

  return (
    <section id="sushi-date" className="relative py-20 px-4 max-w-4xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-sans tracking-widest uppercase mb-3">
          <Utensils className="w-3.5 h-3.5 text-amber-300" />
          <span>A Table For Two</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light tracking-tight">
          A Quiet Sushi Date
        </h2>
        <p className="font-sans text-stone-400 text-sm mt-2 max-w-md mx-auto">
          A cozy moonlit dinner under the stars, just for you and Omar. Touch the sushi to share a piece.
        </p>
      </div>

      {/* Main Dining Scene Container */}
      <div className="relative w-full max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-[#0b0f1a] via-[#101726] to-[#080c14] border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 sm:p-10 overflow-hidden">
        {/* Soft Ambient Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.12),transparent_70%)] pointer-events-none" />

        {/* Ambient Night Sky Spores / Lantern Embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${10 + Math.random() * 80}%`,
                y: `${60 + Math.random() * 30}%`,
                opacity: 0,
                scale: 0.4,
              }}
              animate={{
                y: `${15 + Math.random() * 40}%`,
                opacity: [0, 0.7, 0],
                scale: [0.4, 0.9, 0.3],
              }}
              transition={{
                duration: 3.5 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            />
          ))}
        </div>

        {/* Floating Sparkles from Sushi Taps */}
        {sparklesList.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -60, scale: 1.4 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute pointer-events-none text-xl z-40"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          >
            ✨
          </motion.div>
        ))}

        {/* Characters & Table Dining Assembly */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Couple Sitting Across Table */}
          <div className="w-full flex items-end justify-between sm:justify-around px-2 sm:px-8 min-h-[190px]">
            {/* Omar Figure (Left Side) - Leans in warmly toward table & Alaf on interaction */}
            <motion.div
              animate={{
                x: isLeaningIn ? 14 : 0,
                y: isLeaningIn ? 2 : [-1, 1, -1],
                rotate: isLeaningIn ? 8 : 2,
                scale: isLeaningIn ? 1.05 : 1,
              }}
              transition={{
                x: { type: 'spring', stiffness: 180, damping: 16 },
                rotate: { type: 'spring', stiffness: 180, damping: 16 },
                y: isLeaningIn ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.3 },
              }}
              className="flex flex-col items-center origin-bottom-right"
            >
              <OmarFigure
                pose="sitting"
                size="md"
                showCelestial={true}
                isTalking={isLeaningIn || !!activeSushiId}
                isLookingAtHer={true}
              />
            </motion.div>

            {/* Cozy Center Dining Table */}
            <div className="relative flex flex-col items-center mx-2 -mb-2">
              {/* Warm Candle Lantern on Table */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative -mb-1 z-20 flex flex-col items-center"
              >
                <div className="w-4 h-4 rounded-full bg-amber-400/40 blur-sm absolute -top-1" />
                <Flame className="w-4 h-4 text-amber-300 fill-amber-300 drop-shadow-[0_0_10px_#f59e0b]" />
                <div className="w-5 h-3 rounded-sm bg-stone-900 border border-amber-500/40" />
              </motion.div>

              {/* Slate / Bamboo Platter Holding Sushi */}
              <div className="relative w-44 sm:w-56 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border border-amber-400/30 shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center justify-around px-2 z-10">
                {/* Bamboo Platter Grain Lines */}
                <div className="absolute inset-x-2 inset-y-1 rounded-xl border border-stone-700/40 pointer-events-none" />

                {/* Interactive Sushi Pieces on Platter */}
                {SUSHI_MENU.map((sushi) => {
                  const isRecentlyTapped = activeSushiId === sushi.id;
                  const isEaten = eatenSet.has(sushi.id);

                  return (
                    <motion.button
                      key={sushi.id}
                      whileHover={{ scale: 1.25, y: -6 }}
                      whileTap={{ scale: 0.88, y: 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      onClick={(e) => handleSushiClick(sushi, e)}
                      title={`Taste ${sushi.name}`}
                      className="group relative p-1.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors focus:outline-none min-w-[42px] min-h-[42px]"
                    >
                      {/* Gentle Hover Glow Aura */}
                      <div className="absolute inset-0 rounded-2xl bg-amber-400/0 group-hover:bg-amber-400/20 group-hover:shadow-[0_0_14px_rgba(251,191,36,0.6)] transition-all duration-300 pointer-events-none" />

                      {/* Visual SVG Sushi Art */}
                      <motion.div
                        animate={
                          isRecentlyTapped
                            ? { y: [-8, 0, -4, 0], rotate: [-10, 10, 0] }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                        className="relative z-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_6px_12px_rgba(251,191,36,0.4)] transition-all"
                      >
                        {/* Salmon Nigiri */}
                        {sushi.svgType === 'salmon' && (
                          <div className="w-7 h-5 sm:w-8 sm:h-6 relative">
                            {/* Rice base */}
                            <div className="absolute bottom-0 inset-x-0.5 h-3 bg-stone-100 rounded-md shadow-inner border border-stone-300/40" />
                            {/* Salmon slice */}
                            <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r from-orange-500 via-rose-400 to-orange-500 rounded-lg shadow-sm border-t border-rose-300/60" />
                            {/* Nori band */}
                            <div className="absolute inset-y-0.5 left-1/2 -translate-x-1/2 w-1.5 bg-stone-900 rounded-xs" />
                          </div>
                        )}

                        {/* Tuna Nigiri */}
                        {sushi.svgType === 'tuna' && (
                          <div className="w-7 h-5 sm:w-8 sm:h-6 relative">
                            <div className="absolute bottom-0 inset-x-0.5 h-3 bg-stone-100 rounded-md shadow-inner border border-stone-300/40" />
                            <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-lg shadow-sm border-t border-rose-400/60" />
                          </div>
                        )}

                        {/* Avocado Maki */}
                        {sushi.svgType === 'maki' && (
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-stone-900 border border-stone-700 p-0.5 flex items-center justify-center shadow-md">
                            <div className="w-full h-full rounded-full bg-stone-100 flex items-center justify-center p-0.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-600" />
                            </div>
                          </div>
                        )}

                        {/* Ebi / Sweet Shrimp */}
                        {sushi.svgType === 'ebi' && (
                          <div className="w-7 h-5 sm:w-8 sm:h-6 relative">
                            <div className="absolute bottom-0 inset-x-0.5 h-3 bg-stone-100 rounded-md shadow-inner border border-stone-300/40" />
                            <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r from-rose-300 via-orange-300 to-rose-400 rounded-lg border-t border-rose-200" />
                            {/* Tail accent */}
                            <div className="absolute -right-1 top-0 w-2 h-2 bg-rose-400 rounded-full" />
                          </div>
                        )}

                        {/* Golden Tamago */}
                        {sushi.svgType === 'tamago' && (
                          <div className="w-7 h-5 sm:w-8 sm:h-6 relative">
                            <div className="absolute bottom-0 inset-x-0.5 h-3 bg-stone-100 rounded-md shadow-inner border border-stone-300/40" />
                            <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 rounded-lg border-t border-amber-100" />
                            {/* Nori band */}
                            <div className="absolute inset-y-0.5 left-1/2 -translate-x-1/2 w-1.5 bg-stone-900 rounded-xs" />
                          </div>
                        )}

                        {/* Small sparkle / indicator if tasted */}
                        {isEaten && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_#f43f5e]" />
                        )}
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Table Cloth / Wooden Table Base */}
              <div className="w-52 sm:w-64 h-8 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 rounded-b-2xl border-t-2 border-amber-600/50 shadow-2xl flex items-center justify-center">
                <span className="text-[10px] font-sans text-stone-400 tracking-wider">
                  🥢 tap a sushi to taste
                </span>
              </div>
            </div>

            {/* Alaf Figure (Right Side) */}
            <motion.div
              animate={{
                y: activeSushiId ? [-1, 3, -1] : [1, -1, 1],
                rotate: activeSushiId ? -3 : -1,
              }}
              transition={{
                duration: activeSushiId ? 0.6 : 3.2,
                repeat: activeSushiId ? 1 : Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center"
            >
              <AlafFigure
                pose="sitting"
                size="md"
                showCelestial={true}
                isSmiling={true}
                showHeartGesture={!!activeSushiId}
              />
            </motion.div>
          </div>

          {/* Omar's Soft Reaction Dialog Bubble */}
          <div className="w-full max-w-md mt-6 min-h-[72px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeSushiId ? (
                <motion.div
                  key={activeMessageIndex}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 py-3 rounded-2xl bg-stone-900/90 border border-amber-400/40 shadow-lg text-center backdrop-blur-md"
                >
                  <p className="font-serif italic text-base sm:text-lg text-amber-100">
                    “{OMAR_DATE_RESPONSES[activeMessageIndex]}”
                  </p>
                </motion.div>
              ) : (
                <div className="px-4 py-2 rounded-xl bg-stone-900/40 border border-stone-800 text-stone-400 text-xs font-sans text-center">
                  Share a piece of sushi together at the table.
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Intimate Romantic Completion Card */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="mt-6 w-full max-w-md p-6 rounded-2xl bg-gradient-to-b from-stone-900/95 to-stone-950/95 border border-rose-500/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(244,63,94,0.25)] text-center space-y-3"
              >
                <div className="flex items-center justify-center gap-2 text-rose-400">
                  <Heart className="w-4 h-4 fill-rose-400/60" />
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <Heart className="w-4 h-4 fill-rose-400/60" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl text-rose-100 font-light tracking-wide">
                    Okay... sushi date.
                  </h3>
                  <p className="font-serif italic text-lg sm:text-xl text-amber-200">
                    Just you and me.
                  </p>
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handleReset}
                    className="px-4 py-1.5 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 border border-stone-600 text-stone-300 hover:text-white text-xs font-sans transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                    <span>Enjoy another plate 🥢</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
