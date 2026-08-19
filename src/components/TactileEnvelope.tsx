import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface TactileEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const TactileEnvelope: React.FC<TactileEnvelopeProps> = ({ onOpen, isOpen }) => {
  const [sealCracked, setSealCracked] = useState(false);

  const handleBreakSeal = () => {
    if (isOpen) return;
    setSealCracked(true);
    romanticAudio.play();
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-10 select-none z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative w-[340px] sm:w-[460px] md:w-[560px] h-[240px] sm:h-[300px] md:h-[340px] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] perspective-1000"
      >
        {/* Envelope Back Base */}
        <div className="absolute inset-0 rounded-2xl bg-[#cbb89d] border border-[#a89578] shadow-inner overflow-hidden">
          {/* Inner lining paper pattern */}
          <div className="absolute inset-2 rounded-xl bg-[#dfd3c3] opacity-60 border border-[#b8a994] flex items-center justify-center">
            <Moon className="w-16 h-16 text-[#bdae99]/40" />
          </div>
        </div>

        {/* Envelope Side Flaps */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 560 340" fill="none">
            {/* Left flap */}
            <path
              d="M0 0 L240 170 L0 340 Z"
              fill="#d8cbb8"
              stroke="#b5a793"
              strokeWidth="1"
              className="drop-shadow-md"
            />
            {/* Right flap */}
            <path
              d="M560 0 L320 170 L560 340 Z"
              fill="#d2c4b0"
              stroke="#b5a793"
              strokeWidth="1"
              className="drop-shadow-md"
            />
            {/* Bottom flap */}
            <path
              d="M0 340 L280 160 L560 340 Z"
              fill="#dfd3c1"
              stroke="#baa994"
              strokeWidth="1.5"
              className="drop-shadow-lg"
            />
          </svg>
        </div>

        {/* Top Flap (Opens Upward upon seal break) */}
        <motion.div
          animate={{
            rotateX: isOpen ? 180 : 0,
            transformOrigin: 'top center',
            zIndex: isOpen ? 0 : 30,
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-x-0 top-0 h-[180px] pointer-events-none origin-top"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg className="w-full h-full" viewBox="0 0 560 180" fill="none">
            <path
              d="M0 0 L280 180 L560 0 Z"
              fill={isOpen ? '#c2b29c' : '#ebdcc9'}
              stroke="#baab97"
              strokeWidth="1.5"
              className="drop-shadow-xl"
            />
          </svg>
        </motion.div>

        {/* Wax Seal - Positioned in the exact center where flaps meet */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: sealCracked ? [1, 1.2, 0.8] : [1, 1.03, 1],
              opacity: sealCracked ? [1, 0.8, 0] : 1,
            }}
            transition={{
              duration: sealCracked ? 0.6 : 3,
              repeat: sealCracked ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            onClick={handleBreakSeal}
            className="absolute top-[48%] sm:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer group"
          >
            <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-rose-700 via-rose-900 to-rose-950 border-2 border-amber-400/40 shadow-[0_8px_25px_rgba(159,18,57,0.7)] flex items-center justify-center hover:scale-105 transition-transform duration-300">
              {/* Wax Seal Rim Details */}
              <div className="absolute inset-1 rounded-full border border-amber-300/30 opacity-70" />
              <div className="flex flex-col items-center justify-center text-amber-200">
                <Moon className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-300/30 text-amber-300" />
                <span className="text-[9px] sm:text-[10px] font-serif font-bold tracking-wider mt-0.5 text-amber-200">
                  O & A
                </span>
              </div>

              {/* Break hint */}
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-8 whitespace-nowrap px-3 py-1 rounded-full bg-stone-950/80 border border-amber-400/30 text-[11px] font-sans text-amber-200 shadow-lg pointer-events-none flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Tap wax seal to break</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Label for Alaf */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="font-serif italic text-xl text-rose-200/90 font-light">
          To: My Moon (Alaf)
        </p>
        <p className="font-arabic text-amber-200/60 text-sm mt-1">
          من عمر — إلى لوفة
        </p>
      </motion.div>
    </div>
  );
};
