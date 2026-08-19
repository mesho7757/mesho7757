import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ComfortOption } from '../types';
import { EXACT_REASSURANCE_TEXT } from '../data/letter';
import { OmarFigure, AlafFigure, HugAssembly, SittingTogetherAssembly } from './HumanFigures';
import { Heart, Smile, ShieldCheck, Sparkles, Moon, Sun, X, RefreshCw } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

const OMAR_SMILE_TALKS = [
  "Hey beautiful... you know your smile is literally my favorite thing in this entire universe?",
  "Did you know that whenever you smile, my heart does that weird little flip? It's completely your fault.",
  "Look at those pretty brown eyes and cute chubby cheeks... how am I supposed to act normal around you?",
  "You're my favorite person and my favorite woman at the exact same time. Now let me see that gorgeous smile!",
  "I was thinking about that recipe you taught me... honestly you're a mastermind in the kitchen and in my heart.",
  "If you don't smile in the next 3 seconds, I'm going to have to hug you until you giggle.",
  "Remember: you're the god of all girlfriends, and nobody makes me laugh the way you do.",
  "Ya qalbi, my beautiful goddess, I'm right here with you. I know that you're shy, but you can smile to me — I will always be so grateful to see that smile."
];

export const ComfortHub: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<ComfortOption | null>(null);

  // Hug Press & Hold State
  const [hugHoldProgress, setHugHoldProgress] = useState<number>(0);
  const [isHoldingHug, setIsHoldingHug] = useState<boolean>(false);

  // Smile interactive talk state
  const [smileTalkIndex, setSmileTalkIndex] = useState<number>(0);
  const [smileSparkles, setSmileSparkles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  // Stay with me progressive text step
  const [stayStep, setStayStep] = useState<number>(0);

  // Hug hold timer
  useEffect(() => {
    let timer: any;
    if (isHoldingHug) {
      timer = setInterval(() => {
        setHugHoldProgress((prev) => Math.min(100, prev + 3));
      }, 50);
    } else {
      timer = setInterval(() => {
        setHugHoldProgress((prev) => Math.max(0, prev - 5));
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isHoldingHug]);

  // Stay with me sequence
  useEffect(() => {
    if (selectedOption === 'stay') {
      setStayStep(0);
      const t1 = setTimeout(() => setStayStep(1), 1000);
      const t2 = setTimeout(() => setStayStep(2), 3000);
      const t3 = setTimeout(() => setStayStep(3), 5200);
      const t4 = setTimeout(() => setStayStep(4), 7400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [selectedOption]);

  const handleNextSmileTalk = () => {
    setSmileTalkIndex((prev) => (prev + 1) % OMAR_SMILE_TALKS.length);
    romanticAudio.play();

    const emojis = ['🌸', '✨', '💖', '🥰', '☀️', '🌷', '🤍', '🌙'];
    const newItems = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setSmileSparkles((prev) => [...prev.slice(-15), ...newItems]);
  };

  const options = [
    { id: 'hug', label: 'I need a hug', icon: Heart, color: 'from-rose-500/30 to-rose-600/10 border-rose-500/40 text-rose-300' },
    { id: 'smile', label: 'I need to smile', icon: Smile, color: 'from-amber-500/30 to-amber-600/10 border-amber-500/40 text-amber-300' },
    { id: 'reassurance', label: 'I need reassurance', icon: ShieldCheck, color: 'from-emerald-500/30 to-emerald-600/10 border-emerald-500/40 text-emerald-300' },
    { id: 'love', label: 'I need to feel loved', icon: Sparkles, color: 'from-pink-500/30 to-purple-600/10 border-pink-500/40 text-pink-300' },
    { id: 'stay', label: 'I just want you to stay with me', icon: Moon, color: 'from-indigo-500/30 to-blue-600/10 border-indigo-500/40 text-indigo-300' },
  ];

  return (
    <section id="comfort-hub" className="relative py-20 px-4 max-w-4xl mx-auto select-none">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light tracking-tight">
          What do you need right now?
        </h2>
        <p className="font-sans text-stone-400 text-sm mt-2">
          Whatever you are feeling, Omar is right here with you.
        </p>
      </div>

      {/* Option Selector Pill Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedOption === opt.id;
          return (
            <motion.button
              key={opt.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedOption(opt.id as ComfortOption);
                if (opt.id === 'smile') handleNextSmileTalk();
                romanticAudio.play();
              }}
              className={`px-5 py-3 rounded-2xl border text-sm font-sans font-medium transition-all duration-300 flex items-center gap-2.5 shadow-lg cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r ' + opt.color + ' ring-2 ring-rose-400/50 text-white'
                  : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:bg-stone-800/80 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{opt.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Interactive Response Area */}
      <AnimatePresence mode="wait">
        {/* 1. "I NEED A HUG" - Full Interactive Human Figures Hug Animation */}
        {selectedOption === 'hug' && (
          <motion.div
            key="hug-experience"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-12 rounded-3xl bg-stone-900/85 border border-rose-500/30 backdrop-blur-xl shadow-[0_15px_50px_rgba(244,63,94,0.25)] text-center relative overflow-hidden"
          >
            <button
              onClick={() => setSelectedOption(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/60 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-3xl text-rose-200 font-light mb-1">
              Come here, my moon.
            </h3>
            <p className="font-arabic text-amber-200/80 text-lg mb-6">
              تعالي في حضني يا روحي
            </p>

            {/* Human Figures Hug Assembly */}
            <div className="my-6">
              <HugAssembly isEmbracing={isHoldingHug || hugHoldProgress > 15} />
            </div>

            {/* Press and Hold Hug Button */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <button
                onPointerDown={() => setIsHoldingHug(true)}
                onPointerUp={() => setIsHoldingHug(false)}
                onPointerLeave={() => setIsHoldingHug(false)}
                className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 active:from-rose-700 active:to-rose-600 text-stone-50 font-sans font-medium text-base shadow-[0_8px_30px_rgba(244,63,94,0.4)] cursor-pointer touch-none select-none flex items-center gap-3 overflow-hidden group"
              >
                {/* Hold Progress Fill */}
                <div
                  className="absolute left-0 inset-y-0 bg-white/25 transition-all duration-75 pointer-events-none"
                  style={{ width: `${hugHoldProgress}%` }}
                />
                <Heart className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
                <span>{isHoldingHug ? 'Holding you tight...' : 'Press & hold Omar for a warm hug'}</span>
              </button>

              <motion.p
                animate={{ opacity: hugHoldProgress > 50 ? 1 : 0.7 }}
                className="font-serif italic text-lg sm:text-xl text-rose-200"
              >
                {hugHoldProgress > 50
                  ? '“Safe and sound right here in my arms.”'
                  : 'You never have to carry everything by yourself.'}
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* 2. "I NEED TO SMILE" - Omar Human Figure Appears Talking Directly to Her */}
        {selectedOption === 'smile' && (
          <motion.div
            key="smile-experience"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-12 rounded-3xl bg-stone-900/85 border border-amber-500/30 backdrop-blur-xl shadow-[0_15px_50px_rgba(251,191,36,0.2)] text-center relative overflow-hidden"
          >
            <button
              onClick={() => setSelectedOption(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/60 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Floating Sparkles */}
            {smileSparkles.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -80, scale: 1.5 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className="absolute text-2xl pointer-events-none"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                {item.emoji}
              </motion.div>
            ))}

            {/* Omar Figure Talking Directly to Her */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4">
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <OmarFigure pose="talking" isTalking={true} showCelestial={true} />
              </motion.div>

              {/* Omar's Talking Speech Bubble */}
              <div className="relative max-w-md p-6 rounded-3xl bg-stone-950/80 border border-amber-400/40 text-left shadow-lg">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-sans uppercase tracking-wider mb-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Omar is talking to you:</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={smileTalkIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif text-lg sm:text-xl text-stone-100 italic leading-relaxed"
                  >
                    “{OMAR_SMILE_TALKS[smileTalkIndex]}”
                  </motion.p>
                </AnimatePresence>
                <div className="mt-3 text-right">
                  <span className="text-xs font-arabic text-amber-300/80">ضحكتك بتنوّر دنيتي كلها</span>
                </div>
              </div>
            </div>

            {/* Interactive button to hear Omar talk more */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNextSmileTalk}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-sans font-semibold text-sm shadow-[0_6px_25px_rgba(245,158,11,0.35)] flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>Make me smile again, Omar ({smileTalkIndex + 1}/{OMAR_SMILE_TALKS.length})</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* 3. "I JUST WANT YOU TO STAY WITH ME" - Omar Sitting by Her Side Smiling Under the Moon */}
        {selectedOption === 'stay' && (
          <motion.div
            key="stay-experience"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-14 rounded-3xl bg-stone-950/95 border border-indigo-500/30 backdrop-blur-xl shadow-[0_15px_60px_rgba(99,102,241,0.25)] text-center relative overflow-hidden"
          >
            <button
              onClick={() => setSelectedOption(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/60 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Omar and Alaf Sitting Together with Sun & Moon */}
            <div className="my-6">
              <SittingTogetherAssembly isSmilingAtHer={true} />
            </div>

            {/* Quiet Progressive Reassurance Text */}
            <div className="space-y-4 max-w-md mx-auto min-h-[140px] flex flex-col items-center justify-center">
              <AnimatePresence>
                {stayStep >= 1 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="font-serif text-lg sm:text-xl text-stone-300 font-light"
                  >
                    You don’t have to say a word.
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {stayStep >= 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="font-serif text-lg sm:text-xl text-indigo-200 font-light"
                  >
                    I’m just going to sit right here, looking at you and smiling.
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {stayStep >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="font-serif text-lg sm:text-xl text-rose-300 font-light"
                  >
                    Take all the time in the world.
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {stayStep >= 4 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="font-serif italic text-2xl sm:text-3xl text-amber-200 font-normal"
                  >
                    I’m never leaving your side, يا قمر.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* 4. "I NEED REASSURANCE" */}
        {selectedOption === 'reassurance' && (
          <motion.div
            key="reassurance-experience"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-12 rounded-3xl bg-stone-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-[0_15px_50px_rgba(16,185,129,0.2)] text-left relative overflow-hidden"
          >
            <button
              onClick={() => setSelectedOption(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/60 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 text-emerald-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-serif text-xl tracking-wide">A Safe Place With Omar</span>
            </div>

            <div className="font-serif text-lg sm:text-xl text-stone-100 font-light leading-relaxed bg-stone-950/50 p-6 rounded-2xl border border-stone-800">
              {EXACT_REASSURANCE_TEXT}
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-stone-400">
              <span className="font-arabic text-emerald-300 text-sm">حبيبتي وروحي، لوفة</span>
              <span className="font-sans">Always your safe harbor</span>
            </div>
          </motion.div>
        )}

        {/* 5. "I NEED TO FEEL LOVED" */}
        {selectedOption === 'love' && (
          <motion.div
            key="love-experience"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-rose-950/60 to-stone-900/90 border border-pink-500/40 backdrop-blur-xl shadow-[0_15px_60px_rgba(236,72,153,0.3)] text-center relative overflow-hidden"
          >
            <button
              onClick={() => setSelectedOption(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/60 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center text-pink-400 mb-4"
            >
              <Heart className="w-10 h-10 fill-pink-500/50" />
            </motion.div>

            <h3 className="font-serif text-3xl text-pink-200 font-light mb-3">
              You are deeply, endlessly loved.
            </h3>
            <p className="font-arabic text-2xl text-amber-200 mb-4">
              أنتِ قمر حياتي وكل ما أملك
            </p>
            <p className="font-serif italic text-stone-200 text-lg max-w-lg mx-auto leading-relaxed">
              "You are soft without being weak, you are caring without losing your fire, you are beautiful without having to try to be, and you are loved without having to earn it, especially by me."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
