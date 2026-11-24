import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Film,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Animal } from '../types/animal';
import { HabitatScene } from './illustrations/HabitatScene';
import { HabitatForeground } from './illustrations/HabitatForeground';
import { LivingHabitatStage } from './LivingHabitatStage';
import { FoodIllustration } from './illustrations/FoodIllustration';
import { WorldMapMini } from './illustrations/WorldMapMini';
import { FactVisualIcon } from './illustrations/InfoVisuals';
import {
  playAnimalSound,
  playSceneChime,
  startNatureAmbience,
  stopAnimalSound,
  stopNatureAmbience,
} from '../utils/soundEngine';

interface AnimalVideoModalProps {
  animal: Animal | null;
  allAnimals: Animal[];
  onSelectAnimal: (animal: Animal) => void;
  onClose: () => void;
}

const TOTAL_DURATION = 20; // 20 seconds per animal mini-documentary (4 x 5s scenes)

const SCENE_CHAPTERS = [
  { id: 0, start: 0, end: 5, label: '1. Yashash muhiti' },
  { id: 1, start: 5, end: 10, label: '2. Ovoz va harakat' },
  { id: 2, start: 10, end: 15, label: '3. Nima yeydi?' },
  { id: 3, start: 15, end: 20, label: '4. Qiziqarli faktlar' },
];

function formatSeconds(sec: number): string {
  const clamped = Math.max(0, Math.min(TOTAL_DURATION, Math.floor(sec)));
  return `00:${String(clamped).padStart(2, '0')}`;
}

