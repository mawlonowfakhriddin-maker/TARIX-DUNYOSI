import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Animal } from '../types/animal';
import { AnimalArtwork } from './illustrations/AnimalArtwork';
import { HabitatScene } from './illustrations/HabitatScene';

interface AppOpeningIntroProps {
  visible: boolean;
  onComplete: () => void;
}

export const AppOpeningIntro: React.FC<AppOpeningIntroProps> = ({ visible, onComplete }) => {
  useEffect(() => {
    if (!visible) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(onComplete, prefersReduced ? 350 : 2100);
    return () => window.clearTimeout(timer);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#102619] text-[#F6F5F0]"
        >
          {/* Ambient radial sunbeam */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 0.25 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute w-[620px] h-[620px] rounded-full bg-amber-300/30 blur-3xl pointer-events-none"
          />

          {/* Floating animal parade */}
          <div className="relative z-10 flex items-end justify-center gap-4 sm:gap-8 mb-6">
            <motion.div
              initial={{ x: -70, y: 30, opacity: 0, rotate: -10 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: -4 }}
              transition={{ duration: 0.65, delay: 0.15, type: 'spring', bounce: 0.38 }}
              className="w-24 h-24 sm:w-28 sm:h-28"
            >
              <AnimalArtwork animalId="jirafa" className="w-full h-full drop-shadow-xl" />
            </motion.div>

            <motion.div
              initial={{ y: 50, scale: 0.55, opacity: 0 }}
              animate={{ y: -8, scale: 1.08, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.05, type: 'spring', bounce: 0.42 }}
              className="w-32 h-32 sm:w-40 sm:h-40"
            >
              <AnimalArtwork animalId="sher" className="w-full h-full drop-shadow-2xl" />
            </motion.div>

            <motion.div
              initial={{ x: 70, y: 30, opacity: 0, rotate: 10 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 4 }}
              transition={{ duration: 0.65, delay: 0.25, type: 'spring', bounce: 0.38 }}
              className="w-24 h-24 sm:w-28 sm:h-28"
            >
              <AnimalArtwork animalId="fil" className="w-full h-full drop-shadow-xl" />
            </motion.div>
          </div>

          {/* Book Title Reveal */}
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 font-display text-3xl sm:text-5xl font-bold tracking-tight text-center text-[#FAF8F4] px-4"
          >
            Hayvonlar Ensiklopediyasi
          </motion.h1>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="relative z-10 mt-2 text-sm sm:text-base text-emerald-200/90 text-center max-w-md px-6"
          >
            Yashil kitob · Jonli harakat, ovoz, hujjatli video va tabiat olami
          </motion.p>

          {/* Animated progress bar */}
          <div className="relative z-10 mt-8 w-44 h-1.5 bg-white/15 rounded-full overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
              className="w-full h-full bg-amber-300 rounded-full"
            />
          </div>

          <button
            type="button"
            onClick={onComplete}
            className="relative z-10 mt-6 px-4 py-2 text-xs font-medium text-emerald-100/80 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            O‘tkazib yuborish
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface BookEncyclopediaIntroProps {
  visible: boolean;
  totalAnimals: number;
  onComplete: () => void;
}

export const BookEncyclopediaIntro: React.FC<BookEncyclopediaIntroProps> = ({
  visible,
  totalAnimals,
  onComplete,
}) => {
  useEffect(() => {
    if (!visible) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(onComplete, prefersReduced ? 280 : 1650);
    return () => window.clearTimeout(timer);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={onComplete}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0E2E1C] via-[#134D2E] to-[#0B2617] text-[#FAF8F4] cursor-pointer px-4"
        >
          {/* Ambient golden glow */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.35, opacity: 0.25 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute w-[580px] h-[580px] rounded-full bg-amber-300/35 blur-3xl pointer-events-none"
          />

          {/* 3D Green Book Icon Opening Effect */}
          <motion.div
            initial={{ scale: 0.72, rotateY: -28, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.55, type: 'spring', bounce: 0.35 }}
            className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-amber-300 mb-3"
          >
            Yashil Kitob Ochilmoqda
          </motion.div>

          <motion.h1
            initial={{ y: 22, scale: 0.92, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center text-[#FAF8F4]"
          >
            Hayvonlar Ensiklopediyasi
          </motion.h1>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="relative z-10 mt-2 text-sm text-emerald-100/90 text-center tabular-nums"
          >
            {totalAnimals} ta o‘txo‘r va go‘shtxo‘r hayvon olamiga xush kelibsiz
          </motion.p>

          {/* Animated Parade of Animals */}
          <div className="relative z-10 mt-8 flex items-end justify-center gap-2 sm:gap-5 flex-wrap max-w-3xl">
            {[
              { id: 'fil', delay: 0.1 },
              { id: 'sher', delay: 0.18 },
              { id: 'panda', delay: 0.26 },
              { id: 'delfin', delay: 0.34 },
              { id: 'burgut', delay: 0.42 },
            ].map((item) => (
              <motion.div
                key={item.id}
                initial={{ y: 40, scale: 0.5, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: item.delay, type: 'spring', bounce: 0.4 }}
                className="w-20 h-20 sm:w-28 sm:h-28"
              >
                <AnimalArtwork animalId={item.id} className="w-full h-full drop-shadow-2xl" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 mt-7 text-xs text-amber-200/80">
            Davom etish uchun bosing
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface AnimalRevealIntroProps {
  animal: Animal | null;
  onComplete: () => void;
}

export const AnimalRevealIntro: React.FC<AnimalRevealIntroProps> = ({ animal, onComplete }) => {
  useEffect(() => {
    if (!animal) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(onComplete, prefersReduced ? 220 : 1250);
    return () => window.clearTimeout(timer);
  }, [animal, onComplete]);

  return (
    <AnimatePresence>
      {animal && (
        <motion.div
          key={animal.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.32 }}
          onClick={onComplete}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#122619] cursor-pointer"
        >
          {/* Biome background preview */}
          <motion.div
            initial={{ scale: 1.18, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.48 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <HabitatScene biome={animal.biome} className="w-full h-full object-cover" />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1E13] via-[#0D1E13]/45 to-[#0D1E13]/65" />

          {/* Expanding ring */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute w-48 h-48 rounded-full border-2 border-amber-300/70 pointer-events-none"
          />

          {/* Animal leaping into stage */}
          <motion.div
            initial={{ scale: 0.35, y: 48, rotate: -8, opacity: 0 }}
            animate={{ scale: 1.08, y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.65, type: 'spring', bounce: 0.45 }}
            className="relative z-10 w-44 h-44 sm:w-52 sm:h-52"
          >
            <AnimalArtwork animalId={animal.id} className="w-full h-full drop-shadow-2xl" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="relative z-10 mt-3 text-center px-4"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {animal.name}
            </h2>
            <p className="mt-1.5 text-sm text-amber-200/95">
              {animal.latin} · {animal.biomeLabel}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
