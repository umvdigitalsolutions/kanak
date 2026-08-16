"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { Box, Factory, Layers3, Leaf, PackageCheck, Recycle, Rows3, ShieldCheck } from "lucide-react";
import { ensureGsap } from "@/lib/animations";
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

const views = [
  { icon: Rows3, id: "section", label: "Section" },
  { icon: Box, id: "solid", label: "Solid" },
] as const;

type MaterialId = (typeof materials)[number]["id"];
type ViewId = (typeof views)[number]["id"];

const qualityChecks = [
  { icon: ShieldCheck, label: "Food-contact grade" },
  { icon: Layers3, label: "Stackable geometry" },
  { icon: PackageCheck, label: "Lid-fit check" },
] as const;

const flowSteps = ["Material", "Moulding", "Lid fit", "Packed supply"];

/* Leader callouts, anchored by their dot at a percentage of the viewport so the
   label can grow in either direction without dragging the pointer off-feature. */
const marks = [
  { flip: false, label: "Lid plateau", x: 62, y: 22 },
  { flip: false, label: "Rim flange", x: 74, y: 34 },
  { flip: true, label: "Seat groove", x: 28, y: 37 },
  { flip: true, label: "Draft-angle wall", x: 30, y: 50 },
  { flip: false, label: "Stack foot", x: 63, y: 70 },
] as const;

// Odd-indexed rings only render in solid view, where they close the gaps between
// the section profiles into a continuous shell.
const BODY_RING_COUNT = 67;
const LID_RING_COUNT = 17;

/** Radius profile of the tub, sampled from the base (t=0) to the rim flange (t=1). */
function bodyRadius(t: number) {
  if (t < 0.06) return 0.7 + (t / 0.06) * 0.05; // heel flare off the base
  if (t < 0.86) return 0.75 + Math.pow((t - 0.06) / 0.8, 0.85) * 0.19; // convex draft angle
  if (t < 0.92) return 0.94 - ((t - 0.86) / 0.06) * 0.035; // lid-seat groove
  if (t < 0.97) return 0.905 + ((t - 0.92) / 0.05) * 0.085;
  return 0.99 + ((t - 0.97) / 0.03) * 0.07; // rim flange
}

/** Radius profile of the lid, from the outer flange (t=0) to the flat top plateau (t=1). */
function lidRadius(t: number) {
  if (t < 0.18) return 1.06 - (t / 0.18) * 0.07; // overhanging flange
  if (t < 0.45) return 0.99 - ((t - 0.18) / 0.27) * 0.06; // shoulder off the seat
  if (t < 0.75) return 0.93 - ((t - 0.45) / 0.3) * 0.07;
  return 0.86 - ((t - 0.75) / 0.25) * 0.12; // plateau edge
}

function lathe(count: number, radius: (t: number) => number) {
  return Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    return { fill: index % 2 === 1, r: Number(radius(t).toFixed(4)), t: Number(t.toFixed(4)) };
  });
}

const bodyRings = lathe(BODY_RING_COUNT, bodyRadius);
const lidRings = lathe(LID_RING_COUNT, lidRadius);

type LabHandle = {
  hover: (state: boolean) => void;
  shift: () => void;
  swap: () => void;
};

const finePointer = () => window.matchMedia("(pointer: fine)").matches;