export const AnimalVideoModal: React.FC<AnimalVideoModalProps> = ({
  animal,
  allAnimals,
  onSelectAnimal,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isAnimalSpeaking, setIsAnimalSpeaking] = useState(false);
  const lastSceneRef = useRef<number>(-1);

  const currentScene = useMemo(() => {
    if (currentTime < 5) return 0;
    if (currentTime < 10) return 1;
    if (currentTime < 15) return 2;
    return 3;
  }, [currentTime]);

  const currentIdx = useMemo(() => {
    if (!animal) return -1;
    return allAnimals.findIndex((a) => a.id === animal.id);
  }, [animal, allAnimals]);

  // Reset timeline when switching animal or opening modal
  useEffect(() => {
    if (!animal) {
      stopAnimalSound();
      stopNatureAmbience();
      return;
    }
    setCurrentTime(0);
    setIsPlaying(true);
    setIsAnimalSpeaking(false);
    lastSceneRef.current = -1;
    return () => {
      stopAnimalSound();
      stopNatureAmbience();
    };
  }, [animal]);

  // Nature ambient sound synced with play/mute state
  useEffect(() => {
    if (!animal || !isPlaying || isMuted) {
      stopNatureAmbience();
      return;
    }
    startNatureAmbience(animal.biome);
    return () => {
      stopNatureAmbience();
    };
  }, [animal, isPlaying, isMuted]);

  // Playback loop (smooth 50ms tick)
  useEffect(() => {
    if (!animal || !isPlaying) return;

    const interval = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.05;
        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          return TOTAL_DURATION;
        }
        return next;
      });
    }, 50);

    return () => window.clearInterval(interval);
  }, [animal, isPlaying]);

  // Trigger scene chimes & animal voice when transitioning scenes
  useEffect(() => {
    if (!animal || !isPlaying) return;
    if (lastSceneRef.current === currentScene) return;

    lastSceneRef.current = currentScene;

    if (!isMuted) {
      playSceneChime(currentScene);
      if (currentScene === 1) {
        setIsAnimalSpeaking(true);
        playAnimalSound(animal.id, {
          onEnd: () => setIsAnimalSpeaking(false),
        });
      }
    }
  }, [animal, currentScene, isPlaying, isMuted]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!animal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        if (currentTime >= TOTAL_DURATION) {
          setCurrentTime(0);
          lastSceneRef.current = -1;
          setIsPlaying(true);
        } else {
          setIsPlaying((p) => !p);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [animal, currentTime, onClose]);

  if (!animal) return null;

  const isHerbivore = animal.category === 'herbivore';
  const accentColor = isHerbivore ? '#15803D' : '#B91C1C';
  const isFinished = currentTime >= TOTAL_DURATION;
  const progressPct = Math.min(100, (currentTime / TOTAL_DURATION) * 100);

  const handleTogglePlay = () => {
    if (isFinished) {
      setCurrentTime(0);
      lastSceneRef.current = -1;
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
      if (isPlaying) {
        stopAnimalSound();
        setIsAnimalSpeaking(false);
      }
    }
  };

  const handleSeek = (sec: number) => {
    stopAnimalSound();
    setIsAnimalSpeaking(false);
    lastSceneRef.current = -1;
    setCurrentTime(Math.max(0, Math.min(TOTAL_DURATION, sec)));
    if (sec < TOTAL_DURATION) {
      setIsPlaying(true);
    }
  };

  const handlePrevAnimal = () => {
    if (currentIdx > 0) {
      onSelectAnimal(allAnimals[currentIdx - 1]);
    }
  };

  const handleNextAnimal = () => {
    if (currentIdx >= 0 && currentIdx < allAnimals.length - 1) {
      onSelectAnimal(allAnimals[currentIdx + 1]);
    }
  };

  // Determine documentary subtitle per scene
  const subtitleText =
    currentScene === 0
      ? `${animal.name} — ${animal.biomeLabel.toLowerCase()} hududlarida yashaydi. ${animal.habitatDetail}`
      : currentScene === 1
      ? `${animal.soundLabel} ovozi · ${animal.lifestyle}. Tezligi soatiga ${animal.speedKmh} km gacha yetadi.`
      : currentScene === 2
      ? `${animal.dietSummary} ${animal.dailyFoodAmount} va ${animal.drink.toLowerCase()}.`
      : `${animal.facts[0]?.title}: ${animal.facts[0]?.text}`;

  // Camera Ken Burns motion values based on current time & scene
  const camScale =
    currentScene === 0
      ? 1 + (currentTime / 5) * 0.08
      : currentScene === 1
      ? 1.08 + ((currentTime - 5) / 5) * 0.08
      : currentScene === 2
      ? 1.14 - ((currentTime - 10) / 5) * 0.06
      : 1.08;

  const camX =
    currentScene === 0
      ? -10 + (currentTime / 5) * 10
      : currentScene === 1
      ? 0
      : currentScene === 2
      ? -8
      : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`${animal.name} haqida hujjatli video`}
    >
      <div className="w-full max-w-5xl rounded-3xl bg-[#0D1912] border border-emerald-800/60 shadow-[0_30px_90px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col">
        {/* Top Theater Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-800/80 text-amber-300 flex items-center justify-center shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-emerald-200/80">
                <span>Hujjatli video</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{animal.biomeLabel}</span>
              </div>
              <h2 className="font-display text-base sm:text-lg font-bold text-white truncate">
                {animal.name} <span className="text-xs italic font-normal text-stone-400">({animal.latin})</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrevAnimal}
              disabled={currentIdx <= 0}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/15 disabled:opacity-35 cursor-pointer whitespace-nowrap"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Oldingi
            </button>
            <button
              type="button"
              onClick={handleNextAnimal}
              disabled={currentIdx < 0 || currentIdx >= allAnimals.length - 1}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/15 disabled:opacity-35 cursor-pointer whitespace-nowrap"
            >
              Keyingi
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Videoni yopish"
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 16:9 Animated Documentary Cinema Stage */}
        <div
          onClick={handleTogglePlay}
          className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer select-none"
        >
          {/* Camera Pan & Zoom Layer */}
          <div
            className="absolute inset-0 transition-transform duration-150 ease-linear"
            style={{
              transform: `scale(${camScale.toFixed(3)}) translateX(${camX.toFixed(1)}px)`,
            }}
          >
            <HabitatScene biome={animal.biome} className="w-full h-full object-cover" />
          </div>

          {/* Cinematic Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/45 pointer-events-none" />

          {/* Top Left Scene Overlay */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 flex flex-col gap-1 pointer-events-none">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
              {SCENE_CHAPTERS[currentScene].label}
            </div>
            <div className="font-display text-xl sm:text-3xl font-bold text-white drop-shadow">
              {animal.name}
            </div>
          </div>

          {/* Scene 1 Overlay: World Map & Speed/Lifestyle */}
          <AnimatePresence>
            {currentScene === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.35 }}
                className="hidden sm:block absolute top-5 right-5 z-20 w-52 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 p-3 text-white pointer-events-none"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Tarqalish xaritasi</span>
                </div>
                <div className="bg-[#FAF7F0] rounded-lg p-1.5">
                  <WorldMapMini regions={animal.regions} accentColor={accentColor} />
                </div>
                <div className="mt-2 text-[11px] text-white/90 tabular-nums">
                  Tezligi: <strong>{animal.speedKmh} km/soat</strong>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scene 3 Overlay: Fascinating Facts Card */}
          <AnimatePresence>
            {currentScene === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.35 }}
                className="hidden sm:flex flex-col gap-2 absolute top-5 right-5 z-20 w-72 rounded-2xl bg-black/70 backdrop-blur-md border border-amber-300/30 p-3.5 text-white pointer-events-none"
              >
                {animal.facts.slice(0, 2).map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <FactVisualIcon visual={f.visual} />
                    <div>
                      <div className="text-xs font-bold text-amber-200">{f.title}</div>
                      <div className="text-[11px] text-white/85 leading-snug line-clamp-2">{f.text}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-1.5 border-t border-white/15 text-[11px] text-emerald-200 tabular-nums">
                  O‘lchami: {animal.heightLabel} · Umri: {animal.lifespan}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Living Walking & Swimming Animal Stage inside the Habitat */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <LivingHabitatStage
              animal={animal}
              isSpeaking={isAnimalSpeaking}
              isPaused={!isPlaying}
              behaviorMode={currentScene === 1 ? 'speak' : currentScene === 2 ? 'feed' : 'roam'}
              stageVariant="video"
              interactive={false}
              sizeClass="w-40 h-40 sm:w-52 sm:h-52"
            >
              <AnimatePresence>
                {currentScene === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="mb-2 flex items-center gap-2.5 sm:gap-4 px-3.5 py-2 rounded-2xl bg-black/65 backdrop-blur-sm border border-white/15"
                  >
                    {animal.foods.map((food, i) => (
                      <motion.div
                        key={food.id}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 1.3, delay: i * 0.2, repeat: Infinity }}
                        className="flex flex-col items-center text-center"
                      >
                        <FoodIllustration type={food.icon} className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-lg" />
                        <span className="text-[10px] font-semibold text-white mt-0.5 whitespace-nowrap">
                          {food.name}
                        </span>
                      </motion.div>
                    ))}
                    <div className="hidden sm:flex flex-col items-center text-sky-300 pl-2 border-l border-white/15">
                      <Droplets className="w-6 h-6" />
                      <span className="text-[10px] font-semibold text-sky-200 mt-1 whitespace-nowrap">
                        Suv ichadi
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </LivingHabitatStage>
          </div>

          {/* Foreground Swaying Foliage & Biome Particles (Animal walks behind foreground grass/waves) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <HabitatForeground biome={animal.biome} />
          </div>

          {/* Documentary Subtitle Bar */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-6 z-20 pointer-events-none flex justify-center">
            <div className="max-w-3xl px-4 py-2.5 rounded-xl bg-black/75 backdrop-blur-sm border border-white/10 text-center">
              <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                {subtitleText}
              </p>
            </div>
          </div>

          {/* Center Play / End Overlay */}
          {(!isPlaying || isFinished) && (
            <div className="absolute inset-0 z-30 bg-black/45 flex flex-col items-center justify-center gap-3 p-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePlay();
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-300 text-[#0B301C] font-display font-bold text-sm sm:text-base shadow-xl hover:bg-amber-200 transition-transform hover:scale-105 cursor-pointer"
              >
                {isFinished ? (
                  <>
                    <RotateCcw className="w-5 h-5" />
                    Videoni qayta ko‘rish
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    Davom ettirish
                  </>
                )}
              </button>

              {isFinished && currentIdx >= 0 && currentIdx < allAnimals.length - 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextAnimal();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 text-white text-xs font-semibold hover:bg-white/25 cursor-pointer"
                >
                  Keyingi hayvon: {allAnimals[currentIdx + 1].name}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom Player Controls & Chapter Scrubbing */}
        <div className="px-4 sm:px-6 py-4 bg-[#102017] border-t border-white/10 space-y-3">
          {/* Interactive Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-100/80 tabular-nums shrink-0">
              {formatSeconds(currentTime)}
            </span>
            <div className="relative flex-1 h-2 bg-white/15 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-amber-300 rounded-full transition-[width] duration-75"
                style={{ width: `${progressPct}%` }}
              />
              <input
                type="range"
                min={0}
                max={TOTAL_DURATION}
                step={0.1}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                aria-label="Video vaqtini surish"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-xs font-mono text-stone-400 tabular-nums shrink-0">
              {formatSeconds(TOTAL_DURATION)}
            </span>
          </div>

          {/* Action Row + Scene Chapter Jump Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-300 text-[#0B301C] text-xs font-bold hover:bg-amber-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pauza' : isFinished ? 'Qayta' : 'Ijro'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const nextMuted = !isMuted;
                  setIsMuted(nextMuted);
                  if (nextMuted) {
                    stopAnimalSound();
                    setIsAnimalSpeaking(false);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/15 transition-colors cursor-pointer whitespace-nowrap"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                <span>{isMuted ? 'Ovozsiz' : 'Ovozli'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSeek(0)}
                aria-label="Boshidan boshlash"
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Clickable Documentary Chapters */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {SCENE_CHAPTERS.map((ch) => {
                const active = currentScene === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleSeek(ch.start + 0.05)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'bg-emerald-700 text-white'
                        : 'bg-white/10 text-stone-300 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {ch.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
