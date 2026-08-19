import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudRain, Sun, Sparkles, Moon, Flower2, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const RainToSunScene: React.FC = () => {
  const [isRaining, setIsRaining] = useState<boolean>(true);
  const [clearedStep, setClearedStep] = useState<number>(0);

  const handleClearRain = () => {
    setIsRaining(false);
    romanticAudio.play();
    setClearedStep(1);
    setTimeout(() => setClearedStep(2), 2200);
    setTimeout(() => setClearedStep(3), 4400);
  };

  const handleTriggerRain = () => {
    setIsRaining(true);
    setClearedStep(0);
  };

  return (
    <section id="rain-world-section" className="relative py-24 px-4 max-w-4xl mx-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative p-8 sm:p-14 rounded-3xl border transition-all duration-1000 backdrop-blur-xl shadow-2xl text-center overflow-hidden ${
          isRaining
            ? 'bg-gradient-to-b from-[#0a0f1d] to-[#04070e] border-sky-900/40 shadow-sky-950/50'
            : 'bg-gradient-to-b from-rose-950/40 via-stone-900/90 to-amber-950/40 border-rose-500/30 shadow-[0_20px_60px_rgba(244,63,94,0.25)]'
        }`}
      >
        {/* Dynamic Weather Header */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{
              scale: isRaining ? [1, 1.05, 1] : [1, 1.15, 1],
              rotate: isRaining ? 0 : [0, 360],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity },
            }}
            className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transition-colors duration-700 ${
              isRaining
                ? 'bg-sky-950/70 border border-sky-600/40 text-sky-300'
                : 'bg-amber-500/20 border border-amber-400/50 text-amber-300'
            }`}
          >
            {isRaining ? <CloudRain className="w-10 h-10 animate-bounce" /> : <Sun className="w-10 h-10" />}
          </motion.div>
        </div>

        {/* Dynamic Atmospheric Message */}
        <div className="min-h-[140px] flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
          {isRaining ? (
            <motion.div
              key="raining-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-200 font-light">
                When the storms feel heavy...
              </h3>
              <p className="font-sans text-stone-400 text-sm">
                Take a deep breath. You don't have to carry every cloud alone.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {clearedStep >= 1 && (
                  <motion.h3
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="font-serif text-3xl sm:text-4xl text-amber-200 font-light tracking-wide"
                  >
                    Look at that.
                  </motion.h3>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {clearedStep >= 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="font-serif italic text-2xl sm:text-3xl text-rose-300 font-light"
                  >
                    You made it through another one.
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {clearedStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="flex items-center justify-center gap-2 text-amber-200/90 font-arabic text-xl pt-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>أنا دائماً فخور بكِ يا لوفة</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          {isRaining ? (
            <button
              onClick={handleClearRain}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-sans font-medium text-sm shadow-[0_6px_25px_rgba(2,132,199,0.35)] flex items-center gap-2 cursor-pointer transition-all"
            >
              <Sun className="w-4 h-4 text-amber-300" />
              <span>Breathe & Clear the Clouds</span>
            </button>
          ) : (
            <button
              onClick={handleTriggerRain}
              className="px-6 py-2.5 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-sans transition-all flex items-center gap-1.5"
            >
              <CloudRain className="w-3.5 h-3.5 text-sky-400" />
              <span>Experience Rain Again</span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
};
