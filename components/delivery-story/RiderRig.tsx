/**
 * Scenes 4-8. Delivery rider, scooter and insulated bag.
 *
 * The rider artwork comes from /scooter 2.svg. The timeline still drives the
 * same rig IDs as before, while visible spoke overlays make the asset wheels
 * read as rotating.
 */

const REAR = { x: 642, y: 776 };
const FRONT = { x: 1006, y: 777 };
const WHEEL_R = 62;
const SPOKE_COUNT = 10;

function MotionWheel({ id, x, y }: { id: string; x: number; y: number }) {
  const spokes = Array.from({ length: SPOKE_COUNT }, (_, index) => {
    const angle = (Math.PI * 2 * index) / SPOKE_COUNT;
    const inner = 13;
    const outer = WHEEL_R - 9;

    return {
      id: `${id}-spoke-${index}`,
      x1: x + Math.cos(angle) * inner,
      x2: x + Math.cos(angle) * outer,
      y1: y + Math.sin(angle) * inner,
      y2: y + Math.sin(angle) * outer,
    };
  });

  return (
    <g className="ds-rig-wheel" id={id}>
      <circle className="ds-rig-wheel__blur" cx={x} cy={y} fill="none" r={WHEEL_R + 3} />
      <g className="ds-rig-wheel__spinner">
        <circle className="ds-rig-wheel__rim" cx={x} cy={y} fill="none" r={WHEEL_R} />
        <circle className="ds-rig-wheel__dash" cx={x} cy={y} fill="none" r={WHEEL_R - 15} />
        <line className="ds-rig-wheel__flash" x1={x + 12} x2={x + WHEEL_R - 8} y1={y - 2} y2={y - 2} />
        {spokes.map((spoke) => (
          <line key={spoke.id} className="ds-rig-wheel__spoke" x1={spoke.x1} x2={spoke.x2} y1={spoke.y1} y2={spoke.y2} />
        ))}
        <circle className="ds-rig-wheel__hub" cx={x} cy={y} r="8" />
      </g>
    </g>
  );
}

export function RiderRig() {
  return (
    <g id="ds-rig-cam">
      <defs>
        <mask className="ds-rig-scooter-alpha" height="540" id="ds-rig-scooter-alpha" maskUnits="userSpaceOnUse" width="540" x="540" y="330">
          <image height="540" href="/scooter%202.svg" preserveAspectRatio="xMidYMid meet" width="540" x="540" y="330" />
        </mask>
      </defs>

      <g id="ds-rig-place">
        <ellipse cx="812" cy="850" fill="#000000" id="ds-rig-shadow" opacity="0.34" rx="248" ry="18" />

        <g className="ds-rig-speed-lines" id="ds-rig-speed-lines" opacity="0">
          <path d="M 304 548 H 510" />
          <path d="M 246 614 H 520" />
          <path d="M 300 710 H 514" />
          <path d="M 338 812 H 546" />
        </g>

        <path
          d="M 1004 564 L 1420 492 L 1480 644 L 1040 636 Z"
          fill="url(#ds-headlight)"
          id="ds-rig-beam"
          opacity="0.42"
        />

        <g id="ds-rig-susp">
          <g className="ds-rig-ride-bob">
            <image
              className="ds-rig-scooter-img"
              height="540"
              href="/scooter%202.svg"
              id="ds-rig-scooter-img"
              preserveAspectRatio="xMidYMid meet"
              width="540"
              x="540"
              y="330"
            />
            <rect className="ds-rig-scooter-tint" height="540" mask="url(#ds-rig-scooter-alpha)" width="540" x="540" y="330" />
            <path
              className="ds-rig-rim-light"
              d="M 548 672 C 640 624 750 628 850 686 C 902 716 956 722 1046 708"
              fill="none"
            />
            <path className="ds-rig-road-reflection" d="M 510 814 C 674 854 872 862 1044 824 L 1054 872 C 858 920 650 904 492 852 Z" />

            <MotionWheel id="ds-rig-wheel-r" x={REAR.x} y={REAR.y} />
            <MotionWheel id="ds-rig-wheel-f" x={FRONT.x} y={FRONT.y} />

            <g id="ds-rig-bag-back">
              <path d="M 566 468 L 710 468 L 710 624 L 566 624 Z" fill="#2a0709" opacity="0.5" />
              <path d="M 574 478 L 702 478 L 702 616 L 574 616 Z" fill="#7c1218" opacity="0.58" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

/**
 * The bag's front wall. Drawn after the hero container, so dropping its opacity
 * exposes what is inside instead of hiding it.
 */
export function RiderBagFront() {
  return (
    <g id="ds-rig-front-cam">
      <g id="ds-rig-front-place">
        <g id="ds-rig-front-susp">
          <g className="ds-rig-ride-bob">
            <g id="ds-rig-bag-front">
              <path d="M 566 468 L 710 468 L 710 624 L 566 624 Z" fill="#101926" opacity="0.36" />
              <path d="M 574 478 L 702 478 L 702 616 L 574 616 Z" fill="#f72c2f" />
              <path d="M 574 478 L 702 478 L 702 512 L 574 512 Z" fill="#171f31" />
              <path d="M 574 512 L 702 512" stroke="#050b15" strokeWidth="4" />
              <rect fill="#fcb813" height="8" rx="4" width="128" x="574" y="528" />
              <circle cx="638" cy="568" fill="#fffdf7" r="31" />
              <path
                d="M 638 542 C 623 542 611 554 611 568 C 611 588 638 606 638 606 C 638 606 665 588 665 568 C 665 554 653 542 638 542 Z"
                fill="#fffdf7"
              />
              <circle cx="638" cy="568" fill="#f72c2f" r="10" />
              <path d="M 566 468 L 710 468" stroke="#ff6a61" strokeWidth="5" />
              <path d="M 700 480 L 724 552 L 710 624" fill="none" stroke="#101926" strokeWidth="8" />
            </g>
            <g id="ds-rig-cutaway" opacity="0">
              <rect
                fill="none"
                height="144"
                rx="5"
                stroke="#fcb813"
                strokeDasharray="11 9"
                strokeWidth="3"
                width="128"
                x="574"
                y="476"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}
