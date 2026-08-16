"use client";

import Link from "next/link";
import { X } from "lucide-react";

type MobileMenuProps = {
  open: boolean;
  links: { href: string; label: string }[];
  onClose: () => void;
  ctaLabel?: string;
};

export function MobileMenu({ ctaLabel = "Contact Us", open, links, onClose }: MobileMenuProps) {
  return (
    <div className={open ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!open}>
      <button aria-label="Close menu" className="mobile-menu__close" onClick={onClose} type="button">
        <X size={22} strokeWidth={1.7} />
      </button>
      <nav aria-label="Mobile navigation">
        {links.map((link) => (
          <Link href={link.href} key={link.href} onClick={onClose}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="mobile-menu__cta" href="/contact" onClick={onClose}>
        {ctaLabel}
      </Link>
    </div>
  );
}
