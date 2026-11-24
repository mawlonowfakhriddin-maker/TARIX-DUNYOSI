import React from 'react';
import { RegionId } from '../../types/animal';

interface WorldMapMiniProps {
  regions: RegionId[];
  accentColor?: string;
}

export const WorldMapMini: React.FC<WorldMapMiniProps> = ({
  regions,
  accentColor = '#15803D',
}) => {
  const has = (r: RegionId) => regions.includes(r);
  const oceanHighlight = has('oceans');

  return (
    <svg
      viewBox="0 0 360 180"
      className="w-full h-auto rounded-xl"
      role="img"
      aria-label="Hayvon yashaydigan dunyo hududlari xaritasi"
    >
      {/* Ocean Background */}
      <rect
        width="360"
        height="180"
        rx="12"
        fill={oceanHighlight ? '#0284C7' : '#E0F2FE'}
        opacity={oceanHighlight ? 0.24 : 0.7}
      />

      {/* Subtle Equator & Grid */}
      <line x1="0" y1="92" x2="360" y2="92" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.45" />
      <line x1="180" y1="0" x2="180" y2="180" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.35" />

      {/* North America */}
      <path
        d="M28 30 L88 24 L112 46 L94 74 L74 88 L56 80 L40 58 Z"
        fill={has('north_america') ? accentColor : '#CBD5E1'}
        stroke="#FFF"
        strokeWidth="1.5"
      />
      {/* South America */}
      <path
        d="M78 96 L112 102 L120 128 L100 162 L84 156 L76 124 Z"
        fill={has('south_america') ? accentColor : '#CBD5E1'}
        stroke="#FFF"
        strokeWidth="1.5"
      />
      {/* Europe */}
      <path
        d="M156 30 L198 26 L204 52 L176 60 L154 54 Z"
        fill={has('europe') ? accentColor : '#CBD5E1'}
        stroke="#FFF"
        strokeWidth="1.5"
      />
      {/* Africa */}
      <path
        d="M154 66 L198 66 L216 94 L198 142 L176 146 L160 108 L148 84 Z"
        fill={has('africa') ? accentColor : '#CBD5E1'}
        stroke="#FFF"
        strokeWidth="1.5"
      />
      {/* Asia */}
      <path
        d="M202 26 L296 24 L318 54 L298 86 L256 96 L220 80 L204 58 Z"
        fill={has('asia') ? accentColor : '#CBD5E1'}
        stroke="#FFF"
        strokeWidth="1.5"
      />
      {/* Australia */}
      <path
        d="M276 116 L318 114 L326 144 L294 152 L274 136 Z"
        fill={has('australia') ? accentColor : '#CBD5E1'}
        stroke="#FFF"
        strokeWidth="1.5"
      />

      {/* Animated Location Beacons */}
      {has('north_america') && <circle cx="72" cy="54" r="4" fill="#FDE047" stroke="#142419" strokeWidth="1.5" />}
      {has('south_america') && <circle cx="96" cy="126" r="4" fill="#FDE047" stroke="#142419" strokeWidth="1.5" />}
      {has('europe') && <circle cx="178" cy="44" r="4" fill="#FDE047" stroke="#142419" strokeWidth="1.5" />}
      {has('africa') && <circle cx="182" cy="96" r="4.5" fill="#FDE047" stroke="#142419" strokeWidth="1.5" />}
      {has('asia') && <circle cx="256" cy="58" r="4.5" fill="#FDE047" stroke="#142419" strokeWidth="1.5" />}
      {has('australia') && <circle cx="300" cy="134" r="4" fill="#FDE047" stroke="#142419" strokeWidth="1.5" />}
      {oceanHighlight && (
        <>
          <circle cx="132" cy="116" r="5" fill="#FDE047" stroke="#0C4A6E" strokeWidth="1.5" />
          <circle cx="242" cy="124" r="5" fill="#FDE047" stroke="#0C4A6E" strokeWidth="1.5" />
          <circle cx="38" cy="118" r="5" fill="#FDE047" stroke="#0C4A6E" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
};
