/**
 * Every gradient, filter and clip the delivery story draws with.
 *
 * The whole story lives in one SVG on a 1600x900 world grid, so all paint
 * servers are declared once here and referenced by id from the scene groups.
 * Ids are prefixed `ds-` because this markup shares the document with the rest
 * of the page.
 */
export function StoryDefs() {
  return (
    <defs>
      {/* ---- Hero container --------------------------------------------
           Food-grade PP is a hard, slightly waxy material: a broad diffuse
           falloff, one tight specular, and reflected light bouncing back up
           into the shaded side. Each facet gets its own ramp rather than a
           flat fill, which is what stops it reading as a vector drawing. */}
      <linearGradient id="ds-rim" x1="0.1" x2="0.85" y1="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.34" stopColor="#f6faf8" />
        <stop offset="0.68" stopColor="#dbe7e0" />
        <stop offset="1" stopColor="#b6c9bd" />
      </linearGradient>

      {/* Front-left facet catches the key light. */}
      <linearGradient id="ds-wall-left" x1="0.15" x2="0.7" y1="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.22" stopColor="#f7fbf9" />
        <stop offset="0.62" stopColor="#e2ece6" />
        <stop offset="0.88" stopColor="#c6d6cc" />
        <stop offset="1" stopColor="#d3e0d7" />
      </linearGradient>

      {/* Front-right facet is in shade, but bounces light back near the base. */}
      <linearGradient id="ds-wall-right" x1="0.1" x2="0.9" y1="0" y2="1">
        <stop offset="0" stopColor="#d6e2da" />
        <stop offset="0.35" stopColor="#b9ccc0" />
        <stop offset="0.76" stopColor="#93ab9d" />
        <stop offset="0.93" stopColor="#829d8e" />
        <stop offset="1" stopColor="#9db4a6" />
      </linearGradient>

      {/* Ambient occlusion inside the tub — darkest where wall meets floor. */}
      <radialGradient id="ds-cavity" cx="0.46" cy="0.3" r="0.72">
        <stop offset="0" stopColor="#5b7365" />
        <stop offset="0.5" stopColor="#3b5145" />
        <stop offset="0.84" stopColor="#22332b" />
        <stop offset="1" stopColor="#141f19" />
      </radialGradient>

      {/* Contact shadow is two passes: a broad soft pool and a tight core. */}
      <radialGradient id="ds-shadow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#000000" stopOpacity="0.34" />
        <stop offset="0.55" stopColor="#000000" stopOpacity="0.15" />
        <stop offset="1" stopColor="#000000" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="ds-shadow-core" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#000000" stopOpacity="0.6" />
        <stop offset="0.62" stopColor="#000000" stopOpacity="0.26" />
        <stop offset="1" stopColor="#000000" stopOpacity="0" />
      </radialGradient>

      {/* ---- Food ------------------------------------------------------- */}
      <radialGradient id="ds-food" cx="0.4" cy="0.26" r="0.82">
        <stop offset="0" stopColor="#ffe6b4" />
        <stop offset="0.32" stopColor="#fbc76e" />
        <stop offset="0.66" stopColor="#ec9c40" />
        <stop offset="0.88" stopColor="#cf7526" />
        <stop offset="1" stopColor="#9d5116" />
      </radialGradient>

      <radialGradient id="ds-sauce" cx="0.44" cy="0.34" r="0.7">
        <stop offset="0" stopColor="#e8792a" />
        <stop offset="0.6" stopColor="#c85c1c" />
        <stop offset="1" stopColor="#8f3d12" />
      </radialGradient>

      <linearGradient id="ds-food-ao" x1="0" x2="0.4" y1="0" y2="1">
        <stop offset="0" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#3d1c06" stopOpacity="0.45" />
      </linearGradient>

      {/* ---- Clear lid ---------------------------------------------------
           Transparent plastic reads through three cues: what you see through
           it is dimmed and cooled, the edges brighten (Fresnel), and there is
           one hard specular that does not follow the surface colour. */}
      <linearGradient id="ds-lid-top" x1="0.08" x2="0.88" y1="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.58" />
        <stop offset="0.18" stopColor="#e8f4ee" stopOpacity="0.2" />
        <stop offset="0.46" stopColor="#ffffff" stopOpacity="0.07" />
        <stop offset="0.74" stopColor="#cfe4d8" stopOpacity="0.19" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.52" />
      </linearGradient>

      <linearGradient id="ds-lid-left" x1="0" x2="0.72" y1="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="0.55" stopColor="#eaf5ef" stopOpacity="0.26" />
        <stop offset="1" stopColor="#b9d0c3" stopOpacity="0.34" />
      </linearGradient>

      <linearGradient id="ds-lid-right" x1="0.1" x2="0.6" y1="0" y2="1">
        <stop offset="0" stopColor="#cadcd2" stopOpacity="0.42" />
        <stop offset="0.6" stopColor="#9db6a7" stopOpacity="0.4" />
        <stop offset="1" stopColor="#d8e8de" stopOpacity="0.5" />
      </linearGradient>

      {/* Sits over the food: the dimming and cooling of looking through PP. */}
      <linearGradient id="ds-lid-veil" x1="0.1" x2="0.9" y1="0" y2="1">
        <stop offset="0" stopColor="#dff0e8" stopOpacity="0.34" />
        <stop offset="0.5" stopColor="#cfe2d8" stopOpacity="0.17" />
        <stop offset="1" stopColor="#b8cfc2" stopOpacity="0.3" />
      </linearGradient>

      <linearGradient id="ds-spec" x1="0" x2="1" y1="0" y2="0.6">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="0.42" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>

      {/* ---- Environment ----------------------------------------------- */}
      <linearGradient id="ds-facade" x1="0" x2="0.3" y1="0" y2="1">
        <stop offset="0" stopColor="#0a4b2c" />
        <stop offset="1" stopColor="#032b19" />
      </linearGradient>

      <linearGradient id="ds-glass" x1="0" x2="0.4" y1="0" y2="1">
        <stop offset="0" stopColor="#ffca57" stopOpacity="0.34" />
        <stop offset="0.55" stopColor="#f0912c" stopOpacity="0.2" />
        <stop offset="1" stopColor="#0b3d26" stopOpacity="0.12" />
      </linearGradient>

      <linearGradient id="ds-interior" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#1d3d2c" />
        <stop offset="1" stopColor="#071f14" />
      </linearGradient>

      <linearGradient id="ds-counter" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#e8f1ea" />
        <stop offset="0.18" stopColor="#c3d5c9" />
        <stop offset="1" stopColor="#5d7568" />
      </linearGradient>

      <linearGradient id="ds-road" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#12321f" />
        <stop offset="0.55" stopColor="#0b2317" />
        <stop offset="1" stopColor="#071b11" />
      </linearGradient>

      <linearGradient id="ds-tower" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#0d3f28" />
        <stop offset="1" stopColor="#052e1c" />
      </linearGradient>

      <linearGradient id="ds-studio-edge" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#a8c4b4" stopOpacity="0.55" />
        <stop offset="0.26" stopColor="#a8c4b4" stopOpacity="0" />
        <stop offset="0.74" stopColor="#a8c4b4" stopOpacity="0" />
        <stop offset="1" stopColor="#a8c4b4" stopOpacity="0.55" />
      </linearGradient>

      <linearGradient id="ds-studio-floor" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#e6f2ea" />
        <stop offset="1" stopColor="#cfe3d6" />
      </linearGradient>

      <radialGradient id="ds-lamp" cx="0.5" cy="0" r="1">
        <stop offset="0" stopColor="#ffce62" stopOpacity="0.5" />
        <stop offset="0.55" stopColor="#ffb32e" stopOpacity="0.14" />
        <stop offset="1" stopColor="#ffb32e" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="ds-headlight" cx="0" cy="0.5" r="1">
        <stop offset="0" stopColor="#fff3d0" stopOpacity="0.72" />
        <stop offset="1" stopColor="#ffd77a" stopOpacity="0" />
      </radialGradient>

      <linearGradient id="ds-bag" x1="0" x2="0.6" y1="0" y2="1">
        <stop offset="0" stopColor="#0f5733" />
        <stop offset="1" stopColor="#032b19" />
      </linearGradient>


      {/* ---- Atmosphere -------------------------------------------------
           Depth in a night street comes from three things: distant planes lose
           contrast into haze, every plane is darker where it meets the ground,
           and wet tarmac throws a soft vertical smear of whatever is lit. */}
      <linearGradient id="ds-haze" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#0f5c4e" stopOpacity="0" />
        <stop offset="0.55" stopColor="#116052" stopOpacity="0.28" />
        <stop offset="1" stopColor="#17705c" stopOpacity="0.5" />
      </linearGradient>

      <linearGradient id="ds-bldg-far" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#0d4038" />
        <stop offset="0.62" stopColor="#072d26" />
        <stop offset="1" stopColor="#041b17" />
      </linearGradient>

      <linearGradient id="ds-bldg-near" x1="0.1" x2="0.9" y1="0" y2="1">
        <stop offset="0" stopColor="#12653f" />
        <stop offset="0.45" stopColor="#0b4a2e" />
        <stop offset="0.85" stopColor="#062f1d" />
        <stop offset="1" stopColor="#03190f" />
      </linearGradient>

      {/* Contact darkening where any plane meets the road. */}
      <linearGradient id="ds-ground-ao" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#000000" stopOpacity="0.3" />
        <stop offset="1" stopColor="#000000" stopOpacity="0" />
      </linearGradient>

      {/* Reflection smear on wet tarmac — a gradient, not a blur, so it stays
          cheap across dozens of shopfronts. */}
      <linearGradient id="ds-reflect" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#ffce62" stopOpacity="0.26" />
        <stop offset="0.4" stopColor="#ffce62" stopOpacity="0.09" />
        <stop offset="1" stopColor="#ffce62" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="ds-road-sheen" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#2a8a5b" stopOpacity="0.24" />
        <stop offset="0.4" stopColor="#12563a" stopOpacity="0.12" />
        <stop offset="1" stopColor="#02100a" stopOpacity="0.2" />
      </linearGradient>

      {/* ---- Window patterns (cheap lit facades) ------------------------ */}
      <pattern height="58" id="ds-win-far" patternUnits="userSpaceOnUse" width="42">
        <rect fill="#ffce62" height="18" opacity="0.34" width="14" x="8" y="10" />
        <rect fill="#ffce62" height="18" opacity="0.16" width="14" x="8" y="36" />
      </pattern>

      <pattern height="82" id="ds-win-near" patternUnits="userSpaceOnUse" width="62">
        <rect fill="#ffd77a" height="26" opacity="0.5" width="20" x="10" y="12" />
        <rect fill="#ffd77a" height="26" opacity="0.22" width="20" x="36" y="46" />
      </pattern>

      <pattern height="76" id="ds-win-tower" patternUnits="userSpaceOnUse" width="58">
        <rect fill="#cfe6d8" height="24" opacity="0.24" width="22" x="9" y="10" />
        <rect fill="#ffd77a" height="24" opacity="0.42" width="22" x="9" y="44" />
      </pattern>

      {/* ---- Filters ---------------------------------------------------- */}
      <filter id="ds-soft" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="14" />
      </filter>

      <filter id="ds-soft-sm" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="5" />
      </filter>

      <filter id="ds-bloom" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="26" />
      </filter>

      {/* Depth-of-field for the far parallax bands. */}
      <filter id="ds-depth" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
    </defs>
  );
}
