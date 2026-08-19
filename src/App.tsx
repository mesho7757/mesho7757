import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExperienceSection } from './types';
import { AmbientCanvas } from './components/AmbientCanvas';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SecretBirthdayCode } from './components/SecretBirthdayCode';
import { TactileEnvelope } from './components/TactileEnvelope';
import { PhysicalLetter } from './components/PhysicalLetter';
import { RelationshipTimers } from './components/RelationshipTimers';
import { ComfortHub } from './components/ComfortHub';
import { MemoryGarden } from './components/MemoryGarden';
import { ReasonsCounter } from './components/ReasonsCounter';
import { LotusWish } from './components/LotusWish';
import { SushiDate } from './components/SushiDate';
import { IslandScene } from './components/IslandScene';
import { RainToSunScene } from './components/RainToSunScene';
import { LofaOmarMiniGame } from './components/LofaOmarMiniGame';
import { HiddenSecrets } from './components/HiddenSecrets';
import { MusicPlayer } from './components/MusicPlayer';
import { Moon, Heart, Sparkles } from 'lucide-react';

export function App() {
  const [section, setSection] = useState<ExperienceSection>('welcome');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [letterRevealed, setLetterRevealed] = useState<boolean>(false);

  return (
    <main className="relative min-h-screen w-full bg-[#080911] text-stone-100 selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden font-sans">
      {/* Background Animated Particle Canvas */}
      <AmbientCanvas
        atmosphere={
          section === 'welcome'
            ? 'normal'
            : letterRevealed
            ? 'celebration'
            : 'normal'
        }
      />

      {/* Floating Hidden Secrets and Romantic Nicknames */}
      <HiddenSecrets />

      {/* Persistent Audio Soundtrack Controller */}
      <MusicPlayer />

      {/* Main Experience Router Flow */}
      <AnimatePresence mode="wait">
        {/* Step 1: Welcome Opening */}
        {section === 'welcome' && (
          <motion.div
            key="welcome-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
          >
            <WelcomeScreen onContinue={() => setSection('passcode')} />
          </motion.div>
        )}

        {/* Step 2: Secret Birthday Code Gate */}
        {section === 'passcode' && (
          <motion.div
            key="passcode-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
          >
            <SecretBirthdayCode
              onUnlock={() => {
                setSection('envelope');
              }}
            />
          </motion.div>
        )}

        {/* Step 3 & 4: Tactile Envelope & Continuous Physical Letter */}
        {section === 'envelope' && (
          <motion.div
            key="envelope-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-start py-12 px-4 relative z-10"
          >
            {/* Header branding */}
            <div className="text-center mb-6">
              <span className="font-arabic text-amber-200/80 text-base">
                يا روحي ويا عيني
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-100 font-light mt-1">
                A Letter From Omar
              </h2>
            </div>

            {/* Tactile Envelope */}
            <TactileEnvelope
              isOpen={isEnvelopeOpen}
              onOpen={() => {
                setIsEnvelopeOpen(true);
              }}
            />

            {/* Physical Letter emerges only after envelope is cracked and opened */}
            {isEnvelopeOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full mt-4"
              >
                <PhysicalLetter
                  onComplete={() => {
                    setLetterRevealed(true);
                  }}
                />
              </motion.div>
            )}

            {/* If letter is completed or open, user can explore the entire sanctuary world below */}
            {isEnvelopeOpen && (
              <div className="w-full mt-16 space-y-16">
                {/* 1. Relationship Timers */}
                <RelationshipTimers />

                {/* 2. What Do You Need Right Now? (Comfort Hub) */}
                <ComfortHub />

                {/* 3. Memory Garden ("Pieces of You / Memories of Us") */}
                <MemoryGarden />

                {/* 4. Reasons I Love You */}
                <ReasonsCounter />

                {/* 5. Lotus Wish */}
                <LotusWish />

                {/* 6. A Quiet Sushi Date */}
                <SushiDate />

                {/* 7. Sanctuary Island Scene */}
                <IslandScene />

                {/* 7. Rain → Beautiful World Scene */}
                <RainToSunScene />

                {/* 8. Lofa & Omar Mini-Game */}
                <LofaOmarMiniGame />

                {/* Footer Sign-off */}
                <footer className="py-20 text-center text-stone-400 select-none border-t border-stone-800/60 mt-20">
                  <div className="flex justify-center mb-3">
                    <Moon className="w-6 h-6 text-amber-300 fill-amber-300/30 animate-pulse" />
                  </div>
                  <p className="font-serif italic text-xl text-rose-200">
                    “You are my moon يا قمر... and I would choose you again.”
                  </p>
                  <p className="font-arabic text-amber-200/70 text-lg mt-2">
                    عمر ❤️ لوفة
                  </p>
                  <p className="text-xs text-stone-500 font-sans mt-4">
                    A timeless sanctuary built with love. Come back anytime you need a hug.
                  </p>
                </footer>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
