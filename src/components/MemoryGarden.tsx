import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mediaStorage, StoredMediaItem } from '../utils/mediaStorage';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  Image as ImageIcon,
  Film,
  Crown,
} from 'lucide-react';
import { romanticAudio } from '../utils/audio';

const DEFAULT_FLOWERS: StoredMediaItem[] = [
  {
    id: 'default-1',
    name: 'Our Gentle Conversation',
    type: 'photo',
    dominantColor: '#f43f5e',
    dataUrl: '',
    createdAt: 1,
  },
  {
    id: 'default-2',
    name: 'Late Night Laughs',
    type: 'photo',
    dominantColor: '#fb7185',
    dataUrl: '',
    createdAt: 2,
  },
  {
    id: 'default-3',
    name: 'You Make Me Cry',
    type: 'photo',
    dominantColor: '#f59e0b',
    dataUrl: '',
    createdAt: 3,
  },
  {
    id: 'default-4',
    name: 'My Moon & Me',
    type: 'photo',
    dominantColor: '#ec4899',
    dataUrl: '',
    createdAt: 4,
  },
  {
    id: 'default-5',
    name: 'Pure Happiness',
    type: 'photo',
    dominantColor: '#8b5cf6',
    dataUrl: '',
    createdAt: 5,
  },
  {
    id: 'default-6',
    name: 'Peaceful Moments',
    type: 'photo',
    dominantColor: '#06b6d4',
    dataUrl: '',
    createdAt: 6,
  },
  {
    id: 'default-7',
    name: 'Our Video Memory',
    type: 'video',
    dominantColor: '#10b981',
    dataUrl: '',
    createdAt: 7,
  },
  {
    id: 'default-8',
    name: 'Forever With You',
    type: 'video',
    dominantColor: '#f97316',
    dataUrl: '',
    createdAt: 8,
  },
];

interface FlowerProps {
  item: StoredMediaItem;
  index: number;
  isHovered: boolean;
  isGolden?: boolean;
}

