import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Heart, ChevronDown } from 'lucide-react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2600);
    const t3 = setTimeout(() => setStep(3), 4600);
    const t4 = setTimeout(() => setStep(4), 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      onClick={onContinue}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 cursor-pointer select-none overflow-hidden"
      id="welcome-screen"
    >
      {/* Background Soft Glow & Crescent Moon */}
      <div className="absolute top-16 md:top-24 flex flex-col items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 0.95, scale: 1, y: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="relative"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-r-[12px] md:border-r-[16px] border-b-[10px] md:border-b-[14px] border-amber-100/90 shadow-[0_0_50px_rgba(251,191,36,0.35)] -rotate-45" />
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-full bg-amber-200/10 blur-xl"
          />
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 2 }}
          className="mt-4 font-arabic text-amber-200/70 text-lg tracking-widest"
        >
          يا قمر
        </motion.span>
      </div>

      {/* Main Intimate Typography Stream */}
      <div className="z-10 max-w-2xl text-center space-y-8 md:space-y-10 my-auto">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-100 tracking-tight leading-tight">
                I made this for you.
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-rose-300/90 font-light">
                Whenever you feel down.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2"
            >
              <p className="font-sans text-lg sm:text-xl md:text-2xl text-stone-300 font-light tracking-wide max-w-lg mx-auto leading-relaxed">
                Even if I’m the reason you feel down.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 4 ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 mt-auto flex flex-col items-center gap-3 text-stone-400"
      >
        <button
          onClick={onContinue}
          className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/25 hover:border-rose-400/50 text-rose-200 transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
        >
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40 group-hover:scale-110 transition-transform" />
          <span className="font-sans text-sm tracking-widest uppercase">Enter Our World</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </button>
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <span>Click anywhere to begin</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};
