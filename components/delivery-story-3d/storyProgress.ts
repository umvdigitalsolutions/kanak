export type StoryBeat = {
  align: "left" | "right" | "center";
  body: string;
  kicker: string;
  start: number;
  title: string;
  cta?: boolean;
};

export const storyBeats: StoryBeat[] = [
  {
    align: "left",
    body: "Kanak Mouldings manufactures food-grade deli boxes and takeaway containers for restaurants, cloud kitchens and caterers.",
    kicker: "Deli box manufacturing",
    start: 0,
    title: "MADE FOR TAKEAWAY PACKAGING.",
  },
  {
    align: "left",
    body: "Controlled wall thickness, rim geometry and material selection help containers hold shape from filling to dispatch.",
    kicker: "Material and structure",
    start: 0.38,
    title: "RIGID ENOUGH FOR HOT FOOD.",
  },
  {
    align: "left",
    body: "Matched bases and lids are designed for clean sealing, stacking and confident handling at the delivery counter.",
    kicker: "Lid fit and stacking",
    start: 0.82,
    title: "PACKED FOR SAFE HANDOVER.",
  },
  {
    align: "center",
    body: "Leak-resistant lids and food-safe materials help protect meals from spills, contamination and unwanted contact.",
    cta: true,
    kicker: "Food-safe protection",
    start: 0.93,
    title: "NO LEAKAGE. SAFE FOR FOOD.",
  },
];

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function range(progress: number, start: number, end: number) {
  if (start === end) return progress >= end ? 1 : 0;
  return clamp01((progress - start) / (end - start));
}

export function smoothRange(progress: number, start: number, end: number) {
  const t = range(progress, start, end);
  return t * t * (3 - 2 * t);
}

export function pulse(progress: number, start: number, peak: number, end: number) {
  if (progress < start || progress > end) return 0;
  if (progress <= peak) return smoothRange(progress, start, peak);
  return 1 - smoothRange(progress, peak, end);
}

export function beatIndexForProgress(progress: number) {
  let active = 0;
  for (let index = 0; index < storyBeats.length; index += 1) {
    if (progress >= storyBeats[index].start) active = index;
  }
  return active;
}
