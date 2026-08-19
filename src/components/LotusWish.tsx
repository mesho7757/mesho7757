import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, RefreshCw, Heart, Upload, X, Crown, Play } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { mediaStorage } from '../utils/mediaStorage';

export const LotusWish: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);
  const [lotusMedia, setLotusMedia] = useState<{
    type: 'photo' | 'video';
    dataUrl: string;
    name: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Load stored golden media if available
    mediaStorage.getGoldenMedia().then((media) => {
      if (media) setLotusMedia(media);
    });
  }, []);

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const saved = await mediaStorage.saveGoldenMedia(file);
      setLotusMedia(saved);
      if (!isOpen) {
        setIsOpen(true);
        setRipples([Date.now(), Date.now() + 300, Date.now() + 600]);
      }
      romanticAudio.play();
    }
  };

  const handleBloom = () => {
    if (!isOpen) {
      setIsOpen(true);
      setRipples([Date.now(), Date.now() + 300, Date.now() + 600]);
      romanticAudio.play();
    }
  };


  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <section id="lotus-wish" className="relative py-24 px-4 max-w-4xl mx-auto select-none">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-sans tracking-widest uppercase mb-3">
          <Moon className="w-3.5 h-3.5 text-amber-200" />
          <span>The Water Sanctuary</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 font-light tracking-tight">
          The Lotus Wish
        </h2>
        <p className="font-sans text-stone-400 text-sm mt-2 max-w-md mx-auto">
          A sacred water lotus resting on peaceful moonlit waters. Touch the blossom to watch it bloom.
        </p>
      </div>

      {/* Pond Water Stage Container */}
      <div className="relative w-full max-w-xl mx-auto aspect-square sm:aspect-[4/3] rounded-3xl bg-gradient-to-b from-[#060b17] via-[#09152a] to-[#040913] border border-cyan-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col items-center justify-between p-6 sm:p-8">
        {/* Soft Moon Reflection on Water */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18),transparent_70%)] pointer-events-none" />

        {/* Ambient Floating Starlight Spores */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${15 + Math.random() * 70}%`,
                y: `${60 + Math.random() * 30}%`,
                opacity: 0,
                scale: 0.3,
              }}
              animate={{
                y: `${10 + Math.random() * 40}%`,
                opacity: [0, 0.8, 0],
                scale: [0.3, 1, 0.4],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
            />
          ))}
        </div>

        {/* Dynamic Water Ripples */}
        <AnimatePresence>
          {ripples.map((id, index) => (
            <motion.div
              key={id}
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 4.5, opacity: 0 }}
              transition={{ duration: 3.5, ease: 'easeOut', delay: index * 0.25 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-cyan-400/40 pointer-events-none"
            />
          ))}
        </AnimatePresence>

        {/* Status / Instructions Header */}
        <div className="relative z-20 text-center">
          <span className="text-[11px] font-sans text-cyan-300/80 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isOpen ? 'Blossomed in Full Radiance' : 'Touch The Lotus To Awaken'}</span>
          </span>
        </div>

        {/* Center Botanical Realistic SVG Lotus & Lily Pad */}
        <div
          onClick={handleBloom}
          className="relative z-20 my-auto cursor-pointer group flex flex-col items-center justify-center"
        >
          {/* Radial Lotus Glow Aura */}
          <motion.div
            animate={{
              scale: isOpen ? [1.2, 1.45, 1.3] : [0.95, 1.05, 0.95],
              opacity: isOpen ? 0.85 : 0.35,
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-rose-500/30 via-pink-400/20 to-amber-300/20 blur-3xl pointer-events-none"
          />

          {/* SVG Botanical Lotus Assembly */}
          <div className="relative w-64 h-56 sm:w-80 sm:h-64 flex items-center justify-center">
            <svg
              viewBox="0 0 400 320"
              className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] overflow-visible"
            >
              <defs>
                {/* Lily Pad Gradient */}
                <radialGradient id="lilyPadGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1e3a2f" />
                  <stop offset="70%" stopColor="#0f291e" />
                  <stop offset="100%" stopColor="#071912" />
                </radialGradient>

                {/* Outer Petal Gradient */}
                <linearGradient id="outerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#fff1f2" />
                  <stop offset="35%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>

                {/* Mid Petal Gradient */}
                <linearGradient id="midPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>

                {/* Inner Petal Gradient */}
                <linearGradient id="innerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>

                {/* Golden Center Receptacle Gradient */}
                <radialGradient id="goldCoreGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="60%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </radialGradient>
              </defs>

              {/* 1. Botanical Water Lily Pad (Nelumbo nucifera leaf underneath) */}
              <g id="lily-pad" transform="translate(200, 230)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="150"
                  ry="45"
                  fill="url(#lilyPadGrad)"
                  stroke="#2dd4bf"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                {/* Leaf V-Notch & Radial Veins */}
                <path
                  d="M0,0 L-40,42 M0,0 L40,42 M0,0 L-90,25 M0,0 L90,25 M0,0 L-130,-5 M0,0 L130,-5 M0,0 L-80,-30 M0,0 L80,-30"
                  stroke="#34d399"
                  strokeWidth="1"
                  strokeOpacity="0.25"
                  fill="none"
                />
                {/* Dew Drops */}
                <circle cx="-50" cy="-10" r="3.5" fill="#a7f3d0" fillOpacity="0.8" />
                <circle cx="65" cy="8" r="2.5" fill="#a7f3d0" fillOpacity="0.7" />
              </g>

              {/* 2. Outer Lotus Sepals / Petals Layer (Unfurls wide) */}
              <g id="outer-petals" transform="translate(200, 210)">
                {/* Far Left Outer Petal */}
                <motion.path
                  d="M0,0 C-50,-20 -110,-30 -140,-10 C-110,30 -40,15 0,0 Z"
                  fill="url(#outerPetalGrad)"
                  stroke="#ffe4e6"
                  strokeWidth="0.8"
                  animate={{
                    rotate: isOpen ? -32 : -6,
                    scale: isOpen ? 1.05 : 0.75,
                  }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                  style={{ transformOrigin: '0px 0px' }}
                />
                {/* Far Right Outer Petal */}
                <motion.path
                  d="M0,0 C50,-20 110,-30 140,-10 C110,30 40,15 0,0 Z"
                  fill="url(#outerPetalGrad)"
                  stroke="#ffe4e6"
                  strokeWidth="0.8"
                  animate={{
                    rotate: isOpen ? 32 : 6,
                    scale: isOpen ? 1.05 : 0.75,
                  }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                  style={{ transformOrigin: '0px 0px' }}
                />
                {/* Bottom Center Outer Sepal */}
                <motion.path
                  d="M0,0 C-35,15 -25,45 0,55 C25,45 35,15 0,0 Z"
                  fill="url(#outerPetalGrad)"
                  stroke="#ffe4e6"
                  strokeWidth="0.8"
                  animate={{
                    scaleY: isOpen ? 1.1 : 0.6,
                    opacity: isOpen ? 0.9 : 0.5,
                  }}
                  transition={{ duration: 1.6 }}
                  style={{ transformOrigin: '0px 0px' }}
                />
              </g>

              {/* 3. Middle Lotus Petals Layer */}
              <g id="mid-petals" transform="translate(200, 205)">
                {/* Mid Left Petal */}
                <motion.path
                  d="M0,0 C-45,-40 -85,-75 -95,-105 C-55,-95 -15,-45 0,0 Z"
                  fill="url(#midPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  animate={{
                    rotate: isOpen ? -26 : -8,
                    scale: isOpen ? 1 : 0.85,
                  }}
                  transition={{ duration: 1.6, delay: 0.1, ease: 'easeOut' }}
                  style={{ transformOrigin: '0px 0px' }}
                />
                {/* Mid Right Petal */}
                <motion.path
                  d="M0,0 C45,-40 85,-75 95,-105 C55,-95 15,-45 0,0 Z"
                  fill="url(#midPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  animate={{
                    rotate: isOpen ? 26 : 8,
                    scale: isOpen ? 1 : 0.85,
                  }}
                  transition={{ duration: 1.6, delay: 0.1, ease: 'easeOut' }}
                  style={{ transformOrigin: '0px 0px' }}
                />
                {/* Mid Center Left Petal */}
                <motion.path
                  d="M0,0 C-30,-55 -55,-105 -50,-135 C-20,-115 -5,-55 0,0 Z"
                  fill="url(#midPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  animate={{
                    rotate: isOpen ? -14 : -3,
                    scale: isOpen ? 1.02 : 0.9,
                  }}
                  transition={{ duration: 1.5, delay: 0.15, ease: 'easeOut' }}
                  style={{ transformOrigin: '0px 0px' }}
                />
                {/* Mid Center Right Petal */}
                <motion.path
                  d="M0,0 C30,-55 55,-105 50,-135 C20,-115 5,-55 0,0 Z"
                  fill="url(#midPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  animate={{
                    rotate: isOpen ? 14 : 3,
                    scale: isOpen ? 1.02 : 0.9,
                  }}
                  transition={{ duration: 1.5, delay: 0.15, ease: 'easeOut' }}
                  style={{ transformOrigin: '0px 0px' }}
                />
              </g>

              {/* 4. Inner Lotus Petals Layer (Crown Petals) */}
              <g id="inner-petals" transform="translate(200, 200)">
                {/* Center Top Tallest Petal */}
                <motion.path
                  d="M0,0 C-25,-60 -30,-125 0,-155 C30,-125 25,-60 0,0 Z"
                  fill="url(#innerPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="1"
                  animate={{
                    scaleY: isOpen ? 1 : 0.92,
                    scaleX: isOpen ? 1.15 : 0.85,
                  }}
                  transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
                  style={{ transformOrigin: '0px 0px' }}
                />
                {/* Inner Left Petal */}
                <motion.path
                  d="M0,0 C-25,-45 -40,-95 -25,-125 C-5,-95 -2,-45 0,0 Z"
                  fill="url(#innerPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  animate={{
                    rotate: isOpen ? -8 : -1,
                  }}
                  transition={{ duration: 1.3, delay: 0.25 }}
                  style={{ transformOrigin: '0px 0px' }}
                />
                {/* Inner Right Petal */}
                <motion.path
                  d="M0,0 C25,-45 40,-95 25,-125 C5,-95 2,-45 0,0 Z"
                  fill="url(#innerPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  animate={{
                    rotate: isOpen ? 8 : 1,
                  }}
                  transition={{ duration: 1.3, delay: 0.25 }}
                  style={{ transformOrigin: '0px 0px' }}
                />
              </g>

              {/* 5. Golden Center Lotus Seedpod & Anther Filaments */}
              <g id="golden-core" transform="translate(200, 195)">
                {/* Center Glowing Receptacle */}
                <motion.ellipse
                  cx="0"
                  cy="0"
                  rx={isOpen ? 22 : 12}
                  ry={isOpen ? 12 : 7}
                  fill="url(#goldCoreGrad)"
                  stroke="#fef08a"
                  strokeWidth="1.5"
                  animate={{
                    scale: isOpen ? [1, 1.15, 1] : 0.8,
                    opacity: isOpen ? 1 : 0.4,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Golden Stamens / Pollen Filaments */}
                {isOpen && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <circle cx="-10" cy="-3" r="2" fill="#78350f" />
                    <circle cx="0" cy="-4" r="2" fill="#78350f" />
                    <circle cx="10" cy="-3" r="2" fill="#78350f" />
                    <circle cx="-5" cy="2" r="2" fill="#78350f" />
                    <circle cx="5" cy="2" r="2" fill="#78350f" />
                  </motion.g>
                )}
              </g>
            </svg>
          </div>

          {/* Interactive Tap Prompt Badge */}
          {!isOpen && (
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-rose-500/40 text-xs font-sans text-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.3)] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tap to gently open the lotus</span>
            </motion.div>
          )}
        </div>

        {/* Revealed Sacred Message & Keepsake with Gentle Illumination */}
        <div className="relative z-30 min-h-[90px] w-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaUpload}
            className="hidden"
          />

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="w-full space-y-3"
              >
                {lotusMedia ? (
                  <div className="relative max-w-xs mx-auto rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-[0_0_30px_rgba(251,191,36,0.4)] bg-black">
                    {lotusMedia.type === 'video' ? (
                      <video
                        src={lotusMedia.dataUrl}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="w-full max-h-56 object-contain"
                      />
                    ) : (
                      <img
                        src={lotusMedia.dataUrl}
                        alt="Lotus Keepsake"
                        className="w-full max-h-56 object-contain"
                      />
                    )}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-950/80 text-amber-200 hover:text-white border border-amber-400/40 text-xs"
                      title="Replace media"
                    >
                      <Upload className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-serif text-2xl sm:text-3xl text-amber-100 font-light tracking-wide drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]">
                      “I hope tomorrow is kinder to you.”
                    </h3>
                    <p className="font-arabic text-rose-300 text-base sm:text-lg">
                      أتمنى أن يكون الغد ألطف بك يا قمر
                    </p>
                  </>
                )}

                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 text-amber-200 text-xs font-sans transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>{lotusMedia ? 'Change Photo/Video' : 'Put Photo or Video Inside'}</span>
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-sans transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Rest Lotus</span>
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
