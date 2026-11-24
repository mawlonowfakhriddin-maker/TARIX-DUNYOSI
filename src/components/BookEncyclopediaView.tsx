import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Film, MapPin, Search, Volume2 } from 'lucide-react';
import { Animal, Category } from '../types/animal';
import { HabitatScene } from './illustrations/HabitatScene';
import { HabitatForeground } from './illustrations/HabitatForeground';
import { AnimalArtwork } from './illustrations/AnimalArtwork';
import { playAnimalSound } from '../utils/soundEngine';

interface BookEncyclopediaViewProps {
  animals: Animal[];
  selectedFilter: 'all' | Category;
  onFilterChange: (filter: 'all' | Category) => void;
  onSelectAnimal: (animal: Animal) => void;
  onOpenVideo: (animal: Animal) => void;
  onBackToCover: () => void;
}

export const BookEncyclopediaView: React.FC<BookEncyclopediaViewProps> = ({
  animals,
  selectedFilter,
  onFilterChange,
  onSelectAnimal,
  onOpenVideo,
  onBackToCover,
}) => {
  const [search, setSearch] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const herbivoreCount = useMemo(
    () => animals.filter((a) => a.category === 'herbivore').length,
    [animals]
  );
  const carnivoreCount = useMemo(
    () => animals.filter((a) => a.category === 'carnivore').length,
    [animals]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return animals.filter((a) => {
      const catOk = selectedFilter === 'all' || a.category === selectedFilter;
      const searchOk =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.latin.toLowerCase().includes(q) ||
        a.biomeLabel.toLowerCase().includes(q) ||
        a.regionNames.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }, [animals, selectedFilter, search]);

  const handlePlaySound = (e: React.MouseEvent, animalId: string) => {
    e.stopPropagation();
    setPlayingId(animalId);
    playAnimalSound(animalId, {
      onEnd: () => setPlayingId(null),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-16 pt-5 space-y-5">
      {/* Top Book Return Control */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToCover}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Kitob muqovasiga qaytish
        </button>

        <div className="text-xs sm:text-sm font-medium text-stone-600 tabular-nums">
          Ochiq kitob · {filtered.length} ta hayvon ko‘rsatilmoqda
        </div>
      </div>

      {/* Green Leather Book Frame containing the Open "Hayvonlar Ensiklopediyasi" */}
      <div className="book-perspective">
        <div className="relative rounded-[26px] p-2.5 sm:p-4 bg-gradient-to-br from-[#144D2E] via-[#0F3C23] to-[#0A2A18] shadow-[0_24px_60px_rgba(10,42,24,0.42)] border-2 border-[#236B43]">
          {/* Gold Embossed Corner Marks */}
          <div className="hidden sm:block pointer-events-none absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-300/45 rounded-tl-xl" />
          <div className="hidden sm:block pointer-events-none absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-300/45 rounded-tr-xl" />
          <div className="hidden sm:block pointer-events-none absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-300/45 rounded-bl-xl" />
          <div className="hidden sm:block pointer-events-none absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-300/45 rounded-br-xl" />

          {/* Stacked Paper Edge */}
          <div className="relative rounded-[18px] bg-[#EFE9DA] p-0.5 sm:p-1 shadow-inner">
            <motion.div
              initial={{ opacity: 0, rotateX: 8, scale: 0.98 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[15px] bg-[#FAF7F0] p-4 sm:p-8 space-y-6 shadow-md"
            >
              {/* Encyclopedia Book Title Banner */}
              <div className="border-b border-stone-300/80 pb-5 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                    <BookOpen className="w-4 h-4" />
                    <span>Yashil Tabiat Kitobi</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{herbivoreCount} ta o‘txo‘r</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{carnivoreCount} ta go‘shtxo‘r</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#142419] tracking-tight">
                    Hayvonlar Ensiklopediyasi
                  </h1>
                  <p className="text-sm text-stone-600 max-w-2xl">
                    Istalgan hayvonni bosing — uning yashash joyida yurishi, ovozi, hujjatli videosi,
                    xaritasi va nima yeyishi batafsil ochiladi.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectAnimal(filtered[0] ?? animals[0])}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#144D2E] text-white text-xs sm:text-sm font-bold hover:bg-[#1A633C] transition-colors cursor-pointer shadow-sm whitespace-nowrap shrink-0 self-start lg:self-auto"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>1-sahifadan o‘qishni boshlash</span>
                </button>
              </div>

              {/* Filter & Search Bar inside the Book */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-stone-200/80 rounded-xl self-start">
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

                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Kitob ichidan hayvon qidirish..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300/80 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              {/* Encyclopedia Animal Spread Grid */}
              {filtered.length === 0 ? (
                <div className="rounded-2xl bg-white border border-stone-200 p-10 text-center space-y-3">
                  <p className="font-display text-lg font-semibold text-stone-800">
                    Qidirilgan hayvon topilmadi
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      onFilterChange('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#144D2E] text-white text-xs font-semibold cursor-pointer"
                  >
                    Barcha hayvonlarni ko‘rsatish
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filtered.map((animal, idx) => {
                    const isHerb = animal.category === 'herbivore';
                    const isSounding = playingId === animal.id;

                    return (
                      <motion.div
                        key={animal.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.24, delay: Math.min(idx * 0.02, 0.24) }}
                        onClick={() => onSelectAnimal(animal)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectAnimal(animal);
                          }
                        }}
                        className="group rounded-2xl bg-white border border-stone-200 overflow-hidden hover:border-emerald-700 hover:shadow-md transition-all cursor-pointer flex flex-col focus-visible:outline-2 focus-visible:outline-emerald-700"
                      >
                        <div className="relative h-40 overflow-hidden bg-stone-100">
                          <HabitatScene biome={animal.biome} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />

                          <div
                            className={`absolute inset-0 flex items-end justify-center pb-2 animal-anim-${animal.anim}`}
                          >
                            <AnimalArtwork
                              animalId={animal.id}
                              isSpeaking={isSounding}
                              className="w-28 h-28 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)] group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          <div className="absolute inset-0 pointer-events-none">
                            <HabitatForeground biome={animal.biome} />
                          </div>

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
                              onClick={(e) => handlePlaySound(e, animal.id)}
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

                        <div className="p-4 flex-1 flex flex-col justify-between gap-2.5">
                          <div>
                            <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-stone-500">
                              <span className={isHerb ? 'text-emerald-800 font-semibold' : 'text-red-800 font-semibold'}>
                                {isHerb ? "O'txo'r" : "Go'shtxo'r"}
                              </span>
                              <span className="tabular-nums">{animal.speedKmh} km/soat</span>
                            </div>
                            <h2 className="mt-1 font-display text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                              {idx + 1}. {animal.name}
                            </h2>
                            <p className="text-xs italic text-stone-500">{animal.latin}</p>
                            <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                              {animal.dietSummary}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 text-xs text-stone-600">
                            <span className="inline-flex items-center gap-1 truncate">
                              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                              <span className="truncate">{animal.biomeLabel}</span>
                            </span>
                            <span className="font-bold text-emerald-800 shrink-0">Sahifa →</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
