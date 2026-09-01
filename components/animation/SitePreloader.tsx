"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import styles from "./SitePreloader.module.css";

type LoaderPhase = "visible" | "leaving" | "hidden";

const loaderStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 2147483647,
  display: "grid",
  placeItems: "center",
  overflow: "hidden",
  background: "#fffdf7",
};

const markStyle: CSSProperties = {
  position: "relative",
  width: "clamp(11rem, 18vw, 14.5rem)",
  aspectRatio: "1",
};

const logoStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

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
    const minimumDuration = reduceMotion ? 180 : 920;
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
      exitTimer = window.setTimeout(() => {
        setPhase("hidden");
        window.dispatchEvent(new Event("kanak:preloader-complete"));
      }, reduceMotion ? 80 : 460);
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
      className={`${styles.preloader}${phase === "leaving" ? ` ${styles.leaving}` : ""}`}
      data-site-preloader
      role="status"
      style={{
        ...loaderStyle,
        opacity: phase === "leaving" ? 0 : 1,
        visibility: phase === "leaving" ? "hidden" : "visible",
      }}
    >
      <div className={styles.mark} style={markStyle}>
        <Image
          alt="Kanak Mouldings"
          className={styles.logo}
          height={232}
          priority
          sizes="(max-width: 600px) 176px, 232px"
          src="/Kanak%20Logo.png"
          style={logoStyle}
          width={232}
        />
        <span aria-hidden="true" className={styles.track}>
          <span />
        </span>
      </div>
    </div>
  );
}
