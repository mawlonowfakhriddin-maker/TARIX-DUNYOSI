import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Animal } from '../types/animal';
import { AnimalArtwork } from './illustrations/AnimalArtwork';

export type HabitatBehaviorMode = 'roam' | 'speak' | 'feed';

interface DustPuff {
  id: number;
  xPct: number;
  isWater: boolean;
  isSnow: boolean;
}

interface LivingHabitatStageProps {
  animal: Animal;
  isSpeaking?: boolean;
  isPaused?: boolean;
  behaviorMode?: HabitatBehaviorMode;
  stageVariant?: 'book' | 'video';
  interactive?: boolean;
  sizeClass?: string;
  onAnimalClick?: () => void;
  onActionChange?: (label: string) => void;
  children?: React.ReactNode;
}

function getBaseSpeedPctPerSec(animal: Animal): number {
  switch (animal.anim) {
    case 'gallop':
      return 16;
    case 'leap':
    case 'pounce':
      return 14;
    case 'fly':
      return 15;
    case 'swim':
      return 12;
    case 'stalk':
      return 9;
    case 'roar':
    case 'graze':
    case 'sway':
    default:
      return 7.5;
  }
}

function getActionLabel(animal: Animal, isMoving: boolean, mode: HabitatBehaviorMode): string {
  if (mode === 'speak') {
    return `${animal.soundLabel} ovozini chiqarmoqda`;
  }
  if (mode === 'feed') {
    return 'Oziqlanmoqda';
  }
  if (!isMoving) {
    if (animal.anim === 'fly') return 'Havoda qanot qoqmoqda';
    if (animal.anim === 'swim') return 'Suvda suzib dam olmoqda';
    if (animal.category === 'herbivore') return 'Atrofni kuzatib o‘tlamoqda';
    return 'Hududini kuzatmoqda';
  }
  switch (animal.anim) {
    case 'fly':
      return 'Osmon bo‘ylab uchmoqda';
    case 'swim':
      return 'Suv bo‘ylab suzib yuribdi';
    case 'gallop':
      return 'Kenglik bo‘ylab yugurmoqda';
    case 'leap':
      return 'Sakrash bilan harakatlanmoqda';
    case 'stalk':
    case 'pounce':
      return 'Ov izlab yurmoqda';
    default:
      return 'Yashash joyida yurmoqda';
  }
}

