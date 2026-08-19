import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getReasonForNumber, HANDCRAFTED_REASONS } from '../data/letter';
import { Heart, Sparkles, RefreshCw, Plus, FastForward } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audio';

export const ReasonsCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [heartsEffect, setHeartsEffect] = useState<{ id: number; x: number }[]>([]);

  const handleIncrement = (amount = 1) => {
    const nextCount = count + amount;
    setCount(nextCount);
    romanticAudio.play();

    // Floating heart visual burst
    const newHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 120,
    };
    setHeartsEffect((prev) => [...prev.slice(-10), newHeart]);

    // Celebrate milestone numbers
    if (nextCount % 10 === 0 || nextCount === 1 || nextCount === 365 || nextCount === 100) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24', '#fbcfe8'],
      });
    }
  };

  const handleJump = (target: number) => {
    setCount(target);
    romanticAudio.play();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#fbbf24', '#f472b6'],
    });
  };

  return (
    <section id="reasons-section" className="relative py-20 px-4 max-w-4xl mx-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 sm:p-12 rounded-3xl bg-stone-900/80 border border-rose-500/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(244,63,94,0.15)] text-center relative overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-sans tracking-widest uppercase mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
          <span>Infinite Reasons</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light tracking-tight">
          Reasons I Love You
        </h2>
        <p className="font-arabic text-amber-200/80 text-lg mt-1">
          أسباب لا تعد ولا تحصى لأحبك يا لوفة
        </p>
        <p className="font-sans text-stone-400 text-sm max-w-md mx-auto mt-2 mb-6">
          Every click reveals another truth. The counter counts without end, because my love has no limit.
        </p>

        {/* Counter Number Display */}
        <div className="relative my-6 flex flex-col items-center justify-center">
          {/* Floating heart burst particles */}
          {heartsEffect.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -60, scale: 1.4 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute text-xl pointer-events-none"
              style={{ left: `calc(50% + ${h.x}px)` }}
            >
              💖
            </motion.div>
          ))}

          <div className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-stone-950/90 border border-rose-500/40 shadow-inner">
            <span className="font-sans text-xs text-rose-300/70 mr-3 uppercase tracking-wider font-semibold">
              Reason #
            </span>
            <span className="font-mono text-3xl sm:text-5xl font-bold text-rose-200">
              {count.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Active Reason Card */}
        <div className="min-h-[160px] flex items-center justify-center p-6 sm:p-8 rounded-2xl bg-stone-950/60 border border-stone-800 my-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={count}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-xl sm:text-2xl text-stone-100 font-light italic leading-relaxed max-w-2xl"
            >
              {count === 0 ? (
                <span className="text-stone-400 not-italic font-sans text-base">
                  Click the button below to discover reason number 1... and keep going as long as your heart desires.
                </span>
              ) : (
                `“${getReasonForNumber(count)}”`
              )}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Primary Click Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => handleIncrement(1)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-sans font-medium text-base shadow-[0_8px_30px_rgba(244,63,94,0.4)] hover:shadow-[0_10px_40px_rgba(244,63,94,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{count === 0 ? 'Give me Reason #1' : `Tell me Reason #${count + 1}`}</span>
          </button>

          {count > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleIncrement(5)}
                className="px-4 py-3 rounded-2xl bg-stone-800/80 hover:bg-stone-700 border border-stone-700 text-rose-300 text-xs font-sans transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+5</span>
              </button>

              <button
                onClick={() => handleJump(count + 50)}
                className="px-4 py-3 rounded-2xl bg-stone-800/80 hover:bg-stone-700 border border-stone-700 text-amber-300 text-xs font-sans transition-all flex items-center gap-1 cursor-pointer"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>+50</span>
              </button>

              <button
                onClick={() => setCount(0)}
                className="px-4 py-3 rounded-2xl bg-stone-800/80 hover:bg-stone-700 border border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-sans transition-all flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Romantic Milestone Shortcuts */}
        <div className="mt-8 pt-6 border-t border-stone-800/60 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-400">
          <span className="font-sans mr-2">Special Milestones:</span>
          {[1, 7, 23, 100, 365, 1000].map((num) => (
            <button
              key={num}
              onClick={() => handleJump(num)}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                count === num
                  ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
              }`}
            >
              #{num}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