export function KitchenToCustomer() {
  const root = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const lab = useRef<LabHandle | null>(null);
  const specMounted = useRef(false);
  const [active, setActive] = useState<MaterialId>("plastic");
  const [view, setView] = useState<ViewId>("section");

  const activeMaterial = materials.find((item) => item.id === active) ?? materials[0];

  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      const scope = root.current;
      const rig = rigRef.current;
      const lid = lidRef.current;

      if (!scope || !rig || !lid) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const camera = scope.querySelector<HTMLElement>(".material-lab__camera");
      const turntable = scope.querySelector<HTMLElement>(".material-lab__turntable");
      const gimbal = scope.querySelector<HTMLElement>(".material-lab__gimbal");
      const viewport = scope.querySelector<HTMLElement>(".material-lab__viewport");
      const shadowWrap = scope.querySelector<HTMLElement>(".material-shadow");
      const shadow = scope.querySelector<HTMLElement>(".material-shadow__core");
      const ground = scope.querySelector<HTMLElement>(".material-ground");
      const base = scope.querySelector<HTMLElement>(".material-base");
      const sheen = scope.querySelector<HTMLElement>(".material-lab__sheen");
      const orbitOut = scope.querySelector<HTMLElement>(".material-readout__orbit");
      const tiltOut = scope.querySelector<HTMLElement>(".material-readout__tilt");
      const bodyEls = gsap.utils.toArray<HTMLElement>(".material-ring--body", scope);
      const lidEls = gsap.utils.toArray<HTMLElement>(".material-ring--lid", scope);
      const noteEls = gsap.utils.toArray<HTMLElement>(".material-note", scope);
      const noteDots = gsap.utils.toArray<HTMLElement>(".material-note i", scope);
      const noteLines = gsap.utils.toArray<HTMLElement>(".material-note b", scope);
      const dimEls = gsap.utils.toArray<HTMLElement>(".material-dim", scope);
      const dimV = scope.querySelector<HTMLElement>(".material-dim--height .material-dim__line");
      const dimH = scope.querySelector<HTMLElement>(".material-dim--width .material-dim__line");

      if (!camera || !turntable || !gimbal || !shadowWrap || !shadow) return;

      // Read the CSS-authored heights before the rig is hidden, so the build-on
      // can land exactly back on the stylesheet's geometry.
      const bodyZ = bodyEls.map((el) => gsap.getProperty(el, "z") as number);
      const lidZ = lidEls.map((el) => gsap.getProperty(el, "z") as number);

      gsap.set(camera, { rotationX: 62, transformOrigin: "50% 50%" });
      gsap.set([turntable, gimbal, rig, lid, shadow], { transformOrigin: "50% 50%" });
      gsap.set([...bodyEls, ...lidEls, ...noteEls, ...dimEls, base, shadow], { opacity: 0 });
      gsap.set(noteLines, { transformOrigin: "left center" });
      gsap.set(gsap.utils.toArray<HTMLElement>(".material-note--flip b", scope), {
        transformOrigin: "right center",
      });
      gsap.set(dimV, { transformOrigin: "center top" });
      gsap.set(dimH, { transformOrigin: "left center" });

      const build = gsap.timeline({
        onComplete: () => {
          gsap.set([...bodyEls, ...lidEls], { clearProps: "transform,opacity" });
          gsap.to(rig, { z: 12, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true });
          gsap.to(shadow, {
            delay: 0.12,
            duration: 2.8,
            ease: "sine.inOut",
            opacity: 0.52,
            repeat: -1,
            scale: 1.1,
            yoyo: true,
          });
        },
        scrollTrigger: { once: true, start: "top 74%", trigger: scope },
      });

      build
        .fromTo(ground, { opacity: 0 }, { duration: 0.9, ease: "power2.out", opacity: 1 }, 0)
        .fromTo(
          shadow,
          { opacity: 0, scale: 0.32 },
          { duration: 1.1, ease: "power2.out", opacity: 1, scale: 1 },
          0.05,
        )
        .fromTo(
          base,
          { opacity: 0, z: -22 },
          { duration: 0.55, ease: "power2.out", opacity: 1, z: 0 },
          0.05,
        )
        // Extrude the wall upward, ring by ring, the way a lathe lays down a profile.
        .fromTo(
          bodyEls,
          { opacity: 0, scale: 0.6, z: (index: number) => bodyZ[index] - 42 },
          {
            duration: 0.72,
            ease: "back.out(1.6)",
            opacity: 1,
            scale: 1,
            stagger: { each: 0.009 },
            z: (index: number) => bodyZ[index],
          },
          0.1,
        )
        // Lid drops in as one piece and seats onto the groove.
        .fromTo(
          lidEls,
          { opacity: 0, z: (index: number) => lidZ[index] + 130 },
          {
            duration: 0.75,
            ease: "power3.out",
            opacity: 1,
            stagger: 0.014,
            z: (index: number) => lidZ[index],
          },
          0.68,
        )
        // Markings draw themselves on: rules extend from their caps, then each
        // leader pops a dot and pulls its line out to the label.
        .fromTo(dimEls, { opacity: 0 }, { duration: 0.4, opacity: 1, stagger: 0.08 }, 0.85)
        .fromTo(
          [dimV, dimH],
          { scaleX: (index: number) => (index ? 0 : 1), scaleY: (index: number) => (index ? 1 : 0) },
          { duration: 0.6, ease: "power2.inOut", scaleX: 1, scaleY: 1, stagger: 0.08 },
          0.85,
        )
        .fromTo(noteEls, { opacity: 0 }, { duration: 0.35, opacity: 1, stagger: 0.07 }, 0.95)
        .fromTo(
          noteDots,
          { scale: 0 },
          { duration: 0.4, ease: "back.out(2.4)", scale: 1, stagger: 0.07 },
          0.95,
        )
        .fromTo(
          noteLines,
          { scaleX: 0 },
          { duration: 0.45, ease: "power3.out", scaleX: 1, stagger: 0.07 },
          1.05,
        );

      // Scroll scrubs the turntable, so the model reads as a solid the whole way past.
      gsap.fromTo(
        turntable,
        { rotationZ: -30 },
        {
          ease: "none",
          onUpdate: () => {
            if (!orbitOut) return;
            const deg = Math.round(gsap.getProperty(turntable, "rotationZ") as number);
            orbitOut.textContent = `${deg < 0 ? "−" : ""}${String(Math.abs(deg)).padStart(2, "0")}`;
          },
          rotationZ: 24,
          scrollTrigger: { end: "bottom top", scrub: 1.1, start: "top bottom", trigger: scope },
        },
      );

      if (sheen) {
        gsap.fromTo(
          sheen,
          { xPercent: -135 },
          { duration: 2.5, ease: "power2.inOut", repeat: -1, repeatDelay: 3.6, xPercent: 135 },
        );
      }

      let hovering = false;
      let switching = false;

      const liftLid = (distance: number) => {
        gsap.to(lid, { duration: 0.7, ease: "power3.out", overwrite: "auto", z: distance });
      };

      lab.current = {
        hover(state) {
          hovering = state;
          if (switching || !finePointer()) return;
          liftLid(state ? 26 : 0);
        },
        // Render-mode change: the fill rings cross-fade in CSS, this is the beat under it.
        shift() {
          gsap
            .timeline({ onComplete: () => gsap.set(bodyEls, { clearProps: "transform" }) })
            .to(rig, { duration: 0.3, ease: "power2.out", rotationZ: 8 })
            .to(rig, { duration: 0.8, ease: "power2.inOut", rotationZ: 0 })
            .to(
              bodyEls,
              {
                duration: 0.22,
                ease: "power2.out",
                repeat: 1,
                scale: 1.035,
                stagger: { each: 0.005 },
                yoyo: true,
              },
              0,
            );
        },
        swap() {
          const compact = window.matchMedia("(max-width: 680px)").matches;
          switching = true;

          const timeline = gsap.timeline({
            onComplete: () => {
              switching = false;
              gsap.set(bodyEls, { clearProps: "transform" });
              liftLid(hovering && finePointer() ? 26 : 0);
            },
          });

          timeline
            // Anticipation, then the lid clears the rim so the wall can re-form.
            .to(lid, { duration: 0.14, ease: "power2.in", overwrite: "auto", z: -6 })
            .to(lid, { duration: 0.6, ease: "power3.out", z: compact ? 58 : 82 })
            .fromTo(rig, { rotationZ: 0 }, { duration: 0.55, ease: "power2.out", rotationZ: 15 }, 0.12)
            .to(rig, { duration: 0.95, ease: "power2.inOut", rotationZ: 0 }, 0.67)
            // The colour cross-fade is a CSS wave; this ripple gives it a body to travel through.
            .to(
              bodyEls,
              {
                duration: 0.24,
                ease: "power2.out",
                repeat: 1,
                scale: 1.05,
                stagger: { each: 0.006 },
                yoyo: true,
              },
              0.28,
            )
            .to(shadowWrap, { duration: 0.5, ease: "power2.out", scale: 1.08 }, 0.2)
            .to(shadowWrap, { duration: 0.6, ease: "power2.inOut", scale: 1 }, 0.9)
            .to(lid, { duration: 0.46, ease: "power3.in", z: 0 }, 1.05)
            // Landing squash, then settle — the lid has weight.
            .to(lid, { duration: 0.1, ease: "power2.out", scale: 1.055 })
            .to(lid, { duration: 0.55, ease: "elastic.out(1, 0.45)", scale: 1 });
        },
      };

      if (!viewport || !finePointer()) {
        return () => {
          lab.current = null;
        };
      }

      const yaw = gsap.quickTo(gimbal, "rotationZ", { duration: 0.9, ease: "power3" });
      const pitch = gsap.quickTo(camera, "rotationX", {
        duration: 0.9,
        ease: "power3",
        onUpdate() {
          if (tiltOut) {
            tiltOut.textContent = String(Math.round(gsap.getProperty(camera, "rotationX") as number));
          }
        },
      });

      const track = (event: PointerEvent) => {
        const box = viewport.getBoundingClientRect();
        yaw(((event.clientX - box.left) / box.width - 0.5) * 18);
        pitch(62 - ((event.clientY - box.top) / box.height - 0.5) * 14);
      };
      const release = () => {
        yaw(0);
        pitch(62);
      };

      viewport.addEventListener("pointermove", track);
      viewport.addEventListener("pointerleave", release);

      return () => {
        lab.current = null;
        viewport.removeEventListener("pointermove", track);
        viewport.removeEventListener("pointerleave", release);
      };
    },
    { scope: root },
  );

  const selectMaterial = (id: MaterialId) => {
    if (id === active) return;
    setActive(id);
    lab.current?.swap();
  };

  const selectView = (id: ViewId) => {
    if (id === view) return;
    setView(id);
    lab.current?.shift();
  };

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
        <div
          className={`statement-section__grid material-scope material-scope--${active} material-view--${view}`}
        >
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
                    onClick={() => selectMaterial(material.id)}
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

          <div className="material-lab">
            <div className="material-lab__bar">
              <span className="material-lab__tag">
                <Factory size={15} strokeWidth={1.9} />
                Turntable view
              </span>

              <span className="material-lab__finish">{activeMaterial.finish}</span>

              <div aria-label="Render mode" className="material-lab__views" role="group">
                {views.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      aria-pressed={view === item.id}
                      className={view === item.id ? "is-selected" : ""}
                      key={item.id}
                      onClick={() => selectView(item.id)}
                      type="button"
                    >
                      <Icon size={14} strokeWidth={2} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="material-lab__viewport"
              onPointerEnter={() => lab.current?.hover(true)}
              onPointerLeave={() => lab.current?.hover(false)}
            >
              <span aria-hidden="true" className="material-lab__tint" />

              <div aria-hidden="true" className="material-lab__scene">
                <div className="material-lab__camera">
                  <div className="material-lab__turntable">
                    <span className="material-ground" />
                    <span className="material-ground__ring material-ground__ring--outer" />
                    <span className="material-ground__ring material-ground__ring--inner" />
                    <span className="material-shadow">
                      <span className="material-shadow__core" />
                    </span>

                    <div className="material-lab__gimbal">
                      <div className="material-rig" ref={rigRef}>
                        <span className="material-base" />

                        {bodyRings.map((ring) => (
                          <span
                            className={`material-ring material-ring--body${ring.fill ? " material-ring--fill" : ""}`}
                            key={ring.t}
                            style={{ "--r": ring.r, "--t": ring.t } as CSSProperties}
                          />
                        ))}

                        <span className="material-cavity" />

                        <div className="material-lid-anchor">
                          <div className="material-lid" ref={lidRef}>
                            {lidRings.map((ring) => (
                              <span
                                className={`material-ring material-ring--lid${ring.fill ? " material-ring--fill" : ""}`}
                                key={ring.t}
                                style={{ "--r": ring.r, "--t": ring.t } as CSSProperties}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <span aria-hidden="true" className="material-lab__grain" />
              <span aria-hidden="true" className="material-lab__light" />
              <span aria-hidden="true" className="material-lab__sheen" />

              <div aria-hidden="true" className="material-marks">
                <div className="material-dim material-dim--height">
                  <span className="material-dim__line" />
                  <span className="material-dim__label">H · to spec</span>
                </div>
                <div className="material-dim material-dim--width">
                  <span className="material-dim__line" />
                  <span className="material-dim__label">Ø rim · to spec</span>
                </div>

                {marks.map((mark) => (
                  <p
                    className={`material-note${mark.flip ? " material-note--flip" : ""}`}
                    key={mark.label}
                    style={{ "--x": mark.x, "--y": mark.y } as CSSProperties}
                  >
                    <i />
                    <b />
                    <span>{mark.label}</span>
                  </p>
                ))}

                <span className="material-readout">
                  Orbit <i className="material-readout__orbit">000</i>° · Tilt{" "}
                  <i className="material-readout__tilt">62</i>°
                </span>
              </div>
            </div>

            <p className="material-lab__caption">
              Scroll to orbit the model. Switching material lifts the lid and re-forms the wall.
              <span className="material-lab__hint"> Hover to lift the lid off its seat.</span>
            </p>

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
