"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

type MobileMenuProps = {
  open: boolean;
  links: { href: string; label: string }[];
  onClose: () => void;
  ctaLabel?: string;
};

export function MobileMenu({ ctaLabel = "Contact Us", open, links, onClose }: MobileMenuProps) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div className={open ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!open}>
      <button aria-label="Close menu" className="mobile-menu__close" onClick={onClose} type="button">
        <X size={22} strokeWidth={1.7} />
      </button>
      <nav aria-label="Mobile navigation">
        {links.map((link) => (
          <Link href={link.href} key={link.href} onClick={onClose} prefetch>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="mobile-menu__cta" href="/contact" onClick={onClose} prefetch>
        {ctaLabel}
      </Link>
    </div>
  );
}
