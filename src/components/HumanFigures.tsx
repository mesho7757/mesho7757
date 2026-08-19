import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Heart, Sparkles } from 'lucide-react';

interface FigureProps {
  pose?: 'standing' | 'sitting' | 'talking' | 'smiling' | 'hugging' | 'finger-heart';
  size?: 'sm' | 'md' | 'lg';
  showCelestial?: boolean;
}

// Highly Detailed Botanical/Vector Human Figure for Omar (Egyptian guy, black hair, black eyelashes/warm gaze, cozy dark sweater/shirt)
export const OmarFigure: React.FC<FigureProps & { isTalking?: boolean; isLookingAtHer?: boolean }> = ({
  pose = 'standing',
  size = 'md',
  showCelestial = true,
  isTalking = false,
  isLookingAtHer = false,
}) => {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;

  return (
    <div className="relative flex flex-col items-center select-none" style={{ transform: `scale(${scale})` }}>
      {/* Floating Sun Above Omar */}
      {showCelestial && (
        <motion.div
          animate={{
            y: [-3, 3, -3],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
          }}
          className="relative z-20 -mb-2 flex flex-col items-center"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.8)] flex items-center justify-center">
            <Sun className="w-5 h-5 text-amber-950" />
          </div>
        </motion.div>
      )}

      {/* SVG Human Figure for Omar */}
      <svg
        viewBox="0 0 100 160"
        className="w-24 h-36 sm:w-28 sm:h-40 overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <radialGradient id="omarSkin" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#e5a882" />
            <stop offset="100%" stopColor="#c57e56" />
          </radialGradient>
          <linearGradient id="omarHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="100%" stopColor="#0c0a09" />
          </linearGradient>
          <linearGradient id="omarSweater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="100%" stopColor="#1c1917" />
          </linearGradient>
        </defs>

        {/* Head & Neck Group */}
        <g id="omar-head">
          {/* Neck */}
          <rect x="45" y="44" width="10" height="12" rx="3" fill="url(#omarSkin)" />

          {/* Head Shape */}
          <ellipse cx="50" cy="32" rx="16" ry="18" fill="url(#omarSkin)" />

          {/* Natural Black Hair (Styled clean side-part / subtle wave) */}
          <path
            d="M33,30 C32,16 42,10 52,10 C64,10 68,18 68,28 C68,30 65,33 63,30 C60,20 48,16 38,24 C34,27 33,30 33,30 Z"
            fill="url(#omarHair)"
          />
          {/* Hair back & sideburns */}
          <path d="M33,26 C33,38 35,42 36,44 C34,40 33,34 33,26 Z" fill="url(#omarHair)" />
          <path d="M67,26 C67,38 65,42 64,44 C66,40 67,34 67,26 Z" fill="url(#omarHair)" />

          {/* Eyebrows */}
          <path d="M39,26 Q44,24 47,26" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M53,26 Q56,24 61,26" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Black Eyelashes & Warm Brown/Black Eyes */}
          {/* Left Eye */}
          <ellipse cx="43" cy="30" rx="3" ry="2" fill="#1c1917" />
          <circle cx="44" cy="29.5" r="0.8" fill="#ffffff" />
          {/* Right Eye */}
          <ellipse cx="57" cy="30" rx="3" ry="2" fill="#1c1917" />
          <circle cx="58" cy="29.5" r="0.8" fill="#ffffff" />

          {/* Nose */}
          <path d="M50,30 L49,36 L52,36" stroke="#a0603c" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Smile / Mouth */}
          <motion.path
            d={isTalking ? 'M44,41 Q50,47 56,41 Q50,44 44,41 Z' : 'M44,41 Q50,45 56,41'}
            stroke="#833c24"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill={isTalking ? '#833c24' : 'none'}
            animate={isTalking ? { scaleY: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.3, repeat: Infinity }}
          />

          {/* Cute subtle blush */}
          <ellipse cx="39" cy="34" rx="3.5" ry="1.5" fill="#f43f5e" fillOpacity="0.25" />
          <ellipse cx="61" cy="34" rx="3.5" ry="1.5" fill="#f43f5e" fillOpacity="0.25" />
        </g>

        {/* Torso & Clothes */}
        <g id="omar-body">
          {/* Cozy Dark Sweater Body */}
          <path
            d="M32,54 C36,50 44,48 50,48 C56,48 64,50 68,54 L72,98 C72,100 68,102 50,102 C32,102 28,100 28,98 Z"
            fill="url(#omarSweater)"
          />
          {/* Collar detail */}
          <path d="M44,48 Q50,53 56,48" stroke="#44403c" strokeWidth="1.5" fill="none" />

          {/* Arms */}
          {pose === 'sitting' ? (
            <>
              {/* Sitting arms resting */}
              <path d="M30,56 C24,70 28,88 38,92" stroke="#292524" strokeWidth="9" strokeLinecap="round" fill="none" />
              <path d="M70,56 C76,70 72,88 62,92" stroke="#292524" strokeWidth="9" strokeLinecap="round" fill="none" />
              <circle cx="38" cy="92" r="4.5" fill="url(#omarSkin)" />
              <circle cx="62" cy="92" r="4.5" fill="url(#omarSkin)" />
            </>
          ) : (
            <>
              {/* Standing arms */}
              <path d="M30,56 C25,72 26,90 28,102" stroke="#292524" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M70,56 C75,72 74,90 72,102" stroke="#292524" strokeWidth="8" strokeLinecap="round" fill="none" />
              <circle cx="28" cy="103" r="4.5" fill="url(#omarSkin)" />
              <circle cx="72" cy="103" r="4.5" fill="url(#omarSkin)" />
            </>
          )}

          {/* Pants / Legs */}
          {pose === 'sitting' ? (
            <g id="omar-legs-sitting">
              <path d="M34,102 L22,120 L40,124 L48,102 Z" fill="#1e293b" />
              <path d="M66,102 L78,120 L60,124 L52,102 Z" fill="#1e293b" />
              <ellipse cx="40" cy="125" rx="7" ry="4" fill="#0f172a" />
              <ellipse cx="60" cy="125" rx="7" ry="4" fill="#0f172a" />
            </g>
          ) : (
            <g id="omar-legs-standing">
              <rect x="36" y="100" width="11" height="48" rx="4" fill="#1e293b" />
              <rect x="53" y="100" width="11" height="48" rx="4" fill="#1e293b" />
              <ellipse cx="41" cy="150" rx="8" ry="4" fill="#0f172a" />
              <ellipse cx="59" cy="150" rx="8" ry="4" fill="#0f172a" />
            </g>
          )}
        </g>
      </svg>
      <span className="text-xs font-sans text-amber-200 mt-1 font-medium">Omar</span>
    </div>
  );
};

