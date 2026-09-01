"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type LoaderPhase = "visible" | "leaving" | "hidden";

export function SitePreloader() {
  const pathname = usePathname();
  const [shouldRun] = useState(() => !pathname.startsWith("/admin"));
  const [phase, setPhase] = useState<LoaderPhase>(shouldRun ? "visible" : "hidden");

  useEffect(() => {
    if (!shouldRun) {
      return;
    }

    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = reduceMotion ? 180 : 760;
    let pageReady = document.readyState === "complete";
    let minimumElapsed = false;
    let exitTimer: number | undefined;

    root.classList.add("site-is-loading");

    const finish = () => {
      if (!pageReady || !minimumElapsed || exitTimer) {
        return;
      }

      setPhase("leaving");
      root.classList.remove("site-is-loading");
      exitTimer = window.setTimeout(() => setPhase("hidden"), reduceMotion ? 80 : 460);
    };

    const handleLoad = () => {
      pageReady = true;
      finish();
    };

    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true;
      finish();
    }, minimumDuration);
    const fallbackTimer = window.setTimeout(handleLoad, 4000);

    if (!pageReady) {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
      root.classList.remove("site-is-loading");
    };
  }, [shouldRun]);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      aria-label="Loading Kanak Mouldings"
      className={`site-preloader${phase === "leaving" ? " is-leaving" : ""}`}
      role="status"
    >
      <div className="site-preloader__mark">
        <Image
          alt="Kanak Mouldings"
          className="site-preloader__logo"
          height={500}
          priority
          sizes="(max-width: 600px) 132px, 168px"
          src="/Kanak%20Logo.png"
          width={500}
        />
        <span aria-hidden="true" className="site-preloader__track">
          <span />
        </span>
      </div>
    </div>
  );
}
