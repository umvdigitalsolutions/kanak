# Manufacturing flow stills

Six stills, one per stage of the `FROM MATERIAL TO PACK` section
(`components/home/DeliveryJourney.tsx`).

Until a file exists, that stage renders a numbered plate instead. To swap one in:

1. Generate the image and save it to `public/images/generated/flow/<filename>`.
2. In `components/home/DeliveryJourney.tsx`, set that stage's `image` field to
   `"/images/generated/flow/<filename>"` (it is `null` while the plate shows).

Nothing else changes — the frame, the scroll timing and the transitions already
handle both cases.

> Do not put notes or `README.md` files inside `public/` — `scripts/audit-public.mjs`
> runs before every build and fails on them.

## Specification

- **Aspect ratio** 3:2 (the frame is `aspect-ratio: 3 / 2`, images are `object-fit: cover`)
- **Resolution** 1536×1024 or larger
- **Format** JPG, WebP or PNG; keep each file under ~600 KB if possible — all six load
  when the section scrolls into view
- **Look** consistent across all six, or the cross-fades will flicker in tone:
  dark charcoal factory environment, single warm key light, shallow depth of
  field, muted palette with one ember-orange accent (`#e36f2d`), no text or
  logos anywhere in the frame, no people's faces

## Prompts

### 01 — `01-material.jpg`
> Close-up of stacked rolls of food-grade polymer sheet stock in a dark
> industrial plant, warm key light raking across the material edges, shallow
> depth of field, charcoal background, muted colour with a single warm orange
> highlight, cinematic product photography, no text.

### 02 — `02-forming.jpg`
> A thermoforming press closing on a heated polymer sheet inside a dark factory,
> glowing tooling, steam and warm rim light, shallow depth of field, charcoal
> background, cinematic industrial photography, no text.

### 03 — `03-trimming.jpg`
> Macro shot of formed plastic food containers being trimmed at the rim on a
> production line, crisp cut edge in focus, dark charcoal machinery behind,
> warm key light, shallow depth of field, cinematic industrial photography,
> no text.

### 04 — `04-lid-fit.jpg`
> Close-up of a clear lid being pressed onto a rectangular food container base,
> rim seal in sharp focus, dark charcoal background, warm key light catching the
> flange, shallow depth of field, cinematic product photography, no text.

### 05 — `05-quality.jpg`
> Gloved hands holding a moulded food container up to an inspection light in a
> dark quality-control bay, rim and wall finish in sharp focus, warm key light,
> shallow depth of field, cinematic industrial photography, no faces, no text.

### 06 — `06-packing.jpg`
> Tall nested stacks of food containers being sleeved and packed into cartons in
> a dark warehouse, warm key light down one side, shallow depth of field,
> charcoal background, cinematic industrial photography, no text.

All six stage images now live in `public/images/generated/flow/` and are wired
into `components/home/DeliveryJourney.tsx`.
