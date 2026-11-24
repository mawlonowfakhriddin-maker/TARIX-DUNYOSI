import React from 'react';
import { FoodIconType } from '../../types/animal';
import { AnimalArtwork } from './AnimalArtwork';

interface FoodIllustrationProps {
  type: FoodIconType;
  className?: string;
}

export const FoodIllustration: React.FC<FoodIllustrationProps> = ({ type, className = 'w-14 h-14' }) => {
  switch (type) {
    case 'grass':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <ellipse cx="40" cy="66" rx="28" ry="6" fill="#4D7C0F" opacity="0.25" />
          <path d="M26 64 Q18 38 14 22 Q28 36 32 64 Z" fill="#16A34A" />
          <path d="M36 64 Q36 30 40 12 Q46 34 44 64 Z" fill="#22C55E" />
          <path d="M46 64 Q56 36 64 20 Q58 46 52 64 Z" fill="#15803D" />
          <path d="M22 64 Q26 46 28 34" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'hay':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="14" y="30" width="52" height="34" rx="8" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
          <line x1="28" y1="30" x2="28" y2="64" stroke="#B45309" strokeWidth="3" />
          <line x1="52" y1="30" x2="52" y2="64" stroke="#B45309" strokeWidth="3" />
          <g stroke="#CA8A04" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="40" x2="36" y2="40" />
            <line x1="42" y1="48" x2="60" y2="48" />
            <line x1="20" y1="56" x2="40" y2="56" />
          </g>
        </svg>
      );
    case 'carrot':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M46 22 Q56 10 64 14 M46 22 Q60 18 66 26 M44 22 Q48 10 54 10" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M44 20 C52 26 50 38 40 48 L18 66 C14 68 12 64 14 60 L32 32 C36 22 40 18 44 20 Z" fill="#F97316" stroke="#7C2D12" strokeWidth="2.5" />
          <line x1="34" y1="36" x2="40" y2="41" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="48" x2="31" y2="52" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'corn':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <ellipse cx="40" cy="38" rx="14" ry="26" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
          <g stroke="#CA8A04" strokeWidth="1.5">
            <line x1="34" y1="16" x2="34" y2="58" />
            <line x1="46" y1="16" x2="46" y2="58" />
            <line x1="28" y1="30" x2="52" y2="30" />
            <line x1="28" y1="42" x2="52" y2="42" />
          </g>
          <path d="M24 38 Q22 64 40 68 Q34 52 28 38 Z" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
          <path d="M56 38 Q58 64 40 68 Q46 52 52 38 Z" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
        </svg>
      );
    case 'apple':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M40 20 Q44 10 52 12" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <ellipse cx="49" cy="18" rx="8" ry="4" transform="rotate(-24 49 18)" fill="#22C55E" />
          <path d="M40 26 C24 22 16 38 20 54 C24 66 36 68 40 64 C44 68 56 66 60 54 C64 38 56 22 40 26 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
          <ellipse cx="30" cy="36" rx="4" ry="8" transform="rotate(-20 30 36)" fill="#FCA5A5" opacity="0.6" />
        </svg>
      );
    case 'leaf':
    case 'acacia':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M16 62 Q22 24 64 16 Q60 54 22 60 Z" fill={type === 'acacia' ? '#65A30D' : '#16A34A'} stroke="#14532D" strokeWidth="2.5" />
          <path d="M14 64 L54 24" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 46 L46 46 M38 38 L52 38 M26 52 L28 38" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'shrub':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M40 66 L40 38 M40 52 L24 38 M40 48 L56 36" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <circle cx="24" cy="34" r="12" fill="#4D7C0F" />
          <circle cx="56" cy="34" r="12" fill="#4D7C0F" />
          <circle cx="40" cy="26" r="15" fill="#65A30D" />
        </svg>
      );
    case 'cabbage':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="42" r="24" fill="#4ADE80" stroke="#14532D" strokeWidth="2.5" />
          <path d="M22 44 Q40 24 58 44" fill="none" stroke="#166534" strokeWidth="2.5" />
          <path d="M26 54 Q40 38 54 54" fill="none" stroke="#166534" strokeWidth="2.5" />
          <circle cx="40" cy="40" r="12" fill="#86EFAC" />
        </svg>
      );
    case 'banana':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M20 52 Q36 66 60 36 Q64 24 58 18 Q50 40 24 44 Q18 46 20 52 Z" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
          <path d="M16 44 Q32 54 52 26" fill="none" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'bark':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="20" y="16" width="40" height="48" rx="6" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
          <path d="M30 22 L30 58 M42 20 L40 60 M52 24 L52 56" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'flower':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <line x1="40" y1="40" x2="40" y2="68" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
          <circle cx="40" cy="22" r="9" fill="#F472B6" />
          <circle cx="54" cy="34" r="9" fill="#F472B6" />
          <circle cx="40" cy="46" r="9" fill="#F472B6" />
          <circle cx="26" cy="34" r="9" fill="#F472B6" />
          <circle cx="40" cy="34" r="8" fill="#FACC15" />
        </svg>
      );
    case 'cactus':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="33" y="14" width="14" height="52" rx="7" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
          <path d="M33 38 Q20 38 20 26 L20 22" fill="none" stroke="#16A34A" strokeWidth="10" strokeLinecap="round" />
          <path d="M47 32 Q60 32 60 22 L60 18" fill="none" stroke="#16A34A" strokeWidth="10" strokeLinecap="round" />
        </svg>
      );
    case 'mushroom':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="33" y="40" width="14" height="24" rx="4" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.5" />
          <path d="M16 42 Q40 12 64 42 Z" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="34" cy="30" r="3" fill="#FEF3C7" />
          <circle cx="48" cy="32" r="2.5" fill="#FEF3C7" />
        </svg>
      );
    case 'berry':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <ellipse cx="44" cy="20" rx="10" ry="5" transform="rotate(-15 44 20)" fill="#16A34A" />
          <circle cx="32" cy="46" r="12" fill="#7C3AED" stroke="#4C1D95" strokeWidth="2" />
          <circle cx="48" cy="48" r="12" fill="#6D28D9" stroke="#4C1D95" strokeWidth="2" />
          <circle cx="40" cy="34" r="12" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="2" />
        </svg>
      );
    case 'zebra':
      return <AnimalArtwork animalId="zebra" className={className} />;
    case 'deer':
      return <AnimalArtwork animalId="kiyik" className={className} />;
    case 'croc':
      return <AnimalArtwork animalId="timsoh" className={className} />;
    case 'rabbit':
      return <AnimalArtwork animalId="quyon" className={className} />;
    case 'fish':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <polygon points="18,40 8,28 8,52" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2" />
          <ellipse cx="42" cy="40" rx="22" ry="14" fill="#38BDF8" stroke="#0C4A6E" strokeWidth="2.5" />
          <circle cx="54" cy="37" r="2.5" fill="#0F172A" />
          <path d="M36 28 Q40 40 36 52" fill="none" stroke="#0284C7" strokeWidth="2.5" />
        </svg>
      );
    case 'buffalo':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="20" y="34" width="38" height="24" rx="10" fill="#44403C" stroke="#1C1917" strokeWidth="2.5" />
          <circle cx="58" cy="38" r="11" fill="#292524" stroke="#1C1917" strokeWidth="2.5" />
          <path d="M52 28 Q44 18 52 18 M64 28 Q72 18 64 18" fill="none" stroke="#E7E5E4" strokeWidth="4" strokeLinecap="round" />
          <rect x="24" y="54" width="6" height="12" fill="#292524" />
          <rect x="48" y="54" width="6" height="12" fill="#292524" />
        </svg>
      );
    case 'boar':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <ellipse cx="40" cy="44" rx="22" ry="15" fill="#78350F" stroke="#292524" strokeWidth="2.5" />
          <ellipse cx="62" cy="46" rx="5" ry="7" fill="#F4A5AE" stroke="#292524" strokeWidth="2" />
          <path d="M54 50 Q62 48 62 40" fill="none" stroke="#FEF3C7" strokeWidth="3" strokeLinecap="round" />
          <circle cx="52" cy="38" r="2.2" fill="#111" />
        </svg>
      );
    case 'monkey':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="22" cy="36" r="7" fill="#B45309" />
          <circle cx="58" cy="36" r="7" fill="#B45309" />
          <circle cx="40" cy="38" r="18" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
          <ellipse cx="40" cy="44" rx="13" ry="10" fill="#FDE68A" />
          <circle cx="34" cy="34" r="2.5" fill="#111" />
          <circle cx="46" cy="34" r="2.5" fill="#111" />
        </svg>
      );
    case 'mouse':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M18 52 Q8 46 14 34" fill="none" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="42" cy="48" rx="18" ry="12" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
          <circle cx="46" cy="34" r="8" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
          <circle cx="56" cy="45" r="2" fill="#111" />
          <circle cx="62" cy="48" r="2.5" fill="#F472B6" />
        </svg>
      );
    case 'insect':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <ellipse cx="40" cy="44" rx="14" ry="18" fill="#B91C1C" stroke="#450A0A" strokeWidth="2.5" />
          <circle cx="40" cy="24" r="8" fill="#1C1917" />
          <line x1="40" y1="28" x2="40" y2="62" stroke="#1C1917" strokeWidth="2.5" />
          <circle cx="33" cy="40" r="2.5" fill="#1C1917" />
          <circle cx="47" cy="46" r="2.5" fill="#1C1917" />
        </svg>
      );
    case 'bird':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <ellipse cx="38" cy="44" rx="18" ry="13" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.5" />
          <circle cx="52" cy="34" r="10" fill="#0EA5E9" stroke="#0C4A6E" strokeWidth="2.5" />
          <polygon points="60,32 70,36 60,40" fill="#F59E0B" />
          <circle cx="54" cy="32" r="2" fill="#111" />
        </svg>
      );
    case 'seal':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M18 52 Q36 32 58 38 Q66 44 62 56 L18 56 Z" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="58" cy="42" r="2" fill="#111" />
          <circle cx="64" cy="46" r="2.5" fill="#0F172A" />
        </svg>
      );
    case 'turtle':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M18 48 Q40 20 62 48 Z" fill="#15803D" stroke="#14532D" strokeWidth="2.5" />
          <circle cx="66" cy="44" r="6" fill="#4ADE80" stroke="#14532D" strokeWidth="2" />
          <rect x="24" y="48" width="8" height="10" rx="3" fill="#4ADE80" />
          <rect x="48" y="48" width="8" height="10" rx="3" fill="#4ADE80" />
        </svg>
      );
    case 'squid':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M40 12 L54 44 L26 44 Z" fill="#EC4899" stroke="#831843" strokeWidth="2.5" />
          <path d="M30 44 Q24 58 20 66 M40 44 L40 68 M50 44 Q56 58 60 66" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="35" cy="36" r="2" fill="#111" />
          <circle cx="45" cy="36" r="2" fill="#111" />
        </svg>
      );
    case 'bone':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M22 34 A7 7 0 1 1 28 24 L52 46 A7 7 0 1 1 46 56 L22 34 Z" fill="#FEF9EC" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="20" cy="30" r="6" fill="#FEF9EC" stroke="#78350F" strokeWidth="2" />
          <circle cx="58" cy="52" r="6" fill="#FEF9EC" stroke="#78350F" strokeWidth="2" />
        </svg>
      );
    case 'bamboo':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="26" y="14" width="11" height="52" rx="3" fill="#22C55E" stroke="#14532D" strokeWidth="2.2" />
          <rect x="43" y="18" width="11" height="48" rx="3" fill="#16A34A" stroke="#14532D" strokeWidth="2.2" />
          <line x1="25" y1="30" x2="38" y2="30" stroke="#14532D" strokeWidth="2.5" />
          <line x1="25" y1="48" x2="38" y2="48" stroke="#14532D" strokeWidth="2.5" />
          <line x1="42" y1="36" x2="55" y2="36" stroke="#14532D" strokeWidth="2.5" />
          <ellipse cx="60" cy="24" rx="9" ry="4" transform="rotate(-24 60 24)" fill="#4ADE80" />
          <ellipse cx="19" cy="22" rx="8" ry="4" transform="rotate(24 19 22)" fill="#4ADE80" />
        </svg>
      );
    case 'eucalyptus':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M40 66 L40 16" stroke="#57534E" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="26" cy="46" rx="11" ry="7" transform="rotate(-20 26 46)" fill="#5EEAD4" stroke="#115E59" strokeWidth="2" />
          <ellipse cx="54" cy="40" rx="11" ry="7" transform="rotate(20 54 40)" fill="#2DD4BF" stroke="#115E59" strokeWidth="2" />
          <ellipse cx="28" cy="26" rx="10" ry="6" transform="rotate(-25 28 26)" fill="#2DD4BF" stroke="#115E59" strokeWidth="2" />
          <ellipse cx="52" cy="22" rx="9" ry="5" transform="rotate(25 52 22)" fill="#5EEAD4" stroke="#115E59" strokeWidth="2" />
        </svg>
      );
    case 'nut':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M24 38 C24 58 40 66 40 66 C40 66 56 58 56 38 Z" fill="#B45309" stroke="#451A03" strokeWidth="2.5" />
          <path d="M20 38 Q40 18 60 38 Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
          <line x1="40" y1="22" x2="40" y2="14" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'algae':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M26 66 Q18 46 28 32 Q34 20 26 12" fill="none" stroke="#059669" strokeWidth="7" strokeLinecap="round" />
          <path d="M40 66 Q48 48 38 30 Q34 18 42 10" fill="none" stroke="#10B981" strokeWidth="7" strokeLinecap="round" />
          <path d="M54 66 Q48 48 56 32 Q60 22 54 14" fill="none" stroke="#047857" strokeWidth="7" strokeLinecap="round" />
        </svg>
      );
    case 'honey':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="22" y="24" width="36" height="40" rx="12" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
          <rect x="26" y="16" width="28" height="10" rx="4" fill="#92400E" stroke="#451A03" strokeWidth="2" />
          <ellipse cx="34" cy="40" rx="4" ry="8" fill="#FEF08A" opacity="0.7" />
        </svg>
      );
    case 'frog':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <ellipse cx="40" cy="46" rx="20" ry="15" fill="#22C55E" stroke="#14532D" strokeWidth="2.5" />
          <circle cx="30" cy="30" r="6" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
          <circle cx="50" cy="30" r="6" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
          <circle cx="30" cy="30" r="2.5" fill="#111" />
          <circle cx="50" cy="30" r="2.5" fill="#111" />
          <path d="M32 48 Q40 54 48 48" fill="none" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'crab':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <ellipse cx="40" cy="46" rx="18" ry="13" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
          <path d="M24 38 Q14 26 22 20 M56 38 Q66 26 58 20" fill="none" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
          <circle cx="33" cy="38" r="2" fill="#111" />
          <circle cx="47" cy="38" r="2" fill="#111" />
          <path d="M22 48 L12 56 M24 54 L16 62 M58 48 L68 56 M56 54 L64 62" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'lizard':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M16 56 Q28 46 38 42 Q50 38 60 28" fill="none" stroke="#65A30D" strokeWidth="9" strokeLinecap="round" />
          <circle cx="62" cy="27" r="6" fill="#4D7C0F" />
          <path d="M36 44 L30 56 M46 40 L52 52" stroke="#3F6212" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'egg':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <ellipse cx="34" cy="44" rx="14" ry="19" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.5" />
          <ellipse cx="48" cy="46" rx="12" ry="16" fill="#FDE68A" stroke="#92400E" strokeWidth="2.5" />
        </svg>
      );
    case 'melon':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M16 48 A24 24 0 0 0 64 48 Z" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
          <path d="M20 48 A20 20 0 0 0 60 48 Z" fill="#EF4444" />
          <circle cx="34" cy="54" r="1.8" fill="#1C1917" />
          <circle cx="42" cy="57" r="1.8" fill="#1C1917" />
          <circle cx="48" cy="53" r="1.8" fill="#1C1917" />
        </svg>
      );
    case 'snake':
    default:
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M16 56 Q28 28 42 46 T64 30" fill="none" stroke="#16A34A" strokeWidth="8" strokeLinecap="round" />
          <circle cx="65" cy="29" r="5" fill="#15803D" />
          <circle cx="67" cy="27" r="1.5" fill="#FDE047" />
        </svg>
      );
  }
};
