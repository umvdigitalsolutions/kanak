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
} from "@/data/maps";

const usaCoverageStates = usaStates.filter((state) => state.name !== "District of Columbia");

function progressStyle(index: number, total: number): CSSProperties {
  return { "--network-progress": `${((index + 1) / total) * 100}%` } as CSSProperties;
}

export function GlobalPresence() {
  const root = useRef<HTMLElement>(null);
  // Start map motion only once the section has entered the viewport.
  const [visible, setVisible] = useState(false);
  const [activeIndiaState, setActiveIndiaState] = useState(0);
  const [activeUsaState, setActiveUsaState] = useState(0);

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

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndiaState((current) => (current + 1) % indiaStates.length);
      setActiveUsaState((current) => (current + 1) % usaCoverageStates.length);
    }, 1050);

    return () => window.clearInterval(timer);
  }, [visible]);

  const activeIndiaRegion = indiaStates[activeIndiaState];
  const activeUsaRegion = usaCoverageStates[activeUsaState];

  return (
    <section className={visible ? "presence-section is-visible" : "presence-section"} ref={root}>
      <Container>
        <div className="presence-section__head">
          <p className="kicker">Domestic and international presence</p>
          <h2>
            PAN INDIA.
            <br />
            ENTIRE USA.
            <br />
            ONE NETWORK.
          </h2>
          <p className="section-copy">
            Nationwide domestic coverage connects with an international supply network spanning the United States.
          </p>
        </div>

        <div className="presence-grid">
          <article className="presence-card">
            <header className="presence-card__head">
              <span className="presence-card__flag">
                <MapPin aria-hidden="true" size={15} strokeWidth={2.1} />
                India
              </span>
              <span aria-live="polite" className="presence-card__meta">
                PAN India
              </span>
            </header>

            <div className="presence-map">
              <svg
                aria-label={`Digital map of India connecting to ${activeIndiaRegion.name}`}
                role="img"
                viewBox={`0 0 ${indiaSize.width} ${indiaSize.height}`}
              >
                <path className="presence-map__outline" d={indiaOutline} />
                <g className="presence-map__regions">
                  {indiaStates.map((state, index) => (
                    <path
                      className={`presence-map__region presence-map__region--india${index <= activeIndiaState ? " is-scanned" : ""}${state.name === activeIndiaRegion.name ? " is-active" : ""}`}
                      d={state.d}
                      key={state.name}
                    >
                      <title>{state.name}</title>
                    </path>
                  ))}
                </g>
                <g className="presence-map__network">
                  {indiaStates.map((state, index) => (
                    <circle
                      className={`presence-map__node${index <= activeIndiaState ? " is-scanned" : ""}${state.name === activeIndiaRegion.name ? " is-active" : ""}`}
                      cx={state.cx}
                      cy={state.cy}
                      key={`india-node-${state.name}`}
                      r="3.2"
                    />
                  ))}
                  <g
                    className="presence-map__beacon"
                    key={`india-beacon-${activeIndiaRegion.name}`}
                    transform={`translate(${activeIndiaRegion.cx} ${activeIndiaRegion.cy})`}
                  >
                    <circle className="presence-map__beacon-ring presence-map__beacon-ring--outer" r="22" />
                    <circle className="presence-map__beacon-ring presence-map__beacon-ring--inner" r="12" />
                    <line x1="-24" x2="-10" y1="0" y2="0" />
                    <line x1="10" x2="24" y1="0" y2="0" />
                    <line x1="0" x2="0" y1="-24" y2="-10" />
                    <line x1="0" x2="0" y1="10" y2="24" />
                    <circle className="presence-map__beacon-core" r="4.5" />
                  </g>
                </g>
              </svg>
              <span aria-hidden="true" className="presence-map__scanlines" />
            </div>

            <div
              aria-live="polite"
              className="presence-network-status"
              style={progressStyle(activeIndiaState, indiaStates.length)}
            >
              <div>
                <span>Active location</span>
                <strong>{activeIndiaRegion.name}</strong>
              </div>
              <b>
                {String(activeIndiaState + 1).padStart(2, "0")} / {indiaStates.length}
              </b>
              <i aria-hidden="true"><span /></i>
            </div>

            <div className="presence-coverage">
              <strong>PAN India coverage</strong>
              <span>States and union territories connected nationwide</span>
            </div>

            <p className="presence-card__note">
              Domestic service network across <strong>India</strong>
            </p>
          </article>

          <article className="presence-card">
            <header className="presence-card__head">
              <span className="presence-card__flag">
                <Globe2 aria-hidden="true" size={15} strokeWidth={2.1} />
                United States
              </span>
              <span className="presence-card__meta">Entire USA</span>
            </header>

            <div className="presence-map">
              <svg
                aria-label="Map of the United States with every state marked"
                role="img"
                viewBox={`0 0 ${usaSize.width} ${usaSize.height}`}
              >
                <g className="presence-map__regions">
                  {usaStates.map((state) => {
                    const coverageIndex = usaCoverageStates.findIndex((item) => item.name === state.name);
                    const isScanned = coverageIndex >= 0 && coverageIndex <= activeUsaState;

                    return (
                      <path
                        className={`presence-map__region presence-map__region--usa${isScanned ? " is-scanned" : ""}${state.name === activeUsaRegion.name ? " is-active" : ""}`}
                        d={state.d}
                        key={state.name}
                      >
                        <title>{state.name}</title>
                      </path>
                    );
                  })}
                </g>
                <g className="presence-map__network">
                  {usaCoverageStates.map((state, index) => (
                    <circle
                      className={`presence-map__node${index <= activeUsaState ? " is-scanned" : ""}${state.name === activeUsaRegion.name ? " is-active" : ""}`}
                      cx={state.cx}
                      cy={state.cy}
                      key={`usa-node-${state.name}`}
                      r="2.7"
                    />
                  ))}
                  <g
                    className="presence-map__beacon"
                    key={`usa-beacon-${activeUsaRegion.name}`}
                    transform={`translate(${activeUsaRegion.cx} ${activeUsaRegion.cy})`}
                  >
                    <circle className="presence-map__beacon-ring presence-map__beacon-ring--outer" r="20" />
                    <circle className="presence-map__beacon-ring presence-map__beacon-ring--inner" r="10" />
                    <line x1="-22" x2="-9" y1="0" y2="0" />
                    <line x1="9" x2="22" y1="0" y2="0" />
                    <line x1="0" x2="0" y1="-22" y2="-9" />
                    <line x1="0" x2="0" y1="9" y2="22" />
                    <circle className="presence-map__beacon-core" r="4" />
                  </g>
                </g>
              </svg>
              <span aria-hidden="true" className="presence-map__scanlines" />
            </div>

            <div
              aria-live="polite"
              className="presence-network-status"
              style={progressStyle(activeUsaState, usaCoverageStates.length)}
            >
              <div>
                <span>Active location</span>
                <strong>{activeUsaRegion.name}</strong>
              </div>
              <b>
                {String(activeUsaState + 1).padStart(2, "0")} / {usaCoverageStates.length}
              </b>
              <i aria-hidden="true"><span /></i>
            </div>

            <div className="presence-coverage">
              <strong>Entire USA coverage</strong>
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
