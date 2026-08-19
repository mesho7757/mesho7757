import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SECRET_NICKNAMES } from '../data/letter';
import { Sparkles, Moon, Star, Flower2, Heart, X } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const HiddenSecrets: React.FC = () => {
  const [activeSecret, setActiveSecret] = useState<{ phrase: string; translation?: string; speaker: string } | null>(null);

  const triggerSecret = (index: number) => {
    const item = SECRET_NICKNAMES[index % SECRET_NICKNAMES.length];
    setActiveSecret(item);
    romanticAudio.play();
  };

  return (
    <>
      {/* Floating Interactive Charms positioned subtly on left and right borders */}
      <div className="fixed left-3 sm:left-6 top-1/3 z-30 flex flex-col gap-3 pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => triggerSecret(0)}
          title="Secret Star"
          className="p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all cursor-pointer"
        >
          <Star className="w-4 h-4 fill-amber-300/40" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2, rotate: -15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => triggerSecret(7)}
          title="Secret Moon"
          className="p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-indigo-500/30 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
        >
          <Moon className="w-4 h-4 fill-indigo-300/30" />
        </motion.button>
      </div>

      <div className="fixed right-3 sm:right-6 top-1/2 z-30 flex flex-col gap-3 pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.2, rotate: 20 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => triggerSecret(4)}
          title="Secret Flower"
          className="p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-rose-500/30 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all cursor-pointer"
        >
          <Flower2 className="w-4 h-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => triggerSecret(11)}
          title="Secret Heart"
          className="p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-pink-500/30 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-pink-400/40" />
        </motion.button>
      </div>

      {/* Secret Toast / Pop-up */}
      <AnimatePresence>
        {activeSecret && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-stone-900/95 border border-rose-400/50 backdrop-blur-xl shadow-[0_15px_50px_rgba(244,63,94,0.35)] flex items-center gap-4 text-center max-w-sm"
          >
            <div className="flex-1">
              <span className="text-[10px] font-sans tracking-widest uppercase text-stone-400 block mb-0.5">
                Secret Phrase • {activeSecret.speaker}
              </span>
              <p className="font-serif text-xl sm:text-2xl text-amber-200 font-light font-arabic">
                {activeSecret.phrase}
              </p>
              {activeSecret.translation && (
                <p className="font-sans text-xs text-rose-300/80 mt-1">
                  “{activeSecret.translation}”
                </p>
              )}
            </div>
            <button
              onClick={() => setActiveSecret(null)}
              className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
