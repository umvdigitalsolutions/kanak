"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, X } from "lucide-react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { company } from "@/data/company";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

type MobileMenuProps = {
  open: boolean;
  links: { href: string; label: string }[];
  onClose: () => void;
  ctaLabel?: string;
};

export function MobileMenu({ ctaLabel = "Contact Us", open, links, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <button
        aria-label="Close menu"
        className={open ? "mobile-menu__backdrop is-visible" : "mobile-menu__backdrop"}
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        type="button"
      />
      <div className={open ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!open}>
      <div className="mobile-menu__bar">
        <Link className="mobile-menu__brand" href="/" onClick={onClose} aria-label="Kanak Mouldings home">
          <Image alt="" height={500} sizes="72px" src="/images/Kanak%20Logo.png" width={500} />
        </Link>
        <button aria-label="Close menu" className="mobile-menu__close" onClick={onClose} type="button">
          <X size={20} strokeWidth={1.9} />
        </button>
      </div>

      <nav aria-label="Mobile navigation">
        {links.map((link, index) => (
          <Link
            className={isActive(link.href) ? "is-active" : undefined}
            href={link.href}
            key={link.href}
            onClick={onClose}
            prefetch
            style={{ transitionDelay: `${80 + index * 45}ms` }}
          >
            <span className="mobile-menu__index">{String(index + 1).padStart(2, "0")}</span>
            <span className="mobile-menu__label">{link.label}</span>
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
          </Link>
        ))}
      </nav>

      <div className="mobile-menu__foot">
        <Link className="mobile-menu__cta" href="/contact" onClick={onClose} prefetch>
          {ctaLabel}
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
        <ul className="mobile-menu__contact">
          <li>
            <Mail aria-hidden="true" size={14} strokeWidth={1.8} />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </li>
          <li>
            <MapPin aria-hidden="true" size={14} strokeWidth={1.8} />
            <span>{company.address}</span>
          </li>
        </ul>
      </div>
      </div>
    </>
  );
}
