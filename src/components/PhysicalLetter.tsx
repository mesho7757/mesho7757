import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { EXACT_LOVE_LETTER } from '../data/letter';
import { Sparkles, Heart, ChevronDown, Hand, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface PhysicalLetterProps {
  onComplete: () => void;
}

export const PhysicalLetter: React.FC<PhysicalLetterProps> = ({ onComplete }) => {
  // Height of paper pulled out in pixels
  const [pullProgress, setPullProgress] = useState<number>(140);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [dragStartY, setDragStartY] = useState<number>(0);
  const [startPullProgress, setStartPullProgress] = useState<number>(140);
  const [velocity, setVelocity] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const maxPullHeightRef = useRef<number>(1600);

  // Measure content height dynamically
  useEffect(() => {
    if (contentRef.current) {
      maxPullHeightRef.current = contentRef.current.scrollHeight + 180;
    }
  }, []);

  // Trigger celebration when completed
  const triggerCelebration = useCallback(() => {
    if (isCompleted) return;
    setIsCompleted(true);
    onComplete();

    // Confetti & Petal fireworks
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fbbf24', '#fda4af', '#f472b6', '#fff1f2'],
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, [isCompleted, onComplete]);

  // Pointer drag handling with spring physics
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartY(e.clientY);
    setStartPullProgress(pullProgress);
    setVelocity(0);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartY;
    const targetHeight = Math.max(140, Math.min(maxPullHeightRef.current, startPullProgress + deltaY));
    
    // Calculate instantaneous velocity for momentum
    const instantVelocity = targetHeight - pullProgress;
    setVelocity(instantVelocity);
    setPullProgress(targetHeight);

    if (targetHeight >= maxPullHeightRef.current - 40 && !isCompleted) {
      triggerCelebration();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    // Apply natural momentum and settling
    if (Math.abs(velocity) > 5) {
      const momentumTarget = Math.max(
        140,
        Math.min(maxPullHeightRef.current, pullProgress + velocity * 6)
      );
      setPullProgress(momentumTarget);
      if (momentumTarget >= maxPullHeightRef.current - 40 && !isCompleted) {
        triggerCelebration();
      }
    }
  };

  const pullPercentage = Math.min(100, Math.round((pullProgress / maxPullHeightRef.current) * 100));

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto flex flex-col items-center select-none py-6"
      id="physical-letter-container"
    >
      {/* Envelope Mouth / Slot that the paper physically emerges from */}
      <div className="relative z-30 w-[340px] sm:w-[480px] md:w-[560px] h-12 bg-[#2c1d11] rounded-t-xl border-x-4 border-t-4 border-[#8c7355] shadow-2xl flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-amber-200/80 text-xs font-serif italic">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Handwritten by Omar</span>
        </div>
        <div className="text-[11px] font-sans font-medium text-amber-300/80 bg-stone-900/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
          {pullPercentage}% Pulled
        </div>
      </div>

      {/* The Physical Paper Sheet */}
      <div
        className="relative z-20 w-[320px] sm:w-[450px] md:w-[530px] parchment-texture rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-x border-b border-[#d4be9c] overflow-hidden transition-all duration-75 ease-out"
        style={{
          height: `${pullProgress}px`,
          maxHeight: `${maxPullHeightRef.current}px`,
          transform: isDragging ? 'scale(1.008)' : 'scale(1)',
          boxShadow: isDragging
            ? '0 30px 60px rgba(0,0,0,0.9), 0 0 30px rgba(251,191,36,0.2)'
            : '0 20px 50px rgba(0,0,0,0.85)',
        }}
      >
        {/* Paper top crease shadow where it comes out of the envelope */}
        <div className="sticky top-0 inset-x-0 h-8 bg-gradient-to-b from-[#2a1b0e]/30 to-transparent pointer-events-none z-10" />

        {/* Paper Content Wrapper */}
        <div ref={contentRef} className="px-6 sm:px-10 pt-4 pb-20 text-[#2b221b]">
          {/* Letter Heading */}
          <div className="border-b border-[#cfbca3] pb-4 mb-6 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#3d2719] font-normal tracking-wide">
              For My Moon, Alaf
            </h3>
            <p className="font-handwriting text-xl text-rose-800 mt-1">
              A place for you to return to, always.
            </p>
          </div>

          {/* Complete Love Letter Text — Guaranteed No Hyphenation */}
          <div
            className="love-letter-text font-serif text-base sm:text-lg md:text-[19px] text-[#2c2016] text-justify leading-relaxed selection:bg-rose-200 selection:text-rose-900"
            style={{
              hyphens: 'none',
              WebkitHyphens: 'none',
              msHyphens: 'none',
              overflowWrap: 'normal',
              wordBreak: 'normal',
            }}
          >
            {EXACT_LOVE_LETTER}
          </div>

          {/* Letter Signoff */}
          <div className="mt-8 pt-6 border-t border-[#d8c7af] text-right font-handwriting text-2xl sm:text-3xl text-rose-900">
            <p className="font-arabic text-xl text-amber-900 mb-1 text-right">
              حبيبك وزوجك، عمر
            </p>
            <p>Forever your Omar</p>
          </div>
        </div>

        {/* Pull Handle at Bottom Edge */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#e8d7be] via-[#f5e9d6] to-transparent cursor-grab active:cursor-grabbing flex flex-col items-center justify-end pb-2.5 z-20 group touch-none"
        >
          {/* Subtle tactile grip lines */}
          <div className="w-16 h-1 rounded-full bg-[#a89379]/50 mb-1.5 group-hover:bg-rose-600 transition-colors" />
          <div className="flex items-center gap-1.5 text-xs font-sans font-medium text-[#5c4935] group-hover:text-rose-800 transition-colors">
            {isCompleted ? (
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Entire letter revealed
              </span>
            ) : (
              <>
                <Hand className="w-3.5 h-3.5 animate-bounce text-rose-700" />
                <span>Pull down to read more</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick pull button / helper for effortless interaction */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => {
            const next = Math.min(maxPullHeightRef.current, pullProgress + 350);
            setPullProgress(next);
            if (next >= maxPullHeightRef.current - 40 && !isCompleted) {
              triggerCelebration();
            }
          }}
          className="px-4 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-xs font-sans text-stone-300 hover:text-amber-200 transition-all flex items-center gap-1.5 shadow-md"
        >
          <span>Pull More Paper</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {!isCompleted && (
          <button
            onClick={() => {
              setPullProgress(maxPullHeightRef.current);
              triggerCelebration();
            }}
            className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-700/60 text-xs font-sans text-rose-200 transition-all flex items-center gap-1.5 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Unroll Entire Letter</span>
          </button>
        )}
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-rose-950/80 via-stone-900/90 to-amber-950/80 border border-rose-500/40 text-center max-w-lg shadow-[0_10px_35px_rgba(244,63,94,0.25)]"
          >
            <div className="inline-flex p-2.5 rounded-2xl bg-rose-500/20 text-rose-300 mb-3">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-400 animate-pulse" />
            </div>
            <h4 className="font-serif text-2xl text-stone-100 font-light">
              Always Here For You, My Moon.
            </h4>
            <p className="font-sans text-stone-300 text-sm mt-2 leading-relaxed">
              Whenever life feels too heavy, scroll down to explore our little world,
              visit our memory garden, hug me anytime, or sit with me on our island.
            </p>
            <div className="mt-4 flex justify-center">
              <a
                href="#relationship-timers"
                className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-stone-50 text-xs font-sans font-medium tracking-wider uppercase transition-all shadow-lg flex items-center gap-2"
              >
                <span>Continue into Our World</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
