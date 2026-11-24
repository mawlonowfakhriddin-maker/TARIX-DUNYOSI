import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Film,
  MapPin,
  Sparkles,
  Utensils,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Animal, FoodItem } from '../types/animal';
import { HabitatScene } from './illustrations/HabitatScene';
import { HabitatForeground } from './illustrations/HabitatForeground';
import { LivingHabitatStage } from './LivingHabitatStage';
import { WorldMapMini } from './illustrations/WorldMapMini';
import { FoodIllustration } from './illustrations/FoodIllustration';
import {
  FactVisualIcon,
  SizeComparisonVisual,
  SpeedVisual,
} from './illustrations/InfoVisuals';
import { playAnimalSound, playFeedChime, stopAnimalSound } from '../utils/soundEngine';

interface AnimalDetailViewProps {
  animal: Animal;
  allAnimals: Animal[];
  index: number;
  total: number;
  autoPlaySound: boolean;
  onToggleAutoPlaySound: () => void;
  onSelectAnimalById: (id: string) => void;
  onOpenVideo: (animal: Animal) => void;
  onPrev: () => void;
  onNext: () => void;
  onBack: () => void;
}

export const AnimalDetailView: React.FC<AnimalDetailViewProps> = ({
  animal,
  allAnimals,
  index,
  total,
  autoPlaySound,
  onToggleAutoPlaySound,
  onSelectAnimalById,
  onOpenVideo,
  onPrev,
  onNext,
  onBack,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [soundBars, setSoundBars] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [selectedFood, setSelectedFood] = useState<FoodItem>(animal.foods[0]);
  const [flyingFood, setFlyingFood] = useState<FoodItem | null>(null);
  const [feedCount, setFeedCount] = useState(0);
  const [animalHappy, setAnimalHappy] = useState(false);
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);
  const [actionLabel, setActionLabel] = useState('Yashash joyida yurmoqda');

  // Reset per-animal interactive states and optionally auto-play sound on page turn
  useEffect(() => {
    stopAnimalSound();
    setIsPlayingSound(false);
    setSoundBars([0, 0, 0, 0, 0, 0, 0, 0]);
    setSelectedFood(animal.foods[0]);
    setFlyingFood(null);
    setFeedCount(0);
    setAnimalHappy(false);

    let autoTimer: number | undefined;
    if (autoPlaySound) {
      autoTimer = window.setTimeout(() => {
        setIsPlayingSound(true);
        playAnimalSound(animal.id, {
          onLevel: (levels) => setSoundBars(levels),
          onEnd: () => {
            setIsPlayingSound(false);
            setSoundBars([0, 0, 0, 0, 0, 0, 0, 0]);
          },
        });
      }, 420);
    }

    return () => {
      if (autoTimer) window.clearTimeout(autoTimer);
      stopAnimalSound();
    };
  }, [animal, autoPlaySound]);

  const handleToggleSound = () => {
    if (isPlayingSound) {
      stopAnimalSound();
      setIsPlayingSound(false);
      setSoundBars([0, 0, 0, 0, 0, 0, 0, 0]);
      return;
    }

    setIsPlayingSound(true);
    playAnimalSound(animal.id, {
      onLevel: (levels) => setSoundBars(levels),
      onEnd: () => {
        setIsPlayingSound(false);
        setSoundBars([0, 0, 0, 0, 0, 0, 0, 0]);
      },
    });
  };

  const handleFeedAnimal = (food: FoodItem) => {
    setSelectedFood(food);
    setFlyingFood(food);
    setFeedCount((c) => c + 1);
    setAnimalHappy(true);
    playFeedChime();

    window.setTimeout(() => {
      setFlyingFood(null);
    }, 750);
    window.setTimeout(() => {
      setAnimalHappy(false);
    }, 950);
  };

  const handlePrevPage = () => {
    if (index > 0) {
      setFlipDirection(-1);
      onPrev();
    }
  };

  const handleNextPage = () => {
    if (index < total - 1) {
      setFlipDirection(1);
      onNext();
    }
  };

  const isHerbivore = animal.category === 'herbivore';
  const accentColor = isHerbivore ? '#15803D' : '#B91C1C';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-14 pt-4 space-y-5">
      {/* Top Book Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Ensiklopediyaga qaytish
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onToggleAutoPlaySound}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              autoPlaySound
                ? 'bg-emerald-800 text-white border-emerald-900'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {autoPlaySound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            Sahifa ochilganda ovoz: {autoPlaySound ? 'Yoqilgan' : 'O‘chirilgan'}
          </button>

          <div className="text-sm text-stone-600 font-medium tabular-nums">
            {index + 1} / {total}-sahifa
          </div>
        </div>
      </div>

      {/* ============================================================
          THE OPEN GREEN BOOK ("YASHIL KITOB" 2-PAGE SPREAD)
         ============================================================ */}
      <div className="book-perspective">
        {/* Green Leather Hardcover Binding */}
        <div className="relative rounded-[26px] p-2.5 sm:p-4 bg-gradient-to-br from-[#144D2E] via-[#0F3C23] to-[#0A2A18] shadow-[0_24px_60px_rgba(10,42,24,0.42)] border-2 border-[#236B43]">
          {/* Subtle Gold Embossed Corner Marks on Cover */}
          <div className="hidden sm:block pointer-events-none absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-300/45 rounded-tl-xl" />
          <div className="hidden sm:block pointer-events-none absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-300/45 rounded-tr-xl" />
          <div className="hidden sm:block pointer-events-none absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-300/45 rounded-bl-xl" />
          <div className="hidden sm:block pointer-events-none absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-300/45 rounded-br-xl" />

          {/* Stacked Paper Edges Effect */}
          <div className="relative rounded-[18px] bg-[#EFE9DA] p-0.5 sm:p-1 shadow-inner">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={animal.id}
                initial={{
                  opacity: 0,
                  rotateY: flipDirection > 0 ? -18 : 18,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotateY: flipDirection > 0 ? 18 : -18,
                  scale: 0.98,
                }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: flipDirection > 0 ? 'left center' : 'right center' }}
                className="relative grid grid-cols-1 lg:grid-cols-12 rounded-[15px] overflow-hidden bg-[#FAF7F0] shadow-md"
              >
                {/* Center Book Spine Crease Shadow (Desktop) */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 z-20 bg-gradient-to-r from-transparent via-stone-900/12 to-transparent"
                />

                {/* ======================================================
                    LEFT BOOK PAGE: HABITAT + ANIMATED ANIMAL + SOUND + DIET BELOW
                   ====================================================== */}
                <div className="lg:col-span-6 p-4 sm:p-6 flex flex-col justify-between gap-5 border-b lg:border-b-0 lg:border-r border-stone-300/70">
                  <div>
                    {/* Page Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <span className={isHerbivore ? 'text-emerald-800' : 'text-red-800'}>
                            {isHerbivore ? "O'txo'r hayvon" : "Go'shtxo'r hayvon"}
                          </span>
                          <span aria-hidden="true" className="text-stone-400">·</span>
                          <span className="text-stone-500">{animal.biomeLabel}</span>
                        </div>
                        <h1 className="mt-0.5 font-display text-3xl sm:text-4xl font-bold text-[#142419] tracking-tight">
                          {animal.name}
                        </h1>
                        <p className="text-xs italic text-stone-500">{animal.latin}</p>
                      </div>

                      <span className="text-xs font-mono font-bold text-stone-400 tabular-nums pt-1">
                        #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Living Habitat Picture with Roaming Articulated Animal Inside */}
                    <div className="relative rounded-2xl overflow-hidden border border-stone-300/80 shadow-sm h-[305px] sm:h-[340px] flex flex-col justify-between">
                      <div className="absolute inset-0">
                        <HabitatScene biome={animal.biome} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
                      </div>

                      {/* Top Habitat Label & Controls */}
                      <div className="relative z-20 p-3.5 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black/45 backdrop-blur-sm px-3 py-1.5 rounded-lg pointer-events-auto">
                          <MapPin className="w-3.5 h-3.5 text-amber-300" />
                          <span>{animal.biomeLabel}</span>
                        </div>

                        <div className="flex items-center gap-2 pointer-events-auto">
                          <button
                            type="button"
                            onClick={() => {
                              stopAnimalSound();
                              setIsPlayingSound(false);
                              setSoundBars([0, 0, 0, 0, 0, 0, 0, 0]);
                              onOpenVideo(animal);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow whitespace-nowrap"
                          >
                            <Film className="w-3.5 h-3.5 text-amber-300" />
                            <span>Video</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleToggleSound}
                            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow whitespace-nowrap ${
                              isPlayingSound
                                ? 'bg-amber-400 text-stone-950 scale-[1.03]'
                                : 'bg-white text-stone-900 hover:bg-amber-50'
                            }`}
                          >
                            {isPlayingSound ? (
                              <VolumeX className="w-3.5 h-3.5" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                            )}
                            <span>{isPlayingSound ? 'To‘xtatish' : 'Ovozini eshitish'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Real-time Walking & Grazing Animal Stage */}
                      <div className="absolute inset-0 z-10">
                        <LivingHabitatStage
                          animal={animal}
                          isSpeaking={isPlayingSound}
                          behaviorMode={animalHappy ? 'feed' : isPlayingSound ? 'speak' : 'roam'}
                          interactive={true}
                          sizeClass="w-36 h-36 sm:w-44 sm:h-44"
                          onAnimalClick={handleToggleSound}
                          onActionChange={setActionLabel}
                        >
                          <AnimatePresence>
                            {flyingFood && (
                              <motion.div
                                key={`${flyingFood.id}-${feedCount}`}
                                initial={{ y: 70, scale: 1.15, opacity: 1 }}
                                animate={{ y: -10, scale: 0.45, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute -top-4 z-20 pointer-events-none"
                              >
                                <FoodIllustration type={flyingFood.icon} className="w-12 h-12 drop-shadow-xl" />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <AnimatePresence>
                            {animalHappy && (
                              <motion.div
                                initial={{ y: 8, opacity: 0, scale: 0.85 }}
                                animate={{ y: -12, opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute -top-9 z-20 px-3 py-1 rounded-lg bg-white/95 text-stone-900 text-xs font-bold shadow-md whitespace-nowrap"
                              >
                                Mazza! {selectedFood.name} yedi
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </LivingHabitatStage>
                      </div>

                      {/* Foreground Foliage & Water Occlusion Depth Layer */}
                      <div className="absolute inset-0 z-10 pointer-events-none">
                        <HabitatForeground biome={animal.biome} />
                      </div>

                      {/* Bottom Sound Visualizer & Live Movement Bar */}
                      <div className="relative z-20 px-4 py-2.5 bg-black/50 backdrop-blur-sm flex items-center justify-between gap-3 border-t border-white/10 pointer-events-none">
                        <span className="text-[11px] font-medium text-white/95 truncate">
                          {actionLabel} · Joyga bosing
                        </span>
                        <div className="flex items-end gap-1 h-4 shrink-0" aria-hidden="true">
                          {soundBars.map((lvl, idx) => (
                            <span
                              key={idx}
                              className="w-1 rounded-full bg-amber-300 transition-all duration-75"
                              style={{
                                height: `${Math.max(3, Math.round(lvl * 16))}px`,
                                opacity: isPlayingSound ? 1 : 0.35,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DIRECTLY BELOW THE ANIMAL ("hayvon pastida"): Nima yeydi? & Nima ichadi? */}
                  <div className="rounded-2xl bg-white border border-stone-200 p-4 space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-emerald-700" />
                        <h2 className="font-display text-lg font-bold text-stone-900">
                          Nima yeydi va nima ichadi?
                        </h2>
                      </div>
                      <span className="text-xs text-stone-500">
                        Ovqat berish uchun bosing
                      </span>
                    </div>

                    {/* Interactive Food Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {animal.foods.map((food) => {
                        const isSelected = selectedFood.id === food.id;
                        return (
                          <button
                            key={food.id}
                            type="button"
                            onClick={() => handleFeedAnimal(food)}
                            className={`group p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center gap-1.5 ${
                              isSelected
                                ? 'bg-emerald-50 border-emerald-600'
                                : 'bg-[#FAF7F0] border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            <div className="group-hover:scale-110 transition-transform">
                              <FoodIllustration type={food.icon} className="w-11 h-11" />
                            </div>
                            <div className="font-semibold text-xs text-stone-900 leading-tight">
                              {food.name}
                            </div>
                            <div className="text-[10px] text-stone-500 tabular-nums">
                              {food.portion}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Food + Drink Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div className="p-3 rounded-xl bg-[#FAF7F0] border border-stone-200 flex items-center gap-2.5">
                        <FoodIllustration type={selectedFood.icon} className="w-8 h-8 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-stone-900 truncate">
                            {selectedFood.name}
                          </div>
                          <p className="text-[11px] text-stone-600 leading-snug line-clamp-2">
                            {selectedFood.note}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200/80 flex items-center gap-2.5">
                        <Droplets className="w-5 h-5 text-sky-600 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-stone-900">
                            Suv ichishi · {animal.dailyFoodAmount}
                          </div>
                          <p className="text-[11px] text-stone-600 leading-snug">
                            {animal.drink}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================================================
                    RIGHT BOOK PAGE: WHERE IT LIVES MAP + VISUAL INFO + FACTS + CLICK TO TURN PAGE
                   ====================================================== */}
                <div className="lg:col-span-6 p-4 sm:p-6 flex flex-col justify-between gap-5 relative">
                  {/* Where It Lives Section (Visual World Map + Details) */}
                  <div className="rounded-2xl bg-white border border-stone-200 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-display text-lg font-bold text-stone-900">
                        Qayerda yashaydi?
                      </h2>
                      <span className="text-xs font-medium text-stone-500">
                        {animal.climate}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                      <div className="sm:col-span-6 bg-[#FAF7F0] rounded-xl p-2 border border-stone-200">
                        <WorldMapMini regions={animal.regions} accentColor={accentColor} />
                      </div>
                      <div className="sm:col-span-6 space-y-1.5">
                        <div className="text-xs font-bold text-stone-900">
                          {animal.regionNames}
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {animal.habitatDetail}
                        </p>
                        <div className="pt-1 text-[11px] text-stone-500">
                          {animal.lifestyle} · {animal.activeTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Size & Speed Comparisons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="rounded-2xl bg-white border border-stone-200 p-4">
                      <h3 className="font-display text-sm font-bold text-stone-900 mb-2">
                        Odam bo‘yi bilan taqqoslash
                      </h3>
                      <SizeComparisonVisual
                        animalName={animal.name}
                        heightAvgCm={animal.heightAvgCm}
                        weightAvgKg={animal.weightAvgKg}
                      />
                    </div>

                    <div className="rounded-2xl bg-white border border-stone-200 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-sm font-bold text-stone-900 mb-2">
                          Tezlik va umr davomiyligi
                        </h3>
                        <SpeedVisual speedKmh={animal.speedKmh} />
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-stone-500">Umr ko‘rishi:</span>
                        <span className="font-bold text-stone-900 tabular-nums">{animal.lifespan}</span>
                      </div>
                    </div>
                  </div>

                  {/* Illustrated Fun Facts */}
                  <div className="rounded-2xl bg-white border border-stone-200 p-4 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <h2 className="font-display text-base font-bold text-stone-900">
                        Qiziqarli ma’lumotlar
                      </h2>
                    </div>

                    <div className="space-y-2.5">
                      {animal.facts.map((fact, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-[#FAF7F0] border border-stone-200/80 flex items-start gap-3"
                        >
                          <FactVisualIcon visual={fact.visual} />
                          <div>
                            <h3 className="font-display font-bold text-xs text-stone-900">
                              {fact.title}
                            </h3>
                            <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                              {fact.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clickable Book Page Turn Footer */}
                  <div className="pt-1 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePrevPage}
                      disabled={index === 0}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs font-bold text-stone-800 hover:bg-stone-100 disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Oldingi sahifa
                    </button>

                    <span className="text-[11px] font-mono text-stone-400 tabular-nums hidden sm:inline">
                      Sahifa {index * 2 + 1}–{index * 2 + 2}
                    </span>

                    <button
                      type="button"
                      onClick={handleNextPage}
                      disabled={index === total - 1}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#144D2E] text-white text-xs font-bold hover:bg-[#1A633C] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
                    >
                      Keyingi hayvonga varoqlash
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ============================================================
          QUICK BOOK CHAPTER INDEX STRIP (Jump to any of 20 animals)
         ============================================================ */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>Kitob mundarijasi — istalgan hayvonga o‘ting</span>
          </div>
          <span className="text-xs text-stone-500 tabular-nums">{allAnimals.length} ta hayvon</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {allAnimals.map((item, idx) => {
            const isCurrent = item.id === animal.id;
            const itemHerb = item.category === 'herbivore';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setFlipDirection(idx >= index ? 1 : -1);
                  onSelectAnimalById(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isCurrent
                    ? itemHerb
                      ? 'bg-emerald-800 text-white'
                      : 'bg-red-800 text-white'
                    : 'bg-[#FAF7F0] text-stone-700 hover:bg-stone-200/70 border border-stone-200'
                }`}
              >
                {idx + 1}. {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
