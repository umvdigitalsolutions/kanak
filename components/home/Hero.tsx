"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap } from "@/lib/animations";
import { assetPath } from "@/lib/assets";
import { MagneticButton } from "@/components/animation/MagneticButton";

const heroStages = [
  {
    start: 0,
    end: 0.28,
    kicker: "Food-grade container manufacturing",
    title: ["Built", "for food", "delivery."],
    body: "Kanak Mouldings manufactures rigid food packaging containers for takeaway and delivery businesses.",
  },
  {
    start: 0.28,
    end: 0.5,
    kicker: "Material consistency",
    title: ["Reliable", "plastic", "form."],
    body: "Container material, finish and production specifications can be aligned to the required food-contact application.",
  },
  {
    start: 0.5,
    end: 0.7,
    kicker: "Lid fit and sealing",
    title: ["Airtight", "lid", "direction."],
    body: "The range is positioned around clear-lid handling, rim stability and a practical closure for packed food movement.",
  },
  {
    start: 0.7,
    end: 0.88,
    kicker: "Strength in handling",
    title: ["Stack.", "Store.", "Dispatch."],
    body: "Black, white and transparent formats are presented for easy handling, storage and commercial dispatch workflows.",
  },
  {
    start: 0.88,
    end: 1,
    kicker: "Quality-led supply",
    title: ["Checked", "before", "scale."],
    body: "Quotation discussions can confirm material grade, capacity, lid fit, packing quantity and compliance requirements.",
  },
] as const;

