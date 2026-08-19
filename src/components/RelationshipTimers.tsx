import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, Sparkles, Calendar } from 'lucide-react';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const RelationshipTimers: React.FC = () => {
  const [togetherTime, setTogetherTime] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [beginningTime, setBeginningTime] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Dates requested:
  // Timer 1: November 26, 2025
  // Timer 2: November 18, 2025
  const togetherDate = new Date('2025-11-26T00:00:00');
  const beginningDate = new Date('2025-11-18T00:00:00');

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();

      // For TOGETHER SINCE (Nov 26, 2025)
      const togetherDiff = Math.abs(now - togetherDate.getTime());
      const tDays = Math.floor(togetherDiff / (1000 * 60 * 60 * 24));
      const tHours = Math.floor((togetherDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const tMinutes = Math.floor((togetherDiff % (1000 * 60 * 60)) / (1000 * 60));
      const tSeconds = Math.floor((togetherDiff % (1000 * 60)) / 1000);
      setTogetherTime({ days: tDays, hours: tHours, minutes: tMinutes, seconds: tSeconds });

      // For SINCE THE BEGINNING OF EVERYTHING (Nov 18, 2025)
      const begDiff = Math.abs(now - beginningDate.getTime());
      const bDays = Math.floor(begDiff / (1000 * 60 * 60 * 24));
      const bHours = Math.floor((begDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const bMinutes = Math.floor((begDiff % (1000 * 60 * 60)) / (1000 * 60));
      const bSeconds = Math.floor((begDiff % (1000 * 60)) / 1000);
      setBeginningTime({ days: bDays, hours: bHours, minutes: bMinutes, seconds: bSeconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="relationship-timers" className="relative py-20 px-4 max-w-5xl mx-auto select-none">
      <div className="text-center mb-12">
        <span className="font-arabic text-rose-300 text-lg">يا روحي ويا قلبي</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light mt-1 tracking-tight">
          Every Second With You
        </h2>
        <p className="font-sans text-stone-400 text-sm mt-2 max-w-md mx-auto">
          Time measured not in ordinary clocks, but in every heartbeat shared between Omar and Alaf.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Timer 1: TOGETHER SINCE November 26, 2025 */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative p-7 sm:p-8 rounded-3xl bg-stone-900/60 border border-rose-500/25 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Heart className="w-24 h-24 text-rose-400 fill-rose-400" />
          </div>

          <div className="flex items-center gap-2.5 text-rose-400 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-sans tracking-widest uppercase font-semibold">
              November 26, 2025
            </span>
          </div>

          <h3 className="font-serif text-2xl text-stone-100 font-light mb-6">
            Together Since
          </h3>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
              <span className="block font-mono text-2xl sm:text-3xl text-rose-300 font-bold">
                {togetherTime.days}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Days</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
              <span className="block font-mono text-2xl sm:text-3xl text-stone-100 font-bold">
                {String(togetherTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Hours</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
              <span className="block font-mono text-2xl sm:text-3xl text-stone-100 font-bold">
                {String(togetherTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Mins</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
              <span className="block font-mono text-2xl sm:text-3xl text-amber-300 font-bold animate-pulse">
                {String(togetherTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Secs</span>
            </div>
          </div>
        </motion.div>

        {/* Timer 2: SINCE THE BEGINNING OF EVERYTHING November 18, 2025 */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative p-7 sm:p-8 rounded-3xl bg-stone-900/60 border border-amber-500/25 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-24 h-24 text-amber-400" />
          </div>

          <div className="flex items-center gap-2.5 text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-sans tracking-widest uppercase font-semibold">
              November 18, 2025
            </span>
          </div>

          <h3 className="font-serif text-2xl text-stone-100 font-light mb-6">
            Since The Beginning Of Everything
          </h3>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
              <span className="block font-mono text-2xl sm:text-3xl text-amber-300 font-bold">
                {beginningTime.days}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Days</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
              <span className="block font-mono text-2xl sm:text-3xl text-stone-100 font-bold">
                {String(beginningTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Hours</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
              <span className="block font-mono text-2xl sm:text-3xl text-stone-100 font-bold">
                {String(beginningTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Mins</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
              <span className="block font-mono text-2xl sm:text-3xl text-rose-400 font-bold animate-pulse">
                {String(beginningTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Secs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
