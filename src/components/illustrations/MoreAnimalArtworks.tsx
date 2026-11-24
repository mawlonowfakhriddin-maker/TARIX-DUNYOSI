import React from 'react';

export function renderMoreAnimalArtwork(
  animalId: string,
  className: string,
  isSpeaking: boolean
): React.ReactElement | null {
  switch (animalId) {
    case 'kenguru':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Kenguru rasmi">
          {/* Strong Tail */}
          <path d="M58 134 Q24 148 18 128 Q34 128 54 118 Z" className="anim-tail" fill="#B45309" stroke="#451A03" strokeWidth="2.5" />
          {/* Big Hind Legs */}
          <ellipse cx="86" cy="144" rx="18" ry="22" fill="#C26D27" stroke="#451A03" strokeWidth="2.5" />
          <rect x="84" y="158" width="44" height="10" rx="5" fill="#B45309" stroke="#451A03" strokeWidth="2.5" />
          {/* Body & Pouch */}
          <g className="anim-breathe">
            <ellipse cx="92" cy="108" rx="28" ry="38" transform="rotate(14 92 108)" fill="#D97724" stroke="#451A03" strokeWidth="3" />
            <path d="M84 112 Q102 120 112 108 Q106 132 84 128 Z" fill="#FDE68A" stroke="#451A03" strokeWidth="2" />
            {/* Baby Joey peeking */}
            <circle cx="98" cy="108" r="8" fill="#F59E0B" stroke="#451A03" strokeWidth="2" />
            <circle cx="100" cy="106" r="1.5" fill="#111" />
            {/* Small front paws */}
            <path d="M110 92 L128 100" stroke="#D97724" strokeWidth="7" strokeLinecap="round" />
          </g>
          {/* Head & Long Ears */}
          <g className="anim-head-alert">
            <ellipse cx="106" cy="36" rx="7" ry="18" transform="rotate(-10 106 36)" className="anim-ear" fill="#D97724" stroke="#451A03" strokeWidth="2.5" />
            <ellipse cx="122" cy="36" rx="7" ry="18" transform="rotate(14 122 36)" className="anim-ear" fill="#D97724" stroke="#451A03" strokeWidth="2.5" />
            <ellipse cx="122" cy="60" rx="22" ry="14" transform="rotate(10 122 60)" fill="#D97724" stroke="#451A03" strokeWidth="2.5" />
            <g className="anim-blink">
              <circle cx="120" cy="56" r="3.5" fill="#1C1917" />
              <circle cx="119" cy="55" r="1.2" fill="#FFF" />
            </g>
            <circle cx="142" cy="62" r="3.5" fill="#292524" />
          </g>
        </svg>
      );

    case 'panda':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Panda rasmi">
          {/* Black Hind Legs */}
          <ellipse cx="64" cy="144" rx="16" ry="18" fill="#1E293B" />
          <ellipse cx="136" cy="144" rx="16" ry="18" fill="#1E293B" />
          {/* White Round Body + Black Shoulder Band */}
          <g className="anim-breathe">
            <ellipse cx="100" cy="116" rx="44" ry="38" fill="#FAF8F5" stroke="#1E293B" strokeWidth="3" />
            <path d="M62 96 Q100 112 138 96 Q136 80 100 84 Q64 80 62 96 Z" fill="#1E293B" />
            {/* Front Paws */}
            <ellipse cx="72" cy="126" rx="12" ry="18" transform="rotate(-15 72 126)" fill="#1E293B" />
            <ellipse cx="128" cy="126" rx="12" ry="18" transform="rotate(15 128 126)" fill="#1E293B" />
          </g>
          {/* Head */}
          <g className="anim-head-graze">
            <circle cx="72" cy="44" r="12" className="anim-ear" fill="#1E293B" />
            <circle cx="128" cy="44" r="12" className="anim-ear" fill="#1E293B" />
            <circle cx="100" cy="68" r="32" fill="#FAF8F5" stroke="#1E293B" strokeWidth="3" />
            {/* Iconic Eye Patches */}
            <ellipse cx="86" cy="66" rx="10" ry="12" transform="rotate(-15 86 66)" fill="#1E293B" />
            <ellipse cx="114" cy="66" rx="10" ry="12" transform="rotate(15 114 66)" fill="#1E293B" />
            <g className="anim-blink">
              <circle cx="87" cy="65" r="3.5" fill="#FFF" />
              <circle cx="87" cy="65" r="1.8" fill="#0F172A" />
              <circle cx="113" cy="65" r="3.5" fill="#FFF" />
              <circle cx="113" cy="65" r="1.8" fill="#0F172A" />
            </g>
            <ellipse cx="100" cy="78" rx="6" ry="4" fill="#1E293B" />
            <path d="M94 86 Q100 91 106 86" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'koala':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Koala rasmi">
          {/* Tree Branch */}
          <path d="M24 148 L176 116" stroke="#78350F" strokeWidth="16" strokeLinecap="round" />
          {/* Body */}
          <g className="anim-breathe">
            <ellipse cx="96" cy="116" rx="32" ry="30" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
            <ellipse cx="100" cy="120" rx="18" ry="20" fill="#F1F5F9" />
            <ellipse cx="122" cy="116" rx="10" ry="15" transform="rotate(35 122 116)" fill="#64748B" stroke="#334155" strokeWidth="2" />
          </g>
          {/* Head & Fluffy Big Ears */}
          <g className="anim-head-alert">
            <g className="anim-ear">
              <circle cx="64" cy="64" r="18" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
              <circle cx="64" cy="65" r="10" fill="#F1F5F9" />
            </g>
            <g className="anim-ear">
              <circle cx="136" cy="64" r="18" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
              <circle cx="136" cy="65" r="10" fill="#F1F5F9" />
            </g>
            <circle cx="100" cy="74" r="30" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
            <g className="anim-blink">
              <circle cx="86" cy="70" r="3.8" fill="#0F172A" />
              <circle cx="85" cy="69" r="1.2" fill="#FFF" />
              <circle cx="114" cy="70" r="3.8" fill="#0F172A" />
              <circle cx="113" cy="69" r="1.2" fill="#FFF" />
            </g>
            {/* Iconic Oval Black Nose */}
            <ellipse cx="100" cy="79" rx="9" ry="13" fill="#1E293B" />
          </g>
        </svg>
      );

    case 'begemot':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Begemot rasmi">
          <rect x="46" y="122" width="18" height="36" rx="7" className="anim-leg-a" fill="#7E6B8F" stroke="#2E2438" strokeWidth="2.5" />
          <rect x="70" y="124" width="18" height="34" rx="7" className="anim-leg-b" fill="#685678" stroke="#2E2438" strokeWidth="2.5" />
          <rect x="112" y="122" width="18" height="36" rx="7" className="anim-leg-b" fill="#7E6B8F" stroke="#2E2438" strokeWidth="2.5" />
          <rect x="134" y="124" width="18" height="34" rx="7" className="anim-leg-a" fill="#685678" stroke="#2E2438" strokeWidth="2.5" />
          <g className="anim-breathe">
            <ellipse cx="98" cy="100" rx="56" ry="38" fill="#8E79A1" stroke="#2E2438" strokeWidth="3" />
          </g>
          <g className="anim-head-alert">
            <circle cx="136" cy="64" r="7" className="anim-ear" fill="#8E79A1" stroke="#2E2438" strokeWidth="2" />
            <circle cx="158" cy="64" r="7" className="anim-ear" fill="#8E79A1" stroke="#2E2438" strokeWidth="2" />
            <circle cx="148" cy="84" r="24" fill="#8E79A1" stroke="#2E2438" strokeWidth="3" />
            <ellipse cx="164" cy="96" rx="22" ry="18" fill="#A692B8" stroke="#2E2438" strokeWidth="3" />
            <circle cx="156" cy="90" r="3.5" fill="#2E2438" />
            <circle cx="174" cy="90" r="3.5" fill="#2E2438" />
            <g className="anim-blink">
              <circle cx="142" cy="76" r="3.8" fill="#1E1824" />
              <circle cx="141" cy="75" r="1.2" fill="#FFF" />
            </g>
            {isSpeaking && <ellipse cx="164" cy="108" rx="10" ry="6" className="anim-jaw" fill="#F472B6" stroke="#2E2438" strokeWidth="2" />}
          </g>
        </svg>
      );

    case 'karkidon':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Karkidon rasmi">
          <rect x="46" y="120" width="16" height="40" rx="5" className="anim-leg-a" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="68" y="122" width="16" height="38" rx="5" className="anim-leg-b" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="114" y="120" width="16" height="40" rx="5" className="anim-leg-b" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="134" y="122" width="16" height="38" rx="5" className="anim-leg-a" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="38" y="76" width="110" height="58" rx="24" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
            {/* Armor skin folds */}
            <path d="M74 78 Q78 106 74 132 M116 78 Q112 106 116 132" fill="none" stroke="#475569" strokeWidth="2.5" />
          </g>
          <g className="anim-head-alert">
            <ellipse cx="136" cy="64" rx="6" ry="12" transform="rotate(-20 136 64)" className="anim-ear" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
            <path d="M134 74 Q166 72 178 96 Q172 114 140 112 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
            {/* Two Horns */}
            <path d="M168 88 Q186 58 176 48 Q166 64 156 84 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M154 82 Q160 66 154 62 Q148 68 144 82 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="148" cy="86" r="3.5" fill="#0F172A" />
              <circle cx="147" cy="85" r="1.2" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'bizon':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Bizon rasmi">
          <rect x="52" y="120" width="12" height="40" rx="4" className="anim-leg-a" fill="#451A03" />
          <rect x="68" y="122" width="12" height="38" rx="4" className="anim-leg-b" fill="#290F02" />
          <rect x="116" y="120" width="12" height="40" rx="4" className="anim-leg-b" fill="#451A03" />
          <rect x="132" y="122" width="12" height="38" rx="4" className="anim-leg-a" fill="#290F02" />
          <g className="anim-breathe">
            {/* Back Body */}
            <rect x="42" y="80" width="96" height="50" rx="20" fill="#78350F" stroke="#290F02" strokeWidth="3" />
            {/* Big Shaggy Shoulder Hump */}
            <ellipse cx="122" cy="88" rx="36" ry="34" fill="#451A03" stroke="#290F02" strokeWidth="3" />
          </g>
          <g className="anim-head-graze">
            <path d="M132 72 Q122 52 134 50 M162 72 Q172 52 160 50" fill="none" stroke="#D6D3D1" strokeWidth="5" strokeLinecap="round" />
            <circle cx="148" cy="92" r="24" fill="#451A03" stroke="#290F02" strokeWidth="3" />
            <path d="M138 110 Q148 132 158 110 Z" fill="#290F02" />
            <g className="anim-blink">
              <circle cx="142" cy="88" r="3" fill="#FFF" />
              <circle cx="142" cy="88" r="1.5" fill="#111" />
              <circle cx="158" cy="88" r="3" fill="#FFF" />
              <circle cx="158" cy="88" r="1.5" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'alpaka':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Alpaka rasmi">
          <rect x="64" y="120" width="10" height="42" rx="4" className="anim-leg-a" fill="#E7E5E4" stroke="#57534E" strokeWidth="2" />
          <rect x="80" y="122" width="10" height="40" rx="4" className="anim-leg-b" fill="#D6D3D1" stroke="#57534E" strokeWidth="2" />
          <rect x="114" y="120" width="10" height="42" rx="4" className="anim-leg-b" fill="#E7E5E4" stroke="#57534E" strokeWidth="2" />
          <rect x="128" y="122" width="10" height="40" rx="4" className="anim-leg-a" fill="#D6D3D1" stroke="#57534E" strokeWidth="2" />
          <g className="anim-breathe">
            <ellipse cx="96" cy="108" rx="42" ry="28" fill="#FAF7F2" stroke="#57534E" strokeWidth="2.5" />
            <circle cx="70" cy="100" r="14" fill="#FAF7F2" />
            <circle cx="96" cy="94" r="16" fill="#FAF7F2" />
          </g>
          <g className="anim-head-alert">
            <rect x="120" y="46" width="22" height="58" rx="11" fill="#FAF7F2" stroke="#57534E" strokeWidth="2.5" />
            <ellipse cx="125" cy="30" rx="5" ry="12" transform="rotate(-12 125 30)" className="anim-ear" fill="#FAF7F2" stroke="#57534E" strokeWidth="2" />
            <ellipse cx="141" cy="30" rx="5" ry="12" transform="rotate(12 141 30)" className="anim-ear" fill="#FAF7F2" stroke="#57534E" strokeWidth="2" />
            <circle cx="134" cy="48" r="18" fill="#FAF7F2" stroke="#57534E" strokeWidth="2.5" />
            <g className="anim-blink">
              <circle cx="128" cy="46" r="3" fill="#1C1917" />
              <circle cx="140" cy="46" r="3" fill="#1C1917" />
            </g>
            <ellipse cx="136" cy="54" rx="7" ry="5" fill="#FDE68A" />
            <polygon points="133,52 139,52 136,56" fill="#78350F" />
          </g>
        </svg>
      );

    case 'olmaxon':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Olmaxon rasmi">
          {/* Giant Bushy Tail */}
          <path d="M74 134 Q24 114 34 54 Q52 28 74 58 Q62 96 84 128 Z" className="anim-tail" fill="#C2410C" stroke="#431407" strokeWidth="3" />
          <g className="anim-breathe">
            <ellipse cx="106" cy="116" rx="26" ry="30" fill="#EA580C" stroke="#431407" strokeWidth="3" />
            <ellipse cx="114" cy="120" rx="13" ry="18" fill="#FFF7ED" />
            {/* Holding Acorn */}
            <circle cx="134" cy="112" r="8" fill="#92400E" stroke="#451A03" strokeWidth="2" />
            <path d="M124 110 Q134 100 144 110 Z" fill="#451A03" />
          </g>
          <g className="anim-head-alert">
            <polygon points="94,54 98,32 108,52" className="anim-ear" fill="#C2410C" stroke="#431407" strokeWidth="2" />
            <polygon points="116,54 124,32 128,54" className="anim-ear" fill="#C2410C" stroke="#431407" strokeWidth="2" />
            <circle cx="112" cy="72" r="22" fill="#EA580C" stroke="#431407" strokeWidth="3" />
            <g className="anim-blink">
              <circle cx="118" cy="68" r="4" fill="#1C1917" />
              <circle cx="117" cy="66.5" r="1.4" fill="#FFF" />
            </g>
            <circle cx="132" cy="74" r="3" fill="#292524" />
          </g>
        </svg>
      );

    case 'sugur':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Sug'ur rasmi">
          <path d="M58 134 L36 142" className="anim-tail" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
          <g className="anim-breathe">
            <ellipse cx="100" cy="114" rx="34" ry="38" fill="#B47B44" stroke="#451A03" strokeWidth="3" />
            <ellipse cx="106" cy="120" rx="18" ry="22" fill="#E7C9A9" />
            <rect x="86" y="146" width="12" height="14" rx="5" fill="#78350F" />
            <rect x="112" y="146" width="12" height="14" rx="5" fill="#78350F" />
          </g>
          <g className="anim-head-alert">
            <circle cx="84" cy="54" r="7" className="anim-ear" fill="#78350F" />
            <circle cx="118" cy="54" r="7" className="anim-ear" fill="#78350F" />
            <circle cx="102" cy="68" r="24" fill="#B47B44" stroke="#451A03" strokeWidth="3" />
            <path d="M84 52 Q102 42 120 52 Q112 60 92 60 Z" fill="#451A03" />
            <g className="anim-blink">
              <circle cx="94" cy="66" r="3.5" fill="#111" />
              <circle cx="112" cy="66" r="3.5" fill="#111" />
            </g>
            <rect x="98" y="80" width="8" height="6" rx="1" fill="#FFF" stroke="#451A03" strokeWidth="1" />
            <circle cx="102" cy="75" r="4" fill="#292524" />
          </g>
        </svg>
      );

    case 'tapir':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Tapir rasmi">
          <rect x="54" y="122" width="12" height="38" rx="5" className="anim-leg-a" fill="#292524" />
          <rect x="72" y="124" width="12" height="36" rx="5" className="anim-leg-b" fill="#1C1917" />
          <rect x="114" y="122" width="12" height="38" rx="5" className="anim-leg-b" fill="#292524" />
          <rect x="130" y="124" width="12" height="36" rx="5" className="anim-leg-a" fill="#1C1917" />
          <g className="anim-breathe">
            {/* Characteristic Black-White Saddle */}
            <rect x="44" y="76" width="98" height="54" rx="26" fill="#292524" stroke="#0F172A" strokeWidth="2.5" />
            <path d="M72 76 L112 76 L114 130 L70 130 Z" fill="#F8FAFC" />
          </g>
          <g className="anim-head-graze">
            <circle cx="134" cy="64" r="7" className="anim-ear" fill="#292524" stroke="#F8FAFC" strokeWidth="2" />
            <path d="M126 78 Q154 64 176 86 Q180 100 166 102 Q158 92 142 96 Z" fill="#292524" stroke="#0F172A" strokeWidth="2.5" />
            <g className="anim-blink">
              <circle cx="146" cy="78" r="3" fill="#FFF" />
              <circle cx="146" cy="78" r="1.5" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'okapi':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Okapi rasmi">
          {/* Striped Legs */}
          <g className="anim-leg-a">
            <rect x="56" y="114" width="10" height="46" rx="4" fill="#FFF" stroke="#292524" strokeWidth="2" />
            <line x1="56" y1="124" x2="66" y2="124" stroke="#1C1917" strokeWidth="4" />
            <line x1="56" y1="136" x2="66" y2="136" stroke="#1C1917" strokeWidth="4" />
          </g>
          <g className="anim-leg-b">
            <rect x="116" y="114" width="10" height="46" rx="4" fill="#FFF" stroke="#292524" strokeWidth="2" />
            <line x1="116" y1="124" x2="126" y2="124" stroke="#1C1917" strokeWidth="4" />
          </g>
          <g className="anim-breathe">
            <rect x="44" y="76" width="96" height="46" rx="22" fill="#581C1C" stroke="#290B0B" strokeWidth="3" />
            <path d="M46 92 L68 92 M46 104 L68 104" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g className="anim-head-alert">
            <path d="M122 86 L138 40 L154 46 L138 104 Z" fill="#581C1C" stroke="#290B0B" strokeWidth="2.5" />
            <ellipse cx="136" cy="36" rx="9" ry="5" transform="rotate(-30 136 36)" className="anim-ear" fill="#581C1C" />
            <ellipse cx="154" cy="48" rx="19" ry="11" transform="rotate(14 154 48)" fill="#7F1D1D" stroke="#290B0B" strokeWidth="2.5" />
            <g className="anim-blink">
              <circle cx="152" cy="45" r="3" fill="#111" />
              <circle cx="151" cy="44" r="1" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'antilopa':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Antilopa rasmi">
          <rect x="60" y="116" width="8" height="46" rx="3" className="anim-leg-a" fill="#D97706" />
          <rect x="74" y="118" width="8" height="44" rx="3" className="anim-leg-b" fill="#B45309" />
          <rect x="116" y="116" width="8" height="46" rx="3" className="anim-leg-b" fill="#D97706" />
          <rect x="128" y="118" width="8" height="44" rx="3" className="anim-leg-a" fill="#B45309" />
          <g className="anim-breathe">
            <rect x="52" y="82" width="84" height="40" rx="20" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
            <ellipse cx="94" cy="116" rx="30" ry="7" fill="#FFFBEB" />
            <line x1="62" y1="104" x2="124" y2="104" stroke="#451A03" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g className="anim-head-alert">
            <path d="M122 92 L138 50 L150 56 L136 104 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
            {/* Lyre Horns */}
            <path d="M138 48 Q128 24 138 14 M148 48 Q158 24 148 14" fill="none" stroke="#292524" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="152" cy="58" rx="18" ry="10" transform="rotate(14 152 58)" fill="#FFFBEB" stroke="#78350F" strokeWidth="2.5" />
            <g className="anim-blink">
              <circle cx="152" cy="55" r="3" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'qotos':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Qo'tos rasmi">
          <g className="anim-breathe">
            {/* Long Shaggy Skirt Fur */}
            <path d="M40 82 Q92 64 144 82 L148 144 Q130 136 120 144 Q100 136 90 144 Q70 136 58 144 L40 138 Z" fill="#292524" stroke="#0C0A09" strokeWidth="3" />
          </g>
          <g className="anim-head-graze">
            <path d="M128 66 Q114 38 134 32 M162 66 Q176 38 156 32" fill="none" stroke="#E7E5E4" strokeWidth="6" strokeLinecap="round" />
            <circle cx="145" cy="84" r="24" fill="#1C1917" stroke="#0C0A09" strokeWidth="3" />
            <g className="anim-blink">
              <circle cx="138" cy="80" r="3" fill="#FFF" />
              <circle cx="138" cy="80" r="1.5" fill="#111" />
              <circle cx="154" cy="80" r="3" fill="#FFF" />
              <circle cx="154" cy="80" r="1.5" fill="#111" />
            </g>
            <ellipse cx="146" cy="94" rx="10" ry="6" fill="#78716C" />
          </g>
        </svg>
      );

    case 'eshak':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Eshak rasmi">
          <path d="M44 92 L24 126" className="anim-tail" stroke="#57534E" strokeWidth="4" strokeLinecap="round" />
          <rect x="54" y="114" width="10" height="46" rx="4" className="anim-leg-a" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          <rect x="70" y="116" width="10" height="44" rx="4" className="anim-leg-b" fill="#64748B" stroke="#334155" strokeWidth="2" />
          <rect x="116" y="114" width="10" height="46" rx="4" className="anim-leg-b" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          <rect x="130" y="116" width="10" height="44" rx="4" className="anim-leg-a" fill="#64748B" stroke="#334155" strokeWidth="2" />
          <g className="anim-breathe">
            <rect x="44" y="76" width="96" height="46" rx="22" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
          </g>
          <g className="anim-head-alert">
            <path d="M122 86 L138 42 L154 48 L138 104 Z" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
            {/* Iconic Long Ears */}
            <ellipse cx="136" cy="24" rx="6" ry="20" transform="rotate(-14 136 24)" className="anim-ear" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
            <ellipse cx="150" cy="24" rx="6" ry="20" transform="rotate(14 150 24)" className="anim-ear" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
            <ellipse cx="156" cy="54" rx="22" ry="13" transform="rotate(14 156 54)" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
            <ellipse cx="170" cy="58" rx="9" ry="8" fill="#F1F5F9" />
            <g className="anim-blink">
              <circle cx="152" cy="48" r="3.5" fill="#1E293B" />
              <circle cx="151" cy="47" r="1.2" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'oqqush':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Oqqush rasmi">
          <g className="anim-breathe">
            <ellipse cx="90" cy="124" rx="46" ry="24" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2.5" />
            <path d="M58 114 Q96 96 122 118" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
          </g>
          {/* Graceful S-Neck */}
          <g className="anim-head-graze">
            <path d="M122 122 Q142 94 128 60 Q122 40 138 38" fill="none" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <path d="M122 122 Q142 94 128 60 Q122 40 138 38" fill="none" stroke="#94A3B8" strokeWidth="16" strokeLinecap="round" opacity="0.25" />
            <circle cx="140" cy="40" r="11" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
            <polygon points="148,38 166,42 148,46" fill="#F97316" stroke="#7C2D12" strokeWidth="1.5" />
            <g className="anim-blink">
              <circle cx="143" cy="38" r="2.2" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'goz':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="G'oz rasmi">
          <line x1="88" y1="134" x2="84" y2="158" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
          <line x1="110" y1="134" x2="114" y2="158" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
          <g className="anim-breathe">
            <ellipse cx="94" cy="116" rx="40" ry="24" fill="#CBD5E1" stroke="#475569" strokeWidth="2.5" />
            <ellipse cx="96" cy="126" rx="30" ry="12" fill="#F8FAFC" />
          </g>
          <g className="anim-head-alert">
            <path d="M118 106 L132 48 L144 52 L132 114 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="2.5" />
            <circle cx="140" cy="48" r="13" fill="#CBD5E1" stroke="#475569" strokeWidth="2.5" />
            <polygon points="150,45 170,50 150,54" fill="#F97316" stroke="#7C2D12" strokeWidth="1.5" />
            <g className="anim-blink">
              <circle cx="143" cy="45" r="2.5" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'ordak':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="O'rdak rasmi">
          <g className="anim-breathe">
            <ellipse cx="92" cy="118" rx="40" ry="24" fill="#9A8570" stroke="#44403C" strokeWidth="2.5" />
            <path d="M72 114 Q96 106 112 120" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
          </g>
          <g className="anim-head-alert">
            {/* Mallard Green Head & White Ring */}
            <path d="M122 104 L132 68" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            <circle cx="134" cy="58" r="18" fill="#15803D" stroke="#052E16" strokeWidth="2.5" />
            <ellipse cx="156" cy="61" rx="14" ry="6" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="138" cy="54" r="3" fill="#111" />
              <circle cx="137" cy="53" r="1" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'kakadu':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Kakadu rasmi">
          <path d="M60 150 L146 150" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />
          <g className="anim-breathe">
            <ellipse cx="100" cy="112" rx="26" ry="38" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
            <ellipse cx="86" cy="116" rx="14" ry="26" className="anim-wing-l" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          </g>
          <g className="anim-head-alert">
            {/* Yellow Crest */}
            <path d="M96 42 Q82 14 70 28 Q84 36 92 48 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
            <path d="M102 40 Q94 10 82 18 Q94 30 98 44 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            <circle cx="104" cy="62" r="22" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
            <path d="M120 56 Q138 58 130 76 Q120 72 118 64 Z" fill="#334155" />
            <g className="anim-blink">
              <circle cx="110" cy="58" r="3.5" fill="#111" />
              <circle cx="109" cy="57" r="1.2" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'totiqush':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="To'tiqush rasmi">
          <path d="M84 136 L76 170 L94 170 L98 136 Z" fill="#2563EB" />
          <path d="M56 144 L148 144" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />
          <g className="anim-breathe">
            <ellipse cx="100" cy="108" rx="26" ry="36" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
            <path d="M78 96 Q70 124 88 134 Q96 112 90 92 Z" className="anim-wing-l" fill="#FACC15" stroke="#1D4ED8" strokeWidth="3" />
          </g>
          <g className="anim-head-alert">
            <circle cx="104" cy="60" r="22" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
            <ellipse cx="110" cy="60" rx="11" ry="9" fill="#FFF" />
            <path d="M120 54 Q142 54 134 74 Q122 70 118 62 Z" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="110" cy="58" r="3.5" fill="#111" />
              <circle cx="109" cy="57" r="1.2" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'manati':
      return (
        <svg viewBox="0 0 220 150" className={className} aria-label="Manati rasmi">
          <g className="anim-swim-tail">
            <ellipse cx="36" cy="86" rx="24" ry="18" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
          </g>
          <g className="anim-breathe">
            <ellipse cx="110" cy="86" rx="64" ry="34" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
            <ellipse cx="122" cy="112" rx="14" ry="8" transform="rotate(24 122 112)" fill="#64748B" stroke="#334155" strokeWidth="2" />
          </g>
          <circle cx="164" cy="84" r="22" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
          <ellipse cx="180" cy="92" rx="11" ry="10" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
          <g className="anim-blink">
            <circle cx="164" cy="78" r="3" fill="#0F172A" />
          </g>
        </svg>
      );

    case 'ayiq':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Ayiq rasmi">
          <rect x="46" y="120" width="18" height="40" rx="6" className="anim-leg-a" fill="#78350F" stroke="#290F02" strokeWidth="2.5" />
          <rect x="68" y="122" width="18" height="38" rx="6" className="anim-leg-b" fill="#5C280B" stroke="#290F02" strokeWidth="2.5" />
          <rect x="114" y="120" width="18" height="40" rx="6" className="anim-leg-b" fill="#78350F" stroke="#290F02" strokeWidth="2.5" />
          <rect x="134" y="122" width="18" height="38" rx="6" className="anim-leg-a" fill="#5C280B" stroke="#290F02" strokeWidth="2.5" />
          <g className="anim-breathe">
            <ellipse cx="96" cy="100" rx="52" ry="38" fill="#854D27" stroke="#290F02" strokeWidth="3" />
          </g>
          <g className="anim-head-alert">
            <circle cx="128" cy="48" r="9" className="anim-ear" fill="#854D27" stroke="#290F02" strokeWidth="2.5" />
            <circle cx="164" cy="48" r="9" className="anim-ear" fill="#854D27" stroke="#290F02" strokeWidth="2.5" />
            <circle cx="146" cy="72" r="28" fill="#854D27" stroke="#290F02" strokeWidth="3" />
            <ellipse cx="154" cy="82" rx="14" ry="11" fill="#D4A373" />
            <ellipse cx="158" cy="76" rx="5" ry="4" fill="#1C1917" />
            <g className="anim-blink">
              <circle cx="138" cy="66" r="3.5" fill="#1C1917" />
              <circle cx="156" cy="66" r="3.5" fill="#1C1917" />
            </g>
            {isSpeaking && <ellipse cx="154" cy="89" rx="6" ry="4" className="anim-jaw" fill="#7F1D1D" />}
          </g>
        </svg>
      );

    case 'yaguar':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Yaguar rasmi">
          <path d="M40 98 Q18 112 24 136" className="anim-tail" fill="none" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
          <rect x="52" y="114" width="14" height="44" rx="5" className="anim-leg-a" fill="#F59E0B" stroke="#451A03" strokeWidth="2.5" />
          <rect x="72" y="116" width="14" height="42" rx="5" className="anim-leg-b" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
          <rect x="114" y="114" width="14" height="44" rx="5" className="anim-leg-b" fill="#F59E0B" stroke="#451A03" strokeWidth="2.5" />
          <rect x="132" y="116" width="14" height="42" rx="5" className="anim-leg-a" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="40" y="76" width="104" height="50" rx="24" fill="#F59E0B" stroke="#451A03" strokeWidth="3" />
            {/* Jaguar Rosettes with center dot */}
            <g fill="#451A03">
              <circle cx="66" cy="94" r="6" fill="none" stroke="#451A03" strokeWidth="2.5" />
              <circle cx="66" cy="94" r="2" />
              <circle cx="90" cy="88" r="6.5" fill="none" stroke="#451A03" strokeWidth="2.5" />
              <circle cx="90" cy="88" r="2" />
              <circle cx="110" cy="98" r="6" fill="none" stroke="#451A03" strokeWidth="2.5" />
              <circle cx="110" cy="98" r="2" />
            </g>
          </g>
          <g className="anim-head-alert">
            <circle cx="128" cy="52" r="8" className="anim-ear" fill="#F59E0B" stroke="#451A03" strokeWidth="2.5" />
            <circle cx="162" cy="52" r="8" className="anim-ear" fill="#F59E0B" stroke="#451A03" strokeWidth="2.5" />
            <circle cx="145" cy="74" r="25" fill="#F59E0B" stroke="#451A03" strokeWidth="3" />
            <ellipse cx="145" cy="84" rx="12" ry="8" fill="#FEF3C7" />
            <g className="anim-blink">
              <circle cx="136" cy="70" r="3.5" fill="#15803D" />
              <circle cx="154" cy="70" r="3.5" fill="#15803D" />
            </g>
            <polygon points="141,80 149,80 145,85" fill="#451A03" />
          </g>
        </svg>
      );

    case 'puma':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Puma rasmi">
          <path d="M40 98 Q14 114 24 142" className="anim-tail" fill="none" stroke="#C28E5C" strokeWidth="6" strokeLinecap="round" />
          <rect x="52" y="114" width="12" height="46" rx="5" className="anim-leg-a" fill="#D4A373" stroke="#422B14" strokeWidth="2.5" />
          <rect x="70" y="116" width="12" height="44" rx="5" className="anim-leg-b" fill="#BA895A" stroke="#422B14" strokeWidth="2.5" />
          <rect x="116" y="114" width="12" height="46" rx="5" className="anim-leg-b" fill="#D4A373" stroke="#422B14" strokeWidth="2.5" />
          <rect x="132" y="116" width="12" height="44" rx="5" className="anim-leg-a" fill="#BA895A" stroke="#422B14" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="42" y="76" width="102" height="46" rx="23" fill="#D4A373" stroke="#422B14" strokeWidth="3" />
          </g>
          <g className="anim-head-alert">
            <circle cx="130" cy="54" r="7.5" className="anim-ear" fill="#D4A373" stroke="#422B14" strokeWidth="2.5" />
            <circle cx="160" cy="54" r="7.5" className="anim-ear" fill="#D4A373" stroke="#422B14" strokeWidth="2.5" />
            <circle cx="145" cy="72" r="22" fill="#D4A373" stroke="#422B14" strokeWidth="3" />
            <ellipse cx="145" cy="80" rx="10" ry="7" fill="#FAF0E6" />
            <g className="anim-blink">
              <circle cx="138" cy="68" r="3.5" fill="#FACC15" stroke="#422B14" strokeWidth="1" />
              <circle cx="152" cy="68" r="3.5" fill="#FACC15" stroke="#422B14" strokeWidth="1" />
            </g>
            <polygon points="142,77 148,77 145,82" fill="#F4A5AE" />
          </g>
        </svg>
      );

    case 'silovsin':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Silovsin rasmi">
          <path d="M44 96 L32 88" className="anim-tail" stroke="#94A3B8" strokeWidth="7" strokeLinecap="round" />
          <rect x="54" y="114" width="14" height="46" rx="6" className="anim-leg-a" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" />
          <rect x="116" y="114" width="14" height="46" rx="6" className="anim-leg-b" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="46" y="78" width="94" height="46" rx="22" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
            <circle cx="76" cy="96" r="3" fill="#475569" />
            <circle cx="96" cy="92" r="3" fill="#475569" />
            <circle cx="110" cy="100" r="3" fill="#475569" />
          </g>
          <g className="anim-head-alert">
            {/* Iconic Tufted Ears */}
            <g className="anim-ear">
              <polygon points="124,54 128,28 140,50" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" />
              <line x1="128" y1="28" x2="124" y2="16" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g className="anim-ear">
              <polygon points="148,50 160,28 164,54" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" />
              <line x1="160" y1="28" x2="164" y2="16" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx="144" cy="70" r="22" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
            <g className="anim-blink">
              <circle cx="137" cy="66" r="3.5" fill="#FACC15" stroke="#1E293B" strokeWidth="1" />
              <circle cx="151" cy="66" r="3.5" fill="#FACC15" stroke="#1E293B" strokeWidth="1" />
            </g>
            <polygon points="141,75 147,75 144,79" fill="#EC7A8C" />
          </g>
        </svg>
      );

    case 'mangust':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Mangust rasmi">
          <path d="M72 138 Q30 144 20 120" className="anim-tail" fill="none" stroke="#92400E" strokeWidth="8" strokeLinecap="round" />
          <g className="anim-breathe">
            <ellipse cx="100" cy="116" rx="22" ry="38" fill="#B45309" stroke="#451A03" strokeWidth="3" />
            <ellipse cx="106" cy="120" rx="12" ry="22" fill="#FDE68A" />
            <rect x="86" y="148" width="10" height="14" rx="4" fill="#451A03" />
            <rect x="108" y="148" width="10" height="14" rx="4" fill="#451A03" />
          </g>
          <g className="anim-head-alert">
            <circle cx="88" cy="54" r="6" className="anim-ear" fill="#78350F" />
            <circle cx="116" cy="54" r="6" className="anim-ear" fill="#78350F" />
            <ellipse cx="106" cy="66" rx="20" ry="16" fill="#B45309" stroke="#451A03" strokeWidth="3" />
            <g className="anim-blink">
              <circle cx="106" cy="63" r="3" fill="#111" />
              <circle cx="118" cy="63" r="3" fill="#111" />
            </g>
            <circle cx="126" cy="68" r="3" fill="#111" />
          </g>
        </svg>
      );

    case 'serval':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Serval rasmi">
          <path d="M48 92 L24 106" className="anim-tail" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
          {/* Extra Long Legs */}
          <rect x="58" y="106" width="8" height="58" rx="4" className="anim-leg-a" fill="#FBBF24" stroke="#451A03" strokeWidth="2" />
          <rect x="74" y="108" width="8" height="56" rx="4" className="anim-leg-b" fill="#D97706" stroke="#451A03" strokeWidth="2" />
          <rect x="116" y="106" width="8" height="58" rx="4" className="anim-leg-b" fill="#FBBF24" stroke="#451A03" strokeWidth="2" />
          <rect x="130" y="108" width="8" height="56" rx="4" className="anim-leg-a" fill="#D97706" stroke="#451A03" strokeWidth="2" />
          <g className="anim-breathe">
            <rect x="48" y="74" width="92" height="38" rx="18" fill="#FBBF24" stroke="#451A03" strokeWidth="2.5" />
            <circle cx="72" cy="90" r="3.5" fill="#1C1917" />
            <circle cx="92" cy="86" r="3.5" fill="#1C1917" />
            <circle cx="110" cy="92" r="3.5" fill="#1C1917" />
          </g>
          <g className="anim-head-alert">
            {/* Giant Serval Radar Ears */}
            <ellipse cx="132" cy="36" rx="7" ry="18" transform="rotate(-12 132 36)" className="anim-ear" fill="#FBBF24" stroke="#451A03" strokeWidth="2" />
            <ellipse cx="148" cy="36" rx="7" ry="18" transform="rotate(12 148 36)" className="anim-ear" fill="#FBBF24" stroke="#451A03" strokeWidth="2" />
            <circle cx="142" cy="60" r="17" fill="#FBBF24" stroke="#451A03" strokeWidth="2.5" />
            <g className="anim-blink">
              <circle cx="142" cy="57" r="3" fill="#111" />
              <circle cx="152" cy="59" r="3" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'qor_qoploni':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Qor qoploni rasmi">
          {/* Extra Long Fluffy Tail */}
          <path d="M40 100 Q10 120 34 150 Q52 154 68 144" className="anim-tail" fill="none" stroke="#CBD5E1" strokeWidth="10" strokeLinecap="round" />
          <rect x="52" y="114" width="14" height="46" rx="6" className="anim-leg-a" fill="#E2E8F0" stroke="#334155" strokeWidth="2.5" />
          <rect x="116" y="114" width="14" height="46" rx="6" className="anim-leg-b" fill="#E2E8F0" stroke="#334155" strokeWidth="2.5" />
          <g className="anim-breathe">
            <rect x="42" y="76" width="102" height="48" rx="23" fill="#E2E8F0" stroke="#334155" strokeWidth="3" />
            <g fill="none" stroke="#475569" strokeWidth="2.5">
              <circle cx="68" cy="94" r="5" />
              <circle cx="92" cy="88" r="5.5" />
              <circle cx="112" cy="96" r="5" />
            </g>
          </g>
          <g className="anim-head-alert">
            <circle cx="128" cy="54" r="7.5" className="anim-ear" fill="#E2E8F0" stroke="#334155" strokeWidth="2.5" />
            <circle cx="158" cy="54" r="7.5" className="anim-ear" fill="#E2E8F0" stroke="#334155" strokeWidth="2.5" />
            <circle cx="143" cy="74" r="23" fill="#E2E8F0" stroke="#334155" strokeWidth="3" />
            <g className="anim-blink">
              <circle cx="136" cy="70" r="3.5" fill="#0EA5E9" stroke="#1E293B" strokeWidth="1" />
              <circle cx="150" cy="70" r="3.5" fill="#0EA5E9" stroke="#1E293B" strokeWidth="1" />
            </g>
            <polygon points="140,79 146,79 143,84" fill="#F4A5AE" />
          </g>
        </svg>
      );

    case 'komodo':
      return (
        <svg viewBox="0 0 220 150" className={className} aria-label="Komodo ajdahosi rasmi">
          <path d="M18 100 Q52 84 74 92 L74 112 Q40 116 18 100 Z" className="anim-swim-tail" fill="#4D7C0F" stroke="#1A2E05" strokeWidth="2.5" />
          <rect x="82" y="106" width="14" height="22" rx="5" className="anim-leg-a" fill="#4D7C0F" stroke="#1A2E05" strokeWidth="2.5" />
          <rect x="136" y="106" width="14" height="22" rx="5" className="anim-leg-b" fill="#4D7C0F" stroke="#1A2E05" strokeWidth="2.5" />
          <g className="anim-breathe">
            <ellipse cx="112" cy="94" rx="48" ry="22" fill="#65A30D" stroke="#1A2E05" strokeWidth="3" />
          </g>
          <g className="anim-head-alert">
            <path d="M148 80 L194 84 Q202 92 194 102 L148 104 Z" fill="#65A30D" stroke="#1A2E05" strokeWidth="2.5" />
            {/* Forked Tongue */}
            <path d="M196 94 L214 94 M214 94 L220 89 M214 94 L220 99" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            <g className="anim-blink">
              <circle cx="164" cy="86" r="3.5" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'anakonda':
      return (
        <svg viewBox="0 0 220 160" className={className} aria-label="Anakonda rasmi">
          <g className="anim-breathe">
            <path
              d="M28 118 Q54 78 88 114 T152 108 Q174 88 186 70"
              fill="none"
              stroke="#15803D"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <circle cx="60" cy="98" r="5" fill="#14532D" />
            <circle cx="96" cy="116" r="5.5" fill="#14532D" />
            <circle cx="134" cy="112" r="5" fill="#14532D" />
          </g>
          <g className="anim-head-alert">
            <ellipse cx="186" cy="66" rx="18" ry="12" fill="#16A34A" stroke="#052E16" strokeWidth="2.5" />
            <path d="M202 66 L216 66 M216 66 L220 62 M216 66 L220 70" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            <g className="anim-blink">
              <circle cx="188" cy="62" r="3" fill="#FACC15" />
              <circle cx="188" cy="62" r="1.4" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'kobra':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Kobra rasmi">
          {/* Coiled Base */}
          <ellipse cx="96" cy="144" rx="52" ry="16" fill="#3F6212" stroke="#1A2E05" strokeWidth="3" />
          <ellipse cx="98" cy="134" rx="38" ry="13" fill="#4D7C0F" stroke="#1A2E05" strokeWidth="2.5" />
          {/* Raised Hood */}
          <g className="anim-head-alert">
            <path d="M90 132 Q62 72 96 42 Q132 72 106 132 Z" fill="#65A30D" stroke="#1A2E05" strokeWidth="3" />
            <path d="M92 128 Q80 86 98 58 Q116 86 104 128 Z" fill="#FEF08A" />
            <circle cx="98" cy="48" r="16" fill="#65A30D" stroke="#1A2E05" strokeWidth="2.5" />
            <path d="M112 50 L132 50 M132 50 L138 45 M132 50 L138 55" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            <g className="anim-blink">
              <circle cx="104" cy="44" r="3" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'piranya':
      return (
        <svg viewBox="0 0 200 160" className={className} aria-label="Piranya rasmi">
          <g className="anim-swim-tail">
            <polygon points="48,80 20,54 28,80 20,106" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          </g>
          <g className="anim-breathe">
            <ellipse cx="104" cy="82" rx="56" ry="38" fill="#64748B" stroke="#1E293B" strokeWidth="3" />
            <path d="M60 94 Q104 122 148 94 Q124 114 92 114 Z" fill="#DC2626" />
          </g>
          <g className="anim-blink">
            <circle cx="136" cy="70" r="6" fill="#FACC15" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="136" cy="70" r="2.5" fill="#111" />
          </g>
          {/* Sharp Teeth */}
          <path d="M138 90 L160 86 L154 98 Z" fill="#1E293B" />
          <path d="M142 90 L146 95 L150 89 L154 94 L158 88" fill="#FFF" />
        </svg>
      );

    case 'delfin':
      return (
        <svg viewBox="0 0 220 150" className={className} aria-label="Delfin rasmi">
          <g className="anim-swim-tail">
            <path d="M42 82 L18 60 L26 84 L16 108 L44 92 Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.5" />
          </g>
          <path d="M102 52 Q114 22 128 24 Q122 46 126 54 Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.5" />
          <g className="anim-breathe">
            <path d="M40 84 Q90 42 164 58 Q196 72 204 82 Q188 94 166 92 Q122 110 40 84 Z" fill="#38BDF8" stroke="#0C4A6E" strokeWidth="3" />
            <path d="M62 90 Q114 106 162 90 Q138 90 96 86 Z" fill="#F0F9FF" />
            <path d="M114 96 L94 124 L130 100 Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.5" />
          </g>
          <g className="anim-blink">
            <circle cx="164" cy="70" r="3.8" fill="#0F172A" />
            <circle cx="163" cy="69" r="1.2" fill="#FFF" />
          </g>
        </svg>
      );

    case 'lochin':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Lochin rasmi">
          <g className="anim-wing-l">
            <path d="M96 84 Q36 22 14 58 Q46 92 84 98 Z" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
          </g>
          <g className="anim-wing-r">
            <path d="M104 84 Q164 22 186 58 Q154 92 116 98 Z" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
          </g>
          <path d="M88 126 L80 158 L120 158 L112 126 Z" fill="#475569" stroke="#0F172A" strokeWidth="2" />
          <g className="anim-breathe">
            <ellipse cx="100" cy="102" rx="20" ry="32" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="88" y1="98" x2="112" y2="98" stroke="#334155" strokeWidth="2.5" />
            <line x1="88" y1="108" x2="112" y2="108" stroke="#334155" strokeWidth="2.5" />
          </g>
          <g className="anim-head-alert">
            <circle cx="100" cy="58" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
            <ellipse cx="104" cy="62" rx="9" ry="7" fill="#FFF" />
            <path d="M114 54 Q130 56 126 68 L114 62 Z" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="106" cy="56" r="3.5" fill="#111" />
              <circle cx="105" cy="55" r="1.2" fill="#FFF" />
            </g>
          </g>
        </svg>
      );

    case 'boyogli':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Boyo'g'li rasmi">
          <path d="M46 148 L154 148" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />
          <g className="anim-breathe">
            <ellipse cx="100" cy="108" rx="34" ry="38" fill="#A87948" stroke="#451A03" strokeWidth="3" />
            <ellipse cx="100" cy="116" rx="22" ry="26" fill="#FDE68A" />
            <g className="anim-wing-l">
              <ellipse cx="68" cy="112" rx="12" ry="28" fill="#784B24" stroke="#451A03" strokeWidth="2" />
            </g>
            <g className="anim-wing-r">
              <ellipse cx="132" cy="112" rx="12" ry="28" fill="#784B24" stroke="#451A03" strokeWidth="2" />
            </g>
          </g>
          <g className="anim-head-alert">
            <polygon points="74,42 64,22 86,36" className="anim-ear" fill="#784B24" stroke="#451A03" strokeWidth="2" />
            <polygon points="126,42 136,22 114,36" className="anim-ear" fill="#784B24" stroke="#451A03" strokeWidth="2" />
            <circle cx="100" cy="60" r="28" fill="#A87948" stroke="#451A03" strokeWidth="3" />
            {/* Giant Owl Eyes */}
            <circle cx="86" cy="58" r="12" fill="#FEF3C7" stroke="#451A03" strokeWidth="2" />
            <circle cx="114" cy="58" r="12" fill="#FEF3C7" stroke="#451A03" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="86" cy="58" r="7" fill="#F59E0B" />
              <circle cx="86" cy="58" r="3.5" fill="#111" />
              <circle cx="114" cy="58" r="7" fill="#F59E0B" />
              <circle cx="114" cy="58" r="3.5" fill="#111" />
            </g>
            <polygon points="96,64 104,64 100,74" fill="#F59E0B" stroke="#451A03" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 'pelikan':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Pelikan rasmi">
          <g className="anim-breathe">
            <ellipse cx="86" cy="118" rx="42" ry="26" fill="#FAF8F5" stroke="#64748B" strokeWidth="2.5" />
            <ellipse cx="82" cy="114" rx="28" ry="14" className="anim-wing-l" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          </g>
          <g className="anim-head-graze">
            <path d="M114 114 Q124 84 116 54" fill="none" stroke="#FAF8F5" strokeWidth="18" strokeLinecap="round" />
            <circle cx="118" cy="50" r="16" fill="#FAF8F5" stroke="#64748B" strokeWidth="2.5" />
            {/* Giant Pelican Pouch Beak */}
            <path d="M130 46 L186 52 L130 56 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
            <path d="M130 54 Q158 84 184 54 Z" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="122" cy="46" r="3" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'pingvin':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Pingvin rasmi">
          <ellipse cx="84" cy="156" rx="14" ry="6" fill="#F97316" />
          <ellipse cx="116" cy="156" rx="14" ry="6" fill="#F97316" />
          <g className="anim-breathe">
            <ellipse cx="100" cy="112" rx="34" ry="44" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
            <ellipse cx="100" cy="116" rx="22" ry="34" fill="#FFFFFF" />
            {/* Flippers */}
            <ellipse cx="64" cy="112" rx="10" ry="26" transform="rotate(18 64 112)" className="anim-wing-l" fill="#1E293B" />
            <ellipse cx="136" cy="112" rx="10" ry="26" transform="rotate(-18 136 112)" className="anim-wing-r" fill="#1E293B" />
          </g>
          <g className="anim-head-alert">
            <circle cx="100" cy="60" r="24" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
            <path d="M84 62 Q100 72 116 62 Q112 78 100 80 Q88 78 84 62 Z" fill="#FDE047" />
            <g className="anim-blink">
              <circle cx="90" cy="56" r="3.5" fill="#FFF" />
              <circle cx="90" cy="56" r="1.8" fill="#111" />
              <circle cx="110" cy="56" r="3.5" fill="#FFF" />
              <circle cx="110" cy="56" r="1.8" fill="#111" />
            </g>
            <polygon points="96,62 104,62 100,72" fill="#F97316" />
          </g>
        </svg>
      );

    case 'qirgiy':
      return (
        <svg viewBox="0 0 200 180" className={className} aria-label="Qirg'iy rasmi">
          <g className="anim-wing-l">
            <path d="M98 86 Q40 34 20 68 Q48 96 86 100 Z" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          </g>
          <g className="anim-wing-r">
            <path d="M102 86 Q160 34 180 68 Q152 96 114 100 Z" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          </g>
          <path d="M88 124 L82 158 L118 158 L112 124 Z" fill="#475569" stroke="#1E293B" strokeWidth="2" />
          <g className="anim-breathe">
            <ellipse cx="100" cy="102" rx="20" ry="32" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.5" />
            <line x1="86" y1="94" x2="114" y2="94" stroke="#64748B" strokeWidth="2" />
            <line x1="86" y1="104" x2="114" y2="104" stroke="#64748B" strokeWidth="2" />
            <line x1="88" y1="114" x2="112" y2="114" stroke="#64748B" strokeWidth="2" />
          </g>
          <g className="anim-head-alert">
            <circle cx="100" cy="58" r="18" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M114 54 Q130 56 126 68 L114 62 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
            <g className="anim-blink">
              <circle cx="106" cy="55" r="4" fill="#EF4444" stroke="#1E293B" strokeWidth="1" />
              <circle cx="107" cy="55" r="1.8" fill="#111" />
            </g>
          </g>
        </svg>
      );

    case 'qilichbaliq':
      return (
        <svg viewBox="0 0 240 150" className={className} aria-label="Qilichbaliq rasmi">
          <g className="anim-swim-tail">
            <path d="M44 78 L12 42 L26 78 L12 114 L44 88 Z" fill="#1E3A8A" stroke="#0F172A" strokeWidth="2" />
          </g>
          {/* Tall Sail Dorsal Fin */}
          <path d="M96 60 Q106 16 126 22 Q118 46 120 62 Z" fill="#1D4ED8" stroke="#0F172A" strokeWidth="2.5" />
          <g className="anim-breathe">
            <path d="M40 82 Q96 50 164 66 Q178 76 164 94 Q96 108 40 82 Z" fill="#2563EB" stroke="#0F172A" strokeWidth="2.5" />
            <path d="M52 86 Q108 104 162 92 Q122 90 52 86 Z" fill="#E0F2FE" />
          </g>
          {/* Long Sword Bill */}
          <path d="M168 74 L232 77 L166 84 Z" fill="#1E293B" />
          <g className="anim-blink">
            <circle cx="154" cy="74" r="4.5" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="154" cy="74" r="2" fill="#111" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
