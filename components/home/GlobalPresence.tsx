"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Globe2, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  indiaOutline,
  indiaSize,
  indiaStates,
  usaSize,
  usaStates,
  type MapRegion,
} from "@/data/maps";

/** Seconds the beam takes to cross a map. Must match --sweep-window in globals.css. */
const SWEEP_SECONDS = 3.2;
/** Beam width as a share of the map's own coordinate space. */
const BEAM_RATIO = 0.06;

type MapSize = { width: number; height: number };

function flareDelay(state: MapRegion): CSSProperties {
  return { animationDelay: `${(state.sweep * SWEEP_SECONDS).toFixed(2)}s` };
}

/**
 * The beam lives inside the SVG so it shares the states' coordinate space —
 * letterboxing then cannot drift the sweep out of step with the flares.
 */
function LaserBeam({ id, size }: { id: string; size: MapSize }) {
  const width = Math.round(size.width * BEAM_RATIO);
  const style = {
    "--beam-width": `${width}px`,
    "--map-width": `${size.width}px`,
  } as CSSProperties;

  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#35e2ff" stopOpacity="0" />
          <stop offset="72%" stopColor="#35e2ff" stopOpacity="0.22" />
          <stop offset="93%" stopColor="#7ef0ff" stopOpacity="0.6" />
          <stop offset="99%" stopColor="#eafcff" stopOpacity="1" />
          <stop offset="100%" stopColor="#eafcff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        className="presence-map__beam"
        fill={`url(#${id})`}
        height={size.height}
        style={style}
        width={width}
        x={-width}
        y={0}
      />
    </>
  );
}

export function GlobalPresence() {
  const root = useRef<HTMLElement>(null);
  // Gates the sweep so it starts when the maps scroll into view. Without the
  // observer the maps stay in their static lit state, which reads fine on its own.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={visible ? "presence-section is-visible" : "presence-section"} ref={root}>
      <Container>
        <div className="presence-section__head">
          <p className="kicker">Domestic and international presence</p>
          <h2>
            PAN-INDIA SUPPLY,
            <br />
            EXPORTING TO THE USA.
          </h2>
          <p className="section-copy">
            Our containers reach kitchens and brands across every region of India, and travel onward to customers in
            the United States.
          </p>
        </div>

        <div className="presence-grid">
          <article className="presence-card">
            <header className="presence-card__head">
              <span className="presence-card__flag">
                <MapPin aria-hidden="true" size={15} strokeWidth={2.1} />
                India
              </span>
              <span className="presence-card__meta">Domestic supply</span>
            </header>

            <div className="presence-map">
              <svg
                aria-label="Map of India with every state and union territory marked"
                role="img"
                viewBox={`0 0 ${indiaSize.width} ${indiaSize.height}`}
              >
                <LaserBeam id="beam-india" size={indiaSize} />
                <path className="presence-map__outline" d={indiaOutline} />
                <g className="presence-map__regions">
                  {indiaStates.map((state) => (
                    <path className="presence-map__region" d={state.d} key={state.name} style={flareDelay(state)} />
                  ))}
                </g>
              </svg>
              <span aria-hidden="true" className="presence-map__scanlines" />
            </div>

            <div className="presence-coverage">
              <strong>28 states + 8 UTs</strong>
              <span>Supplying across every region of the country</span>
            </div>

            <p className="presence-card__note">
              Domestic network across <strong>all of India</strong>
            </p>
          </article>

          <article className="presence-card">
            <header className="presence-card__head">
              <span className="presence-card__flag">
                <Globe2 aria-hidden="true" size={15} strokeWidth={2.1} />
                United States
              </span>
              <span className="presence-card__meta">Export supply</span>
            </header>

            <div className="presence-map">
              <svg
                aria-label="Map of the United States with every state marked"
                role="img"
                viewBox={`0 0 ${usaSize.width} ${usaSize.height}`}
              >
                <LaserBeam id="beam-usa" size={usaSize} />
                <g className="presence-map__regions">
                  {usaStates.map((state) => (
                    <path className="presence-map__region" d={state.d} key={state.name} style={flareDelay(state)} />
                  ))}
                </g>
              </svg>
              <span aria-hidden="true" className="presence-map__scanlines" />
            </div>

            <div className="presence-coverage">
              <strong>All 50 states</strong>
              <span>Coast to coast, including Alaska and Hawaii</span>
            </div>

            <p className="presence-card__note">
              International supply to the <strong>United States</strong>
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
