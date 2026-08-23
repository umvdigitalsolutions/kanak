/**
 * Callouts for the hero close-up. They live in the SVG rather than the DOM so
 * they stay locked to the container's geometry at any viewport size, and they
 * borrow the leader-line language already used by the material lab.
 *
 * Two arrangements, one per crop: the wide frame can hang labels off both
 * flanks, the portrait crop only has room above and below. CSS picks one — the
 * timeline drives both by class, and animating the hidden set costs nothing.
 *
 * Each leader is drawn with pathLength="1", so the timeline can pull the line
 * out of the dot by tweening strokeDashoffset from 1 to 0.
 */
type Callout = {
  anchor: "start" | "middle" | "end";
  dot: readonly [number, number];
  label: readonly [number, number];
  path: string;
  text: string;
};

const wide: Callout[] = [
  { anchor: "middle", dot: [764, 348], label: [764, 256], path: "M 764 348 L 764 280", text: "Secure lid" },
  { anchor: "start", dot: [958, 402], label: [1068, 356], path: "M 958 402 L 1036 364 L 1060 364", text: "Leak resistant" },
  { anchor: "start", dot: [898, 508], label: [1068, 568], path: "M 898 508 L 1036 576 L 1060 576", text: "Delivery ready" },
  { anchor: "middle", dot: [668, 474], label: [606, 706], path: "M 668 474 L 606 648 L 606 678", text: "Food safe" },
];

const tall: Callout[] = [
  { anchor: "middle", dot: [706, 340], label: [680, 278], path: "M 706 340 L 680 306", text: "Secure lid" },
  { anchor: "middle", dot: [944, 396], label: [906, 278], path: "M 944 396 L 906 306", text: "Leak resistant" },
  { anchor: "middle", dot: [668, 470], label: [670, 712], path: "M 668 470 L 670 676", text: "Food safe" },
  { anchor: "middle", dot: [900, 510], label: [918, 712], path: "M 900 510 L 918 676", text: "Delivery ready" },
];

function Set({ className, items }: { className: string; items: Callout[] }) {
  return (
    <g className={className}>
      {items.map((callout) => (
        <g className="ds-callout" key={callout.text}>
          <path
            className="ds-callout__line"
            d={callout.path}
            fill="none"
            pathLength="1"
            stroke="#fffdf7"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeOpacity="0.7"
            strokeWidth="1.6"
          />
          <circle className="ds-callout__dot" cx={callout.dot[0]} cy={callout.dot[1]} fill="#fcb813" r="5" />
          <text
            className="ds-callout__label"
            textAnchor={callout.anchor}
            x={callout.label[0]}
            y={callout.label[1]}
          >
            {callout.text}
          </text>
        </g>
      ))}
    </g>
  );
}

export function ProductCallouts() {
  return (
    <g id="ds-callouts">
      <Set className="ds-callout-set ds-callout-set--wide" items={wide} />
      <Set className="ds-callout-set ds-callout-set--tall" items={tall} />
    </g>
  );
}
