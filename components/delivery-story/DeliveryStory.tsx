"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ApartmentScene } from "@/components/delivery-story/ApartmentScene";
import { CityScene } from "@/components/delivery-story/CityScene";
import { CustomerScene } from "@/components/delivery-story/CustomerScene";
import { FoodContainer } from "@/components/delivery-story/FoodContainer";
import { ProductCallouts } from "@/components/delivery-story/ProductCallouts";
import { RiderBagFront, RiderRig } from "@/components/delivery-story/RiderRig";
import { RestaurantScene } from "@/components/delivery-story/RestaurantScene";
import { StoryCaptions } from "@/components/delivery-story/StoryCaptions";
import { StoryDefs } from "@/components/delivery-story/StoryDefs";
import { StudioScene } from "@/components/delivery-story/StudioScene";

/* One master timeline, 100 units long, so a beat's position in the code reads
   as the percentage of the pin it happens at. */
const chapters = [
  { at: 0, label: "01 · Kitchen" },
  { at: 13, label: "02 · Packing" },
  { at: 26, label: "03 · Sealed" },
  { at: 35, label: "04 · Pickup" },
  { at: 45, label: "05 · In transit" },
  { at: 62, label: "06 · Protected" },
  { at: 70, label: "07 · Arrival" },
  { at: 82, label: "08 · Handoff" },
  { at: 91, label: "09 · The container" },
];

const beats = [
  { body: "Food leaves the pass hot and has to stay that way.", title: "From the kitchen" },
  { body: "Lid seats on the rim and the order is closed for good.", title: "Securely packed" },
  { body: "Loaded into the insulated bag without a second thought.", title: "Ready to move" },
  { body: "Traffic, turns and kerbs — the container holds its shape.", title: "Built for the journey" },
  { body: "Handed over upright, sealed and presentable.", title: "Arrived securely" },
  { body: "Exactly as it left the counter.", title: "Delivered the way it was packed" },
];

/* Camera groups. Each is driven by a rig that writes its own `transform`
   attribute (see makeCam) rather than going through GSAP's SVG transform
   origin handling, which produced a broken matrix here. */
const CAM_REST = "#ds-cam-restaurant";
const CAM_CITY = "#ds-cam-city";
const CAM_APT = "#ds-cam-apartment";
const CAM_DOOR = "#ds-cam-door";
const CAM_STUDIO = "#ds-cam-studio";
const HC_CAM = "#ds-hc-cam";
const RIG_CAM = ["#ds-rig-cam", "#ds-rig-front-cam"];

/* The rig's three halves always move as one — back, bag front, and the
   container's follow group that mirrors them. */
const RIG_PLACE = ["#ds-rig-place", "#ds-rig-front-place", "#ds-hc-follow"];
const RIG_SUSP = ["#ds-rig-susp", "#ds-rig-front-susp", "#ds-hc-susp"];
const WHEELS = ["#ds-rig-wheel-r", "#ds-rig-wheel-f"];

