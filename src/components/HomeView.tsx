import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Volume2, MapPin, ArrowRight, BookOpen, Film } from 'lucide-react';
import { Animal, Category } from '../types/animal';
import { AnimalArtwork } from './illustrations/AnimalArtwork';
import { HabitatScene } from './illustrations/HabitatScene';
import { HabitatForeground } from './illustrations/HabitatForeground';
import { playAnimalSound } from '../utils/soundEngine';

interface HomeViewProps {
  animals: Animal[];
  selectedFilter: 'all' | Category;
  onFilterChange: (filter: 'all' | Category) => void;
  onSelectAnimal: (animal: Animal) => void;
  onOpenGreenBook: (category?: Category) => void;
  onOpenVideo: (animal: Animal) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  animals,
  selectedFilter,
  onFilterChange,
  onSelectAnimal,
  onOpenGreenBook,
  onOpenVideo,
}) => {
  const [search, setSearch] = useState('');
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);

  const herbivoreCount = useMemo(
    () => animals.filter((a) => a.category === 'herbivore').length,
    [animals]
  );
  const carnivoreCount = useMemo(
    () => animals.filter((a) => a.category === 'carnivore').length,
    [animals]
  );

  const filteredAnimals = useMemo(() => {
    return animals.filter((a) => {
      const matchesCat = selectedFilter === 'all' || a.category === selectedFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.latin.toLowerCase().includes(q) ||
        a.biomeLabel.toLowerCase().includes(q) ||
        a.regionNames.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [animals, selectedFilter, search]);

  const handleQuickSound = (e: React.MouseEvent, animalId: string) => {
    e.stopPropagation();
    setPlayingCardId(animalId);
    playAnimalSound(animalId, {
      onEnd: () => setPlayingCardId(null),
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 pt-6 space-y-10">
      {/* ============================================================
          HERO: INTERACTIVE 3D GREEN BOOK ("YASHIL KITOB") + INTRO
         ============================================================ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 6 cols: Interactive Clickable Green Hardcover Book */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.button
            type="button"
            onClick={() => onOpenGreenBook(selectedFilter === 'all' ? undefined : selectedFilter)}
            whileHover={{ y: -6, rotateY: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="group relative w-full max-w-[380px] aspect-[4/5] rounded-r-3xl rounded-l-lg bg-gradient-to-br from-[#19623B] via-[#134D2E] to-[#0B301C] text-left p-7 sm:p-8 shadow-[14px_22px_45px_rgba(11,48,28,0.4)] border-2 border-[#2A7E50] cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Book Spine Ribbing */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-[#082213] via-[#154A2C] to-transparent border-r border-amber-300/20"
            />
            {/* Paper Pages Edge on Right */}
            <div
              aria-hidden="true"
              className="absolute inset-y-3 right-0 w-2.5 bg-gradient-to-l from-[#EFE9DA] via-[#D8CEB8] to-[#B7AD96] rounded-r-xl"
            />
            {/* Gold Embossed Inner Frame */}
            <div
              aria-hidden="true"
              className="absolute inset-4 left-9 border border-amber-300/40 rounded-xl pointer-events-none"
            />

            <div className="relative z-10 pl-5 space-y-2">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-amber-300/90">
                Yashil Tabiat Kitobi
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FAF7F0] leading-tight">
                Hayvonlar Ensiklopediyasi
              </h1>
              <p className="text-xs text-emerald-100/85 tabular-nums">
                {herbivoreCount} ta o‘txo‘r · {carnivoreCount} ta go‘shtxo‘r hayvon
              </p>
            </div>

            {/* Center Emblem with Live Animated Animal Trio */}
            <div className="relative z-10 pl-4 my-2 flex items-center justify-center">
              <div className="relative w-44 h-44 rounded-full bg-[#0C351F]/80 border border-amber-300/40 flex items-center justify-center shadow-inner">
                <div className="w-36 h-36 animal-anim-roar">
                  <AnimalArtwork animalId="sher" className="w-full h-full drop-shadow-xl" />
                </div>
              </div>
            </div>

            <div className="relative z-10 pl-5 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-amber-200">
                  Kitobni ochish uchun bosing
                </div>
                <div className="text-[11px] text-emerald-100/75">
                  Har varoqlashda yangi hayvon va ovoz
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-300 text-[#0B301C] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
          </motion.button>
        </div>

        {/* Right 6 cols: Two Book Chapters + Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-emerald-800">
              Jonli rasm · Hujjatli video · Ovoz · Xarita · Ratsion
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#142419] tracking-tight leading-[1.15] [text-wrap:balance]">
              Kitobni oching va hayvonlarni haqiqiydek kuzating
            </h2>
            <p className="text-base text-stone-600 leading-relaxed">
              Yashil kitobga bossangiz hayvonlar sahifama-sahifa ochiladi: har bir hayvon
              o‘z tabiatida harakatlanadi, maxsus videosi va ovozi jaranglaydi, xaritada
              qayerda yashashi va nima yeyishi ko‘rsatiladi.
            </p>
            <div>
              <button
                type="button"
                onClick={() => onOpenVideo(animals[0])}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-emerald-700/30 text-xs font-bold text-emerald-900 hover:bg-emerald-50 transition-colors cursor-pointer shadow-sm"
              >
                <Film className="w-4 h-4 text-emerald-700" />
                <span>Hujjatli videolarni tomosha qilish</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onOpenGreenBook('herbivore')}
              className="group relative overflow-hidden rounded-2xl border border-emerald-700/30 bg-white hover:border-emerald-700 text-left p-5 flex flex-col justify-between min-h-[168px] transition-all cursor-pointer shadow-sm"
            >
              <div className="absolute right-0 bottom-0 w-28 h-28 opacity-95 translate-x-1 translate-y-1 group-hover:scale-105 transition-transform">
                <AnimalArtwork animalId="fil" className="w-full h-full" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-800 tabular-nums">
                  1-bo‘lim · {herbivoreCount} ta hayvon
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-stone-900">
                  O‘txo‘r Hayvonlar
                </h3>
                <p className="mt-1 text-xs text-stone-600 max-w-[165px]">
                  Sigir, Fil, Jirafa, Kenguru, Panda, Koala, Begemot, Zebra va boshqalar
                </p>
              </div>
              <div className="relative z-10 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 mt-4">
                <span>Kitobda ochish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              type="button"
              onClick={() => onOpenGreenBook('carnivore')}
              className="group relative overflow-hidden rounded-2xl border border-red-700/25 bg-white hover:border-red-700 text-left p-5 flex flex-col justify-between min-h-[168px] transition-all cursor-pointer shadow-sm"
            >
              <div className="absolute right-0 bottom-0 w-28 h-28 opacity-95 translate-x-1 translate-y-1 group-hover:scale-105 transition-transform">
                <AnimalArtwork animalId="yolbars" className="w-full h-full" />
              </div>
              <div>
                <span className="text-xs font-semibold text-red-800 tabular-nums">
                  2-bo‘lim · {carnivoreCount} ta hayvon
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-stone-900">
                  Go‘shtxo‘r Hayvonlar
                </h3>
                <p className="mt-1 text-xs text-stone-600 max-w-[165px]">
                  Sher, Yo‘lbars, Ayiq, Yaguar, Delfin, Lochin, Boyo‘g‘li, Akula va boshqalar
                </p>
              </div>
              <div className="relative z-10 inline-flex items-center gap-1.5 text-xs font-bold text-red-800 mt-4">
                <span>Kitobda ochish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          FILTERABLE ANIMAL DIRECTORY ("MUNDARIJA")
         ============================================================ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-stone-200 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center p-1 bg-stone-200/80 rounded-xl">
            <button
              type="button"
              onClick={() => onFilterChange('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                selectedFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Barchasi ({animals.length})
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('herbivore')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                selectedFilter === 'herbivore'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              O‘txo‘rlar ({herbivoreCount})
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('carnivore')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                selectedFilter === 'carnivore'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Go‘shtxo‘rlar ({carnivoreCount})
            </button>
          </div>

          <span className="text-xs text-stone-500 tabular-nums">
            {filteredAnimals.length} ta hayvon
          </span>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hayvon yoki yashash joyini qidiring..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-700"
          />
        </div>
      </div>

      {/* Illustrated Animal Gallery Grid */}
      {filteredAnimals.length === 0 ? (
        <div className="rounded-2xl bg-white border border-stone-200 p-10 text-center">
          <p className="font-display text-lg font-semibold text-stone-800">
            Hech qanday hayvon topilmadi
          </p>
          <p className="text-sm text-stone-500 mt-1">
            Qidiruv so‘zini o‘zgartiring yoki filtrni tozalang.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              onFilterChange('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#142419] text-white text-xs font-semibold cursor-pointer"
          >
            Barchasini ko‘rsatish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAnimals.map((animal, idx) => {
            const isHerb = animal.category === 'herbivore';
            const isSounding = playingCardId === animal.id;

            return (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.025, 0.25) }}
                onClick={() => onSelectAnimal(animal)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectAnimal(animal);
                  }
                }}
                className="group rounded-2xl bg-white border border-stone-200 overflow-hidden hover:border-emerald-700/50 hover:shadow-md transition-all cursor-pointer flex flex-col focus-visible:outline-2 focus-visible:outline-emerald-700"
              >
                {/* Mini Habitat Preview with Articulated Animal Inside */}
                <div className="relative h-40 overflow-hidden bg-stone-100">
                  <HabitatScene biome={animal.biome} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

                  <div
                    className={`absolute inset-0 flex items-end justify-center pb-2 animal-anim-${animal.anim}`}
                  >
                    <AnimalArtwork
                      animalId={animal.id}
                      isSpeaking={isSounding}
                      className="w-28 h-28 drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 pointer-events-none">
                    <HabitatForeground biome={animal.biome} />
                  </div>

                  {/* Quick Video & Sound Triggers */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenVideo(animal);
                      }}
                      aria-label={`${animal.name} videosini ko‘rish`}
                      title="Videoni ko‘rish"
                      className="p-2 rounded-lg bg-emerald-800/90 text-amber-300 hover:bg-emerald-700 backdrop-blur-sm transition-colors cursor-pointer"
                    >
                      <Film className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleQuickSound(e, animal.id)}
                      aria-label={`${animal.name} ovozini eshitish`}
                      title="Ovozini eshitish"
                      className={`p-2 rounded-lg backdrop-blur-sm transition-colors cursor-pointer ${
                        isSounding
                          ? 'bg-amber-400 text-stone-950'
                          : 'bg-white/90 text-stone-800 hover:bg-white'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-stone-500">
                      <span className={isHerb ? 'text-emerald-800 font-semibold' : 'text-red-800 font-semibold'}>
                        {isHerb ? "O'txo'r" : "Go'shtxo'r"}
                      </span>
                      <span className="tabular-nums">{animal.weightLabel}</span>
                    </div>

                    <h3 className="mt-1 font-display text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                      {idx + 1}. {animal.name}
                    </h3>
                    <p className="text-xs italic text-stone-500">{animal.latin}</p>
                  </div>

                  <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2 text-xs text-stone-600">
                    <span className="inline-flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{animal.biomeLabel}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