function heroStageIndex(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  const index = heroStages.findIndex((stage, stageIndex) => {
    const isLast = stageIndex === heroStages.length - 1;
    return clamped >= stage.start && (clamped < stage.end || isLast);
  });

  return index === -1 ? heroStages.length - 1 : index;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeStageRef = useRef(-1);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      const { gsap, ScrollTrigger } = ensureGsap();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stageElements = stageRefs.current.filter(Boolean) as HTMLDivElement[];
      const getStageParts = (stageElement: HTMLDivElement) =>
        Array.from(stageElement.querySelectorAll<HTMLElement>("[data-hero-part]"));

      let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;
      let scrubTween: ReturnType<typeof gsap.to> | null = null;
      let loadedMetadataCleanup: (() => void) | null = null;
      let unlockCleanup: (() => void) | null = null;
      let playCleanup: (() => void) | null = null;
      let scrubDuration = 0;
      let allowBriefPlayback = false;
      const playhead = { progress: 0 };
      const clearPinComplete = () => section.classList.remove("is-pin-complete");
      const markPinComplete = () => section.classList.add("is-pin-complete");

      const activateStage = (stageIndex: number, immediate = false) => {
        if (stageIndex === activeStageRef.current) return;

        const previousIndex = activeStageRef.current;
        const previousStage = stageElements[previousIndex];
        const nextStage = stageElements[stageIndex];

        activeStageRef.current = stageIndex;

        if (!nextStage) return;

        stageElements.forEach((stage, index) => {
          stage.setAttribute("aria-hidden", index === stageIndex ? "false" : "true");
        });

        const allParts = stageElements.flatMap(getStageParts);
        const nextParts = getStageParts(nextStage);
        gsap.killTweensOf([previousStage, nextStage, ...allParts].filter(Boolean));

        if (immediate) {
          stageElements.forEach((stage, index) => {
            const parts = getStageParts(stage);
            gsap.set(stage, { autoAlpha: index === stageIndex ? 1 : 0 });
            gsap.set(parts, {
              autoAlpha: index === stageIndex ? 1 : 0,
              filter: "blur(0px)",
              y: 0,
            });
          });
          return;
        }

        stageElements.forEach((stage, index) => {
          if (index !== stageIndex) {
            const parts = getStageParts(stage);
            gsap.set(stage, { autoAlpha: 0 });
            gsap.set(parts, { autoAlpha: 0, filter: "blur(0px)", y: 0 });
          }
        });

        const timeline = gsap.timeline();

        if (previousStage) {
          const previousParts = getStageParts(previousStage);
          timeline
            .to(previousParts, {
              autoAlpha: 0,
              duration: 0.2,
              ease: "power2.out",
              filter: "blur(4px)",
              stagger: 0.03,
              y: -24,
            })
            .set(previousStage, { autoAlpha: 0 });
        }

        timeline
          .set(nextStage, { autoAlpha: 1 }, previousStage ? "<0.08" : 0)
          .fromTo(
            nextParts,
            { autoAlpha: 0, filter: "blur(6px)", y: 30 },
            {
              autoAlpha: 1,
              duration: 0.56,
              ease: "power3.out",
              filter: "blur(0px)",
              stagger: 0.065,
              y: 0,
            },
            previousStage ? "<0.08" : 0,
          );
      };

      const renderScrubFrame = () => {
        if (!scrubDuration) return;

        if (!video.paused) {
          video.pause();
        }

        const progress = Math.min(1, Math.max(0, playhead.progress));
        const safeTime = progress * scrubDuration;
        if (Number.isFinite(safeTime) && Math.abs(video.currentTime - safeTime) > 0.018) {
          try {
            video.currentTime = safeTime;
          } catch {
            // Browsers can reject seeks for a moment while the MP4 decoder warms up.
          }
        }

        activateStage(heroStageIndex(progress));
      };

      const setScrubProgress = (progress: number) => {
        playhead.progress = Math.min(1, Math.max(0, progress));
        renderScrubFrame();
      };

      const setupScrollScrub = () => {
        scrubDuration = Number.isFinite(video.duration) ? Math.max(0, video.duration - 0.12) : 0;
        video.muted = true;
        video.pause();
        activeStageRef.current = -1;

        if (!scrubDuration || prefersReducedMotion) {
          activateStage(0, true);
          return;
        }

        playhead.progress = 0;
        video.currentTime = 0.001;
        activateStage(0, true);

        scrollTrigger?.kill();
        scrubTween?.kill();
        scrubTween = gsap.to(playhead, {
          progress: 1,
          duration: 1,
          ease: "none",
          paused: true,
          onUpdate: renderScrubFrame,
        });

        scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          // Five stages at roughly 400-560px each: enough travel to read each
          // beat without the hero eating six viewports of scroll on its own.
          end: () => {
            const width = window.innerWidth;
            if (width < 768) return "+=2000";
            if (width < 1180) return "+=2400";
            return "+=2800";
          },
          animation: scrubTween,
          pin: true,
          pinSpacing: true,
          scrub: 1.05,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: clearPinComplete,
          onEnterBack: clearPinComplete,
          onLeave: markPinComplete,
          onLeaveBack: clearPinComplete,
          onRefresh: (self) => {
            section.classList.toggle("is-pin-complete", self.progress >= 1 && !self.isActive);
          },
        });

        ScrollTrigger.refresh();
        setScrubProgress(scrollTrigger.progress);
      };

      const pauseUnexpectedPlayback = () => {
        if (!allowBriefPlayback) {
          window.requestAnimationFrame(() => video.pause());
        }
      };

      video.addEventListener("play", pauseUnexpectedPlayback);
      playCleanup = () => video.removeEventListener("play", pauseUnexpectedPlayback);

      if (video.readyState >= 1) {
        setupScrollScrub();
      } else {
        const onLoadedMetadata = () => setupScrollScrub();
        video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
        loadedMetadataCleanup = () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.load();
      }

      const unlockSeeking = () => {
        allowBriefPlayback = true;
        const playPromise = video.play();

        const lockAgain = () => {
          video.pause();
          allowBriefPlayback = false;
          setScrubProgress(scrollTrigger?.progress ?? 0);
        };

        if (playPromise) {
          void playPromise.then(lockAgain).catch(lockAgain);
        } else {
          lockAgain();
        }
      };

      window.addEventListener("pointerdown", unlockSeeking, { once: true, passive: true });
      unlockCleanup = () => window.removeEventListener("pointerdown", unlockSeeking);

      return () => {
        loadedMetadataCleanup?.();
        unlockCleanup?.();
        playCleanup?.();
        scrollTrigger?.kill();
        scrubTween?.kill();
        section.classList.remove("is-pin-complete");
      };
    },
    { scope: sectionRef },
  );

  return (
    <section className="hero" id="container-story" ref={sectionRef}>
      <video
        aria-hidden="true"
        className="hero__video"
        disablePictureInPicture
        muted
        playsInline
        preload="auto"
        ref={videoRef}
      >
        <source src={assetPath("/videos/box-video-scrub.mp4")} type="video/mp4" />
      </video>
      <div className="hero__background" aria-hidden="true" />
      <div className="hero__smoke" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero__shade" />
      <div className="hero__content">
        <div className="hero__copy" aria-live="polite">
          <div className="hero__stage-wrap">
            {heroStages.map((stage, stageIndex) => (
              <div
                aria-hidden={stageIndex === 0 ? "false" : "true"}
                className="hero__stage"
                key={stage.kicker}
                ref={(node) => {
                  stageRefs.current[stageIndex] = node;
                }}
              >
                <p className="kicker" data-hero-part>
                  {stage.kicker}
                </p>
                <h1 data-hero-part>
                  {stage.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
                <p className="hero__body" data-hero-part>
                  {stage.body}
                </p>
              </div>
            ))}
          </div>
          <div className="hero__actions">
            <MagneticButton href="/products" variant="light">
              Explore Containers
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline">
              Request a Quote
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
