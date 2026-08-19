import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Music, Upload, ChevronUp, ChevronDown } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.55);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Check initial state
    setIsPlaying(romanticAudio.getIsPlaying());
    setIsMuted(romanticAudio.getIsMuted());
  }, []);

  const togglePlay = () => {
    const nextState = romanticAudio.toggle();
    setIsPlaying(nextState);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    romanticAudio.setMute(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
      romanticAudio.setMute(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      romanticAudio.loadCustomFile(e.target.files[0]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-end"
      >
        {/* Expanded Volume / Track controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="mb-3 p-4 rounded-2xl bg-stone-900/95 border border-rose-500/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] w-60 text-xs text-stone-300 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif italic text-rose-200 text-sm truncate max-w-[140px]">
                  {romanticAudio.getCustomAudioName() || 'Sanctuary Soundtrack'}
                </span>
                <span className="text-[10px] text-stone-500 font-sans">Looped</span>
              </div>


              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-stone-400 hover:text-white">
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              {/* Upload MP3 Option */}
              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Custom MP3:</span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>Choose File</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/mp3,audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini Floating Pill Bar */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900/90 border border-rose-500/30 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.6)]">
          {/* Animated sound bars */}
          <div className="flex items-center gap-0.5 h-4 px-1">
            <span
              className={`w-0.5 bg-rose-400 rounded-full transition-all duration-300 ${
                isPlaying ? 'h-4 animate-pulse' : 'h-1.5'
              }`}
            />
            <span
              className={`w-0.5 bg-rose-300 rounded-full transition-all duration-300 ${
                isPlaying ? 'h-3 animate-pulse' : 'h-2'
              }`}
              style={{ animationDelay: '0.15s' }}
            />
            <span
              className={`w-0.5 bg-amber-300 rounded-full transition-all duration-300 ${
                isPlaying ? 'h-4 animate-pulse' : 'h-1'
              }`}
              style={{ animationDelay: '0.3s' }}
            />
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-all shadow cursor-pointer"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          </button>

          {/* Expand/Collapse details */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-stone-400 hover:text-stone-200 transition-colors"
            title="Audio Settings"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
