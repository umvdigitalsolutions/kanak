"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Component, Disc3, Layers3, PackageCheck, ScanLine, Scissors } from "lucide-react";
import { ensureGsap } from "@/lib/animations";
import { assetPath } from "@/lib/assets";
import { Container } from "@/components/ui/Container";

/**
 * Drop a still into public/images/generated/flow/ and set `image` to its path —
 * the frame swaps from the numbered plate to the photo with no other change.
 * See docs/manufacturing-flow-images.md for the per-stage prompts.
 */
const stages = [
  {
    glyph: Layers3,
    id: "material",
    image: assetPath("/images/generated/flow/01-material.jpg"),
    label: "Material",
    tag: "Stock check",
    body: "Material stock is selected against the order specification before production starts.",
  },
  {
    glyph: Component,
    id: "forming",
    image: assetPath("/images/generated/flow/02-forming.jpg"),
    label: "Forming",
    tag: "Tooling",
    body: "Container geometry is formed to the agreed profile, holding wall and draft.",
  },
  {
    glyph: Scissors,
    id: "trimming",
    image: assetPath("/images/generated/flow/03-trimming.jpg"),
    label: "Trimming",
    tag: "Rim line",
    body: "Formed parts are trimmed so the rim line stays consistent across the run.",
  },
  {
    glyph: Disc3,
    id: "lid-fit",
    image: assetPath("/images/generated/flow/04-lid-fit.jpg"),
    label: "Lid fit",
    tag: "Closure",
    body: "Base and lid are matched so closure behaves the same from first part to last.",
  },
  {
    glyph: ScanLine,
    id: "quality",
    image: assetPath("/images/generated/flow/05-quality.jpg"),
    label: "Quality check",
    tag: "Inspection",
    body: "Parts are checked for form, rim finish and stacking behaviour before they move on.",
  },
  {
    glyph: PackageCheck,
    id: "packing",
    image: assetPath("/images/generated/flow/06-packing.jpg"),
    label: "Packing",
    tag: "Bulk supply",
    body: "Counted, stacked and packed for bulk supply and dispatch.",
  },
] as const;

const COUNT = stages.length;
const pad = (value: number) => String(value).padStart(2, "0");