const GardenFlower: React.FC<FlowerProps> = ({ item, index, isHovered, isGolden }) => {
  const color = isGolden ? '#fbbf24' : item.dominantColor;
  return (
    <div className="relative w-14 h-24 sm:w-18 sm:h-28 flex flex-col items-center justify-end select-none">
      {/* Stem & Leaves */}
      <svg
        viewBox="0 0 80 120"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      >
        <path
          d={`M40,120 Q${index % 2 === 0 ? '46' : '34'},65 40,28`}
          stroke={isGolden ? '#b45309' : '#047857'}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Leaf */}
        <path
          d={
            index % 2 === 0
              ? 'M38,75 C20,70 15,60 18,50 C28,52 35,65 38,75 Z'
              : 'M42,75 C60,70 65,60 62,50 C52,52 45,65 42,75 Z'
          }
          fill={isGolden ? '#78350f' : '#065f46'}
          stroke={isGolden ? '#fbbf24' : '#10b981'}
          strokeWidth="0.5"
        />
      </svg>

      {/* Blossom Head */}
      <motion.div
        animate={{
          scale: isHovered ? 1.25 : 1,
          rotate: isHovered ? [0, 6, -6, 0] : 0,
        }}
        transition={{ duration: 0.35 }}
        className="relative z-10 -top-5 sm:-top-7 flex items-center justify-center cursor-pointer"
      >
        {/* Glow */}
        <div
          className={`absolute -inset-3 rounded-full blur-md transition-opacity duration-300 ${
            isGolden ? 'opacity-70 bg-amber-400' : 'opacity-40'
          }`}
          style={{ backgroundColor: isGolden ? '#fbbf24' : color }}
        />

        {/* Petals */}
        <svg viewBox="0 0 80 80" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={i}
              cx="40"
              cy="40"
              rx="10"
              ry="20"
              fill={color}
              stroke={isGolden ? '#fef08a' : '#ffffff'}
              strokeWidth="0.5"
              transform={`rotate(${i * 60} 40 40)`}
            />
          ))}
          <circle
            cx="40"
            cy="40"
            r="6"
            fill={isGolden ? '#fef08a' : '#fbbf24'}
            stroke={isGolden ? '#d97706' : '#f59e0b'}
            strokeWidth="0.8"
          />
          <circle cx="40" cy="40" r="3" fill={isGolden ? '#78350f' : '#92400e'} />
        </svg>

        {/* Media indicator badge */}
        <div
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border shadow-sm ${
            isGolden
              ? 'bg-amber-950 border-amber-400 text-amber-300'
              : 'bg-stone-950/90 border-stone-700 text-stone-300'
          }`}
        >
          {isGolden ? (
            <Crown className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
          ) : item.type === 'video' ? (
            <Play className="w-2 h-2 fill-rose-400 text-rose-400 ml-0.5" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const MemoryGarden: React.FC = () => {
  const [gardenItems, setGardenItems] = useState<StoredMediaItem[]>([]);
  const [activeItem, setActiveItem] = useState<StoredMediaItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Golden Memory State
  const [goldenMemory, setGoldenMemory] = useState<{
    type: 'photo' | 'video';
    dataUrl: string;
    name: string;
  } | null>(null);
  const [isViewingGolden, setIsViewingGolden] = useState<boolean>(false);

  const batchInputRef = useRef<HTMLInputElement | null>(null);
  const goldenInputRef = useRef<HTMLInputElement | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  // Load saved garden media and golden memory from IndexedDB on startup
  useEffect(() => {
    loadAllMedia();
  }, []);

  const loadAllMedia = async () => {
    try {
      const stored = await mediaStorage.getAllGardenMedia();
      if (stored.length > 0) {
        setGardenItems(stored);
      } else {
        setGardenItems(DEFAULT_FLOWERS);
      }

      const golden = await mediaStorage.getGoldenMedia();
      if (golden) {
        setGoldenMemory(golden);
      }
    } catch (e) {
      console.warn('Failed loading stored garden items:', e);
      setGardenItems(DEFAULT_FLOWERS);
    }
  };

  // Batch Upload handler for all photos and videos (unlimited)
  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    romanticAudio.play();

    try {
      const fileArray = Array.from(files);
      const newSaved = await mediaStorage.addGardenMediaFiles(fileArray);

      // Filter out empty defaults if we now have real user items
      setGardenItems((prev) => {
        const nonDefaults = prev.filter((p) => p.dataUrl !== '');
        return [...nonDefaults, ...newSaved];
      });
    } catch (err) {
      console.error('Error saving media files:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // Golden Memory Upload handler
  const handleGoldenSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const saved = await mediaStorage.saveGoldenMedia(file);
        setGoldenMemory(saved);
        setIsViewingGolden(true);
        romanticAudio.play();
      } catch (err) {
        console.error('Error saving golden media:', err);
      }
    }
  };

  const handleDeleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await mediaStorage.deleteGardenMedia(id);
    setGardenItems((prev) => prev.filter((item) => item.id !== id));
    if (activeItem?.id === id) {
      setActiveItem(null);
    }
  };

  const handleClearAll = async () => {
    if (confirm('Clear all photos and videos from the garden?')) {
      await mediaStorage.clearAllGardenMedia();
      setGardenItems(DEFAULT_FLOWERS);
      setActiveItem(null);
    }
  };

  // Drag & drop into the open garden island
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  // Navigate next/prev item in lightbox
  const currentIndex = activeItem ? gardenItems.findIndex((i) => i.id === activeItem.id) : -1;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex >= 0 && currentIndex < gardenItems.length - 1) {
      setActiveItem(gardenItems[currentIndex + 1]);
    } else {
      setActiveItem(gardenItems[0]);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setActiveItem(gardenItems[currentIndex - 1]);
    } else {
      setActiveItem(gardenItems[gardenItems.length - 1]);
    }
  };

  const photoCount = gardenItems.filter((i) => i.type === 'photo').length;
  const videoCount = gardenItems.filter((i) => i.type === 'video').length;

  return (
    <section
      id="memory-garden"
      className="relative py-16 px-4 max-w-6xl mx-auto select-none"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden File Inputs */}
      <input
        ref={batchInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => handleFilesSelected(e.target.files)}
        className="hidden"
      />
      <input
        ref={goldenInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleGoldenSelected}
        className="hidden"
      />

      {/* Garden Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-sans tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Our Blooming Island Sanctuary</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 font-light tracking-tight">
          The Memory Garden
        </h2>
        <p className="font-sans text-stone-400 text-sm mt-2 max-w-lg mx-auto">
          Every photo and video you provide lives as a blossoming flower on this island. Touch any
          flower to bloom and view your pure memory.
        </p>
      </div>

      {/* Main Outdoor Island Garden Container */}
      <div
        className={`relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#081711] via-[#091f16] to-[#040e0a] border transition-all duration-300 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col items-center ${
          isDraggingOver
            ? 'border-emerald-400 ring-4 ring-emerald-500/30 scale-[1.01]'
            : 'border-emerald-800/40'
        }`}
      >
        {/* Floating Fireflies / Starlight on the Island */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${Math.random() * 92}%`,
                y: `${Math.random() * 92}%`,
                opacity: 0.2,
                scale: 0.4,
              }}
              animate={{
                x: `${Math.random() * 92}%`,
                y: `${Math.random() * 92}%`,
                opacity: [0.2, 0.9, 0.2],
                scale: [0.4, 1.1, 0.4],
              }}
              transition={{
                duration: 4 + Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_#34d399]"
            />
          ))}
        </div>

        {/* Action Bar: Direct & Outside Upload Controls */}
        <div className="relative z-20 w-full flex flex-wrap items-center justify-between gap-3 mb-8 p-3.5 rounded-2xl bg-stone-950/70 border border-emerald-900/40 backdrop-blur-md">
          {/* Stats Badges */}
          <div className="flex items-center gap-3 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-sans font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{gardenItems.length} Flowers Blooming</span>
            </span>
            <span className="hidden sm:flex items-center gap-1 text-stone-400">
              <ImageIcon className="w-3.5 h-3.5 text-rose-300" /> {photoCount} Photos
            </span>
            <span className="hidden sm:flex items-center gap-1 text-stone-400">
              <Film className="w-3.5 h-3.5 text-orange-300" /> {videoCount} Videos
            </span>
          </div>

          {/* Buttons: Add Media (No limit) & Golden Memory */}
          <div className="flex items-center gap-2">
            {/* The Golden Centerpiece Button */}
            <button
              onClick={() => {
                if (goldenMemory) {
                  setIsViewingGolden(true);
                } else {
                  goldenInputRef.current?.click();
                }
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-amber-600/30 hover:from-amber-500/40 hover:to-yellow-500/40 border border-amber-400/50 text-amber-200 text-xs font-sans font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.25)] hover:scale-105"
              title="Add or view the special Golden Memory"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>{goldenMemory ? 'Golden Memory ✨' : 'Add Golden Memory'}</span>
            </button>

            {/* Batch Add Button */}
            <button
              onClick={() => batchInputRef.current?.click()}
              disabled={isUploading}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-50 text-xs font-sans font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isUploading ? (
                <span>Adding flowers...</span>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Photos & Videos</span>
                </>
              )}
            </button>

            {gardenItems.length > 0 && gardenItems.some((i) => i.dataUrl !== '') && (
              <button
                onClick={handleClearAll}
                className="p-1.5 rounded-xl bg-stone-900/80 hover:bg-rose-950 border border-stone-800 hover:border-rose-700 text-stone-400 hover:text-rose-300 text-xs transition-colors cursor-pointer"
                title="Clear uploaded media"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Drag & Drop Visual Indicator overlay when dragging */}
        {isDraggingOver && (
          <div className="absolute inset-4 z-30 rounded-2xl bg-emerald-950/90 border-2 border-dashed border-emerald-400 flex flex-col items-center justify-center text-emerald-200 backdrop-blur-sm pointer-events-none">
            <Upload className="w-12 h-12 text-emerald-300 animate-bounce mb-2" />
            <p className="font-serif text-2xl">Drop your photos & videos anywhere in the garden</p>
            <p className="font-sans text-xs text-emerald-400 mt-1">
              They will bloom as flowers instantly!
            </p>
          </div>
        )}

        {/* Golden Memory Shrine Blossom (Featured at Center if set) */}
        {goldenMemory && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-20 mb-6 p-4 rounded-3xl bg-gradient-to-r from-amber-950/70 via-stone-950/80 to-amber-950/70 border border-amber-400/60 shadow-[0_0_35px_rgba(251,191,36,0.3)] flex items-center gap-4 cursor-pointer hover:border-amber-300 transition-all group"
            onClick={() => setIsViewingGolden(true)}
          >
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-stone-900 flex items-center justify-center">
              {goldenMemory.type === 'video' ? (
                <video
                  src={goldenMemory.dataUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={goldenMemory.dataUrl}
                  alt="Golden"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-200 drop-shadow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-amber-300 text-xs uppercase tracking-wider font-sans font-semibold">
                <Crown className="w-3.5 h-3.5" />
                <span>Golden Shrine Memory</span>
              </div>
              <p className="font-serif text-stone-100 text-base mt-0.5 group-hover:text-amber-200 transition-colors">
                Touch to open our golden keepsake
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goldenInputRef.current?.click();
              }}
              className="ml-auto p-2 rounded-xl bg-amber-900/40 hover:bg-amber-800 text-amber-200 text-xs border border-amber-500/40 transition-colors cursor-pointer"
              title="Replace Golden Memory"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* Small Island Garden Floral Bed (Unlimited Flowers Grid) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 relative z-10 w-full min-h-[220px]">
          {gardenItems.map((item, index) => {
            const isHovered = hoveredId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(0.5, index * 0.03) }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  setActiveItem(item);
                  romanticAudio.play();
                }}
                className="group relative flex flex-col items-center justify-center p-2.5 rounded-2xl bg-stone-950/40 border border-emerald-900/20 hover:border-emerald-500/50 hover:bg-stone-950/80 transition-all duration-300 cursor-pointer"
              >
                {/* Delete icon on hover for user items */}
                {item.dataUrl !== '' && (
                  <button
                    onClick={(e) => handleDeleteItem(item.id, e)}
                    className="absolute top-1.5 right-1.5 z-20 opacity-0 group-hover:opacity-100 p-1 rounded-full bg-stone-900/90 text-stone-400 hover:text-rose-400 hover:bg-rose-950/80 border border-stone-800 transition-all cursor-pointer"
                    title="Remove flower"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}

                <GardenFlower item={item} index={index} isHovered={isHovered} />
              </motion.div>
            );
          })}
        </div>

        {/* Open Drag & Drop Prompt footer */}
        <div className="relative z-10 mt-8 text-center text-xs text-stone-400 flex items-center justify-center gap-2">
          <Upload className="w-3.5 h-3.5 text-emerald-400" />
          <span>Drag & drop multiple photos and videos here anytime</span>
        </div>
      </div>

      {/* Picture / Video Reveal Lightbox - Pure Media Display Only */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-stone-950/95 backdrop-blur-2xl"
            onClick={() => setActiveItem(null)}
          >
            {/* Prev Arrow */}
            {gardenItems.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-all cursor-pointer hover:scale-110 shadow-xl"
                title="Previous flower"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Arrow */}
            {gardenItems.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-all cursor-pointer hover:scale-110 shadow-xl"
                title="Next flower"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Center Pure Media Modal */}
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl sm:max-w-3xl w-full max-h-[90vh] rounded-3xl bg-stone-900/90 border border-stone-800 shadow-[0_30px_100px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col items-center p-3 sm:p-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-stone-950/85 hover:bg-rose-950 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-700"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Pure Media Display */}
              <div className="w-full flex flex-col items-center justify-center my-auto overflow-hidden">
                {activeItem.dataUrl ? (
                  activeItem.type === 'video' ? (
                    <div className="relative w-full max-h-[80vh] flex flex-col items-center justify-center">
                      <video
                        ref={videoPlayerRef}
                        src={activeItem.dataUrl}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="w-full max-h-[75vh] rounded-2xl object-contain shadow-2xl bg-black"
                      />
                    </div>
                  ) : (
                    <img
                      src={activeItem.dataUrl}
                      alt={activeItem.name}
                      className="w-full max-h-[78vh] rounded-2xl object-contain shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  )
                ) : (
                  /* Fallback display for default empty floral memories */
                  <div className="w-full max-w-sm aspect-[4/3] bg-stone-950/80 rounded-2xl p-6 flex flex-col items-center justify-center border border-emerald-500/30 text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg"
                      style={{ backgroundColor: activeItem.dominantColor }}
                    >
                      {activeItem.type === 'video' ? (
                        <Play className="w-7 h-7 fill-white text-white ml-1" />
                      ) : (
                        <ImageIcon className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <h4 className="font-serif text-2xl text-stone-100 font-light mb-1">
                      {activeItem.name}
                    </h4>
                    <p className="font-sans text-xs text-stone-400 mb-4">
                      {activeItem.type === 'video' ? 'Video Flower' : 'Photo Flower'}
                    </p>
                    <button
                      onClick={() => batchInputRef.current?.click()}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-50 font-sans text-xs flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload file for this flower</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Golden Memory Lightbox */}
      <AnimatePresence>
        {isViewingGolden && goldenMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/95 backdrop-blur-2xl"
            onClick={() => setIsViewingGolden(false)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl sm:max-w-3xl w-full max-h-[90vh] rounded-3xl bg-gradient-to-b from-stone-900 to-amber-950/60 border-2 border-amber-400/80 shadow-[0_30px_100px_rgba(251,191,36,0.3)] overflow-hidden flex flex-col items-center p-3 sm:p-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsViewingGolden(false)}
                className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-stone-950/85 hover:bg-stone-800 text-amber-200 hover:text-white transition-colors cursor-pointer border border-amber-500/40"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top Golden Banner */}
              <div className="flex items-center gap-2 text-amber-300 text-xs font-sans font-semibold uppercase tracking-wider mb-2">
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Our Golden Keepsake</span>
              </div>

              {/* Pure Golden Media Display */}
              <div className="w-full flex flex-col items-center justify-center my-auto overflow-hidden">
                {goldenMemory.type === 'video' ? (
                  <video
                    src={goldenMemory.dataUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full max-h-[75vh] rounded-2xl object-contain shadow-2xl bg-black border border-amber-400/30"
                  />
                ) : (
                  <img
                    src={goldenMemory.dataUrl}
                    alt="Golden Keepsake"
                    className="w-full max-h-[78vh] rounded-2xl object-contain shadow-2xl border border-amber-400/30"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
