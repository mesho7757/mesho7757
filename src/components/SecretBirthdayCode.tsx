import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Moon, Sparkles, KeyRound, HelpCircle, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface SecretBirthdayCodeProps {
  onUnlock: () => void;
}

export const SecretBirthdayCode: React.FC<SecretBirthdayCodeProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [showManualHint, setShowManualHint] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const getHintMessage = (attempts: number): string => {
    if (attempts === 1) {
      return 'Not quite... Think of the exact day the universe created my favorite person.';
    } else if (attempts === 2) {
      return 'A clue: A summer day in late June... the day my moon (يا قمر) was born.';
    } else if (attempts >= 3) {
      return 'Oh… you don’t remember your own birthday? 😉 (DD MM YYYY — 22 06 2006)';
    }
    return 'Think of the date that brought you to life.';
  };

  const validateCode = (input: string) => {
    const raw = input.toLowerCase().replace(/[\s\/\-\.,_]/g, '');

    // Target birthday variations: 22/06/2006, 22 6 2006, 22062006, 22 6 2 006, june 22 2006
    const isCorrect =
      raw === '22062006' ||
      raw === '2262006' ||
      raw === '22606' ||
      raw === '220606' ||
      raw === '2262006' ||
      raw.includes('22062006') ||
      raw.includes('2262006') ||
      raw.includes('june222006') ||
      raw.includes('22june2006');

    if (isCorrect) {
      setErrorMessage(null);
      setIsUnlocked(true);
      romanticAudio.play();
      setTimeout(() => {
        onUnlock();
      }, 1200);
    } else {
      const nextCount = attemptCount + 1;
      setAttemptCount(nextCount);
      setErrorMessage(getHintMessage(nextCount));
      setIsUnlocked(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    validateCode(passcode);
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 select-none z-10"
      id="secret-passcode-screen"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="w-full max-w-md mx-auto p-8 sm:p-10 rounded-3xl bg-stone-900/80 border border-rose-500/25 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center relative overflow-hidden"
      >
        {/* Glow ambient background orbs */}
        <div className="absolute -top-24 -left-24 w-52 h-52 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Lock / Unlock Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 mb-6 shadow-inner">
          {isUnlocked ? (
            <Unlock className="w-8 h-8 text-amber-300 animate-bounce" />
          ) : (
            <KeyRound className="w-7 h-7 text-rose-400" />
          )}
        </div>

        {/* Mysterious Title & Prompt (Does NOT reveal that it is a birthday upfront) */}
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-100 font-light mb-2">
          The Secret Key
        </h2>
        <p className="font-sans text-stone-400 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
          To enter this sanctuary, enter the sacred date that brought my moon into this world.
        </p>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Enter the secret key..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full text-center py-4 px-4 text-lg font-mono tracking-wider bg-stone-950/70 border border-stone-700/70 focus:border-rose-400/90 rounded-2xl text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-rose-500/20 shadow-inner transition-all"
            />
          </div>

          {/* Hint / Error Notification */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                key={errorMessage}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800/50 text-rose-200 text-xs sm:text-sm font-sans leading-relaxed shadow-lg"
              >
                <span className="font-medium text-amber-300 block mb-0.5">💡 Clue</span>
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Manual Hint Toggle */}
          {!errorMessage && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowManualHint(!showManualHint)}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-rose-300 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showManualHint ? 'Hide Clue' : 'Need a clue?'}</span>
              </button>
            </div>
          )}

          {showManualHint && !errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 rounded-xl bg-stone-950/50 border border-stone-800 text-stone-400 text-xs font-sans"
            >
              The most special date on Omar’s calendar... the day you were born.
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-stone-50 font-sans font-medium text-sm tracking-wide shadow-[0_6px_25px_rgba(244,63,94,0.35)] hover:shadow-[0_8px_30px_rgba(244,63,94,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isUnlocked ? 'Opening Sanctuary...' : 'Unlock The Sanctuary'}</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </button>
        </form>

        {/* Romantic Footer Inscription */}
        <div className="mt-8 flex items-center justify-center gap-2 text-stone-500 text-xs font-arabic">
          <Moon className="w-3.5 h-3.5 text-amber-200/50" />
          <span>أنتِ البداية لكل ما هو جميل</span>
        </div>
      </motion.div>
    </div>
  );
};
