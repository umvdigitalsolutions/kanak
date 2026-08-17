"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Layers3, Leaf, PackageCheck, Recycle, ShieldCheck } from "lucide-react";
import { ensureGsap } from "@/lib/animations";
import { assetPath } from "@/lib/assets";
import { Container } from "@/components/ui/Container";

const materials = [
  {
    eyebrow: "PP / PET / rigid polymer",
    finish: "Glossy · translucent",
    icon: Recycle,
    id: "plastic",
    label: "Food-grade plastic",
    points: ["Heat-use specification", "Black, white and clear finishes", "Stackable food-service formats"],
    summary:
      "Rigid polymer walls hold rim geometry, so lid fit stays repeatable across bulk food-delivery runs.",
  },
  {
    eyebrow: "Plant-fiber / compostable direction",
    finish: "Matte · fibrous",
    icon: Leaf,
    id: "bio",
    label: "Biodegradable range",
    points: ["Biodegradable options", "Food-service disposables", "Specification-led sourcing"],
    summary:
      "A plant-fiber direction for briefs that ask for compostable packaging, sourced against written specification.",
  },
] as const;

type MaterialId = (typeof materials)[number]["id"];

const qualityChecks = [
  { icon: ShieldCheck, label: "Food-contact grade" },
  { icon: Layers3, label: "Stackable geometry" },
  { icon: PackageCheck, label: "Lid-fit check" },
] as const;

const flowSteps = ["Material", "Moulding", "Lid fit", "Packed supply"];

/**
 * Photographed material stock. Only the rigid-polymer line has photography in
 * the repository today; the biodegradable direction is described in copy rather
 * than illustrated with a stand-in that would misrepresent it. Drop a plant-fiber
 * still in and give it its own entry here once one is supplied.
 */
const materialShot = assetPath("/images/generated/flow/01-material.jpg");

export function KitchenToCustomer() {
  const root = useRef<HTMLElement>(null);
  const specMounted = useRef(false);
  const [active, setActive] = useState<MaterialId>("plastic");

  const activeMaterial = materials.find((item) => item.id === active) ?? materials[0];

  // One idea for this section: the frame settles in as it enters, nothing else.
  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".material-shot",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { once: true, start: "top 82%", trigger: ".material-shot" },
          y: 0,
        },
      );
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      if (!specMounted.current) {
        specMounted.current = true;
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".material-spec__line",
        { opacity: 0, y: 16 },
        { duration: 0.55, ease: "power3.out", opacity: 1, stagger: 0.055, y: 0 },
      );
    },
    { dependencies: [active], scope: root },
  );

  return (
    <section className="statement-section" ref={root}>
      <Container>
        <div className={`statement-section__grid material-scope material-scope--${active}`}>
          <div className="statement-section__intro">
            <p className="kicker">Material options for food delivery</p>
            <h2 className="statement-section__title">Plastic and bio-based container options.</h2>
            <p className="statement-section__copy">
              Food delivery packaging needs the right material for the order:
              rigid plastic containers for strength, clarity and lid fit, plus
              biodegradable options where the project requires a plant-fiber or
              compostable direction.
            </p>

            <div aria-label="Container material" className="segmented-control material-picker" role="group">
              {materials.map((material) => {
                const Icon = material.icon;

                return (
                  <button
                    aria-pressed={active === material.id}
                    className={active === material.id ? "is-selected" : ""}
                    key={material.id}
                    onClick={() => setActive(material.id)}
                    type="button"
                  >
                    <Icon size={17} strokeWidth={2} />
                    {material.label}
                  </button>
                );
              })}
            </div>

            <div className="material-spec" key={activeMaterial.id}>
              <p className="material-spec__eyebrow material-spec__line">{activeMaterial.eyebrow}</p>
              <p className="material-spec__summary material-spec__line">{activeMaterial.summary}</p>
              <ul>
                {activeMaterial.points.map((point) => (
                  <li className="material-spec__line" key={point}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div aria-label="Packaging priorities" className="statement-section__terms">
              <span>Food grade</span>
              <span>Plastic</span>
              <span>Biodegradable</span>
              <span>Lid fit</span>
            </div>
          </div>

          <div className="material-panel">
            <figure className="material-shot">
              <Image
                alt="Rigid polymer sheet stock on the line before container forming"
                className="material-shot__image"
                fill
                sizes="(max-width: 980px) 100vw, 48vw"
                src={materialShot}
              />
              <figcaption>
                <span>{activeMaterial.finish}</span>
                <strong>Material stock is selected against the order specification before forming.</strong>
              </figcaption>
            </figure>

            <div aria-label="Manufacturing checks" className="material-checks">
              {qualityChecks.map((check) => {
                const Icon = check.icon;

                return (
                  <span key={check.label}>
                    <Icon size={16} strokeWidth={1.9} />
                    {check.label}
                  </span>
                );
              })}
            </div>

            <div aria-label="Production flow" className="material-flow">
              {flowSteps.map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
