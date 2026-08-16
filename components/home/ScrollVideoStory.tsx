"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type ScrollVideoStage = {
  start: number;
  end: number;
  kicker: string;
  title: string[];
  body: string;
  cta?: {
    label: string;
    href: string;
  };
};

type ScrollVideoStoryProps = {
  videoSrc: string;
  webmSrc?: string;
  stages: ScrollVideoStage[];
  textPosition?: "left" | "right";
  scrollDistance?: number;
  objectPosition?: string;
  className?: string;
};

function sourceType(src: string) {
  if (src.endsWith(".webm")) return "video/webm";
  if (src.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}

function stageIndexForProgress(stages: ScrollVideoStage[], progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  const index = stages.findIndex((stage, stageIndex) => {
    const isLast = stageIndex === stages.length - 1;
    return clamped >= stage.start && (clamped < stage.end || isLast);
  });

  return index === -1 ? stages.length - 1 : index;
}

export function ScrollVideoStory({
  videoSrc,
  webmSrc,
  stages,
  textPosition = "left",
  scrollDistance = 5200,
  objectPosition = "center center",
  className,
}: ScrollVideoStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const activeStageRef = useRef(-1);

  const orderedStages = useMemo(
    () => [...stages].sort((stageA, stageB) => stageA.start - stageB.start),
    [stages],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video || orderedStages.length === 0) return;

      const { gsap, ScrollTrigger } = ensureGsap();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const prefersStaticMobile = window.matchMedia("(max-width: 767px)").matches;
      const stageElements = stageRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = Array.from(section.querySelectorAll<HTMLElement>("[data-scroll-video-dot]"));
      const getStageParts = (stageElement: HTMLDivElement) =>
        Array.from(stageElement.querySelectorAll<HTMLElement>("[data-scroll-video-part]"));

      let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;
      let scrubTween: ReturnType<typeof gsap.to> | null = null;
      let loadedMetadataCleanup: (() => void) | null = null;
      let unlockCleanup: (() => void) | null = null;
      let playCleanup: (() => void) | null = null;
      let mobilePlaybackCleanup: (() => void) | null = null;
      let allowBriefPlayback = false;
      let scrubDuration = 0;
      const playhead = { progress: 0 };
      const clearPinComplete = () => section.classList.remove("is-pin-complete");
      const markPinComplete = () => section.classList.add("is-pin-complete");

      const setIndicator = (stageIndex: number) => {
        if (progressRef.current) {
          progressRef.current.textContent = `${String(stageIndex + 1).padStart(2, "0")} / ${String(
            orderedStages.length,
          ).padStart(2, "0")}`;
        }

        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === stageIndex);
        });
      };

      const activateStage = (stageIndex: number, immediate = false) => {
        if (stageIndex === activeStageRef.current) return;

        const previousIndex = activeStageRef.current;
        const previousStage = stageElements[previousIndex];
        const nextStage = stageElements[stageIndex];

        activeStageRef.current = stageIndex;
        setIndicator(stageIndex);

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
          if (index !== stageIndex && index !== previousIndex) {
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
              duration: 0.22,
              ease: "power2.out",
              filter: "blur(4px)",
              stagger: 0.035,
              y: -24,
            })
            .set(previousStage, { autoAlpha: 0 });
        }

        timeline
          .set(nextStage, { autoAlpha: 1 }, previousStage ? "<0.1" : 0)
          .fromTo(
            nextParts,
            { autoAlpha: 0, filter: "blur(6px)", y: 32 },
            {
              autoAlpha: 1,
              duration: 0.58,
              ease: "power3.out",
              filter: "blur(0px)",
              stagger: 0.07,
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
        const targetTime = progress * scrubDuration;
        if (Number.isFinite(targetTime) && Math.abs(video.currentTime - targetTime) > 0.015) {
          try {
            video.currentTime = targetTime;
          } catch {
            // Some mobile browsers briefly reject seeks while metadata warms up.
          }
        }

        activateStage(stageIndexForProgress(orderedStages, progress));

        if (hintRef.current) {
          hintRef.current.style.opacity = progress > 0.1 ? "0" : String(1 - progress / 0.1);
          hintRef.current.style.transform = `translateY(${progress * -12}px)`;
        }
      };

      const setScrubProgress = (progress: number) => {
        playhead.progress = Math.min(1, Math.max(0, progress));
        renderScrubFrame();
      };

      const setupScrollScrub = () => {
        scrubDuration = Number.isFinite(video.duration) ? Math.max(0, video.duration - 0.12) : 0;
        video.muted = true;
        video.defaultMuted = true;
        video.pause();
        activeStageRef.current = -1;

        if (prefersStaticMobile) {
          video.autoplay = true;
          video.loop = true;
          activateStage(0, true);
          const playWhenVisible = () => {
            if (document.visibilityState !== "visible") return;
            void video.play().catch(() => {
              video.currentTime = 0.001;
            });
          };

          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry && entry.intersectionRatio > 0) {
                playWhenVisible();
              } else {
                video.pause();
              }
            },
            { rootMargin: "140px 0px", threshold: 0 },
          );

          observer.observe(section);
          playWhenVisible();
          mobilePlaybackCleanup = () => {
            observer.disconnect();
            video.pause();
          };
          return;
        }

        video.autoplay = false;
        video.loop = false;

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
          end: () => {
            const width = window.innerWidth;
            if (width < 768) return `+=${Math.round(scrollDistance * 0.9)}`;
            if (width < 1180) return `+=${Math.round(scrollDistance * 1.12)}`;
            return `+=${Math.round(scrollDistance * 1.35)}`;
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
        if (!allowBriefPlayback && !prefersStaticMobile) {
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

      if (!prefersStaticMobile) {
        window.addEventListener("pointerdown", unlockSeeking, { once: true, passive: true });
        unlockCleanup = () => window.removeEventListener("pointerdown", unlockSeeking);
      }

      return () => {
        loadedMetadataCleanup?.();
        unlockCleanup?.();
        mobilePlaybackCleanup?.();
        scrollTrigger?.kill();
        scrubTween?.kill();
        playCleanup?.();
        section.classList.remove("is-pin-complete");
      };
    },
    { dependencies: [orderedStages, scrollDistance], revertOnUpdate: true, scope: sectionRef },
  );

  const primarySource = webmSrc ?? videoSrc;
  const fallbackSource = webmSrc ? videoSrc : null;

  return (
    <section
      className={cn("scroll-video-story", `scroll-video-story--${textPosition}`, className)}
      ref={sectionRef}
    >
      <video
        aria-hidden="true"
        className="scroll-video-story__video"
        disablePictureInPicture
        muted
        playsInline
        preload="auto"
        ref={videoRef}
        style={{ objectPosition }}
      >
        <source src={primarySource} type={sourceType(primarySource)} />
        {fallbackSource ? <source src={fallbackSource} type={sourceType(fallbackSource)} /> : null}
      </video>

      <div className="scroll-video-story__shade" aria-hidden="true" />
      <div className="scroll-video-story__grain" aria-hidden="true" />

      <div className="scroll-video-story__copy" aria-live="polite">
        <div className="scroll-video-story__stage-wrap">
          {orderedStages.map((stage, stageIndex) => (
            <div
              aria-hidden={stageIndex === 0 ? "false" : "true"}
              className="scroll-video-story__stage"
              key={`${stage.kicker}-${stageIndex}`}
              ref={(node) => {
                stageRefs.current[stageIndex] = node;
              }}
            >
              <p className="kicker" data-scroll-video-part>
                {stage.kicker}
              </p>
              <h2 data-scroll-video-part>
                {stage.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <p className="scroll-video-story__body" data-scroll-video-part>
                {stage.body}
              </p>
              {stage.cta ? (
                <Link className="scroll-video-story__cta" data-scroll-video-part href={stage.cta.href}>
                  {stage.cta.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        <div className="scroll-video-story__meta" aria-hidden="true">
          <span ref={progressRef}>01 / {String(orderedStages.length).padStart(2, "0")}</span>
          <div className="scroll-video-story__dots">
            {orderedStages.map((stage, index) => (
              <i
                className={index === 0 ? "is-active" : undefined}
                data-scroll-video-dot
                key={`${stage.kicker}-dot`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-video-story__hint" ref={hintRef}>
        <span>Scroll to explore</span>
        <i />
      </div>
    </section>
  );
}