export const LivingHabitatStage: React.FC<LivingHabitatStageProps> = ({
  animal,
  isSpeaking = false,
  isPaused = false,
  behaviorMode = 'roam',
  stageVariant = 'book',
  interactive = true,
  sizeClass = 'w-40 h-40 sm:w-48 sm:h-48',
  onAnimalClick,
  onActionChange,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [xPct, setXPct] = useState(30);
  const [facingRight, setFacingRight] = useState(true);
  const [isMoving, setIsMoving] = useState(true);
  const [stepY, setStepY] = useState(0);
  const [puffs, setPuffs] = useState<DustPuff[]>([]);

  const stateRef = useRef({
    x: 30,
    targetX: 74,
    facingRight: true,
    pauseTimer: 0,
    phase: 0,
    puffTimer: 0,
    nextPuffId: 1,
    lastMoving: true,
  });

  // Reset starting roam path when switching animals
  useEffect(() => {
    const startX = 28;
    const firstTarget = 74;
    stateRef.current = {
      x: startX,
      targetX: firstTarget,
      facingRight: true,
      pauseTimer: 0,
      phase: 0,
      puffTimer: 0,
      nextPuffId: 1,
      lastMoving: true,
    };
    setXPct(startX);
    setFacingRight(true);
    setIsMoving(true);
    setStepY(0);
    setPuffs([]);
  }, [animal.id]);

  // Adjust target when switching documentary/book behavior modes
  useEffect(() => {
    if (behaviorMode === 'speak' || behaviorMode === 'feed') {
      stateRef.current.targetX = 50;
      stateRef.current.pauseTimer = 0;
    }
  }, [behaviorMode]);

  // Report live action text when state changes
  useEffect(() => {
    onActionChange?.(getActionLabel(animal, isMoving, behaviorMode));
  }, [animal, isMoving, behaviorMode, onActionChange]);

  // Smooth 60fps roaming physics loop
  useEffect(() => {
    if (isPaused) return;

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const s = stateRef.current;
      const speed = getBaseSpeedPctPerSec(animal);
      const diff = s.targetX - s.x;

      if (s.pauseTimer > 0 && behaviorMode === 'roam') {
        s.pauseTimer -= dt;
        s.phase += dt * 2.5;
        const idleBob =
          animal.anim === 'fly'
            ? Math.sin(s.phase) * 7
            : animal.anim === 'swim'
            ? Math.sin(s.phase) * 4
            : 0;
        setStepY(idleBob);
        if (s.lastMoving) {
          s.lastMoving = false;
          setIsMoving(false);
        }
      } else if (Math.abs(diff) > 1.2) {
        const dir = diff > 0 ? 1 : -1;
        s.x += dir * speed * dt;
        s.facingRight = dir > 0;
        s.phase += dt * (animal.anim === 'gallop' || animal.anim === 'leap' ? 11 : 7.5);

        // Realistic locomotion vertical bounce / glide curve
        let verticalOffset = 0;
        if (animal.anim === 'fly') {
          verticalOffset = Math.sin(s.phase * 0.6) * 11;
        } else if (animal.anim === 'swim') {
          verticalOffset = Math.sin(s.phase * 0.7) * 5;
        } else if (animal.anim === 'leap' || animal.anim === 'gallop' || animal.anim === 'pounce') {
          verticalOffset = -Math.abs(Math.sin(s.phase)) * 10;
        } else {
          verticalOffset = -Math.abs(Math.sin(s.phase)) * 3.5;
        }

        // Spawn trailing dust puffs / snow / water wake ripples
        s.puffTimer += dt;
        if (s.puffTimer >= 0.34) {
          s.puffTimer = 0;
          const puffId = s.nextPuffId++;
          const puffX = s.x - dir * 5;
          const isWater = animal.biome === 'river' || animal.biome === 'ocean';
          const isSnow = animal.biome === 'tundra';
          setPuffs((prev) => [...prev.slice(-4), { id: puffId, xPct: puffX, isWater, isSnow }]);
        }

        if (!s.lastMoving) {
          s.lastMoving = true;
          setIsMoving(true);
        }
        setXPct(s.x);
        setFacingRight(s.facingRight);
        setStepY(verticalOffset);
      } else {
        // Reached destination
        if (behaviorMode === 'roam') {
          s.pauseTimer = 1.6 + Math.random() * 1.4;
          const goRight = s.x < 50;
          s.targetX = goRight
            ? 64 + Math.random() * 20
            : 16 + Math.random() * 20;
        } else {
          if (s.lastMoving) {
            s.lastMoving = false;
            setIsMoving(false);
          }
          setStepY(0);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [animal, behaviorMode, isPaused]);

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickPct = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(15, Math.min(85, clickPct));
    stateRef.current.targetX = clamped;
    stateRef.current.pauseTimer = 0;
  };

  // Vertical resting placement inside the habitat (cleared above bottom HUD/subtitles)
  const isVideo = stageVariant === 'video';
  const bottomOffsetClass =
    animal.anim === 'fly'
      ? isVideo
        ? 'bottom-[30%]'
        : 'bottom-[26%]'
      : animal.anim === 'swim'
      ? isVideo
        ? 'bottom-[21%]'
        : 'bottom-[17%]'
      : isVideo
      ? 'bottom-[16%]'
      : 'bottom-[12%]';

  const shadowBottomClass = isVideo ? 'bottom-[16%]' : 'bottom-[12%]';
  const puffBottomClass =
    animal.anim === 'fly'
      ? isVideo
        ? 'bottom-[28%]'
        : 'bottom-[24%]'
      : isVideo
      ? 'bottom-[18%]'
      : 'bottom-[14%]';

  return (
    <div
      ref={containerRef}
      onClick={handleStageClick}
      className={`relative w-full h-full overflow-hidden ${interactive ? 'cursor-pointer' : ''}`}
      title={interactive ? "Hayvonni shu yerga yurgizish uchun bosing" : undefined}
    >
      {/* Trailing Footstep Dust / Water Wake Particles */}
      <AnimatePresence>
        {puffs.map((puff) => (
          <motion.div
            key={puff.id}
            initial={{ opacity: 0.75, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.55, y: puff.isWater ? -4 : -10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            style={{ left: `${puff.xPct}%` }}
            className={`absolute ${puffBottomClass} -translate-x-1/2 pointer-events-none z-10`}
          >
            {puff.isWater ? (
              <div className="w-8 h-3 rounded-full border-2 border-sky-200/80" />
            ) : (
              <div
                className={`w-4 h-4 rounded-full blur-[1px] ${
                  puff.isSnow ? 'bg-white/75' : 'bg-amber-200/55'
                }`}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dynamic Moving Ground Shadow */}
      {animal.anim !== 'swim' && (
        <div
          style={{
            left: `${xPct}%`,
            transform: `translateX(-50%) scale(${animal.anim === 'fly' ? 0.72 : Math.max(0.75, 1 + stepY * 0.018)})`,
            opacity: animal.anim === 'fly' ? 0.22 : 0.36,
          }}
          className={`absolute ${shadowBottomClass} w-24 sm:w-32 h-4 rounded-full bg-black/70 blur-[3px] pointer-events-none z-10 transition-transform duration-75`}
        />
      )}

      {/* Roaming Animal Actor */}
      <div
        style={{
          left: `${xPct}%`,
          transform: `translate3d(-50%, ${stepY.toFixed(1)}px, 0)`,
        }}
        className={`absolute ${bottomOffsetClass} z-10 flex flex-col items-center pointer-events-none`}
      >
        {/* Acoustic Soundwave Rings when speaking */}
        {isSpeaking && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0.85 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-4 rounded-full border-2 border-amber-300/85 pointer-events-none"
          />
        )}

        {/* Children overlays (flying food / happy badge) */}
        {children}

        {/* Flip smoothly based on walking direction */}
        <button
          type="button"
          onClick={(e) => {
            if (onAnimalClick) {
              e.stopPropagation();
              onAnimalClick();
            }
          }}
          aria-label={`${animal.name} — ovozini eshitish`}
          className={`pointer-events-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-300 rounded-2xl transition-transform duration-300 ${
            isMoving ? `animal-anim-${animal.anim}` : ''
          }`}
          style={{
            transform: `scaleX(${facingRight ? 1 : -1})`,
          }}
        >
          <AnimalArtwork
            animalId={animal.id}
            isSpeaking={isSpeaking}
            className={`${sizeClass} drop-shadow-[0_14px_18px_rgba(0,0,0,0.45)]`}
          />
        </button>
      </div>
    </div>
  );
};