// Highly Detailed Botanical/Vector Human Figure for Alaf (Baby face, chubby cheeks, soft curly/wavy hair, pretty brown eyes, sweet smile)
export const AlafFigure: React.FC<FigureProps & { isSmiling?: boolean; showHeartGesture?: boolean }> = ({
  pose = 'standing',
  size = 'md',
  showCelestial = true,
  isSmiling = true,
  showHeartGesture = false,
}) => {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;

  return (
    <div className="relative flex flex-col items-center select-none" style={{ transform: `scale(${scale})` }}>
      {/* Floating Moon Above Alaf */}
      {showCelestial && (
        <motion.div
          animate={{
            y: [-3, 3, -3],
            rotate: [-8, 8, -8],
          }}
          transition={{
            y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative z-20 -mb-2 flex flex-col items-center"
        >
          <div className="w-8 h-8 rounded-full bg-stone-950 border-r-2 border-b-2 border-indigo-200 shadow-[0_0_20px_rgba(199,210,254,0.8)] flex items-center justify-center -rotate-45">
            <Moon className="w-5 h-5 text-indigo-100 fill-indigo-100/30 rotate-45" />
          </div>
        </motion.div>
      )}

      {/* SVG Human Figure for Alaf */}
      <svg
        viewBox="0 0 100 160"
        className="w-24 h-36 sm:w-28 sm:h-40 overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <radialGradient id="alafSkin" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#fde0cc" />
            <stop offset="100%" stopColor="#f5bc98" />
          </radialGradient>
          <linearGradient id="alafHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#271c19" />
            <stop offset="50%" stopColor="#1f1614" />
            <stop offset="100%" stopColor="#120c0a" />
          </linearGradient>
          <linearGradient id="alafTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>

        {/* Soft Curly/Wavy Hair Backing */}
        <g id="alaf-hair-back">
          <circle cx="30" cy="30" r="10" fill="url(#alafHair)" />
          <circle cx="70" cy="30" r="10" fill="url(#alafHair)" />
          <circle cx="26" cy="42" r="11" fill="url(#alafHair)" />
          <circle cx="74" cy="42" r="11" fill="url(#alafHair)" />
          <circle cx="28" cy="55" r="12" fill="url(#alafHair)" />
          <circle cx="72" cy="55" r="12" fill="url(#alafHair)" />
        </g>

        {/* Head, Baby Face, & Chubby Cheeks */}
        <g id="alaf-head">
          {/* Neck */}
          <rect x="46" y="45" width="8" height="10" rx="3" fill="url(#alafSkin)" />

          {/* Baby Face Outline (Softer, rounder contours with cute chubby cheeks) */}
          <path
            d="M34,32 C34,20 42,14 50,14 C58,14 66,20 66,32 C68,40 64,48 50,48 C36,48 32,40 34,32 Z"
            fill="url(#alafSkin)"
          />

          {/* Cute Chubby Cheeks Highlight */}
          <circle cx="38" cy="36" r="6" fill="#fb7185" fillOpacity="0.4" />
          <circle cx="62" cy="36" r="6" fill="#fb7185" fillOpacity="0.4" />

          {/* Front Curly Curls / Bangs Frame */}
          <path
            d="M32,24 C34,16 44,12 50,12 C56,12 66,16 68,24 C64,20 58,18 50,20 C42,18 36,20 32,24 Z"
            fill="url(#alafHair)"
          />
          {/* Cute Soft Tendril Curls framing face */}
          <circle cx="34" cy="24" r="5" fill="url(#alafHair)" />
          <circle cx="66" cy="24" r="5" fill="url(#alafHair)" />

          {/* Delicate Eyebrows */}
          <path d="M40,25 Q44,23 47,25" stroke="#271c19" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M53,25 Q56,23 60,25" stroke="#271c19" strokeWidth="1.3" strokeLinecap="round" fill="none" />

          {/* Pretty Warm Brown Eyes with Sweet Sparkle */}
          {/* Left Eye */}
          <ellipse cx="43" cy="29" rx="3.2" ry="2.5" fill="#3b2219" />
          <circle cx="43.8" cy="28.2" r="1" fill="#ffffff" />
          {/* Right Eye */}
          <ellipse cx="57" cy="29" rx="3.2" ry="2.5" fill="#3b2219" />
          <circle cx="57.8" cy="28.2" r="1" fill="#ffffff" />

          {/* Cute Soft Nose */}
          <path d="M50,29 Q49,34 51,34" stroke="#d97706" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* Sweet Radiating Smile */}
          <path
            d="M44,39 Q50,45 56,39"
            stroke="#e11d48"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Torso & Outfit */}
        <g id="alaf-body">
          {/* Sweet Rose Top / Soft Outfit */}
          <path
            d="M34,54 C38,50 44,48 50,48 C56,48 62,50 66,54 L70,96 C70,98 64,100 50,100 C36,100 30,98 30,96 Z"
            fill="url(#alafTop)"
          />
          {/* Collar line */}
          <path d="M45,49 Q50,54 55,49" stroke="#ffe4e6" strokeWidth="1.2" fill="none" />

          {/* Arms */}
          {pose === 'finger-heart' || showHeartGesture ? (
            <>
              {/* Cute Korean finger-heart gesture arms raised together */}
              <path d="M32,56 C30,68 40,78 48,74" stroke="#fda4af" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M68,56 C70,68 60,78 52,74" stroke="#fda4af" strokeWidth="7" strokeLinecap="round" fill="none" />
              {/* Hands making finger heart */}
              <circle cx="50" cy="73" r="5" fill="url(#alafSkin)" />
            </>
          ) : pose === 'sitting' ? (
            <>
              <path d="M32,56 C28,70 32,86 42,90" stroke="#fda4af" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M68,56 C72,70 68,86 58,90" stroke="#fda4af" strokeWidth="7" strokeLinecap="round" fill="none" />
              <circle cx="42" cy="90" r="4" fill="url(#alafSkin)" />
              <circle cx="58" cy="90" r="4" fill="url(#alafSkin)" />
            </>
          ) : (
            <>
              <path d="M32,56 C28,72 30,88 32,98" stroke="#fda4af" strokeWidth="6.5" strokeLinecap="round" fill="none" />
              <path d="M68,56 C72,72 70,88 68,98" stroke="#fda4af" strokeWidth="6.5" strokeLinecap="round" fill="none" />
              <circle cx="32" cy="99" r="4" fill="url(#alafSkin)" />
              <circle cx="68" cy="99" r="4" fill="url(#alafSkin)" />
            </>
          )}

          {/* Skirt / Pants */}
          {pose === 'sitting' ? (
            <g id="alaf-legs-sitting">
              <path d="M34,98 L24,116 L42,120 L48,98 Z" fill="#334155" />
              <path d="M66,98 L76,116 L58,120 L52,98 Z" fill="#334155" />
              <ellipse cx="42" cy="122" rx="6" ry="3.5" fill="#e2e8f0" />
              <ellipse cx="58" cy="122" rx="6" ry="3.5" fill="#e2e8f0" />
            </g>
          ) : (
            <g id="alaf-legs-standing">
              <rect x="37" y="98" width="10" height="46" rx="3" fill="#334155" />
              <rect x="53" y="98" width="10" height="46" rx="3" fill="#334155" />
              <ellipse cx="42" cy="146" rx="7" ry="3.5" fill="#e2e8f0" />
              <ellipse cx="58" cy="146" rx="7" ry="3.5" fill="#e2e8f0" />
            </g>
          )}
        </g>
      </svg>
      <span className="text-xs font-sans text-rose-200 mt-1 font-medium">Alaf</span>
    </div>
  );
};

