/**
 * Scene 9. The doorway. Its own full-frame composition rather than a zoom of
 * the block, so the handoff can be staged cleanly: the door swings, warm light
 * spills into the corridor, and the container crosses between two figures.
 *
 * The set is pushed right of centre — the caption column owns the left third
 * of the frame at this point in the timeline. Both figures are keyed a full
 * step lighter than the wall behind them, otherwise they vanish into it.
 */
export function CustomerScene() {
  return (
    <g id="ds-sc-door">
      {/* Corridor wall, with a light wash so the flat never reads as a void. */}
      <rect fill="#062a1a" height="900" width="1600" x="0" y="0" />
      <ellipse cx="1180" cy="420" fill="#0f5c38" filter="url(#ds-bloom)" opacity="0.5" rx="620" ry="440" />
      <rect fill="#0a3a24" height="10" width="1600" x="0" y="292" />

      {/* Corridor floor. */}
      <path d="M 0 742 L 1600 742 L 1600 900 L 0 900 Z" fill="#041b11" />
      <path d="M 0 742 L 1600 742 L 1600 754 L 0 754 Z" fill="#12563a" />

      {/* Light spilling out of the flat, cast across the corridor floor. */}
      <path d="M 660 300 L 1060 300 L 1264 900 L 486 900 Z" fill="#ffce62" id="ds-dr-spill" opacity="0" />

      {/* Door reveal. */}
      <rect fill="#020f09" height="600" width="400" x="660" y="150" />

      {/* Inside the flat, seen once the door is open. */}
      <g id="ds-dr-inside" opacity="0">
        <rect fill="#1a5637" height="600" width="398" x="661" y="150" />
        <ellipse cx="860" cy="420" fill="#ffdc95" filter="url(#ds-bloom)" opacity="0.5" rx="230" ry="270" />
        <rect fill="#0d4229" height="240" width="190" x="690" y="330" />
        <rect fill="#ffd77a" height="6" opacity="0.6" width="398" x="661" y="744" />
      </g>

      {/* Customer, waiting in the doorway. */}
      <g id="ds-dr-customer" opacity="0">
        <g fill="#03190f">
          <circle cx="944" cy="392" r="36" />
          <path d="M 900 448 C 900 428 920 436 944 436 C 968 436 988 428 988 448 L 1004 742 L 884 742 Z" />
          {/* Reaching arm — the line the container travels toward. */}
          <path
            d="M 906 498 C 872 522 852 556 848 588"
            fill="none"
            stroke="#03190f"
            strokeLinecap="round"
            strokeWidth="26"
          />
        </g>
        {/* Rim light off the doorway, which is what makes the figure read. */}
        <path
          d="M 908 366 C 902 384 904 410 918 428"
          fill="none"
          stroke="#ffd77a"
          strokeOpacity="0.5"
          strokeWidth="5"
        />
        <path d="M 898 452 L 884 742" fill="none" stroke="#ffd77a" strokeOpacity="0.34" strokeWidth="5" />
      </g>

      {/* Door frame, over the reveal. */}
      <g fill="#12563a">
        <rect height="626" width="24" x="636" y="140" />
        <rect height="626" width="24" x="1060" y="140" />
        <rect height="24" width="448" x="636" y="140" />
      </g>
      <rect fill="#1a6b45" height="626" width="5" x="1060" y="140" />

      {/* Door panel. Hinged on the left edge — scaling it toward the hinge
          reads as a swing. The leading edge keeps a bright lip so the motion
          stays legible against a dark reveal. */}
      <g id="ds-dr-panel">
        <rect fill="#17603c" height="600" width="400" x="660" y="150" />
        <rect fill="#0e4a2e" height="228" rx="4" width="290" x="715" y="210" />
        <rect fill="#0e4a2e" height="228" rx="4" width="290" x="715" y="468" />
        <rect fill="#2a8a5b" height="5" width="400" x="660" y="446" />
        <rect fill="#3fae72" height="600" width="9" x="1051" y="150" />
        <circle cx="1016" cy="470" fill="#fcb813" r="12" />
      </g>

      {/* Supplied handoff artwork, staged as the rider presenting the order. */}
      <g id="ds-dr-rider" opacity="0">
        <ellipse cx="1110" cy="744" fill="#000000" opacity="0.24" rx="280" ry="26" />
        <image
          className="ds-story-asset ds-dr-delivered-img"
          height="650"
          href="/delivered.png?v=handover"
          preserveAspectRatio="xMidYMid meet"
          width="650"
          x="712"
          y="206"
        />
        <path d="M 1288 512 C 1240 536 1200 562 1176 590" fill="none" id="ds-dr-rider-arm" opacity="0" stroke="#0d4a2e" strokeLinecap="round" strokeWidth="27" />
        <path d="M 1078 286 C 1130 306 1166 354 1188 420" fill="none" stroke="#ffd77a" strokeLinecap="round" strokeOpacity="0.26" strokeWidth="7" />
      </g>
    </g>
  );
}
