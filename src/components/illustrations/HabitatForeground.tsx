import React from 'react';
import { BiomeType } from '../../types/animal';

interface HabitatForegroundProps {
  biome: BiomeType;
  className?: string;
}

export const HabitatForeground: React.FC<HabitatForegroundProps> = ({
  biome,
  className = 'w-full h-full pointer-events-none',
}) => {
  const isAquatic = biome === 'ocean' || biome === 'river';
  const isCold = biome === 'tundra' || biome === 'mountain';

  return (
    <svg
      viewBox="0 0 900 320"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {/* Distant Ambient Atmosphere (Birds, Snow, Bubbles, Sun Motes) */}
      {!isAquatic && !isCold && (
        <g className="anim-bird-glide" stroke="#1E293B" strokeWidth="2" fill="none" opacity="0.45">
          <path d="M180 62 Q188 54 196 62 Q204 54 212 62" />
          <path d="M225 78 Q231 72 237 78 Q243 72 249 78" />
        </g>
      )}

      {(biome === 'forest' || biome === 'jungle' || biome === 'savanna' || biome === 'farm') && (
        <g fill="#FEF08A" opacity="0.65">
          <circle cx="160" cy="210" r="2.5" className="anim-float-particle" />
          <circle cx="340" cy="180" r="2" className="anim-float-particle" style={{ animationDelay: '1.2s' }} />
          <circle cx="560" cy="220" r="2.8" className="anim-float-particle" style={{ animationDelay: '2.4s' }} />
          <circle cx="740" cy="190" r="2.2" className="anim-float-particle" style={{ animationDelay: '3.6s' }} />
        </g>
      )}

      {biome === 'tundra' && (
        <g fill="#FFFFFF" opacity="0.8">
          {[90, 210, 330, 470, 610, 760, 840].map((x, idx) => (
            <circle
              key={x}
              cx={x}
              cy={24 + (idx % 3) * 28}
              r={idx % 2 === 0 ? 3.2 : 2.2}
              className="anim-snow-fall"
              style={{ animationDelay: `${idx * 0.75}s` }}
            />
          ))}
        </g>
      )}

      {isAquatic && (
        <g fill="#E0F2FE" opacity="0.55">
          {[140, 280, 440, 620, 770].map((x, idx) => (
            <circle
              key={x}
              cx={x}
              cy={255 + (idx % 2) * 18}
              r={3 + (idx % 3) * 1.5}
              className="anim-bubble-rise"
              style={{ animationDelay: `${idx * 0.85}s` }}
            />
          ))}
        </g>
      )}

      {/* ============================================================
          FOREGROUND DEPTH OCCLUSION LAYER (Animal walks BEHIND these)
         ============================================================ */}
      {(biome === 'farm' || biome === 'steppe') && (
        <g>
          {[35, 95, 170, 250, 390, 520, 645, 760, 845].map((x, idx) => (
            <g
              key={x}
              className={idx % 2 === 0 ? 'anim-sway-grass' : 'anim-sway-grass-alt'}
              style={{ animationDelay: `${(idx % 4) * 0.35}s` }}
            >
              <path
                d={`M${x} 322 Q${x - 8} 292 ${x - 14} 276 Q${x - 4} 292 ${x + 3} 322 Z`}
                fill={biome === 'steppe' ? '#65A30D' : '#3F6212'}
              />
              <path
                d={`M${x + 6} 322 Q${x + 12} 288 ${x + 18} 272 Q${x + 10} 292 ${x + 12} 322 Z`}
                fill={biome === 'steppe' ? '#84CC16' : '#4D7C0F'}
              />
            </g>
          ))}
        </g>
      )}

      {biome === 'savanna' && (
        <g>
          {[40, 120, 230, 380, 540, 690, 815].map((x, idx) => (
            <g
              key={x}
              className={idx % 2 === 0 ? 'anim-sway-grass' : 'anim-sway-grass-alt'}
              style={{ animationDelay: `${(idx % 3) * 0.45}s` }}
            >
              <path
                d={`M${x} 322 Q${x - 10} 286 ${x - 16} 268 Q${x - 3} 288 ${x + 4} 322 Z`}
                fill="#A16207"
              />
              <path
                d={`M${x + 8} 322 Q${x + 14} 290 ${x + 20} 274 Q${x + 10} 294 ${x + 12} 322 Z`}
                fill="#CA8A04"
              />
            </g>
          ))}
        </g>
      )}

      {(biome === 'forest' || biome === 'jungle') && (
        <g>
          {[28, 130, 260, 440, 620, 765, 860].map((x, idx) => (
            <g
              key={x}
              className={idx % 2 === 0 ? 'anim-sway-grass' : 'anim-sway-grass-alt'}
              style={{ animationDelay: `${(idx % 4) * 0.3}s` }}
            >
              <ellipse
                cx={x}
                cy={306}
                rx={24}
                ry={11}
                transform={`rotate(${idx % 2 === 0 ? -24 : 20} ${x} 306)`}
                fill={biome === 'jungle' ? '#047857' : '#166534'}
              />
              <ellipse
                cx={x + 16}
                cy={310}
                rx={20}
                ry={9}
                transform={`rotate(${idx % 2 === 0 ? 18 : -18} ${x + 16} 310)`}
                fill={biome === 'jungle' ? '#10B981' : '#15803D'}
              />
            </g>
          ))}
        </g>
      )}

      {biome === 'mountain' && (
        <g>
          <ellipse cx="75" cy="312" rx="68" ry="18" fill="#57534E" />
          <ellipse cx="820" cy="310" rx="74" ry="20" fill="#44403C" />
          {[150, 340, 560, 720].map((x, idx) => (
            <path
              key={x}
              d={`M${x} 322 Q${x - 6} 296 ${x - 10} 284 Q${x} 298 ${x + 5} 322 Z`}
              className={idx % 2 === 0 ? 'anim-sway-grass' : 'anim-sway-grass-alt'}
              fill="#3F6212"
            />
          ))}
        </g>
      )}

      {biome === 'desert' && (
        <g>
          <path d="M0 304 Q160 288 320 306 T640 298 T900 306 L900 322 L0 322 Z" fill="#B45309" opacity="0.55" />
          {[95, 310, 610, 810].map((x, idx) => (
            <path
              key={x}
              d={`M${x} 320 Q${x - 8} 296 ${x - 14} 288 Q${x - 2} 302 ${x + 3} 320 Z`}
              className={idx % 2 === 0 ? 'anim-sway-grass' : 'anim-sway-grass-alt'}
              fill="#92400E"
            />
          ))}
        </g>
      )}

      {biome === 'tundra' && (
        <g>
          <path d="M0 302 Q200 286 420 304 T900 296 L900 322 L0 322 Z" fill="#E2E8F0" opacity="0.82" />
          <path d="M0 310 Q280 296 580 312 T900 304 L900 322 L0 322 Z" fill="#F8FAFC" opacity="0.9" />
        </g>
      )}

      {biome === 'river' && (
        <g>
          <g className="water-ripple" stroke="#BAE6FD" strokeWidth="3" fill="none" opacity="0.55">
            <path d="M20 292 Q110 282 200 292 T380 292 T560 292 T740 292 T900 292" />
          </g>
          {[48, 88, 795, 838].map((x, idx) => (
            <path
              key={x}
              d={`M${x} 322 Q${x - 6} 274 ${x - 10} 252`}
              stroke="#14532D"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
              className={idx % 2 === 0 ? 'anim-sway-grass' : 'anim-sway-grass-alt'}
            />
          ))}
        </g>
      )}

      {biome === 'ocean' && (
        <g>
          {[56, 86, 795, 835].map((x, idx) => (
            <path
              key={x}
              d={`M${x} 322 Q${x - 10} 285 ${x + 6} 256 Q${x + 14} 286 ${x + 8} 322 Z`}
              fill="#0F766E"
              opacity="0.72"
              className={idx % 2 === 0 ? 'anim-sway-grass' : 'anim-sway-grass-alt'}
            />
          ))}
          <g className="water-ripple" stroke="#7DD3FC" strokeWidth="2.5" fill="none" opacity="0.4">
            <path d="M0 300 Q120 290 240 300 T480 300 T720 300 T900 300" />
          </g>
        </g>
      )}
    </svg>
  );
};
