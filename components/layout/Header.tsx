"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MobileMenu } from "@/components/layout/MobileMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  // Only the homepage opens on a dark hero. Every other route starts on the
  // porcelain background, where porcelain nav text would be invisible.
  const onLightPage = pathname !== "/";

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <header
        className={[
          "site-nav",
          scrolled ? "is-scrolled" : "",
          onLightPage ? "site-nav--light" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Link className="site-nav__brand" href="/" aria-label="Kanak Mouldings home">
          <span>Kanak</span>
          <span>Mouldings</span>
        </Link>
        <nav className="site-nav__links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link className={isActive(link.href) ? "is-active" : ""} href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="site-nav__cta" href="/contact">
          Contact Us
        </Link>
        <button
          aria-expanded={open}
          aria-label="Open menu"
          className="site-nav__menu"
          onClick={() => setOpen(true)}
          type="button"
        >
          <Menu size={22} strokeWidth={1.7} />
        </button>
      </header>
      <MobileMenu ctaLabel="Contact Us" links={links} onClose={() => setOpen(false)} open={open} />
    </>
  );
}
