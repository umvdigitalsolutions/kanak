"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap } from "@/lib/animations";
import { assetPath } from "@/lib/assets";
import { Container } from "@/components/ui/Container";

const points = [
  {
    id: "stability",
    label: "Material stability",
    body: "The base should hold its practical form through filling, closing, stacking and dispatch.",
  },
  {
    id: "closure",
    label: "Lid-fit performance",
    body: "A matched lid direction reduces exposure during normal takeaway movement.",
  },
  {
    id: "transit",
    label: "Protected movement",
    body: "Stable forming and a practical closure help limit leakage risk and handling damage.",
  },
];

/**
 * Replaces the second scroll-scrubbed video. One idea for the section: the
 * still parallaxes behind a line-masked heading. No pin, no video, no seeking —
 * the copy reads at any scroll speed and on any device.
 */
export function HotFillStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      const scope = root.current;
      if (!scope) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Slow drift on the still, tied to the section passing through the viewport.
      gsap.fromTo(
        ".hotfill__media",
        { yPercent: -5 },
        {
          ease: "none",
          scrollTrigger: { end: "bottom top", scrub: 0.6, start: "top bottom", trigger: scope },
          yPercent: 5,
        },
      );

      // Heading lines rise out of their own overflow masks.
      gsap.from(".hotfill__line > span", {
        duration: 0.95,
        ease: "power4.out",
        scrollTrigger: { once: true, start: "top 80%", trigger: ".hotfill__copy" },
        stagger: 0.075,
        yPercent: 115,
      });

      gsap.from("[data-hotfill-fade]", {
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { once: true, start: "top 76%", trigger: ".hotfill__copy" },
        stagger: 0.08,
        y: 22,
      });

      gsap.from(".hotfill__point", {
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { once: true, start: "top 85%", trigger: ".hotfill__points" },
        stagger: 0.09,
        y: 26,
      });
    },
    { scope: root },
  );

  return (
    <section className="hotfill" ref={root}>
      <div className="hotfill__media" aria-hidden="true">
        <Image
          alt=""
          className="hotfill__image"
          fill
          sizes="100vw"
          src={assetPath("/images/generated/cinematic-noodle-container.png")}
        />
      </div>
      <div className="hotfill__shade" aria-hidden="true" />

      <Container className="hotfill__inner">
        <div className="hotfill__copy">
          <p className="kicker" data-hotfill-fade>
            Hot-fill packaging context
          </p>
          <h2 className="hotfill__title">
            <span className="hotfill__line">
              <span>Designed</span>
            </span>
            <span className="hotfill__line">
              <span>for hot</span>
            </span>
            <span className="hotfill__line">
              <span>packing.</span>
            </span>
          </h2>
          <p className="hotfill__body" data-hotfill-fade>
            A takeaway container in a hot-food use case, where material stability,
            rim strength and lid fit decide whether the order arrives as it left.
          </p>
          <Link className="hotfill__cta" data-hotfill-fade href="/contact">
            Request specifications
          </Link>
        </div>

        <ol className="hotfill__points">
          {points.map((point, index) => (
            <li className="hotfill__point" key={point.id}>
              <span className="hotfill__point-no">{String(index + 1).padStart(2, "0")}</span>
              <h3>{point.label}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <p className="hotfill__note">
        Exact heat tolerance, duration and food-contact compliance are confirmed against
        manufacturer specification.
      </p>
    </section>
  );
}