export function DeliveryStory() {
  const root = useRef<HTMLElement>(null);

  /* Portrait gets a tighter crop of the same world rather than a shrunken
     copy of the desktop frame. Every transform is authored in world units, so
     swapping the viewBox costs nothing and changes no animation maths. */
  useEffect(() => {
    const svg = root.current?.querySelector<SVGSVGElement>(".story-svg");
    if (!svg) return;

    const portrait = window.matchMedia("(max-aspect-ratio: 1/1)");
    const sync = () => {
      svg.setAttribute("viewBox", portrait.matches ? "360 180 800 700" : "0 0 1600 900");
    };

    sync();
    portrait.addEventListener("change", sync);
    return () => portrait.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const { gsap, ScrollTrigger } = ensureGsap();
      const captions = gsap.utils.toArray<HTMLElement>(".story-caption", scope);
      const railFill = scope.querySelector<HTMLElement>(".story-hud__rail i");
      const chapterOut = scope.querySelector<HTMLElement>(".story-hud__chapter");
      if (!captions.length) return;

      /* Camera model ---------------------------------------------------- */
      /* A zoom of `s` about world point (ox, oy) is exactly
         translate(ox*(1-s), oy*(1-s)) scale(s). Writing that string onto the
         group ourselves keeps it exact under any scrub direction; GSAP's
         svgOrigin path produced a corrupt matrix on these nested groups. */
      const rigs: Array<() => void> = [];

      const makeCam = (selectors: string[]) => {
        const els = selectors.flatMap((sel) =>
          gsap.utils.toArray<SVGGElement>(sel, scope),
        );
        const state = { ox: 800, oy: 620, s: 1 };
        const render = () => {
          const tx = state.ox * (1 - state.s);
          const ty = state.oy * (1 - state.s);
          const value = `translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${state.s.toFixed(5)})`;
          for (const el of els) el.setAttribute("transform", value);
        };
        rigs.push(render);
        return state;
      };

      /* Placement rig. SVG's rotate() takes its own centre, so the two rig
         halves and the container's follow group share one pivot exactly. */
      const makePlacer = (selectors: string[], cx: number, cy: number) => {
        const els = selectors.flatMap((sel) =>
          gsap.utils.toArray<SVGGElement>(sel, scope),
        );
        const state = { r: 0, x: 0, y: 0 };
        const render = () => {
          const value = `translate(${state.x.toFixed(2)} ${state.y.toFixed(2)}) rotate(${state.r.toFixed(3)} ${cx} ${cy})`;
          for (const el of els) el.setAttribute("transform", value);
        };
        rigs.push(render);
        return state;
      };

      /* The container's own scale/spin. Its artwork is centred on (0,0) in
         this group's user space, so bare scale()/rotate() already pivot on
         the product itself. */
      const hcScaleEl = scope.querySelector<SVGGElement>("#ds-hc-scale");
      const hc = { r: 0, s: 0.36 };
      const renderHc = () => {
        hcScaleEl?.setAttribute(
          "transform",
          `scale(${hc.s.toFixed(5)}) rotate(${hc.r.toFixed(3)})`,
        );
      };
      rigs.push(renderHc);

      const renderRigs = () => {
        for (const render of rigs) render();
      };

      const camRest = makeCam([CAM_REST]);
      const camCity = makeCam([CAM_CITY]);
      const camApt = makeCam([CAM_APT]);
      const camDoor = makeCam([CAM_DOOR]);
      const camStudio = makeCam([CAM_STUDIO]);
      const camHc = makeCam([HC_CAM]);
      const camRig = makeCam(RIG_CAM);
      const place = makePlacer(RIG_PLACE, 812, 812);

      const COUNTER = { ox: 800, oy: 650 };
      const BAG = { ox: 632, oy: 592 };

      /* Bbox-relative origins are fine — these are single elements doing one
         job, and none of them need a shared pivot. */
      gsap.set("#ds-hc-base", { transformOrigin: "50% 100%" });
      gsap.set(["#ds-hc-shadow", ".ds-callout__dot"], { transformOrigin: "50% 50%" });
      gsap.set("#ds-hc-food", { transformOrigin: "50% 60%" });
      gsap.set("#ds-rs-chef-arm", { transformOrigin: "0% 0%" });
      gsap.set("#ds-dr-rider-arm", { transformOrigin: "100% 0%" });
      gsap.set("#ds-dr-panel", { transformOrigin: "0% 50%" });
      gsap.set(WHEELS, { transformBox: "fill-box", transformOrigin: "50% 50%" });

      /* Opening state ---------------------------------------------------- */
      Object.assign(camRest, { ox: 800, oy: 620, s: 1.16 });
      renderRigs();
      gsap.set(CAM_REST, { autoAlpha: 1 });
      gsap.set([CAM_CITY, CAM_APT, CAM_DOOR, CAM_STUDIO], { autoAlpha: 0 });
      gsap.set([...RIG_CAM], { autoAlpha: 0 });
      gsap.set(HC_CAM, { autoAlpha: 0 });
      gsap.set("#ds-hc-move", { x: 800, y: 648 });
      gsap.set("#ds-hc-food", { autoAlpha: 0, scale: 0.55 });
      gsap.set("#ds-hc-lid", { autoAlpha: 0, y: -210 });
      gsap.set("#ds-hc-steam", { autoAlpha: 0 });
      gsap.set("#ds-hc-seal", { opacity: 0 });
      gsap.set("#ds-hc-spec", { x: -70 });
      gsap.set("#ds-callouts", { autoAlpha: 0 });
      gsap.set("#ds-rs-clip-r", { attr: { height: 352, width: 486, x: 557, y: 416 } });
      gsap.set(".story-veil", { opacity: 1 });
      gsap.set([".story-wipe", ".story-dim"], { opacity: 0 });
      gsap.set(".story-sky__night, .story-sky__dawn, .story-sky__studio", { opacity: 0 });
      gsap.set(captions, { autoAlpha: 0 });
      gsap.set(".story-caption__line", { yPercent: 108 });
      gsap.set("#ds-rig-speed-lines", { autoAlpha: 0 });

      const master = gsap.timeline({
        /* immediateRender:false matters on every fromTo below — without it each
           one stamps its start values onto the DOM at build time, which parks
           the rig and the container wherever the last-built tween began. */
        defaults: { ease: "none", immediateRender: false },
        /* One paint per playhead move, so every rig lands on the same frame. */
        onUpdate: renderRigs,
        scrollTrigger: {
          anticipatePin: 1,
          end: () => {
            const width = window.innerWidth;
            if (width < 768) return "+=4400";
            if (width < 1180) return "+=5600";
            return "+=6600";
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (railFill) gsap.set(railFill, { scaleX: progress });
            if (!chapterOut) return;
            const pct = progress * 100;
            let label = chapters[0].label;
            for (const chapter of chapters) if (pct >= chapter.at) label = chapter.label;
            if (chapterOut.textContent !== label) chapterOut.textContent = label;
          },
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: "top top",
          trigger: scope,
        },
      });

      /* Pad the timeline to a clean 100 units so every position below reads
         as a percentage of the scroll. */
      master.to({}, { duration: 100 }, 0);

      /* Cross-fade one caption in and the previous one out. */
      const caption = (index: number, start: number, end: number) => {
        const el = captions[index];
        if (!el) return;
        const line = el.querySelector(".story-caption__line");
        const copy = el.querySelectorAll(".kicker, .story-caption__copy, .story-caption__cta");

        master
          .to(el, { autoAlpha: 1, duration: 0.6 }, start)
          .fromTo(line, { yPercent: 108 }, { duration: 1.6, ease: "power3.out", yPercent: 0 }, start)
          .fromTo(
            copy,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, duration: 1.1, ease: "power2.out", stagger: 0.28, y: 0 },
            start + 0.4,
          );

        if (end < 100) {
          master
            .to(el, { autoAlpha: 0, duration: 0.9 }, end)
            .to(line, { duration: 0.9, ease: "power2.in", yPercent: -70 }, end);
        }
      };

      /* ================================================================ */
      /* Scene 0 — arriving from the section above                         */
      /* ================================================================ */
      master
        .addLabel("intro", 0)
        .to(".story-veil", { duration: 6, opacity: 0 }, 0)
        .to(camRest, { duration: 12, ease: "power1.out", ox: 800, oy: 620, s: 1 }, 0)
        .to(".story-hud__scroll", { autoAlpha: 0, duration: 4 }, 6);

      caption(0, 1, 10);

      /* ================================================================ */
      /* Scene 1 — establishing the storefront                             */
      /* ================================================================ */
      master
        .addLabel("restaurant", 5)
        .to("#ds-rs-far", { duration: 24, x: -34 }, 0)
        .to("#ds-rs-fg", { duration: 24, x: -104 }, 0)
        .to("#ds-rs-chef-arm", { duration: 6, rotation: -7 }, 6)
        .to("#ds-rs-chef-arm", { duration: 6, rotation: 2 }, 12);

      /* ================================================================ */
      /* Scene 2 — camera pushes through the glass to the packing counter  */
      /* ================================================================ */
      master
        .addLabel("packing", 13)
        // The window opens out to the full frame, which is what carries us inside.
        .to(
          "#ds-rs-clip-r",
          { attr: { height: 900, width: 1600, x: 0, y: 0 }, duration: 6, ease: "power2.inOut" },
          12.5,
        )
        .to(".ds-rs-facade", { autoAlpha: 0, duration: 5 }, 13)
        .to(["#ds-rs-far", "#ds-rs-fg"], { autoAlpha: 0, duration: 4 }, 13)
        .to([camRest, camHc], { duration: 12, ease: "power1.inOut", ...COUNTER, s: 2.5 }, 14)
        .to(HC_CAM, { autoAlpha: 1, duration: 2.5 }, 15.5);

      /* ================================================================ */
      /* Scene 3 — the container is assembled                              */
      /* ================================================================ */
      master
        // Food settles into the tub.
        .to("#ds-hc-food", { autoAlpha: 1, duration: 2 }, 17.5)
        .fromTo(
          "#ds-hc-food",
          { scale: 0.55, y: -34 },
          { duration: 3.4, ease: "power2.out", scale: 1, y: 0 },
          17.5,
        )
        .to("#ds-hc-steam", { autoAlpha: 1, duration: 2.6 }, 19)
        .to("#ds-rs-chef", { autoAlpha: 0, duration: 3 }, 19)
        // Lid arrives, hovers, aligns, then seats.
        .to("#ds-hc-lid", { autoAlpha: 1, duration: 1.8 }, 21)
        .fromTo("#ds-hc-lid", { y: -210 }, { duration: 3.4, ease: "power2.out", y: -58 }, 21)
        .to("#ds-hc-lid", { duration: 2.2, ease: "power1.in", y: -5 }, 24.4)
        .to("#ds-hc-lid", { duration: 0.5, ease: "power2.out", y: 0 }, 26.6)
        // A compression the width of a hair — enough to feel the closure land.
        .to("#ds-hc-base", { duration: 0.35, scaleY: 0.986 }, 26.6)
        .to("#ds-hc-base", { duration: 0.8, ease: "power2.out", scaleY: 1 }, 26.95)
        .to("#ds-hc-shadow", { duration: 0.35, scale: 1.07 }, 26.6)
        .to("#ds-hc-shadow", { duration: 0.9, ease: "power2.out", scale: 1 }, 26.95)
        .to("#ds-hc-steam", { autoAlpha: 0, duration: 2 }, 26.4)
        // Rim seal confirms, then holds as a thin key line.
        .to("#ds-hc-seal", { duration: 0.7, opacity: 0.95 }, 26.8)
        .to("#ds-hc-seal", { duration: 2.2, opacity: 0.18 }, 27.6);

      /* --- hero close-up: everything else steps back ------------------- */
      master
        .addLabel("containerHero", 26)
        .to(".story-dim", { duration: 4, opacity: 0.72 }, 26)
        .to(camHc, { duration: 4.5, ease: "power2.inOut", ...COUNTER, s: 1 }, 26)
        .to("#ds-hc-move", { duration: 4.5, ease: "power2.inOut", y: 430 }, 26)
        .to(hc, { duration: 4.5, ease: "power2.inOut", s: 1.16 }, 26)
        .to("#ds-callouts", { autoAlpha: 1, duration: 1.2 }, 29)
        .to(
          ".ds-callout__line",
          { duration: 1.6, ease: "power2.out", stagger: 0.35, strokeDashoffset: 0 },
          29,
        )
        .fromTo(
          ".ds-callout__dot",
          { scale: 0 },
          { duration: 1, ease: "back.out(2.2)", scale: 1, stagger: 0.35 },
          29,
        )
        .fromTo(
          ".ds-callout__label",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, duration: 1.2, stagger: 0.35, y: 0 },
          29.6,
        );

      caption(1, 27, 34);

      /* ================================================================ */
      /* Scene 4 — the rider collects the order                            */
      /* ================================================================ */
      master
        .addLabel("pickup", 33)
        .to("#ds-callouts", { autoAlpha: 0, duration: 1.6 }, 33)
        .to(".story-dim", { duration: 3, opacity: 0 }, 33)
        .to("#ds-rs-chef", { autoAlpha: 1, duration: 3 }, 33)
        .to(camRest, { duration: 4.5, ease: "power2.inOut", ...COUNTER, s: 1 }, 33)
        .to("#ds-hc-move", { duration: 4.5, ease: "power2.inOut", y: 648 }, 33)
        .to(hc, { duration: 4.5, ease: "power2.inOut", s: 0.36 }, 33)
        // Rider rolls up to the counter and stops.
        .to(RIG_CAM, { autoAlpha: 1, duration: 1 }, 35.4)
        .fromTo(place, { x: 1500 }, { duration: 4, ease: "power2.out", x: 0 }, 35.5)
        .fromTo(WHEELS, { rotation: 0 }, { duration: 4, ease: "power2.out", rotation: 620 }, 35.5)
        .to(RIG_SUSP, { duration: 0.5, ease: "power2.out", y: 5 }, 39)
        .to(RIG_SUSP, { duration: 1.2, ease: "elastic.out(1, 0.5)", y: 0 }, 39.5);

      /* ================================================================ */
      /* Scene 5 — into the insulated bag, and it stays visible in there    */
      /* ================================================================ */
      master
        .to("#ds-hc-move", { duration: 1.8, ease: "power2.out", y: 452 }, 39.4)
        .to("#ds-hc-move", { duration: 1.9, ease: "power2.in", y: 592 }, 41.2)
        .to("#ds-hc-move", { duration: 3.7, x: 630 }, 39.4)
        .to(hc, { duration: 3.7, s: 0.3 }, 39.4)
        .to("#ds-rig-bag-front", { duration: 2.4, opacity: 0.3 }, 40.6)
        .to("#ds-rig-cutaway", { duration: 2, opacity: 0.75 }, 41.4);

      caption(2, 38, 44);

      /* ================================================================ */
      /* Scene 6 — leaving the store                                       */
      /* ================================================================ */
      master
        .addLabel("departure", 42)
        .to(CAM_REST, { autoAlpha: 0, duration: 3.5 }, 42.5)
        .to("#ds-sc-restaurant", { duration: 4, x: 1500 }, 42.5)
        .to(CAM_CITY, { autoAlpha: 1, duration: 3.5 }, 42.5)
        .to(".story-sky__night", { duration: 5, opacity: 1 }, 42)
        .to("#ds-rig-speed-lines", { autoAlpha: 0.82, duration: 1.4 }, 42.6)
        .to(RIG_SUSP, { duration: 1, ease: "power2.out", y: -7 }, 42.6)
        .to(RIG_SUSP, { duration: 1.4, ease: "power2.inOut", y: 0 }, 43.6);

      /* ================================================================ */
      /* Scene 7 — the city moves, the scooter holds frame                 */
      /* ================================================================ */
      master
        .addLabel("journey", 45)
        .to("#ds-ct-sky", { duration: 25, x: -900 }, 44)
        .to("#ds-ct-far", { duration: 25, x: -1900 }, 44)
        .to("#ds-ct-near", { duration: 25, x: -3400 }, 44)
        .to("#ds-ct-street", { duration: 25, x: -4700 }, 44)
        .to("#ds-ct-lanes", { duration: 25, x: -6100 }, 44)
        .to("#ds-ct-fg", { duration: 25, x: -7400 }, 44)
        // Wheel rotation is a straight function of scroll, so scrubbing back
        // spins them backwards.
        .fromTo(WHEELS, { rotation: 0 }, { duration: 25, rotation: 5400 }, 44)
        .to(RIG_SUSP, { duration: 1.15, ease: "sine.inOut", repeat: 15, y: -6, yoyo: true }, 44);

      /* --- container safety sequence ---------------------------------- */
      master
        .addLabel("containerProtection", 52)
        .to([camHc, camRig], { duration: 4, ease: "power2.inOut", ...BAG, s: 1.55 }, 52)
        .to(camCity, { duration: 4, ease: "power2.inOut", ...BAG, s: 1.28 }, 52)
        .to("#ds-rig-bag-front", { duration: 2.5, opacity: 0.12 }, 52.5)
        .to("#ds-rig-cutaway", { duration: 2, opacity: 1 }, 52.5)
        // Two kerbs and a bend. The bag tilts; the container stays level.
        .to(place, { duration: 0.55, ease: "power2.out", r: 1.5, y: -14 }, 54.2)
        .to(place, { duration: 0.9, ease: "power2.in", r: 0, y: 0 }, 54.75)
        .to(place, { duration: 0.5, ease: "power2.out", r: -1.2, y: -9 }, 56.6)
        .to(place, { duration: 0.9, ease: "power2.in", r: 0, y: 0 }, 57.1)
        .to(hc, { duration: 0.55, ease: "power2.out", r: -1.5 }, 54.2)
        .to(hc, { duration: 0.9, ease: "power2.in", r: 0 }, 54.75)
        .to(hc, { duration: 0.5, ease: "power2.out", r: 1.2 }, 56.6)
        .to(hc, { duration: 0.9, ease: "power2.in", r: 0 }, 57.1)
        .to("#ds-hc-seal", { duration: 0.5, opacity: 0.9 }, 54.2)
        .to("#ds-hc-seal", { duration: 1.4, opacity: 0.18 }, 55.1)
        .to("#ds-hc-seal", { duration: 0.5, opacity: 0.9 }, 56.6)
        .to("#ds-hc-seal", { duration: 1.4, opacity: 0.18 }, 57.5)
        .to([camHc, camRig], { duration: 3, ease: "power2.inOut", ...BAG, s: 1 }, 59)
        .to(camCity, { duration: 3, ease: "power2.inOut", ...BAG, s: 1 }, 59);

      caption(3, 52, 61);

      /* ================================================================ */
      /* Transition — the camera flies into the container and through it    */
      /* ================================================================ */
      master
        .addLabel("transition", 62)
        .to(camHc, { duration: 5.5, ease: "power2.in", ...BAG, s: 13 }, 62)
        .to(camCity, { duration: 5, ease: "power2.in", ...BAG, s: 2.6 }, 62)
        .to(camRig, { duration: 5.5, ease: "power2.in", ...BAG, s: 4.2 }, 62)
        .to(RIG_CAM, { autoAlpha: 0, duration: 2 }, 64.4)
        .to(CAM_CITY, { autoAlpha: 0, duration: 2.4 }, 65)
        // The lid fills the frame, then becomes the wipe. The white lands only
        // after the container has actually filled the viewport.
        .to(".story-wipe", { duration: 1.6, opacity: 1 }, 66.4)
        .to(".story-sky__dawn", { duration: 4, opacity: 1 }, 65.6)
        // Behind the opaque wipe: the one intentional cut in the sequence.
        // Short tweens rather than sets, so scrubbing back through it restores.
        .to([camHc, camCity, camRig], { duration: 0.4, s: 1 }, 68)
        .to(RIG_CAM, { autoAlpha: 1, duration: 0.3 }, 68.05)
        .fromTo(CAM_APT, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 68.3)
        .fromTo(
          camApt,
          { ox: 800, oy: 700, s: 1.5 },
          { duration: 6, ease: "power2.out", s: 1 },
          68.3,
        )
        .to(".story-wipe", { duration: 1.7, opacity: 0 }, 68.5);

      /* ================================================================ */
      /* Scene 8 — arrival                                                 */
      /* ================================================================ */
      master
        .addLabel("apartment", 70)
        .fromTo(place, { x: 900 }, { duration: 7, ease: "power3.out", x: 0 }, 68.2)
        .fromTo(WHEELS, { rotation: 0 }, { duration: 7.5, ease: "power3.out", rotation: 1500 }, 68.2)
        .to("#ds-ap-fg", { duration: 7, ease: "power3.out", x: -170 }, 68.2)
        .to("#ds-ap-far", { duration: 7, ease: "power3.out", x: -70 }, 68.2)
        .to("#ds-rig-beam", { duration: 3, opacity: 0.15 }, 74)
        .to("#ds-rig-speed-lines", { autoAlpha: 0, duration: 1.2 }, 74)
        .to(RIG_SUSP, { duration: 0.6, ease: "power2.out", y: 6 }, 74.9)
        .to(RIG_SUSP, { duration: 1.6, ease: "elastic.out(1, 0.45)", y: 0 }, 75.5);

      caption(4, 74, 81);

      /* ================================================================ */
      /* Scene 9 — the door                                                */
      /* ================================================================ */
      master
        .addLabel("handoff", 82)
        .to(CAM_APT, { autoAlpha: 0, duration: 3 }, 81.5)
        .to(RIG_CAM, { autoAlpha: 0, duration: 2.5 }, 81.5)
        .fromTo(CAM_DOOR, { autoAlpha: 0 }, { autoAlpha: 1, duration: 3 }, 81.5)
        .fromTo(
          camDoor,
          { ox: 940, oy: 500, s: 1.22 },
          { duration: 6, ease: "power2.out", s: 1 },
          81.5,
        )
        .to(HC_CAM, { autoAlpha: 0, duration: 1.4 }, 82.4)
        // Container leaves the bag and is presented.
        .to("#ds-hc-move", { duration: 3, ease: "power2.inOut", x: 1214, y: 584 }, 81.5)
        .to(hc, { duration: 3, ease: "power2.inOut", s: 0.5 }, 81.5)
        .to("#ds-dr-rider", { duration: 2, opacity: 1 }, 82.5)
        // Door swings: scaling toward the hinge edge reads as a real swing.
        .to("#ds-dr-panel", { duration: 3.4, ease: "power2.inOut", scaleX: 0.14 }, 83.2)
        .to("#ds-dr-inside", { duration: 2.6, opacity: 1 }, 83.8)
        .to("#ds-dr-spill", { duration: 2.8, opacity: 0.15 }, 84)
        .to("#ds-dr-customer", { duration: 2.2, opacity: 1 }, 84.4)
        .to(".story-dim", { duration: 2.5, opacity: 0.42 }, 86.4)
        // The handover itself.
        .to("#ds-hc-move", { duration: 2, ease: "power2.out", x: 1070, y: 528 }, 86.6)
        .to("#ds-hc-move", { duration: 2.4, ease: "power2.inOut", x: 838, y: 556 }, 88.6)
        .to(hc, { duration: 4.4, ease: "power2.inOut", s: 0.6 }, 86.6)
        .to("#ds-dr-rider-arm", { duration: 2.4, ease: "power2.out", rotation: 9 }, 86.6);

      caption(5, 86.6, 91.5);

      /* ================================================================ */
      /* Scene 10 — the container, on its own                              */
      /* ================================================================ */
      master
        .addLabel("productFinal", 91)
        .to(CAM_DOOR, { autoAlpha: 0, duration: 3 }, 91)
        .to(".story-dim", { duration: 3, opacity: 0 }, 91)
        .to(".story-sky__studio", { duration: 4, opacity: 1 }, 91)
        .to(".story-grade", { duration: 4, opacity: 0.12 }, 91)
        .fromTo(CAM_STUDIO, { autoAlpha: 0 }, { autoAlpha: 1, duration: 3.5 }, 91)
        .to(HC_CAM, { autoAlpha: 1, duration: 1.6 }, 91)
        .fromTo(
          camStudio,
          { ox: 800, oy: 430, s: 1.14 },
          { duration: 7, ease: "power2.out", s: 1 },
          91,
        )
        .to("#ds-hc-move", { duration: 5, ease: "power2.inOut", x: 800, y: 322 }, 91)
        .to(hc, { duration: 5, ease: "power2.inOut", r: -3, s: 0.98 }, 91)
        // Container reads as a product shot: warm rim goes quiet, shadow lands.
        .to("#ds-hc-seal", { duration: 3, opacity: 0.18 }, 92)
        .to("#ds-hc-spec", { duration: 6, ease: "power2.inOut", x: 90 }, 93)
        .to(hc, { duration: 5, ease: "sine.inOut", r: 1.5 }, 95)
        .to("#ds-hc-move", { duration: 5, ease: "sine.inOut", y: 308 }, 95)
        // Settle, so the pin releases into stillness rather than mid-move.
        .to("#ds-hc-move", { duration: 3, ease: "power2.out", y: 322 }, 97);

      caption(6, 93, 100);

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === scope) trigger.kill();
        });
      };
    },
    { scope: root },
  );

  return (
    <section className="delivery-story" ref={root}>
      <div className="delivery-story__stage">
        <div aria-hidden="true" className="story-sky">
          <span className="story-sky__layer story-sky__dusk" />
          <span className="story-sky__layer story-sky__night" />
          <span className="story-sky__layer story-sky__dawn" />
          <span className="story-sky__layer story-sky__studio" />
        </div>

        <div aria-hidden="true" className="story-plate">
          <svg
            className="story-svg"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1600 900"
          >
            <StoryDefs />

            <g className="ds-scene" id="ds-cam-restaurant">
              <RestaurantScene />
            </g>
            <g className="ds-scene" id="ds-cam-city">
              <CityScene />
            </g>
            <g className="ds-scene" id="ds-cam-apartment">
              <ApartmentScene />
            </g>
            <g className="ds-scene" id="ds-cam-door">
              <CustomerScene />
            </g>
            <g className="ds-scene" id="ds-cam-studio">
              <StudioScene />
            </g>

            {/* Sits above the scenery, below the product — so "everything else
                steps back" never dims the container itself. */}
            <rect className="story-dim" fill="#01150c" height="900" opacity="0" width="1600" x="0" y="0" />

            <RiderRig />

            {/* The one container, from the counter to the closing shot. */}
            <g id="ds-hc-cam">
              <g id="ds-hc-follow">
                <g id="ds-hc-susp">
                  <g id="ds-hc-move">
                    <g id="ds-hc-scale">
                      <FoodContainer />
                    </g>
                  </g>
                </g>
              </g>
            </g>

            <RiderBagFront />
            <ProductCallouts />
          </svg>
        </div>

        <span aria-hidden="true" className="story-grade" />
        <span aria-hidden="true" className="story-grain" />
        <span aria-hidden="true" className="story-wipe" />
        <span aria-hidden="true" className="story-veil" />

        <StoryCaptions />

        <div aria-hidden="true" className="story-hud">
          <span className="story-hud__chapter">01 · Kitchen</span>
          <span className="story-hud__rail">
            <i />
          </span>
          <span className="story-hud__scroll">Scroll</span>
        </div>
      </div>

      {/* Shown instead of the pinned sequence when motion is reduced. */}
      <div className="delivery-story__static">
        <Container>
          <p className="kicker">The delivery journey</p>
          <h2>Packaging that completes the journey.</h2>
          <p className="section-copy">
            From kitchen to doorstep, engineered for modern food delivery.
          </p>
          <ol className="story-static__beats">
            {beats.map((beat, index) => (
              <li key={beat.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{beat.title}</h3>
                <p>{beat.body}</p>
              </li>
            ))}
          </ol>
          <Button href="/products" variant="accent">
            Explore Our Containers
          </Button>
        </Container>
      </div>
    </section>
  );
}
