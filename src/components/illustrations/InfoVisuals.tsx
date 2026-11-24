import React from 'react';
import { AnimalFact } from '../../types/animal';

interface SizeComparisonVisualProps {
  animalName: string;
  heightAvgCm: number;
  weightAvgKg: number;
}

export const SizeComparisonVisual: React.FC<SizeComparisonVisualProps> = ({
  animalName,
  heightAvgCm,
  weightAvgKg,
}) => {
  // Reference human = 170cm
  const maxRef = Math.max(heightAvgCm, 175);
  const humanBarPct = Math.round((170 / maxRef) * 100);
  const animalBarPct = Math.max(16, Math.round((heightAvgCm / maxRef) * 100));

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-4 h-24 px-2 pt-2 border-b border-stone-200">
        {/* Human Silhouette Bar */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="w-full flex justify-center items-end h-16">
            <svg viewBox="0 0 36 72" style={{ height: `${humanBarPct}%` }} className="w-auto min-h-[22px]" aria-hidden="true">
              <circle cx="18" cy="10" r="7" fill="#64748B" />
              <rect x="11" y="20" width="14" height="24" rx="5" fill="#64748B" />
              <rect x="11" y="45" width="5" height="22" rx="2" fill="#64748B" />
              <rect x="20" y="45" width="5" height="22" rx="2" fill="#64748B" />
            </svg>
          </div>
          <span className="text-[11px] font-medium text-stone-500 whitespace-nowrap">Odam · 170 sm</span>
        </div>

        {/* Animal Height Bar */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="w-full flex justify-center items-end h-16">
            <div
              style={{ height: `${animalBarPct}%` }}
              className="w-10 min-h-[16px] rounded-t-lg bg-emerald-700/85 border border-emerald-900/20 flex items-center justify-center"
            >
              <span className="text-[10px] font-mono font-bold text-white tabular-nums">
                {heightAvgCm}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-stone-800 whitespace-nowrap truncate max-w-[110px]">
            {animalName}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-stone-600 tabular-nums">
        <span>O‘rtacha vazn: <strong className="text-stone-900">{weightAvgKg} kg</strong></span>
        <span>Bo‘yi: <strong className="text-stone-900">{heightAvgCm} sm</strong></span>
      </div>
    </div>
  );
};

interface SpeedVisualProps {
  speedKmh: number;
}

export const SpeedVisual: React.FC<SpeedVisualProps> = ({ speedKmh }) => {
  const pct = Math.min(100, Math.round((speedKmh / 240) * 100));
  const carCompare = speedKmh >= 100 ? "Poyga mashinasi tezligida" : speedKmh >= 60 ? "Shahar avtomobili tezligida" : "Velosiped tezligida";

  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-display font-bold text-stone-900 tabular-nums">
          {speedKmh} <span className="text-sm font-normal text-stone-500">km/soat</span>
        </span>
        <span className="text-xs text-stone-500">{carCompare}</span>
      </div>
      <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.max(10, pct)}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-stone-400 font-mono tabular-nums">
        <span>0</span>
        <span>120 km/s</span>
        <span>240 km/s</span>
      </div>
    </div>
  );
};

interface FactVisualIconProps {
  visual: AnimalFact['visual'];
}

export const FactVisualIcon: React.FC<FactVisualIconProps> = ({ visual }) => {
  switch (visual) {
    case 'vision':
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 shrink-0" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#E0F2FE" />
          <path d="M8 24 Q24 10 40 24 Q24 38 8 24 Z" fill="#FFF" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="6" fill="#0369A1" />
          <circle cx="22" cy="22" r="2" fill="#FFF" />
        </svg>
      );
    case 'speed':
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 shrink-0" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#FEF3C7" />
          <path d="M12 30 A14 14 0 1 1 36 30" fill="none" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="24" y1="26" x2="34" y2="16" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="26" r="3" fill="#B45309" />
        </svg>
      );
    case 'brain':
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 shrink-0" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#EDE9FE" />
          <path d="M18 32 C12 32 10 24 14 18 C14 12 22 10 24 14 C26 10 34 12 34 18 C38 24 36 32 30 32 Z" fill="#8B5CF6" opacity="0.85" />
          <line x1="24" y1="14" x2="24" y2="32" stroke="#FFF" strokeWidth="2" />
        </svg>
      );
    case 'teeth':
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 shrink-0" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#FEE2E2" />
          <path d="M12 18 L18 30 L24 18 L30 30 L36 18" fill="#FFF" stroke="#B91C1C" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'herd':
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 shrink-0" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#DCFCE7" />
          <circle cx="17" cy="20" r="4.5" fill="#15803D" />
          <circle cx="31" cy="20" r="4.5" fill="#15803D" />
          <circle cx="24" cy="17" r="5" fill="#166534" />
          <path d="M11 33 Q17 26 24 33 Q31 26 37 33" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'adapt':
    default:
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 shrink-0" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#ECFCCB" />
          <path d="M14 34 Q18 14 36 12 Q34 32 14 34 Z" fill="#65A30D" />
          <path d="M14 34 L30 18" stroke="#3F6212" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
};
