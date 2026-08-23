"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StoryHud, StoryOverlay } from "@/components/delivery-story-3d/StoryOverlay";
import { beatIndexForProgress, mix, range, smoothRange, storyBeats } from "@/components/delivery-story-3d/storyProgress";
import { assetPath } from "@/lib/assets";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const deliverySceneryImage = assetPath("/scenery.png");
const deliveryLocationImage = assetPath("/location.png");
const deliveryScootyImage = assetPath("/scooty-grounded.png");
const deliveryHandoverImage = "/delivered.png?v=handover";
const deliveryContainerImage = assetPath("/images/generated/food-container-cutout.png");

function subscribeClientReady(_onStoreChange: () => void) {
  return () => undefined;
}

function getClientReadySnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function setCompositeVars(root: HTMLElement, progress: number) {
  const finalIn = smoothRange(progress, 0.93, 1);
  const riderIn = smoothRange(progress, 0.08, 0.18);
  const riderOut = smoothRange(progress, 0.78, 0.86);
  const travel = range(progress, 0.08, 0.78);
  const destinationIn = smoothRange(progress, 0.66, 0.82) * (1 - smoothRange(progress, 0.86, 0.94));
  const handover = smoothRange(progress, 0.82, 0.9) * (1 - smoothRange(progress, 0.92, 0.98));
  const containerIn = smoothRange(progress, 0.95, 1);

  root.style.setProperty("--journey-opacity", String(1 - finalIn * 0.96));
  root.style.setProperty("--route-back-x", `${(-travel * 5.5).toFixed(3)}vw`);
  root.style.setProperty("--route-mid-x", `${(-travel * 12).toFixed(3)}vw`);
  root.style.setProperty("--route-front-x", `${(-travel * 20).toFixed(3)}vw`);
  root.style.setProperty("--road-x", `${(-travel * 62).toFixed(3)}vw`);
  root.style.setProperty("--destination-opacity", String(destinationIn));
  root.style.setProperty("--road-opacity", String((1 - destinationIn) * (1 - finalIn)));
  root.style.setProperty("--final-opacity", String(finalIn));

  root.style.setProperty("--scooter-opacity", String(riderIn * (1 - riderOut)));
  root.style.setProperty("--scooter-x", `${mix(-24, 76, travel).toFixed(3)}vw`);
  root.style.setProperty("--scooter-y", `${mix(94, 90.5, travel).toFixed(3)}vh`);
  root.style.setProperty("--scooter-scale", String(mix(0.44, 0.6, travel)));

  root.style.setProperty("--handover-opacity", String(handover));
  root.style.setProperty("--handover-x", `${mix(68, 62, smoothRange(progress, 0.82, 0.92)).toFixed(3)}vw`);
  root.style.setProperty("--handover-y", `${mix(99.2, 97.6, smoothRange(progress, 0.82, 0.92)).toFixed(3)}vh`);
  root.style.setProperty("--handover-scale", String(mix(0.58, 0.72, smoothRange(progress, 0.82, 0.92))));

  root.style.setProperty("--container-opacity", String(containerIn));
  root.style.setProperty("--container-scale", String(mix(0.82, 1, containerIn)));
  root.style.setProperty("--container-y", `${mix(3.5, -1.5, containerIn).toFixed(3)}vh`);
}

function DeliveryCompositeLayers() {
  return (
    <div aria-hidden="true" className="delivery-3d-composite">
      <div className="delivery-comp-scene delivery-comp-scene--journey">
        <Image
          alt=""
          className="delivery-route-scenery"
          fill
          sizes="100vw"
          src={deliverySceneryImage}
        />
        <Image
          alt=""
          className="delivery-route-location"
          fill
          sizes="100vw"
          src={deliveryLocationImage}
        />
        <span className="delivery-route-road" />
        <span className="delivery-route-road-lines" />
        <span className="delivery-route-road-shadow" />
        <span className="delivery-route-shade" />
      </div>

      <div className="delivery-comp-scene delivery-comp-scene--final" />

      <div className="delivery-comp-sprite delivery-comp-sprite--scooter">
        <Image alt="" height={1122} sizes="42vw" src={deliveryScootyImage} width={1402} />
      </div>
    </div>
  );
}

function DeliveryForegroundLayers() {
  return (
    <div aria-hidden="true" className="delivery-3d-foreground">
      <div className="delivery-foreground-handover">
        <span className="delivery-foreground-handover__shadow" />
        <Image
          alt=""
          className="delivery-foreground-handover__image"
          height={1070}
          sizes="52vw"
          src={deliveryHandoverImage}
          unoptimized
          width={1249}
        />
      </div>
      <Image
        alt=""
        className="delivery-final-container"
        height={1024}
        priority
        sizes="(max-width: 680px) 92vw, 58vw"
        src={deliveryContainerImage}
        width={1536}
      />
    </div>
  );
}

export function DeliveryStory3D() {
  const rootRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const clientReady = useSyncExternalStore(
    subscribeClientReady,
    getClientReadySnapshot,
    getServerSnapshot,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot,
  );
  const enableScrollStory = clientReady && !reducedMotion;

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = root?.querySelector<HTMLElement>(".delivery-3d__pin");
      if (!root || !pin || !enableScrollStory) return;
      const section = root;

      const { gsap } = ensureGsap();
      root.style.setProperty("--delivery-progress", "0");
      setCompositeVars(root, 0);
      activeIndexRef.current = 0;
      setActiveIndex(0);

      function updateProgress(progress: number) {
        section.style.setProperty("--delivery-progress", progress.toFixed(4));
        setCompositeVars(section, progress);

        const nextIndex = beatIndexForProgress(progress);
        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }
      }

      let getTimelineProgress = () => 0;
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: () => updateProgress(getTimelineProgress()),
        scrollTrigger: {
          anticipatePin: 1,
          end: () => `+=${Math.round(window.innerHeight * 11)}`,
          invalidateOnRefresh: true,
          pin,
          pinSpacing: true,
          scrub: 1.25,
          start: "top top",
          trigger: section,
        },
      });
      getTimelineProgress = () => timeline.progress();

      timeline
        .addLabel("rider", 0)
        .to({}, { duration: 1.1 })
        .addLabel("transit")
        .to({}, { duration: 1 })
        .addLabel("handover")
        .to({}, { duration: 1.2 })
        .addLabel("container")
        .to({}, { duration: 1 });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { dependencies: [enableScrollStory], scope: rootRef },
  );

  return (
    <section className="delivery-3d" data-delivery-beat={activeIndex} ref={rootRef}>
      <div className="delivery-3d__pin">
        <DeliveryCompositeLayers />

        <DeliveryForegroundLayers />
        <span aria-hidden="true" className="delivery-3d__grade" />
        <span aria-hidden="true" className="delivery-3d__vignette" />
        <StoryOverlay activeIndex={activeIndex} />
        <StoryHud />
      </div>

      <Container className="delivery-3d-static">
        <p className="kicker">Delivery packaging performance</p>
        <h2>Container quality that travels well.</h2>
        <p className="section-copy">
          Food-grade deli boxes manufactured for dependable lid fit, rigid handling and dispatch-ready packing.
        </p>
        <ol>
          {storyBeats.slice(0, -1).map((beat, index) => (
            <li key={beat.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{beat.kicker}</strong>
              <p>{beat.body}</p>
            </li>
          ))}
        </ol>
        <Button href="/products" variant="accent">
          Explore Our Containers
        </Button>
      </Container>
    </section>
  );
}
