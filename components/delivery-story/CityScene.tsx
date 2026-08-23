/**
 * Scene 7. The city the rider travels through.
 *
 * The scooter never leaves the middle of the frame — these bands slide past it
 * instead, each at its own rate, which is what sells the depth. Every band is
 * built long enough to cover its full travel, so nothing has to wrap and the
 * whole thing reverses cleanly when the user scrolls back up.
 */

/** Deterministic PRNG so the server and the client lay out the same city. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Block = { h: number; k: number; w: number; x: number };

function blocks(seed: number, span: number, minW: number, maxW: number, minH: number, maxH: number) {
  const next = rng(seed);
  const out: Block[] = [];
  let x = -260;

  while (x < span) {
    const w = minW + next() * (maxW - minW);
    const h = minH + next() * (maxH - minH);
    out.push({ h: Math.round(h), k: next(), w: Math.round(w), x: Math.round(x) });
    x += w + next() * 46;
  }

  return out;
}

const KERB = 720;

const skyline = blocks(7, 2900, 90, 220, 160, 340);
const farRow = blocks(21, 3900, 80, 180, 200, 390);
const nearRow = blocks(99, 5500, 170, 300, 150, 320);
const lamps = Array.from({ length: 22 }, (_, i) => -220 + i * 330);
const trees = Array.from({ length: 15 }, (_, i) => -120 + i * 470);
const lanes = Array.from({ length: 46 }, (_, i) => -320 + i * 230);
const posts = Array.from({ length: 11 }, (_, i) => -320 + i * 900);

export function CityScene() {
  return (
    <g id="ds-sc-city">
      {/* Horizon haze, so the far band never reads as a hard cut-out. */}
      <ellipse cx="800" cy="640" fill="#0f5c4e" opacity="0.38" rx="1150" ry="230" />

      <g id="ds-ct-sky" filter="url(#ds-depth)" opacity="0.55">
        {skyline.map((b) => (
          <rect fill="#06251f" height={b.h} key={b.x} width={b.w} x={b.x} y={KERB - b.h} />
        ))}
      </g>

      <g id="ds-ct-far" opacity="0.86">
        {farRow.map((b) => (
          <g key={b.x}>
            <rect fill="url(#ds-bldg-far)" height={b.h} width={b.w} x={b.x} y={KERB - b.h} />
            <rect
              fill="url(#ds-win-far)"
              height={b.h - 24}
              opacity={0.5 + b.k * 0.5}
              width={b.w - 18}
              x={b.x + 9}
              y={KERB - b.h + 16}
            />
            <rect fill="#0a4028" height="8" width={b.w + 12} x={b.x - 6} y={KERB - b.h} />
            {b.k > 0.72 ? (
              <rect fill="#0a4028" height="46" width="12" x={b.x + b.w * 0.5} y={KERB - b.h - 46} />
            ) : null}
          </g>
        ))}
      </g>

      {/* Distance haze sits between the bands it separates. */}
      <rect fill="url(#ds-haze)" height="300" width="1600" x="0" y={KERB - 300} />

      <g id="ds-ct-near">
        {nearRow.map((b) => (
          <g key={b.x}>
            <rect fill="url(#ds-bldg-near)" height={b.h} width={b.w} x={b.x} y={KERB - b.h} />
            <rect
              fill="url(#ds-win-near)"
              height={b.h - 96}
              opacity={0.45 + b.k * 0.55}
              width={b.w - 28}
              x={b.x + 14}
              y={KERB - b.h + 20}
            />
            <rect fill="#12563a" height="9" width={b.w + 14} x={b.x - 7} y={KERB - b.h} />
            {/* Street level. Only some units are lit shops, so the kerb line
                stops reading as one long strip. */}
            <rect fill="#031d12" height="72" width={b.w} x={b.x} y={KERB - 72} />
            {b.k > 0.34 ? (
              <>
                <rect
                  fill="#ffce62"
                  height="44"
                  opacity={0.16 + b.k * 0.3}
                  width={b.w - 56}
                  x={b.x + 28}
                  y={KERB - 62}
                />
                <rect
                  fill={b.k > 0.68 ? "#fcb813" : "#1d7a4d"}
                  height="10"
                  opacity="0.85"
                  width={b.w - 40}
                  x={b.x + 20}
                  y={KERB - 78}
                />
                <rect
                  fill="url(#ds-reflect)"
                  height="120"
                  opacity={0.5 + b.k * 0.5}
                  width={b.w - 56}
                  x={b.x + 28}
                  y={KERB + 12}
                />
              </>
            ) : (
              <rect fill="#0a3a24" height="34" width={b.w - 70} x={b.x + 35} y={KERB - 58} />
            )}
          </g>
        ))}
      </g>

      <g id="ds-ct-street">
        {trees.map((x) => (
          <g key={`t${x}`}>
            <rect fill="#062718" height="104" width="13" x={x} y={KERB - 104} />
            {/* Layered canopy rather than one disc — reads as foliage at speed. */}
            <path
              d={`M ${x + 6} ${KERB - 226} C ${x + 74} ${KERB - 214} ${x + 66} ${KERB - 150} ${x + 6} ${KERB - 140} C ${x - 54} ${KERB - 150} ${x - 62} ${KERB - 214} ${x + 6} ${KERB - 226} Z`}
              fill="#0b3a24"
            />
            <path
              d={`M ${x + 6} ${KERB - 176} C ${x + 62} ${KERB - 168} ${x + 56} ${KERB - 112} ${x + 6} ${KERB - 104} C ${x - 44} ${KERB - 112} ${x - 50} ${KERB - 168} ${x + 6} ${KERB - 176} Z`}
              fill="#0f4a2e"
            />
          </g>
        ))}
        {lamps.map((x) => (
          <g key={`l${x}`}>
            <rect fill="#0d4a2e" height="268" width="10" x={x} y={KERB - 268} />
            <path
              d={`M ${x} ${KERB - 268} C ${x + 40} ${KERB - 288} ${x + 62} ${KERB - 284} ${x + 66} ${KERB - 268} L ${x + 66} ${KERB - 254} C ${x + 58} ${KERB - 268} ${x + 36} ${KERB - 272} ${x} ${KERB - 254} Z`}
              fill="#0d4a2e"
            />
            <ellipse cx={x + 62} cy={KERB - 258} fill="#ffe0a0" rx="15" ry="8" />
            <path
              d={`M ${x + 62} ${KERB - 258} L ${x + 186} ${KERB + 30} L ${x - 62} ${KERB + 30} Z`}
              fill="url(#ds-lamp)"
              opacity="0.45"
            />
            {/* Pool of light on the tarmac, and its vertical reflection. */}
            <ellipse cx={x + 62} cy={KERB + 96} fill="#ffce62" opacity="0.09" rx="150" ry="34" />
            <rect fill="url(#ds-reflect)" height="150" opacity="0.55" width="26" x={x + 49} y={KERB + 4} />
          </g>
        ))}
      </g>

      {/* --- road --------------------------------------------------------- */}
      <g id="ds-ct-roadbed">
        <rect fill="url(#ds-road)" height="180" width="1600" x="0" y={KERB} />
        <rect fill="#144a2e" height="11" width="1600" x="0" y={KERB} />
        <rect fill="#0b3b25" height="5" width="1600" x="0" y={KERB + 22} />
        <rect fill="url(#ds-road-sheen)" height="180" width="1600" x="0" y={KERB} />
        <rect fill="url(#ds-ground-ao)" height="44" width="1600" x="0" y={KERB} />
        <ellipse cx="800" cy="858" fill="#1d7a4d" filter="url(#ds-soft)" opacity="0.12" rx="760" ry="42" />
      </g>

      <g id="ds-ct-lanes">
        {lanes.map((x) => (
          <rect fill="#dceee3" height="8" key={x} opacity="0.52" width="112" x={x} y="860" />
        ))}
      </g>

      {/* Foreground furniture, running fastest of all. Kept thin and low so it
          streaks past the wheels instead of walling off the road. */}
      <g id="ds-ct-fg" opacity="0.75">
        {posts.map((x) => (
          <g key={x}>
            <rect fill="#020e08" height="110" width="13" x={x} y="856" />
            <rect fill="#020e08" height="110" width="13" x={x + 300} y="856" />
            <rect fill="#020e08" height="7" width="313" x={x} y="864" />
          </g>
        ))}
      </g>
    </g>
  );
}
