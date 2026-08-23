/**
 * Scenes 1-3. A takeaway storefront at dusk, built so the camera can push
 * straight through the middle bay into the packing counter.
 *
 * Paint order matters here: the shopfront is split into a back half (shell,
 * awning, sign, side bays) and a front half (middle-bay glass, frames, plinth)
 * with the interior sandwiched between them. Painting the interior before the
 * shell would just bury it under an opaque wall.
 *
 * The interior is clipped to the shop window (`ds-rs-clip`). The push grows
 * that clip rect out to the full world while both facade halves fade, so one
 * continuous move carries us from the street to the counter.
 */

const tiles = Array.from({ length: 9 }, (_, i) => 470 + i * 62);
const shelfStack = [0, 1, 2, 3];

export function RestaurantScene() {
  return (
    <g id="ds-sc-restaurant">
      {/* --- distant city ------------------------------------------------ */}
      <g id="ds-rs-far" filter="url(#ds-depth)">
        {[
          [-60, 470, 210, 300],
          [170, 402, 128, 368],
          [286, 512, 168, 258],
          [1180, 436, 150, 334],
          [1318, 494, 190, 276],
          [1490, 388, 164, 382],
        ].map(([x, y, w, h]) => (
          <rect fill="#032113" height={h} key={`${x}-${y}`} opacity="0.9" width={w} x={x} y={y} />
        ))}
      </g>

      {/* --- storefront, back half --------------------------------------- */}
      <g className="ds-rs-facade" id="ds-rs-facade-back">
        <rect fill="url(#ds-facade)" height="640" width="1300" x="150" y="130" />
        <rect fill="#0e5c37" height="26" width="1340" x="130" y="128" />

        <g id="ds-rs-sign">
          <rect fill="#021c11" height="92" rx="4" stroke="#fcb813" strokeWidth="3" width="392" x="604" y="188" />
          <rect fill="#fcb813" height="10" opacity="0.9" width="120" x="640" y="228" />
          <rect fill="#fffdf7" height="10" opacity="0.5" width="182" x="776" y="228" />
          <rect fill="#fcb813" height="6" opacity="0.55" width="256" x="640" y="252" />
          <ellipse cx="800" cy="234" fill="#fcb813" filter="url(#ds-bloom)" opacity="0.3" rx="230" ry="70" />
        </g>

        <path d="M 176 336 L 1424 336 L 1454 402 L 146 402 Z" fill="#0a3d26" />
        {Array.from({ length: 13 }, (_, i) => 176 + i * 96).map((x, i) => (
          <path
            d={`M ${x} 336 L ${x + 96} 336 L ${x + 98 + 24} 402 L ${x + 24} 402 Z`}
            fill={i % 2 ? "#fcb813" : "#fffdf7"}
            key={x}
            opacity={i % 2 ? 0.55 : 0.1}
          />
        ))}
        <rect fill="#032516" height="10" width="1320" x="140" y="396" />

        {/* Side bays: warm glass, no interior geometry needed at this scale. */}
        <rect fill="url(#ds-glass)" height="352" width="308" x="212" y="416" />
        <rect fill="url(#ds-glass)" height="352" width="308" x="1080" y="416" />
        <ellipse cx="366" cy="560" fill="#ffce62" filter="url(#ds-bloom)" opacity="0.22" rx="120" ry="90" />
        <ellipse cx="1234" cy="560" fill="#ffce62" filter="url(#ds-bloom)" opacity="0.18" rx="120" ry="90" />
        <rect fill="#031f13" height="80" opacity="0.55" width="70" x="300" y="606" />
        <rect fill="#031f13" height="96" opacity="0.5" width="58" x="1188" y="590" />
      </g>

      {/* --- interior, seen through the window --------------------------- */}
      <clipPath id="ds-rs-clip">
        <rect height="352" id="ds-rs-clip-r" width="486" x="557" y="416" />
      </clipPath>

      <g clipPath="url(#ds-rs-clip)" id="ds-rs-interior">
        <rect fill="#0e3a24" height="900" width="1600" x="0" y="0" />
        {/* Tiled back wall. */}
        <rect fill="#164e31" height="420" width="1600" x="0" y="360" />
        {tiles.map((x) => (
          <line key={x} stroke="#1c5a39" strokeWidth="2" x1={x} x2={x} y1="360" y2="780" />
        ))}
        <line stroke="#1c5a39" strokeWidth="2" x1="0" x2="1600" y1="520" y2="520" />
        <line stroke="#1c5a39" strokeWidth="2" x1="0" x2="1600" y1="640" y2="640" />

        {/* Extraction hood with its service light. */}
        <path d="M 566 356 L 1034 356 L 998 452 L 602 452 Z" fill="#0a2b1b" />
        <rect fill="#1a5637" height="12" width="468" x="566" y="344" />
        <rect fill="#ffce62" height="5" opacity="0.5" rx="2" width="300" x="650" y="446" />
        {/* Wall units with a warm strip beneath, so the bay is never a flat panel. */}
        <rect fill="#0a2b1b" height="54" width="1600" x="0" y="470" />
        <rect fill="#ffce62" height="5" opacity="0.6" width="1600" x="0" y="524" />
        <ellipse cx="800" cy="576" fill="url(#ds-lamp)" opacity="1" rx="360" ry="260" />
        <ellipse cx="800" cy="618" fill="#ffce62" filter="url(#ds-bloom)" opacity="0.3" rx="280" ry="165" />

        {/* Shelf of empty stock — the same product, waiting to be filled. */}
        <rect fill="#1a5637" height="9" width="196" x="586" y="566" />
        {shelfStack.map((i) => (
          <g key={i} opacity={0.26 + i * 0.05}>
            <path
              d={`M 600 ${560 - i * 15} L 640 ${548 - i * 15} L 680 ${560 - i * 15} L 640 ${572 - i * 15} Z`}
              fill="#cfe0d5"
              opacity="0.5"
            />
            <path
              d={`M 700 ${560 - i * 15} L 740 ${548 - i * 15} L 780 ${560 - i * 15} L 740 ${572 - i * 15} Z`}
              fill="#cfe0d5"
              opacity="0.4"
            />
          </g>
        ))}

        {/* Prep run behind the pass. */}
        <rect fill="#1a5637" height="120" width="1600" x="0" y="646" />
        <rect fill="#2c6f49" height="10" width="1600" x="0" y="646" />

        {/* Supplied chef artwork, grounded into the kitchen lighting. */}
        <g id="ds-rs-chef">
          <ellipse cx="990" cy="675" fill="#000000" opacity="0.26" rx="126" ry="18" />
          <image
            className="ds-story-asset ds-rs-chef-img"
            height="430"
            href="/chef.svg"
            preserveAspectRatio="xMidYMid meet"
            width="430"
            x="760"
            y="318"
          />
          <path d="M 858 530 C 812 552 788 584 780 620" fill="none" id="ds-rs-chef-arm" opacity="0" stroke="#03190f" strokeLinecap="round" strokeWidth="22" />
          <ellipse cx="926" cy="472" fill="#ffce62" filter="url(#ds-bloom)" opacity="0.12" rx="170" ry="140" />
        </g>

        {/* --- the pass counter the container is packed on --------------- */}
        <g id="ds-rs-counter">
          <path d="M 470 664 L 1130 664 L 1180 706 L 420 706 Z" fill="url(#ds-counter)" />
          <path d="M 420 706 L 1180 706 L 1180 774 L 420 774 Z" fill="#0a3420" />
          <path d="M 420 706 L 1180 706 L 1180 716 L 420 716 Z" fill="#ffffff" opacity="0.14" />
        </g>

      </g>

      {/* --- storefront, front half -------------------------------------- */}
      <g className="ds-rs-facade" id="ds-rs-facade-front">
        <rect fill="url(#ds-glass)" height="352" id="ds-rs-glass" opacity="0.16" width="486" x="557" y="416" />
        <g fill="none" stroke="#0e5c37" strokeWidth="9">
          <rect height="352" width="308" x="212" y="416" />
          <rect height="352" width="486" x="557" y="416" />
          <rect height="352" width="308" x="1080" y="416" />
        </g>
        <line stroke="#0e5c37" strokeWidth="6" x1="800" x2="800" y1="416" y2="768" />
        <rect fill="#0a3d26" height="18" width="1300" x="150" y="760" />
      </g>

      {/* --- street ------------------------------------------------------- */}
      <g id="ds-rs-fg">
        <rect fill="#082a1a" height="132" width="1600" x="0" y="768" />
        <rect fill="#0f4128" height="8" width="1600" x="0" y="768" />
        <rect fill="url(#ds-ground-ao)" height="52" width="1600" x="0" y="768" />
        <rect fill="#061e13" height="34" width="1600" x="0" y="866" />
        <rect fill="#0c3a24" height="86" width="132" x="46" y="742" />
        <rect fill="#1a5c38" height="9" width="132" x="46" y="742" />
        <path
          d="M 108 740 C 86 700 58 688 46 660 C 92 676 106 700 112 724 C 120 694 146 668 184 658 C 162 696 134 710 122 740 Z"
          fill="#1a5c38"
        />
        <rect fill="#0d3c25" height="58" rx="6" width="16" x="1470" y="778" />
        <rect fill="#0d3c25" height="58" rx="6" width="16" x="1536" y="778" />
        <ellipse cx="800" cy="884" fill="#000000" opacity="0.28" rx="620" ry="26" />
      </g>
    </g>
  );
}
