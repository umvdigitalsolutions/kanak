/**
 * Scene 8. Arrival. The kerb line sits at the same y as the city road so the
 * rig rolls from one scene into the other without changing height.
 *
 * The block is parked left of centre and the windows are drawn out explicitly
 * rather than tiled from a pattern: the rig comes to rest around x 540-1010,
 * and the entrance has to stay readable beside it, not behind it.
 */

const KERB = 720;
const FLOORS = [176, 282, 388, 494];
const BAYS = Array.from({ length: 6 }, (_, i) => 118 + i * 122);

export function ApartmentScene() {
  return (
    <g id="ds-sc-apartment">
      {/* First light behind the block. */}
      <ellipse cx="1260" cy="720" fill="#fcb813" filter="url(#ds-bloom)" opacity="0.13" rx="520" ry="300" />
      <ellipse cx="640" cy="660" fill="#0f5c38" opacity="0.34" rx="880" ry="230" />

      <g id="ds-ap-far" filter="url(#ds-depth)" opacity="0.26">
        {[
          [1120, 300, 190, 420],
          [1330, 236, 170, 484],
          [1500, 330, 190, 390],
        ].map(([x, y, w, h]) => (
          <g key={x}>
            <rect fill="#0a3d27" height={h} width={w} x={x} y={y} />
            <rect fill="url(#ds-win-tower)" height={h - 34} width={w - 24} x={x + 12} y={y + 20} />
          </g>
        ))}
      </g>

      <g id="ds-ap-tower">
        <rect fill="url(#ds-tower)" height={KERB - 140} width="820" x="60" y="140" />
        {/* Parapet and a plant room, for a silhouette that isn't a plain box. */}
        <rect fill="#12563a" height="18" width="856" x="42" y="132" />
        <rect fill="#0d4a2e" height="52" width="150" x="240" y="80" />
        <rect fill="#12563a" height="10" width="166" x="232" y="76" />

        {FLOORS.map((y, floor) => (
          <g key={y}>
            {BAYS.map((x, bay) => (
              <g key={x}>
                <rect fill="#03190f" height="60" width="90" x={x} y={y} />
                <rect
                  fill={(bay + floor) % 3 === 0 ? "#ffd77a" : "#cfe6d8"}
                  height="60"
                  opacity={(bay + floor) % 3 === 0 ? 0.44 : 0.14}
                  width="90"
                  x={x}
                  y={y}
                />
                <rect fill="#0a3a24" height="60" width="5" x={x + 43} y={y} />
              </g>
            ))}
            {/* Balcony: solid parapet, lit top edge. */}
            <rect fill="#0d4a2e" height="34" width="380" x="96" y={y + 60} />
            <rect fill="#0d4a2e" height="34" width="336" x="510" y={y + 60} />
            <rect fill="#1a6b45" height="9" width="820" x="60" y={y + 88} />
          </g>
        ))}

        {/* Entrance, clear of where the rig comes to rest. */}
        <rect fill="#12563a" height="18" width="392" x="140" y="576" />
        <rect fill="#0a3a24" height="144" width="16" x="152" y="594" />
        <rect fill="#0a3a24" height="144" width="16" x="500" y="594" />
        <rect fill="#ffce62" height="7" opacity="0.8" width="360" x="154" y="594" />

        <rect fill="#03190f" height="126" width="256" x="206" y="594" />
        <rect fill="url(#ds-glass)" height="126" width="256" x="206" y="594" />
        <ellipse cx="334" cy="660" fill="#ffce62" filter="url(#ds-bloom)" opacity="0.4" rx="150" ry="92" />
        <g fill="none" stroke="#12563a" strokeWidth="8">
          <rect height="126" width="256" x="206" y="594" />
        </g>
        <line stroke="#12563a" strokeWidth="7" x1="334" x2="334" y1="594" y2="720" />
        <path d="M 176 720 L 526 720 L 548 738 L 154 738 Z" fill="#1a6b45" />
      </g>

      <g id="ds-ap-fg">
        <rect fill="url(#ds-road)" height="180" width="1600" x="0" y={KERB} />
        <rect fill="#144a2e" height="11" width="1600" x="0" y={KERB} />
        <rect fill="#0b3b25" height="5" width="1600" x="0" y={KERB + 22} />
        <rect fill="url(#ds-road-sheen)" height="180" width="1600" x="0" y={KERB} />
        <rect fill="url(#ds-ground-ao)" height="44" width="1600" x="0" y={KERB} />
        <ellipse cx="800" cy="858" fill="#1d7a4d" filter="url(#ds-soft)" opacity="0.14" rx="760" ry="42" />
        {/* Kerbside planting, placed so the parallax leaves them clear of the rig. */}
        {[-40, 1400].map((x) => (
          <g key={x}>
            <rect fill="#0c3a24" height="74" rx="3" width="150" x={x} y={KERB - 40} />
            <rect fill="#1a5c38" height="9" width="150" x={x} y={KERB - 40} />
            <path
              d={`M ${x + 74} ${KERB - 44} C ${x + 50} ${KERB - 92} ${x + 20} ${KERB - 104} ${x + 10} ${KERB - 136} C ${x + 54} ${KERB - 120} ${x + 68} ${KERB - 90} ${x + 74} ${KERB - 66} C ${x + 82} ${KERB - 96} ${x + 108} ${KERB - 124} ${x + 146} ${KERB - 134} C ${x + 124} ${KERB - 96} ${x + 96} ${KERB - 82} ${x + 84} ${KERB - 44} Z`}
              fill="#1a5c38"
            />
          </g>
        ))}
      </g>
    </g>
  );
}