export function DeliveryJourney() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const { gsap, ScrollTrigger } = ensureGsap();
      const scope = root.current;
      if (!scope) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const pin = scope.querySelector<HTMLElement>(".flow-pin");
      const counter = scope.querySelector<HTMLElement>(".flow-frame__count");
      const nameOut = scope.querySelector<HTMLElement>(".flow-frame__name");
      const scan = scope.querySelector<HTMLElement>(".flow-frame__scan");
      const texts = gsap.utils.toArray<HTMLElement>(".flow-text", scope);
      const shots = gsap.utils.toArray<HTMLElement>(".flow-shot", scope);
      const rails = gsap.utils.toArray<HTMLElement>(".flow-rail li", scope);
      const railFills = gsap.utils.toArray<HTMLElement>(".flow-rail__fill", scope);

      if (!pin || !texts.length) return;

      gsap.set(railFills, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(shots, { autoAlpha: 0 });
      gsap.set(texts, { autoAlpha: 0 });
      gsap.set([shots[0], texts[0]], { autoAlpha: 1 });
      rails[0]?.classList.add("is-active");

      let current = 0;

      const show = (next: number) => {
        if (next === current) return;

        const fromText = texts[current];
        const toText = texts[next];
        const fromShot = shots[current];
        const toShot = shots[next];
        const parts = (element: HTMLElement) =>
          Array.from(element.querySelectorAll<HTMLElement>("[data-flow-part]"));

        current = next;

        rails.forEach((item, index) => item.classList.toggle("is-active", index === next));
        if (counter) counter.textContent = pad(next + 1);
        if (nameOut) nameOut.textContent = stages[next].label;

        gsap.killTweensOf([fromText, toText, fromShot, toShot, ...parts(fromText), ...parts(toText)]);

        // Outgoing frame pushes in and blurs off; the incoming one wipes up from
        // the bottom edge with its own image drifting back to rest behind it.
        gsap
          .timeline()
          .to(fromShot, { autoAlpha: 0, duration: 0.42, ease: "power2.inOut", scale: 1.06 }, 0)
          .fromTo(
            toShot,
            { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)", scale: 1 },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.72, ease: "power3.inOut" },
            0.06,
          )
          .fromTo(
            toShot.querySelector(".flow-shot__inner"),
            { scale: 1.12 },
            { duration: 1.05, ease: "power3.out", scale: 1 },
            0.06,
          )
          .to(
            parts(fromText),
            { autoAlpha: 0, duration: 0.24, ease: "power2.in", filter: "blur(4px)", y: -18 },
            0,
          )
          .set(fromText, { autoAlpha: 0 })
          .set(toText, { autoAlpha: 1 }, 0.24)
          .fromTo(
            parts(toText),
            { autoAlpha: 0, filter: "blur(6px)", y: 26 },
            { autoAlpha: 1, duration: 0.5, ease: "power3.out", filter: "blur(0px)", stagger: 0.06, y: 0 },
            0.28,
          );

        if (scan) {
          gsap.fromTo(
            scan,
            { autoAlpha: 1, yPercent: -100 },
            { duration: 0.7, ease: "power2.inOut", onComplete: () => gsap.set(scan, { autoAlpha: 0 }), yPercent: 100 },
          );
        }
      };

      // One pin spanning every stage, so progress reaches 1 at the last step
      // instead of topping out partway through the section.
      ScrollTrigger.create({
        end: () => `+=${Math.round((window.innerWidth < 768 ? 300 : 400) * COUNT)}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // The six rail fills double as the overall progress bar, filling
          // left to right across the whole width.
          const scaled = self.progress * COUNT;
          const index = Math.min(COUNT - 1, Math.floor(scaled));
          const within = gsap.utils.clamp(0, 1, scaled - index);

          railFills.forEach((bar, barIndex) => {
            gsap.set(bar, { scaleX: barIndex < index ? 1 : barIndex === index ? within : 0 });
          });

          show(index);
        },
        pin,
        pinSpacing: true,
        scrub: 0.6,
        start: "top top",
        trigger: scope,
      });
    },
    { scope: root },
  );

  return (
    <section className="flow-section" ref={root}>
      <div className="flow-pin">
        <Container>
          <div className="flow-grid">
            <div className="flow-copy">
              <p className="kicker">Manufacturing flow</p>
              <h2>
                FROM
                <br />
                MATERIAL
                <br />
                TO PACK.
              </h2>

              <div className="flow-copy__stages">
                {stages.map((stage) => (
                  <div className="flow-text" key={stage.id}>
                    <p className="flow-text__tag" data-flow-part>
                      {stage.tag}
                    </p>
                    <h3 data-flow-part>{stage.label}</h3>
                    <p className="flow-text__body" data-flow-part>
                      {stage.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flow-frame">
              {stages.map((stage, index) => {
                const Glyph = stage.glyph;

                return (
                  <figure className="flow-shot" key={stage.id}>
                    <span className="flow-shot__inner">
                      {stage.image ? (
                        <Image
                          alt={`${stage.label} stage of the container manufacturing flow`}
                          className="flow-shot__image"
                          fill
                          priority={index === 0}
                          sizes="(max-width: 900px) 92vw, 46vw"
                          src={stage.image}
                        />
                      ) : (
                        <span aria-hidden="true" className="flow-shot__plate">
                          <b>{pad(index + 1)}</b>
                          <Glyph size={86} strokeWidth={1} />
                        </span>
                      )}
                    </span>
                  </figure>
                );
              })}

              <span aria-hidden="true" className="flow-frame__scan" />
              <span aria-hidden="true" className="flow-frame__grain" />

              <div aria-hidden="true" className="flow-frame__meta">
                <span>
                  Step <i className="flow-frame__count">01</i> / {pad(COUNT)}
                </span>
                <span className="flow-frame__name">{stages[0].label}</span>
              </div>
            </div>
          </div>

          <ol className="flow-rail">
            {stages.map((stage, index) => (
              <li key={stage.id}>
                <span className="flow-rail__no">{pad(index + 1)}</span>
                <span className="flow-rail__label">{stage.label}</span>
                <span className="flow-rail__track">
                  <i className="flow-rail__fill" />
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}
