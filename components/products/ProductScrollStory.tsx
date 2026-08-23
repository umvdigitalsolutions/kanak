"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/assets";

const storyFrames = [
  {
    body: "The container profile stays steady while the lid detail highlights transport-focused closure.",
    kicker: "Step 01",
    title: "Secure\nLid Fit",
  },
  {
    body: "Material, finish and rim profile are kept readable so buyers can review the selected packaging direction.",
    kicker: "Step 02",
    title: "Material\nClarity",
  },
  {
    body: "The food zone is presented for takeaway kitchens, catering counters and delivery packing lines.",
    kicker: "Step 03",
    title: "Food-Service\nPacking",
  },
  {
    body: "The lid returns to a closed dispatch state for organised movement from packing to handover.",
    kicker: "Step 04",
    title: "Dispatch\nReady",
  },
];

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function ProductScrollStory({
  finish,
  image,
  name,
  shape,
}: {
  finish: string;
  image: string | null;
  name: string;
  shape: "rectangular" | "round" | "square" | "tray";
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const frameEls = Array.from(section.querySelectorAll<HTMLElement>("[data-product-story-frame]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = reduceMotion.matches ? 1 : clamp(-rect.top / scrollable);
      const activeIndex = Math.min(storyFrames.length - 1, Math.floor(progress * storyFrames.length));
      const liftCurve = Math.sin(progress * Math.PI);
      const foodOpacity = clamp((progress - 0.36) / 0.18) * clamp((0.9 - progress) / 0.18);
      const lidOpacity = clamp((progress - 0.04) / 0.18) * clamp((0.96 - progress) / 0.18);

      section.style.setProperty("--story-progress", progress.toFixed(4));
      section.style.setProperty("--story-lid-y", `${Math.round(liftCurve * -112)}px`);
      section.style.setProperty("--story-lid-rotate", `${(liftCurve * -6).toFixed(2)}deg`);
      section.style.setProperty("--story-lid-opacity", lidOpacity.toFixed(3));
      section.style.setProperty("--story-food-opacity", foodOpacity.toFixed(3));

      frameEls.forEach((element, index) => {
        element.classList.toggle("is-active", index === activeIndex);
      });
    };

    const requestUpdate = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className={`pdp-story pdp-story--${shape}`} ref={sectionRef}>
      <div className="pdp-story__sticky">
        <div className="pdp-story__copy">
          {storyFrames.map((frame, index) => (
            <article className={index === 0 ? "is-active" : ""} data-product-story-frame key={frame.title}>
              <p className="kicker">{frame.kicker}</p>
              <h2>{frame.title}</h2>
              <p>{frame.body}</p>
            </article>
          ))}
        </div>

        <div className="pdp-story__stage" aria-label={`${name} construction animation`}>
          <span className="pdp-story__halo" />
          <span className="pdp-story__lid" aria-hidden="true" />
          <div className="pdp-story__food" aria-hidden="true">
            <span />
            <i />
            <b />
          </div>
          <div className="pdp-story__product">
            <Image
              alt={name}
              fill
              priority={false}
              sizes="(max-width: 760px) 86vw, 36rem"
              src={assetPath(image ?? "/images/generated/cinematic-noodle-container.png")}
            />
          </div>
          <div className="pdp-story__badge">
            <span>{shape} format</span>
            <strong>{finish}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
