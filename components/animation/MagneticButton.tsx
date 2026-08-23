"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: "dark" | "light" | "outline" | "accent";
  className?: string;
};

const variants = {
  dark: "border-charcoal bg-charcoal text-porcelain hover:bg-soft-black",
  light: "border-porcelain bg-porcelain text-charcoal hover:bg-white",
  outline: "border-current bg-transparent text-current hover:bg-charcoal hover:text-porcelain",
  accent: "border-ember bg-ember text-charcoal hover:bg-[#d99a00]",
};

export function MagneticButton({
  children,
  href,
  variant = "dark",
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  const move = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!ref.current || event.pointerType !== "mouse") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    ref.current.style.transform = `translate3d(${x * 0.12}px, ${y * 0.18}px, 0)`;
  };

  return (
    <Link
      className={cn(
        "group inline-flex min-h-11 items-center justify-center gap-3 border px-5 py-3 text-xs font-semibold uppercase transition duration-300 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember",
        variants[variant],
        className,
      )}
      href={href}
      onPointerLeave={reset}
      onPointerMove={move}
      ref={ref}
    >
      <span>{children}</span>
      <span className="button-arrow" aria-hidden="true">
        <ArrowUpRight size={16} strokeWidth={1.8} />
      </span>
    </Link>
  );
}
