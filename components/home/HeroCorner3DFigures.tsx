import Image from "next/image";
import type { CSSProperties } from "react";

import { assetPath } from "@/lib/assets";

type ProductFloatStyle = CSSProperties & {
  "--float-delay": string;
  "--float-size": string;
  "--float-mobile-size": string;
  "--float-tilt": string;
};

const floatingProducts = [
  {
    alt: "",
    delay: "0s",
    height: 712,
    mobileSize: "9.8rem",
    name: "round container",
    size: "clamp(11.2rem, 18vw, 15rem)",
    src: "/images/generated/hero-real-float/round-empty-container.webp",
    tilt: "-3deg",
    width: 1175,
  },
  {
    alt: "",
    delay: "-4.8s",
    height: 580,
    mobileSize: "10.2rem",
    name: "rectangular tray",
    size: "clamp(12.2rem, 20vw, 16.4rem)",
    src: "/images/generated/hero-real-float/rectangle-empty-tray.webp",
    tilt: "2deg",
    width: 1248,
  },
  {
    alt: "",
    delay: "-9.6s",
    height: 1001,
    mobileSize: "8.6rem",
    name: "biodegradable clamshell",
    size: "clamp(10rem, 16vw, 13.5rem)",
    src: "/images/generated/hero-real-float/biodegradable-empty-clamshell.webp",
    tilt: "-5deg",
    width: 1216,
  },
  {
    alt: "",
    delay: "-14.4s",
    height: 749,
    mobileSize: "7.9rem",
    name: "biodegradable cups",
    size: "clamp(8.8rem, 14vw, 11.8rem)",
    src: "/images/generated/hero-real-float/biodegradable-coffee-cups.webp",
    tilt: "4deg",
    width: 948,
  },
];

export function HeroCorner3DFigures() {
  return (
    <div className="top-hero__corner-3d" aria-hidden="true">
      <div className="top-hero__real-float-track">
        {floatingProducts.map((product) => (
          <div
            className="top-hero__real-float-item"
            key={product.name}
            style={
              {
                "--float-delay": product.delay,
                "--float-mobile-size": product.mobileSize,
                "--float-size": product.size,
                "--float-tilt": product.tilt,
              } as ProductFloatStyle
            }
          >
            <Image
              alt={product.alt}
              className="top-hero__real-float-image"
              height={product.height}
              loading="eager"
              sizes="(max-width: 700px) 46vw, 18vw"
              src={assetPath(product.src)}
              unoptimized
              width={product.width}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