// Tender Hug Assembly: Omar & Alaf Embracing with Sun & Moon floating above them and Alaf saying "I love you, Omar"
export const HugAssembly: React.FC<{ isEmbracing: boolean }> = ({ isEmbracing }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Sun and Moon Floating Above in Harmony */}
      <div className="flex items-center gap-6 mb-2">
        {/* Sun (Above Omar) */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
            x: isEmbracing ? 8 : 0,
            scale: isEmbracing ? 1.15 : 1,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-200 shadow-[0_0_25px_rgba(251,191,36,0.9)] flex items-center justify-center"
        >
          <Sun className="w-6 h-6 text-amber-950" />
        </motion.div>

        {/* Central Love Glow */}
        {isEmbracing && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_#f43f5e]" />
          </motion.div>
        )}

        {/* Moon (Above Alaf) */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
            x: isEmbracing ? -8 : 0,
            scale: isEmbracing ? 1.15 : 1,
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full bg-stone-950 border-r-2 border-b-2 border-indigo-200 shadow-[0_0_25px_rgba(199,210,254,0.9)] flex items-center justify-center -rotate-45"
        >
          <Moon className="w-6 h-6 text-indigo-100 fill-indigo-100/30 rotate-45" />
        </motion.div>
      </div>

      {/* Alaf's "I love you" speech bubble during hug */}
      <div className="min-h-[36px] flex items-center justify-center">
        {isEmbracing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full bg-rose-500/30 border border-rose-400/60 backdrop-blur-md shadow-lg flex items-center gap-2"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-300 animate-pulse" />
            <span className="font-serif italic text-sm text-rose-100">
              “I love you, Omar ❤️”
            </span>
            <span className="font-arabic text-amber-200 text-xs">أحبك</span>
          </motion.div>
        )}
      </div>

      {/* Human Figures Moving Into a Warm Hug */}
      <div className="relative flex items-center justify-center min-h-[170px]">
        {/* Omar Figure */}
        <motion.div
          animate={{
            x: isEmbracing ? 28 : 0,
            rotate: isEmbracing ? 4 : 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10"
        >
          <OmarFigure showCelestial={false} pose="standing" />
        </motion.div>

        {/* Alaf Figure */}
        <motion.div
          animate={{
            x: isEmbracing ? -28 : 0,
            rotate: isEmbracing ? -4 : 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-20 -ml-4"
        >
          <AlafFigure showCelestial={false} pose="standing" isSmiling={true} />
        </motion.div>

        {/* Warm Embrace Light Aura */}
        <motion.div
          animate={{
            opacity: isEmbracing ? 0.85 : 0,
            scale: isEmbracing ? [1, 1.25, 1.1] : 0.8,
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-tr from-rose-500/30 via-amber-400/20 to-pink-500/30 blur-2xl pointer-events-none rounded-full"
        />
      </div>
    </div>
  );
};

// Side-by-Side Sitting Together Assembly: Omar looking at Alaf and smiling under the stars
export const SittingTogetherAssembly: React.FC<{ isSmilingAtHer?: boolean }> = ({ isSmilingAtHer = true }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Sun & Moon floating in the sky above them */}
      <div className="flex items-center justify-between w-48 mb-1">
        {/* Sun above Omar */}
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.7)] flex items-center justify-center">
          <Sun className="w-4 h-4 text-amber-950" />
        </div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
        </motion.div>

        {/* Moon above Alaf */}
        <div className="w-7 h-7 rounded-full bg-stone-950 border border-indigo-200 shadow-[0_0_15px_rgba(199,210,254,0.7)] flex items-center justify-center -rotate-45">
          <Moon className="w-4 h-4 text-indigo-100 rotate-45" />
        </div>
      </div>

      {/* Figures sitting side-by-side */}
      <div className="relative flex items-center justify-center gap-2">
        {/* Omar sitting, turned slightly towards Alaf */}
        <motion.div
          animate={{
            rotate: isSmilingAtHer ? 5 : 0,
            x: 6,
          }}
          transition={{ duration: 0.5 }}
        >
          <OmarFigure showCelestial={false} pose="sitting" isLookingAtHer={true} />
        </motion.div>

        {/* Soft holding hands connection */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="z-30 -my-2"
        >
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400 drop-shadow-md" />
        </motion.div>

        {/* Alaf sitting cozily beside him */}
        <motion.div
          animate={{
            rotate: -4,
            x: -6,
          }}
          transition={{ duration: 0.5 }}
        >
          <AlafFigure showCelestial={false} pose="sitting" isSmiling={true} />
        </motion.div>
      </div>
    </div>
  );
};
