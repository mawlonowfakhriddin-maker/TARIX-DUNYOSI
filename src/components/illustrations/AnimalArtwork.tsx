import React from 'react';
import { renderMoreAnimalArtwork } from './MoreAnimalArtworks';

interface AnimalArtworkProps {
  animalId: string;
  className?: string;
  isSpeaking?: boolean;
}

export const AnimalArtwork: React.FC<AnimalArtworkProps> = ({
  animalId,
  className = 'w-40 h-40',
  isSpeaking = false,
}) => {
  const moreArtwork = renderMoreAnimalArtwork(animalId, className, isSpeaking);
  if (moreArtwork) {
    return moreArtwork;
  }

  switch (animalId) {
    case 'sigir':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Sigir rasmi">
          {/* Tail */}
          <g className="anim-tail">
            <path d="M36 96 Q18 110 24 134" fill="none" stroke="#3E322B" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="24" cy="136" rx="5" ry="7" fill="#2A201B" />
          </g>
          {/* Legs */}
          <rect x="54" y="122" width="13" height="40" rx="5" className="anim-leg-a" fill="#EDE7DF" stroke="#2D241E" strokeWidth="2.5" />
          <rect x="74" y="124" width="13" height="38" rx="5" className="anim-leg-b" fill="#DDD4C8" stroke="#2D241E" strokeWidth="2.5" />
          <rect x="114" y="122" width="13" height="40" rx="5" className="anim-leg-b" fill="#EDE7DF" stroke="#2D241E" strokeWidth="2.5" />
          <rect x="132" y="124" width="13" height="38" rx="5" className="anim-leg-a" fill="#DDD4C8" stroke="#2D241E" strokeWidth="2.5" />
          {/* Hooves */}
          <rect x="54" y="153" width="13" height="9" rx="3" className="anim-leg-a" fill="#3B2F2A" />
          <rect x="74" y="153" width="13" height="9" rx="3" className="anim-leg-b" fill="#3B2F2A" />
          <rect x="114" y="153" width="13" height="9" rx="3" className="anim-leg-b" fill="#3B2F2A" />
          <rect x="132" y="153" width="13" height="9" rx="3" className="anim-leg-a" fill="#3B2F2A" />
          {/* Breathing Body */}
          <g className="anim-breathe">
            <ellipse cx="102" cy="133" rx="14" ry="8" fill="#F4A5AE" stroke="#2D241E" strokeWidth="2" />
            <rect x="38" y="68" width="112" height="66" rx="30" fill="#FAF6F0" stroke="#2D241E" strokeWidth="3" />
            <path d="M58 72 Q76 78 72 96 Q58 104 46 92 Q45 78 58 72Z" fill="#3B2F2A" />
            <path d="M95 85 Q114 82 118 102 Q104 114 92 104 Q88 92 95 85Z" fill="#3B2F2A" />
            <circle cx="128" cy="84" r="9" fill="#3B2F2A" />
          </g>
          {/* Grazing Head */}
          <g className={isSpeaking ? 'anim-head-alert' : 'anim-head-graze'}>
            <ellipse cx="128" cy="58" rx="12" ry="6" transform="rotate(-22 128 58)" className="anim-ear" fill="#FAF6F0" stroke="#2D241E" strokeWidth="2.5" />
            <ellipse cx="176" cy="58" rx="12" ry="6" transform="rotate(22 176 58)" className="anim-ear" fill="#FAF6F0" stroke="#2D241E" strokeWidth="2.5" />
            <ellipse cx="152" cy="74" rx="28" ry="26" fill="#FAF6F0" stroke="#2D241E" strokeWidth="3" />
            <path d="M136 52 Q128 34 139 32" fill="none" stroke="#D9C398" strokeWidth="6" strokeLinecap="round" />
            <path d="M168 52 Q176 34 165 32" fill="none" stroke="#D9C398" strokeWidth="6" strokeLinecap="round" />
            <path d="M148 49 Q168 49 172 68 Q155 72 146 60Z" fill="#3B2F2A" />
            <g className="anim-blink">
              <circle cx="141" cy="68" r="4" fill="#1E1815" />
              <circle cx="140" cy="66.5" r="1.4" fill="#FFF" />
              <circle cx="163" cy="68" r="4" fill="#1E1815" />
              <circle cx="162" cy="66.5" r="1.4" fill="#FFF" />
            </g>
            <ellipse cx="152" cy="88" rx="22" ry="14" fill="#F4A5AE" stroke="#2D241E" strokeWidth="2.5" />
            <circle cx="144" cy="86" r="3" fill="#6E3B42" />
            <circle cx="160" cy="86" r="3" fill="#6E3B42" />
            {isSpeaking ? (
              <ellipse cx="152" cy="95" rx="6" ry="4" fill="#6E3B42" />
            ) : (
              <path d="M145 94 Q152 99 159 94" fill="none" stroke="#6E3B42" strokeWidth="2" strokeLinecap="round" />
            )}
            <path d="M138 97 L154 97" stroke="#B91C1C" strokeWidth="4" strokeLinecap="round" />
            <path d="M142 99 L150 99 L153 111 L139 111 Z" fill="#EAB308" stroke="#2D241E" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'qoy':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Qo'y rasmi">
          <rect x="64" y="118" width="11" height="42" rx="4" className="anim-leg-a" fill="#3B332E" />
          <rect x="82" y="120" width="11" height="40" rx="4" className="anim-leg-b" fill="#2A2420" />
          <rect x="116" y="118" width="11" height="42" rx="4" className="anim-leg-b" fill="#3B332E" />
          <rect x="132" y="120" width="11" height="40" rx="4" className="anim-leg-a" fill="#2A2420" />
          <g className="anim-breathe">
            <g fill="#FAF7F0" stroke="#38302A" strokeWidth="2.5">
              <circle cx="66" cy="96" r="24" />
              <circle cx="94" cy="76" r="28" />
              <circle cx="122" cy="88" r="26" />
              <circle cx="84" cy="110" r="25" />
              <circle cx="114" cy="110" r="25" />
              <circle cx="54" cy="106" r="18" />
            </g>
            <ellipse cx="95" cy="96" rx="44" ry="30" fill="#FAF7F0" />
          </g>
          <g className={isSpeaking ? 'anim-head-alert' : 'anim-head-graze'}>
            <ellipse cx="132" cy="76" rx="13" ry="6" transform="rotate(-24 132 76)" className="anim-ear" fill="#3B332E" />
            <ellipse cx="174" cy="76" rx="13" ry="6" transform="rotate(24 174 76)" className="anim-ear" fill="#3B332E" />
            <ellipse cx="153" cy="84" rx="20" ry="24" fill="#3B332E" stroke="#241E1A" strokeWidth="2.5" />
            <circle cx="146" cy="64" r="10" fill="#FAF7F0" stroke="#38302A" strokeWidth="2" />
            <circle cx="158" cy="63" r="10" fill="#FAF7F0" stroke="#38302A" strokeWidth="2" />
            <circle cx="152" cy="59" r="9" fill="#FAF7F0" stroke="#38302A" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="145" cy="82" r="4" fill="#FFF" />
              <circle cx="145" cy="82" r="2" fill="#111" />
              <circle cx="161" cy="82" r="4" fill="#FFF" />
              <circle cx="161" cy="82" r="2" fill="#111" />
            </g>
            {isSpeaking ? (
              <ellipse cx="153" cy="98" rx="4.5" ry="3.5" fill="#F4A5AE" />
            ) : (
              <path d="M149 95 L153 99 L157 95" fill="none" stroke="#F4A5AE" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </g>
        </svg>
      );

    case 'echki':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Echki rasmi">
          <path d="M44 92 L32 80" className="anim-tail" stroke="#8C6D4F" strokeWidth="7" strokeLinecap="round" />
          <rect x="58" y="118" width="10" height="44" rx="4" className="anim-leg-a" fill="#B59676" stroke="#2D241E" strokeWidth="2" />
          <rect x="76" y="120" width="10" height="42" rx="4" className="anim-leg-b" fill="#9A7C5E" stroke="#2D241E" strokeWidth="2" />
          <rect x="116" y="118" width="10" height="44" rx="4" className="anim-leg-b" fill="#B59676" stroke="#2D241E" strokeWidth="2" />
          <rect x="132" y="120" width="10" height="42" rx="4" className="anim-leg-a" fill="#9A7C5E" stroke="#2D241E" strokeWidth="2" />
          <g className="anim-breathe">
            <rect x="44" y="80" width="96" height="48" rx="22" fill="#D4BEA2" stroke="#2D241E" strokeWidth="2.5" />
          </g>
          <g className="anim-head-alert">
            <path d="M122 92 L144 54 L160 66 L138 112 Z" fill="#D4BEA2" stroke="#2D241E" strokeWidth="2.5" />
            <path d="M145 48 Q135 20 118 22" fill="none" stroke="#5A4634" strokeWidth="6" strokeLinecap="round" />
            <path d="M156 46 Q150 18 134 18" fill="none" stroke="#5A4634" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="136" cy="58" rx="12" ry="5" transform="rotate(-25 136 58)" className="anim-ear" fill="#B59676" stroke="#2D241E" strokeWidth="2" />
            <ellipse cx="158" cy="62" rx="22" ry="15" transform="rotate(15 158 62)" fill="#E3D2BC" stroke="#2D241E" strokeWidth="2.5" />
            <path d="M164 74 Q168 92 158 95 Q154 84 156 74 Z" fill="#7D6249" stroke="#2D241E" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="156" cy="58" r="4" fill="#FDE047" stroke="#2D241E" strokeWidth="1.5" />
              <rect x="154" y="57" width="4" height="2" rx="1" fill="#111" />
            </g>
            <circle cx="176" cy="64" r="3" fill="#4A3528" />
          </g>
        </svg>
      );

    case 'ot':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Ot rasmi">
          <path d="M40 84 Q14 96 22 138 Q34 128 38 106 Z" className="anim-tail" fill="#2A1B12" />
          <rect x="52" y="114" width="11" height="48" rx="4" className="anim-leg-a" fill="#9A5428" stroke="#2D1A0E" strokeWidth="2.5" />
          <rect x="70" y="116" width="11" height="46" rx="4" className="anim-leg-b" fill="#7D411D" stroke="#2D1A0E" strokeWidth="2.5" />
          <rect x="116" y="114" width="11" height="48" rx="4" className="anim-leg-b" fill="#9A5428" stroke="#2D1A0E" strokeWidth="2.5" />
          <rect x="132" y="116" width="11" height="46" rx="4" className="anim-leg-a" fill="#7D411D" stroke="#2D1A0E" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="40" y="72" width="104" height="52" rx="25" fill="#A85C2D" stroke="#2D1A0E" strokeWidth="3" />
          </g>
          <g className="anim-head-alert">
            <path d="M126 66 Q116 42 136 32 Q144 46 138 66 Z" fill="#2A1B12" />
            <path d="M122 86 L142 36 L160 44 L142 108 Z" fill="#A85C2D" stroke="#2D1A0E" strokeWidth="3" />
            <polygon points="142,36 146,20 153,34" className="anim-ear" fill="#A85C2D" stroke="#2D1A0E" strokeWidth="2" />
            <polygon points="152,36 158,21 163,36" className="anim-ear" fill="#A85C2D" stroke="#2D1A0E" strokeWidth="2" />
            <path d="M140 38 Q166 34 180 62 Q178 72 164 72 Q150 66 142 54 Z" fill="#A85C2D" stroke="#2D1A0E" strokeWidth="3" />
            <path d="M154 40 L172 62" stroke="#FAF6F0" strokeWidth="4" strokeLinecap="round" />
            <g className="anim-blink">
              <circle cx="155" cy="48" r="3.5" fill="#1C1410" />
              <circle cx="154" cy="47" r="1.2" fill="#FFF" />
            </g>
            <circle cx="174" cy="62" r="2.5" fill="#3B2014" />
          </g>
        </svg>
      );

    case 'quyon':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Quyon rasmi">
          <circle cx="52" cy="126" r="14" className="anim-tail" fill="#FFF" stroke="#47423B" strokeWidth="2.5" />
          <ellipse cx="78" cy="138" rx="22" ry="12" fill="#EAE3D8" stroke="#47423B" strokeWidth="2.5" />
          <ellipse cx="92" cy="148" rx="16" ry="7" fill="#F7F3EC" stroke="#47423B" strokeWidth="2.5" />
          <g className="anim-breathe">
            <ellipse cx="92" cy="116" rx="34" ry="30" fill="#F7F3EC" stroke="#47423B" strokeWidth="3" />
            <rect x="114" y="128" width="12" height="24" rx="6" fill="#F7F3EC" stroke="#47423B" strokeWidth="2.5" />
          </g>
          <g className="anim-head-alert">
            <g className="anim-ear">
              <ellipse cx="116" cy="42" rx="9" ry="28" transform="rotate(-10 116 42)" fill="#F7F3EC" stroke="#47423B" strokeWidth="2.5" />
              <ellipse cx="116" cy="44" rx="4.5" ry="19" transform="rotate(-10 116 44)" fill="#F4A5AE" />
            </g>
            <g className="anim-ear">
              <ellipse cx="136" cy="42" rx="9" ry="28" transform="rotate(14 136 42)" fill="#F7F3EC" stroke="#47423B" strokeWidth="2.5" />
              <ellipse cx="136" cy="44" rx="4.5" ry="19" transform="rotate(14 136 44)" fill="#F4A5AE" />
            </g>
            <circle cx="126" cy="84" r="26" fill="#F7F3EC" stroke="#47423B" strokeWidth="3" />
            <g className="anim-blink">
              <circle cx="132" cy="80" r="4.5" fill="#1E1B18" />
              <circle cx="130.5" cy="78.5" r="1.5" fill="#FFF" />
            </g>
            <ellipse cx="122" cy="90" rx="5" ry="3.5" fill="#F9B4BC" opacity="0.65" />
            <polygon points="146,84 152,84 149,89" fill="#EC7A8C" />
            <line x1="142" y1="88" x2="162" y2="85" stroke="#6E665D" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="142" y1="91" x2="162" y2="93" stroke="#6E665D" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'fil':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Fil rasmi">
          <path d="M36 96 Q24 114 28 128" className="anim-tail" fill="none" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />
          <rect x="48" y="118" width="18" height="44" rx="6" className="anim-leg-a" fill="#8E96A0" stroke="#272D36" strokeWidth="2.5" />
          <rect x="70" y="120" width="18" height="42" rx="6" className="anim-leg-b" fill="#77808B" stroke="#272D36" strokeWidth="2.5" />
          <rect x="108" y="118" width="18" height="44" rx="6" className="anim-leg-b" fill="#8E96A0" stroke="#272D36" strokeWidth="2.5" />
          <rect x="128" y="120" width="18" height="42" rx="6" className="anim-leg-a" fill="#77808B" stroke="#272D36" strokeWidth="2.5" />
          <g className="anim-breathe">
            <ellipse cx="94" cy="94" rx="54" ry="40" fill="#9CA3AF" stroke="#272D36" strokeWidth="3" />
          </g>
          <circle cx="148" cy="74" r="26" fill="#9CA3AF" stroke="#272D36" strokeWidth="3" />
          {/* Flapping Big Elephant Ear */}
          <g className="anim-elephant-ear">
            <ellipse cx="126" cy="76" rx="22" ry="28" fill="#858D99" stroke="#272D36" strokeWidth="2.5" />
            <ellipse cx="126" cy="78" rx="14" ry="19" fill="#D5B8BF" opacity="0.65" />
          </g>
          {/* Waving Trunk */}
          <g className="anim-trunk">
            <path d="M168 78 Q186 96 178 126 Q172 140 160 132 Q156 126 164 122 Q168 110 156 96" fill="#9CA3AF" stroke="#272D36" strokeWidth="3" strokeLinecap="round" />
          </g>
          <path d="M158 92 Q178 102 186 90 Q174 92 162 84 Z" fill="#FEF9EC" stroke="#272D36" strokeWidth="2" />
          <g className="anim-blink">
            <circle cx="154" cy="68" r="4" fill="#111827" />
            <circle cx="153" cy="66.5" r="1.4" fill="#FFF" />
          </g>
        </svg>
      );

    case 'jirafa':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Jirafa rasmi">
          <path d="M56 112 Q42 128 46 144" className="anim-tail" fill="none" stroke="#9A6826" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="64" y="122" width="8" height="48" rx="3" fill="#F2B84B" stroke="#42290A" strokeWidth="2" />
          <rect x="78" y="124" width="8" height="46" rx="3" fill="#DE9E2E" stroke="#42290A" strokeWidth="2" />
          <rect x="108" y="122" width="8" height="48" rx="3" fill="#F2B84B" stroke="#42290A" strokeWidth="2" />
          <rect x="122" y="124" width="8" height="46" rx="3" fill="#DE9E2E" stroke="#42290A" strokeWidth="2" />
          <g className="anim-breathe">
            <ellipse cx="94" cy="112" rx="36" ry="22" fill="#F7C963" stroke="#42290A" strokeWidth="2.5" />
            <rect x="74" y="102" width="12" height="10" rx="3" fill="#9A5B1A" opacity="0.85" />
            <rect x="92" y="108" width="13" height="11" rx="3" fill="#9A5B1A" opacity="0.85" />
          </g>
          {/* Swaying Long Neck & Head */}
          <g className="anim-head-graze">
            <path d="M108 106 L124 30 L140 32 L128 114 Z" fill="#F7C963" stroke="#42290A" strokeWidth="2.5" />
            <rect x="116" y="76" width="10" height="10" rx="3" fill="#9A5B1A" opacity="0.85" />
            <rect x="122" y="54" width="9" height="9" rx="3" fill="#9A5B1A" opacity="0.85" />
            <line x1="128" y1="24" x2="124" y2="11" stroke="#42290A" strokeWidth="3" strokeLinecap="round" />
            <circle cx="124" cy="11" r="3.5" fill="#7A4412" />
            <line x1="137" y1="24" x2="139" y2="11" stroke="#42290A" strokeWidth="3" strokeLinecap="round" />
            <circle cx="139" cy="11" r="3.5" fill="#7A4412" />
            <ellipse cx="142" cy="30" rx="18" ry="11" transform="rotate(10 142 30)" fill="#F7C963" stroke="#42290A" strokeWidth="2.5" />
            <ellipse cx="124" cy="28" rx="8" ry="4" transform="rotate(-25 124 28)" className="anim-ear" fill="#F7C963" stroke="#42290A" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="142" cy="27" r="3" fill="#1F1306" />
              <circle cx="141" cy="26" r="1" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'tuya':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Tuya rasmi">
          <rect x="64" y="114" width="10" height="48" rx="4" className="anim-leg-a" fill="#D4A36A" stroke="#422B14" strokeWidth="2.5" />
          <rect x="80" y="116" width="10" height="46" rx="4" className="anim-leg-b" fill="#BA8950" stroke="#422B14" strokeWidth="2.5" />
          <rect x="114" y="114" width="10" height="48" rx="4" className="anim-leg-b" fill="#D4A36A" stroke="#422B14" strokeWidth="2.5" />
          <rect x="128" y="116" width="10" height="46" rx="4" className="anim-leg-a" fill="#BA8950" stroke="#422B14" strokeWidth="2.5" />
          <g className="anim-breathe">
            <path d="M44 108 Q46 72 68 72 Q82 42 98 68 Q118 42 132 76 Q142 90 138 114 Q122 128 92 128 Q56 128 44 108 Z" fill="#E0B177" stroke="#422B14" strokeWidth="3" />
          </g>
          <g className="anim-head-alert">
            <path d="M128 102 Q152 94 156 54 L172 56 Q168 108 134 118 Z" fill="#E0B177" stroke="#422B14" strokeWidth="3" />
            <ellipse cx="168" cy="52" rx="18" ry="12" fill="#E0B177" stroke="#422B14" strokeWidth="2.5" />
            <circle cx="152" cy="45" r="5" fill="#C9965B" stroke="#422B14" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="166" cy="49" r="3.2" fill="#211408" />
              <path d="M161 45 L171 45" stroke="#422B14" strokeWidth="2" />
            </g>
            <path d="M174 56 Q180 58 183 54" fill="none" stroke="#422B14" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'kiyik':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Kiyik rasmi">
          <rect x="60" y="114" width="8" height="48" rx="3" className="anim-leg-a" fill="#B56E3B" stroke="#361E0E" strokeWidth="2" />
          <rect x="74" y="116" width="8" height="46" rx="3" className="anim-leg-b" fill="#9A592C" stroke="#361E0E" strokeWidth="2" />
          <rect x="114" y="114" width="8" height="48" rx="3" className="anim-leg-b" fill="#B56E3B" stroke="#361E0E" strokeWidth="2" />
          <rect x="128" y="116" width="8" height="46" rx="3" className="anim-leg-a" fill="#9A592C" stroke="#361E0E" strokeWidth="2" />
          <ellipse cx="48" cy="96" rx="6" ry="9" className="anim-tail" fill="#FAF6F0" stroke="#361E0E" strokeWidth="2" />
          <g className="anim-breathe">
            <rect x="50" y="80" width="86" height="44" rx="22" fill="#C67B43" stroke="#361E0E" strokeWidth="2.5" />
            <circle cx="72" cy="94" r="3" fill="#FCECD8" />
            <circle cx="88" cy="90" r="3.5" fill="#FCECD8" />
            <circle cx="102" cy="98" r="3" fill="#FCECD8" />
          </g>
          <g className="anim-head-alert">
            <path d="M120 96 L136 52 L150 58 L136 108 Z" fill="#C67B43" stroke="#361E0E" strokeWidth="2.5" />
            <path d="M138 46 Q128 22 114 16 M128 30 L122 14 M133 36 L142 22" fill="none" stroke="#6E4E34" strokeWidth="4" strokeLinecap="round" />
            <path d="M148 46 Q158 20 174 16 M158 28 L164 12 M153 34 L144 20" fill="none" stroke="#6E4E34" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="152" cy="58" rx="20" ry="12" transform="rotate(14 152 58)" fill="#C67B43" stroke="#361E0E" strokeWidth="2.5" />
            <g className="anim-blink">
              <circle cx="152" cy="54" r="3.5" fill="#1C1209" />
              <circle cx="151" cy="53" r="1.2" fill="#FFF" />
            </g>
            <circle cx="170" cy="60" r="3.5" fill="#24150B" />
          </g>
        </svg>
      );

    case 'zebra':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Zebra rasmi">
          <path d="M42 86 Q24 100 28 132" className="anim-tail" fill="none" stroke="#222" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="54" y="114" width="11" height="48" rx="4" className="anim-leg-a" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="72" y="116" width="11" height="46" rx="4" className="anim-leg-b" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="116" y="114" width="11" height="48" rx="4" className="anim-leg-b" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="132" y="116" width="11" height="46" rx="4" className="anim-leg-a" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="42" y="72" width="102" height="50" rx="24" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
            <g stroke="#1E293B" strokeWidth="5" strokeLinecap="round">
              <line x1="58" y1="76" x2="58" y2="112" />
              <line x1="74" y1="74" x2="72" y2="118" />
              <line x1="90" y1="74" x2="90" y2="118" />
              <line x1="106" y1="74" x2="108" y2="116" />
              <line x1="122" y1="76" x2="124" y2="110" />
            </g>
          </g>
          <g className="anim-head-alert">
            <path d="M126 68 L138 30 L146 34 L136 74 Z" fill="#1E293B" />
            <path d="M122 86 L142 36 L160 44 L142 108 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
            <line x1="136" y1="54" x2="152" y2="60" stroke="#1E293B" strokeWidth="4.5" />
            <line x1="132" y1="68" x2="148" y2="74" stroke="#1E293B" strokeWidth="4.5" />
            <path d="M140 38 Q166 34 180 62 Q178 72 164 72 Q150 66 142 54 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
            <path d="M166 56 Q178 58 179 68 Q169 72 163 66 Z" fill="#1E293B" />
            <g className="anim-blink">
              <circle cx="155" cy="48" r="3.5" fill="#111" />
              <circle cx="154" cy="47" r="1.2" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'sher':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Sher rasmi">
          <g className="anim-tail">
            <path d="M40 106 Q16 94 20 68" fill="none" stroke="#D99B38" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="20" cy="64" rx="7" ry="10" fill="#7C3F13" />
          </g>
          <rect x="48" y="116" width="14" height="44" rx="6" fill="#E3A842" stroke="#422208" strokeWidth="2.5" />
          <rect x="68" y="118" width="14" height="42" rx="6" fill="#CA8F32" stroke="#422208" strokeWidth="2.5" />
          <rect x="114" y="116" width="14" height="44" rx="6" fill="#E3A842" stroke="#422208" strokeWidth="2.5" />
          <rect x="132" y="118" width="14" height="42" rx="6" fill="#CA8F32" stroke="#422208" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="40" y="76" width="102" height="52" rx="24" fill="#E8B04A" stroke="#422208" strokeWidth="3" />
          </g>
          <g className="anim-head-alert">
            <circle cx="142" cy="74" r="38" fill="#8D4514" stroke="#422208" strokeWidth="3" />
            <circle cx="142" cy="74" r="31" fill="#A35118" />
            <circle cx="122" cy="48" r="8" className="anim-ear" fill="#E8B04A" stroke="#422208" strokeWidth="2.5" />
            <circle cx="162" cy="48" r="8" className="anim-ear" fill="#E8B04A" stroke="#422208" strokeWidth="2.5" />
            <circle cx="142" cy="74" r="24" fill="#F2BE5A" stroke="#422208" strokeWidth="2.5" />
            <g className="anim-blink">
              <circle cx="133" cy="69" r="3.8" fill="#1F1206" />
              <circle cx="132" cy="67.5" r="1.3" fill="#FFF" />
              <circle cx="151" cy="69" r="3.8" fill="#1F1206" />
              <circle cx="150" cy="67.5" r="1.3" fill="#FFF" />
            </g>
            <ellipse cx="142" cy="83" rx="11" ry="8" fill="#FCE8C3" />
            <polygon points="137,77 147,77 142,83" fill="#52260A" />
            {isSpeaking ? (
              <ellipse cx="142" cy="89" rx="6.5" ry="5" className="anim-jaw" fill="#7F1D1D" stroke="#422208" strokeWidth="1.5" />
            ) : (
              <path d="M136 86 Q142 91 148 86" fill="none" stroke="#52260A" strokeWidth="2" strokeLinecap="round" />
            )}
          </g>
        </svg>
      );

    case 'yolbars':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Yo'lbars rasmi">
          <path d="M40 100 Q16 86 24 62" className="anim-tail" fill="none" stroke="#EA7A1E" strokeWidth="6" strokeLinecap="round" />
          <rect x="48" y="116" width="14" height="44" rx="6" className="anim-leg-a" fill="#EA7A1E" stroke="#2D1605" strokeWidth="2.5" />
          <rect x="68" y="118" width="14" height="42" rx="6" className="anim-leg-b" fill="#D16815" stroke="#2D1605" strokeWidth="2.5" />
          <rect x="114" y="116" width="14" height="44" rx="6" className="anim-leg-b" fill="#EA7A1E" stroke="#2D1605" strokeWidth="2.5" />
          <rect x="132" y="118" width="14" height="42" rx="6" className="anim-leg-a" fill="#D16815" stroke="#2D1605" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="38" y="76" width="106" height="52" rx="25" fill="#F28522" stroke="#2D1605" strokeWidth="3" />
            <ellipse cx="92" cy="120" rx="34" ry="8" fill="#FFF7ED" />
            <g stroke="#1E140E" strokeWidth="4.5" strokeLinecap="round">
              <line x1="60" y1="80" x2="64" y2="104" />
              <line x1="78" y1="78" x2="78" y2="106" />
              <line x1="96" y1="78" x2="94" y2="106" />
              <line x1="112" y1="80" x2="110" y2="104" />
            </g>
          </g>
          <g className="anim-head-alert">
            <circle cx="126" cy="52" r="9" className="anim-ear" fill="#F28522" stroke="#2D1605" strokeWidth="2.5" />
            <circle cx="164" cy="52" r="9" className="anim-ear" fill="#F28522" stroke="#2D1605" strokeWidth="2.5" />
            <circle cx="145" cy="76" r="27" fill="#F28522" stroke="#2D1605" strokeWidth="3" />
            <ellipse cx="145" cy="86" rx="14" ry="10" fill="#FFF7ED" />
            <path d="M145 52 L145 62 M138 55 L141 63 M152 55 L149 63" stroke="#1E140E" strokeWidth="3" strokeLinecap="round" />
            <g className="anim-blink">
              <circle cx="135" cy="72" r="3.8" fill="#1E140E" />
              <circle cx="134" cy="70.5" r="1.2" fill="#FFF" />
              <circle cx="155" cy="72" r="3.8" fill="#1E140E" />
              <circle cx="154" cy="70.5" r="1.2" fill="#FFF" />
            </g>
            <polygon points="140,81 150,81 145,87" fill="#D97777" />
            {isSpeaking && <ellipse cx="145" cy="92" rx="6" ry="4" className="anim-jaw" fill="#7F1D1D" />}
          </g>
        </svg>
      );

    case 'bori':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Bo'ri rasmi">
          <path d="M44 98 Q18 110 22 134 Q38 128 50 112 Z" className="anim-tail" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="56" y="114" width="11" height="46" rx="4" className="anim-leg-a" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="74" y="116" width="11" height="44" rx="4" className="anim-leg-b" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="116" y="114" width="11" height="46" rx="4" className="anim-leg-b" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="132" y="116" width="11" height="44" rx="4" className="anim-leg-a" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="44" y="76" width="98" height="48" rx="22" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
            <ellipse cx="134" cy="94" rx="18" ry="22" fill="#E2E8F0" />
          </g>
          <g className="anim-head-alert" style={isSpeaking ? { transform: 'rotate(-16deg)' } : undefined}>
            <polygon points="124,52 130,28 140,48" className="anim-ear" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
            <polygon points="146,50 154,28 160,52" className="anim-ear" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="144" cy="68" r="22" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
            <path d="M148 66 L180 72 Q178 82 148 82 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="178" cy="72" r="4" fill="#0F172A" />
            <g className="anim-blink">
              <circle cx="146" cy="62" r="3.8" fill="#FACC15" stroke="#0F172A" strokeWidth="1.2" />
              <circle cx="146" cy="62" r="1.8" fill="#0F172A" />
            </g>
          </g>
        </svg>
      );

    case 'tulki':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Tulki rasmi">
          <g className="anim-tail">
            <path d="M54 114 Q14 104 20 74 Q38 66 56 96 Z" fill="#EA580C" stroke="#431407" strokeWidth="2.5" />
            <path d="M20 74 Q28 68 34 78 Q24 84 20 74 Z" fill="#FFF7ED" />
          </g>
          <rect x="64" y="120" width="9" height="40" rx="4" className="anim-leg-a" fill="#292524" />
          <rect x="80" y="122" width="9" height="38" rx="4" className="anim-leg-b" fill="#44403C" />
          <rect x="116" y="120" width="9" height="40" rx="4" className="anim-leg-b" fill="#292524" />
          <rect x="128" y="122" width="9" height="38" rx="4" className="anim-leg-a" fill="#44403C" />
          <g className="anim-breathe">
            <rect x="52" y="88" width="88" height="42" rx="20" fill="#EA580C" stroke="#431407" strokeWidth="2.5" />
            <ellipse cx="132" cy="102" rx="14" ry="18" fill="#FFF7ED" />
          </g>
          <g className="anim-head-alert">
            <polygon points="122,58 128,34 138,54" className="anim-ear" fill="#EA580C" stroke="#431407" strokeWidth="2.5" />
            <polygon points="146,56 154,34 160,58" className="anim-ear" fill="#EA580C" stroke="#431407" strokeWidth="2.5" />
            <path d="M120 68 Q144 46 164 68 L178 78 Q156 92 126 84 Z" fill="#EA580C" stroke="#431407" strokeWidth="2.5" />
            <path d="M134 78 Q152 76 172 78 Q152 88 134 82 Z" fill="#FFF7ED" />
            <g className="anim-blink">
              <circle cx="146" cy="68" r="3.5" fill="#1C1917" />
              <circle cx="145" cy="67" r="1.2" fill="#FFF" />
            </g>
            <circle cx="177" cy="77" r="3.5" fill="#1C1917" />
          </g>
        </svg>
      );

    case 'qoplon':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Qoplon rasmi">
          <path d="M40 100 Q12 118 24 146" className="anim-tail" fill="none" stroke="#EAB308" strokeWidth="6" strokeLinecap="round" />
          <rect x="52" y="114" width="12" height="46" rx="5" className="anim-leg-a" fill="#EAB308" stroke="#422006" strokeWidth="2.5" />
          <rect x="70" y="116" width="12" height="44" rx="5" className="anim-leg-b" fill="#CA8A04" stroke="#422006" strokeWidth="2.5" />
          <rect x="116" y="114" width="12" height="46" rx="5" className="anim-leg-b" fill="#EAB308" stroke="#422006" strokeWidth="2.5" />
          <rect x="132" y="116" width="12" height="44" rx="5" className="anim-leg-a" fill="#CA8A04" stroke="#422006" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="40" y="76" width="104" height="48" rx="23" fill="#FACC15" stroke="#422006" strokeWidth="3" />
            <g fill="none" stroke="#422006" strokeWidth="3">
              <circle cx="66" cy="94" r="5" />
              <circle cx="88" cy="88" r="5.5" />
              <circle cx="108" cy="96" r="5" />
              <circle cx="82" cy="108" r="4.5" />
              <circle cx="122" cy="92" r="4" />
            </g>
          </g>
          <g className="anim-head-alert">
            <circle cx="128" cy="54" r="7.5" className="anim-ear" fill="#FACC15" stroke="#422006" strokeWidth="2.5" />
            <circle cx="160" cy="54" r="7.5" className="anim-ear" fill="#FACC15" stroke="#422006" strokeWidth="2.5" />
            <circle cx="144" cy="74" r="24" fill="#FACC15" stroke="#422006" strokeWidth="3" />
            <ellipse cx="144" cy="83" rx="11" ry="8" fill="#FEF9C3" />
            <g className="anim-blink">
              <circle cx="136" cy="70" r="3.5" fill="#16A34A" stroke="#422006" strokeWidth="1" />
              <circle cx="152" cy="70" r="3.5" fill="#16A34A" stroke="#422006" strokeWidth="1" />
            </g>
            <polygon points="140,79 148,79 144,84" fill="#713F12" />
          </g>
        </svg>
      );

    case 'gepard':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Gepard rasmi">
          <path d="M40 94 Q14 84 18 110" className="anim-tail" fill="none" stroke="#FCD34D" strokeWidth="5.5" strokeLinecap="round" />
          <rect x="54" y="112" width="9" height="52" rx="4" className="anim-leg-a" fill="#FCD34D" stroke="#451A03" strokeWidth="2" />
          <rect x="70" y="114" width="9" height="50" rx="4" className="anim-leg-b" fill="#F59E0B" stroke="#451A03" strokeWidth="2" />
          <rect x="118" y="112" width="9" height="52" rx="4" className="anim-leg-b" fill="#FCD34D" stroke="#451A03" strokeWidth="2" />
          <rect x="132" y="114" width="9" height="50" rx="4" className="anim-leg-a" fill="#F59E0B" stroke="#451A03" strokeWidth="2" />
          <g className="anim-breathe">
            <rect x="42" y="76" width="102" height="42" rx="20" fill="#FDE047" stroke="#451A03" strokeWidth="2.5" />
            <g fill="#451A03">
              <circle cx="64" cy="90" r="3" />
              <circle cx="78" cy="98" r="3" />
              <circle cx="92" cy="86" r="3" />
              <circle cx="106" cy="96" r="3" />
              <circle cx="118" cy="88" r="3" />
              <circle cx="72" cy="108" r="2.5" />
            </g>
          </g>
          <g className="anim-head-alert">
            <path d="M128 84 L144 50 L158 56 L142 98 Z" fill="#FDE047" stroke="#451A03" strokeWidth="2.5" />
            <circle cx="152" cy="54" r="6" className="anim-ear" fill="#FDE047" stroke="#451A03" strokeWidth="2" />
            <circle cx="156" cy="64" r="18" fill="#FDE047" stroke="#451A03" strokeWidth="2.5" />
            <path d="M161 64 L165 76" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
            <g className="anim-blink">
              <circle cx="161" cy="61" r="3" fill="#1C1917" />
            </g>
            <circle cx="171" cy="68" r="3" fill="#1C1917" />
          </g>
        </svg>
      );

    case 'sirtlon':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Sirtlon rasmi">
          <rect x="52" y="116" width="11" height="42" rx="4" className="anim-leg-a" fill="#A89078" stroke="#2D241E" strokeWidth="2.5" />
          <rect x="116" y="106" width="12" height="52" rx="4" className="anim-leg-b" fill="#BFA890" stroke="#2D241E" strokeWidth="2.5" />
          <rect x="132" y="108" width="12" height="50" rx="4" className="anim-leg-a" fill="#A89078" stroke="#2D241E" strokeWidth="2.5" />
          <g className="anim-breathe">
            <path d="M44 96 Q76 70 132 72 Q144 88 136 114 Q96 122 48 116 Z" fill="#C8B098" stroke="#2D241E" strokeWidth="3" />
            <g fill="#4A3828" opacity="0.8">
              <circle cx="72" cy="96" r="4.5" />
              <circle cx="92" cy="88" r="5" />
              <circle cx="108" cy="98" r="4.5" />
              <circle cx="86" cy="106" r="4" />
            </g>
          </g>
          <g className="anim-head-alert">
            <circle cx="136" cy="48" r="9" className="anim-ear" fill="#B89E84" stroke="#2D241E" strokeWidth="2.5" />
            <circle cx="158" cy="48" r="9" className="anim-ear" fill="#B89E84" stroke="#2D241E" strokeWidth="2.5" />
            <circle cx="148" cy="68" r="22" fill="#C8B098" stroke="#2D241E" strokeWidth="3" />
            <ellipse cx="164" cy="74" rx="12" ry="9" fill="#3B2D23" />
            <g className="anim-blink">
              <circle cx="146" cy="63" r="3.5" fill="#1C140E" />
              <circle cx="145" cy="62" r="1.2" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'timsoh':
      return (
        <svg viewBox="0 0 220 150" className={className} aria-label="Timsoh rasmi">
          <g className="anim-swim-tail">
            <path d="M22 92 Q54 78 72 88 L72 108 Q42 108 22 92 Z" fill="#2E6F40" stroke="#14361D" strokeWidth="2.5" />
          </g>
          <rect x="86" y="106" width="14" height="20" rx="5" fill="#2E6F40" stroke="#14361D" strokeWidth="2.5" />
          <rect x="136" y="106" width="14" height="20" rx="5" fill="#2E6F40" stroke="#14361D" strokeWidth="2.5" />
          <g className="anim-breathe">
            <ellipse cx="114" cy="94" rx="50" ry="20" fill="#3D8B52" stroke="#14361D" strokeWidth="3" />
            <path d="M74 78 L80 68 L86 76 L94 66 L100 76 L108 66 L116 76 L124 68 L130 76" fill="#235731" stroke="#14361D" strokeWidth="2" />
          </g>
          <path d="M150 82 L202 84 Q208 92 202 98 L148 100 Z" fill="#3D8B52" stroke="#14361D" strokeWidth="2.5" />
          <g className={isSpeaking ? 'anim-jaw' : ''}>
            <path d="M162 98 L166 105 L170 98 L175 105 L179 98 L184 105 L188 98" fill="#FFF" stroke="#14361D" strokeWidth="1.5" />
          </g>
          <circle cx="156" cy="78" r="8" fill="#3D8B52" stroke="#14361D" strokeWidth="2.5" />
          <g className="anim-blink">
            <circle cx="156" cy="77" r="4" fill="#FACC15" />
            <rect x="155" y="74" width="2" height="6" fill="#111" />
          </g>
        </svg>
      );

    case 'burgut':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Burgut rasmi">
          <g className="anim-wing-l">
            <path d="M98 88 Q36 28 16 64 Q42 94 84 102 Z" fill="#5C3A21" stroke="#29180C" strokeWidth="2.5" />
          </g>
          <g className="anim-wing-r">
            <path d="M102 88 Q164 28 184 64 Q158 94 116 102 Z" fill="#5C3A21" stroke="#29180C" strokeWidth="2.5" />
          </g>
          <path d="M84 126 L74 156 L126 156 L116 126 Z" fill="#4A2E1A" stroke="#29180C" strokeWidth="2.5" />
          <g className="anim-breathe">
            <ellipse cx="100" cy="102" rx="24" ry="34" fill="#6E472B" stroke="#29180C" strokeWidth="3" />
          </g>
          <path d="M90 132 L84 146 M90 132 L92 148 M110 132 L108 148 M110 132 L116 146" stroke="#EAB308" strokeWidth="3.5" strokeLinecap="round" />
          <g className="anim-head-alert">
            <circle cx="100" cy="58" r="20" fill="#7D5132" stroke="#29180C" strokeWidth="2.5" />
            <path d="M114 54 Q134 54 132 70 Q122 64 114 64 Z" fill="#F59E0B" stroke="#29180C" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="106" cy="54" r="4" fill="#FEF08A" stroke="#29180C" strokeWidth="1.5" />
              <circle cx="107" cy="54" r="2" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'akula':
    default:
      return (
        <svg viewBox="0 0 220 150" className={className} aria-label="Akula rasmi">
          <g className="anim-swim-tail">
            <path d="M46 78 L16 44 L28 78 L14 112 L46 92 Z" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          </g>
          <path d="M102 52 Q112 16 126 20 Q122 44 126 54 Z" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          <g className="anim-breathe">
            <path d="M42 84 Q88 42 164 56 Q198 68 202 82 Q194 102 152 108 Q88 112 42 84 Z" fill="#64748B" stroke="#1E293B" strokeWidth="3" />
            <path d="M56 90 Q106 108 158 104 Q188 98 198 84 Q166 90 112 88 Z" fill="#F1F5F9" />
            <path d="M112 96 L92 128 L128 104 Z" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          </g>
          <g stroke="#1E293B" strokeWidth="2" strokeLinecap="round">
            <path d="M138 72 Q135 80 138 88" />
            <path d="M144 72 Q141 80 144 88" />
            <path d="M150 72 Q147 80 150 88" />
          </g>
          <g className="anim-blink">
            <circle cx="172" cy="70" r="4" fill="#0F172A" />
            <circle cx="171" cy="69" r="1.2" fill="#FFF" />
          </g>
          <path d="M164 88 Q180 92 192 86" fill="none" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M168 89 L171 94 L174 89 L177 94 L180 89 L183 94 L186 88" fill="#FFF" />
        </svg>
      );
  }
};
