import React from 'react';
import { BiomeType } from '../../types/animal';

interface HabitatSceneProps {
  biome: BiomeType;
  className?: string;
}

export const HabitatScene: React.FC<HabitatSceneProps> = ({ biome, className = 'w-full h-full' }) => {
  switch (biome) {
    case 'farm':
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="farmSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="65%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#ECFCCB" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#farmSky)" />
          <circle cx="770" cy="65" r="36" fill="#FDE047" />
          <circle cx="770" cy="65" r="52" fill="#FDE047" opacity="0.22" />
          <g className="cloud-drift" opacity="0.9">
            <ellipse cx="160" cy="68" rx="58" ry="22" fill="#FFF" />
            <ellipse cx="195" cy="58" rx="40" ry="20" fill="#FFF" />
            <ellipse cx="520" cy="54" rx="50" ry="18" fill="#FFF" />
          </g>
          {/* Rolling Pastures */}
          <path d="M0 215 Q240 160 510 205 T900 185 L900 320 L0 320 Z" fill="#84CC16" />
          <path d="M0 235 Q300 205 620 240 T900 225 L900 320 L0 320 Z" fill="#4D7C0F" />
          {/* Wooden Barn */}
          <g transform="translate(650 116)">
            <rect x="10" y="34" width="110" height="72" fill="#B91C1C" stroke="#450A0A" strokeWidth="2.5" />
            <polygon points="0,36 65,0 130,36" fill="#7F1D1D" stroke="#450A0A" strokeWidth="2.5" />
            <rect x="46" y="60" width="38" height="46" fill="#78350F" />
            <line x1="46" y1="60" x2="84" y2="106" stroke="#FEF3C7" strokeWidth="2.5" />
            <line x1="84" y1="60" x2="46" y2="106" stroke="#FEF3C7" strokeWidth="2.5" />
          </g>
          {/* Wooden Fence */}
          <g fill="#92400E">
            <rect x="30" y="210" width="8" height="44" rx="2" />
            <rect x="110" y="210" width="8" height="44" rx="2" />
            <rect x="190" y="210" width="8" height="44" rx="2" />
            <rect x="270" y="210" width="8" height="44" rx="2" />
            <rect x="24" y="222" width="260" height="6" rx="2" />
            <rect x="24" y="238" width="260" height="6" rx="2" />
          </g>
          {/* Trees */}
          <g transform="translate(75 110)">
            <rect x="18" y="55" width="14" height="52" fill="#78350F" />
            <circle cx="25" cy="40" r="32" fill="#15803D" />
            <circle cx="4" cy="48" r="22" fill="#16A34A" />
            <circle cx="46" cy="48" r="22" fill="#16A34A" />
          </g>
        </svg>
      );

    case 'mountain':
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="mtnSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="65%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#mtnSky)" />
          <g className="cloud-drift" opacity="0.88">
            <ellipse cx="190" cy="64" rx="64" ry="22" fill="#FFF" />
            <ellipse cx="670" cy="54" rx="54" ry="20" fill="#FFF" />
          </g>
          {/* Distant Snow Peaks */}
          <polygon points="0,240 160,72 340,240" fill="#64748B" />
          <polygon points="220,240 430,38 640,240" fill="#475569" />
          <polygon points="500,240 720,62 900,240" fill="#64748B" />
          {/* Snow Caps */}
          <polygon points="160,72 198,112 174,106 160,122 142,108 122,112" fill="#F8FAFC" />
          <polygon points="430,38 476,88 446,80 430,98 408,82 384,88" fill="#F8FAFC" />
          <polygon points="720,62 762,108 734,98 720,114 700,100 678,108" fill="#F8FAFC" />
          {/* Alpine Meadow & Rocks */}
          <path d="M0 220 Q260 185 520 218 T900 205 L900 320 L0 320 Z" fill="#65A30D" />
          <path d="M0 250 Q320 230 620 256 T900 245 L900 320 L0 320 Z" fill="#3F6212" />
          {/* Rocky Ledges */}
          <ellipse cx="120" cy="280" rx="64" ry="24" fill="#78716C" />
          <ellipse cx="770" cy="276" rx="76" ry="26" fill="#57534E" />
          {/* Pine Trees */}
          <g transform="translate(46 154)">
            <polygon points="20,0 0,48 40,48" fill="#14532D" />
            <polygon points="20,20 -4,68 44,68" fill="#166534" />
          </g>
          <g transform="translate(810 156)">
            <polygon points="20,0 0,48 40,48" fill="#14532D" />
            <polygon points="20,20 -4,68 44,68" fill="#166534" />
          </g>
        </svg>
      );

    case 'steppe':
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="steppeSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="65%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#FEF9C3" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#steppeSky)" />
          <circle cx="750" cy="68" r="34" fill="#FACC15" />
          <g className="cloud-drift" opacity="0.85">
            <ellipse cx="210" cy="60" rx="70" ry="20" fill="#FFF" />
            <ellipse cx="520" cy="48" rx="52" ry="16" fill="#FFF" />
          </g>
          <path d="M0 205 Q280 175 560 202 T900 190 L900 320 L0 320 Z" fill="#A3E635" />
          <path d="M0 228 Q350 206 680 232 T900 220 L900 320 L0 320 Z" fill="#65A30D" />
          {/* Feather Grass & Distant Hills */}
          <path d="M0 264 Q450 248 900 264 L900 320 L0 320 Z" fill="#4D7C0F" />
          <g stroke="#BEF264" strokeWidth="2.5" strokeLinecap="round">
            <path d="M90 282 Q84 260 76 250 M90 282 Q96 258 104 252" />
            <path d="M770 278 Q764 256 756 246 M770 278 Q778 256 786 248" />
          </g>
        </svg>
      );

    case 'forest':
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="forestSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="60%" stopColor="#DCFCE7" />
              <stop offset="100%" stopColor="#BBF7D0" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#forestSky)" />
          {/* Sunbeams */}
          <polygon points="180,0 280,0 440,320 260,320" fill="#FEF9C3" opacity="0.28" />
          <polygon points="560,0 640,0 780,320 620,320" fill="#FEF9C3" opacity="0.22" />
          {/* Forest Ground */}
          <path d="M0 215 Q260 195 520 218 T900 205 L900 320 L0 320 Z" fill="#22C55E" />
          <path d="M0 245 Q320 230 650 248 T900 240 L900 320 L0 320 Z" fill="#15803D" />
          {/* Tall Forest Trees */}
          {[60, 175, 690, 815].map((x, idx) => (
            <g key={x} transform={`translate(${x} ${idx % 2 === 0 ? 48 : 66})`}>
              <rect x="20" y="68" width="18" height="120" fill="#78350F" />
              <circle cx="29" cy="48" r="46" fill={idx % 2 === 0 ? '#166534' : '#15803D'} />
              <circle cx="4" cy="64" r="30" fill="#15803D" />
              <circle cx="54" cy="64" r="30" fill="#16A34A" />
            </g>
          ))}
          {/* Forest Pond */}
          <ellipse cx="720" cy="285" rx="95" ry="20" fill="#38BDF8" opacity="0.65" />
        </svg>
      );

    case 'savanna':
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="savSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="48%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#savSky)" />
          <circle cx="675" cy="84" r="44" fill="#F97316" opacity="0.85" />
          <circle cx="675" cy="84" r="64" fill="#FDBA74" opacity="0.3" />
          {/* Savanna Horizon */}
          <path d="M0 205 Q280 185 560 205 T900 198 L900 320 L0 320 Z" fill="#D97706" />
          <path d="M0 232 Q340 218 660 236 T900 228 L900 320 L0 320 Z" fill="#B45309" />
          {/* Iconic Acacia Trees */}
          <g transform="translate(54 96)">
            <path d="M44 128 L44 52 M44 76 L20 50 M44 72 L70 46" stroke="#451A03" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="44" cy="40" rx="56" ry="15" fill="#4D7C0F" />
            <ellipse cx="22" cy="46" rx="34" ry="11" fill="#65A30D" />
            <ellipse cx="66" cy="46" rx="34" ry="11" fill="#3F6212" />
          </g>
          <g transform="translate(740 108)">
            <path d="M40 112 L40 46 M40 68 L18 44 M40 64 L64 42" stroke="#451A03" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="40" cy="36" rx="48" ry="13" fill="#4D7C0F" />
          </g>
          {/* Waterhole */}
          <ellipse cx="220" cy="285" rx="90" ry="18" fill="#0EA5E9" opacity="0.7" />
        </svg>
      );

    case 'desert':
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="desSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#desSky)" />
          <circle cx="760" cy="68" r="42" fill="#FEF08A" />
          {/* Sand Dunes */}
          <path d="M0 205 Q180 150 380 198 T800 184 L900 195 L900 320 L0 320 Z" fill="#F59E0B" />
          <path d="M0 238 Q260 200 540 242 T900 226 L900 320 L0 320 Z" fill="#D97706" />
          {/* Cacti */}
          <g transform="translate(105 148)" fill="#15803D">
            <rect x="14" y="0" width="14" height="72" rx="7" />
            <path d="M14 34 Q0 34 0 20 L0 12" fill="none" stroke="#15803D" strokeWidth="10" strokeLinecap="round" />
            <path d="M28 28 Q42 28 42 14 L42 8" fill="none" stroke="#15803D" strokeWidth="10" strokeLinecap="round" />
          </g>
          <g transform="translate(760 164)" fill="#166534">
            <rect x="10" y="0" width="12" height="58" rx="6" />
            <path d="M10 26 Q-2 26 -2 14" fill="none" stroke="#166534" strokeWidth="8" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'tundra':
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="tunSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="55%" stopColor="#1E3A5F" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#tunSky)" />
          {/* Aurora Borealis */}
          <path d="M60 72 Q260 28 460 68 T840 48" fill="none" stroke="#34D399" strokeWidth="26" strokeLinecap="round" opacity="0.22" />
          <path d="M140 94 Q380 54 620 92 T880 70" fill="none" stroke="#22D3EE" strokeWidth="18" strokeLinecap="round" opacity="0.18" />
          <circle cx="770" cy="60" r="28" fill="#FEF9C3" />
          {/* Snowy Plains */}
          <path d="M0 208 Q250 178 520 210 T900 198 L900 320 L0 320 Z" fill="#E2E8F0" />
          <path d="M0 240 Q320 220 640 245 T900 235 L900 320 L0 320 Z" fill="#F8FAFC" />
          {/* Snow Pines */}
          <g transform="translate(80 138)">
            <polygon points="24,0 0,68 48,68" fill="#1E3A2F" />
            <polygon points="24,0 12,30 36,30" fill="#F8FAFC" />
          </g>
          <g transform="translate(770 132)">
            <polygon points="26,0 0,74 52,74" fill="#1E3A2F" />
            <polygon points="26,0 13,34 39,34" fill="#F8FAFC" />
          </g>
        </svg>
      );

    case 'jungle':
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="junSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="60%" stopColor="#047857" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#junSky)" />
          {/* Tropical Mist */}
          <ellipse cx="450" cy="180" rx="420" ry="48" fill="#A7F3D0" opacity="0.12" />
          {/* Jungle Floor */}
          <path d="M0 220 Q280 202 580 224 T900 212 L900 320 L0 320 Z" fill="#065F46" />
          <path d="M0 250 Q320 236 650 255 T900 248 L900 320 L0 320 Z" fill="#064E3B" />
          {/* Bamboo & Vines */}
          <g stroke="#22C55E" strokeWidth="7" strokeLinecap="round" opacity="0.65">
            <line x1="70" y1="20" x2="70" y2="270" />
            <line x1="94" y1="40" x2="94" y2="275" />
            <line x1="790" y1="15" x2="790" y2="275" />
            <line x1="816" y1="35" x2="816" y2="275" />
          </g>
          {/* Hanging Vines */}
          <path d="M210 0 Q200 72 222 115" fill="none" stroke="#4ADE80" strokeWidth="4" />
          <path d="M680 0 Q692 80 666 128" fill="none" stroke="#4ADE80" strokeWidth="4" />
          {/* Tropical Leaves */}
          <ellipse cx="48" cy="276" rx="44" ry="16" transform="rotate(-18 48 276)" fill="#16A34A" />
          <ellipse cx="848" cy="272" rx="48" ry="18" transform="rotate(18 848 272)" fill="#16A34A" />
        </svg>
      );

    case 'river':
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="rivSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="50%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#6EE7B7" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#rivSky)" />
          {/* Lush Riverbank */}
          <path d="M0 150 Q260 128 540 154 T900 140 L900 220 L0 220 Z" fill="#15803D" />
          {/* River Water */}
          <rect x="0" y="180" width="900" height="140" fill="#0284C7" />
          <g className="water-ripple" stroke="#7DD3FC" strokeWidth="3" fill="none" opacity="0.65">
            <path d="M40 212 Q110 202 180 212 T320 212 T460 212 T600 212 T740 212 T880 212" />
            <path d="M0 256 Q90 246 180 256 T360 256 T540 256 T720 256 T900 256" />
          </g>
          {/* Reeds */}
          <g stroke="#14532D" strokeWidth="4" strokeLinecap="round">
            <line x1="64" y1="145" x2="54" y2="210" />
            <line x1="78" y1="138" x2="76" y2="212" />
            <line x1="825" y1="140" x2="832" y2="212" />
            <line x1="842" y1="146" x2="848" y2="210" />
          </g>
        </svg>
      );

    case 'ocean':
    default:
      return (
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="ocSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="45%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <rect width="900" height="320" fill="url(#ocSky)" />
          {/* Underwater Sun Rays */}
          <polygon points="240,0 340,0 440,320 280,320" fill="#7DD3FC" opacity="0.12" />
          <polygon points="540,0 640,0 740,320 560,320" fill="#7DD3FC" opacity="0.1" />
          {/* Surface Waves */}
          <path d="M0 32 Q90 18 180 32 T360 32 T540 32 T720 32 T900 32" fill="none" stroke="#BAE6FD" strokeWidth="4" opacity="0.7" />
          {/* Coral Reef Silhouettes */}
          <g fill="#0E7490" opacity="0.55">
            <circle cx="84" cy="296" r="32" />
            <circle cx="122" cy="304" r="24" />
            <circle cx="780" cy="298" r="36" />
            <circle cx="826" cy="308" r="26" />
          </g>
          {/* Bubbles */}
          <g fill="#E0F2FE" opacity="0.45">
            <circle cx="150" cy="140" r="6" />
            <circle cx="164" cy="112" r="4" />
            <circle cx="730" cy="154" r="7" />
            <circle cx="745" cy="122" r="4.5" />
          </g>
        </svg>
      );
  }
};
