"use client";

import Link from "next/link";
import Image from "next/image";
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
  const isAdminRoute = pathname.startsWith("/admin");
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <header className={scrolled ? "site-nav is-scrolled" : "site-nav"}>
        <Link className="site-nav__brand" href="/" aria-label="Kanak Mouldings home" prefetch>
          <Image
            alt=""
            className="site-nav__logo"
            height={500}
            priority
            sizes="96px"
            src="/images/Kanak%20Logo.png"
            width={500}
          />
        </Link>
        <nav className="site-nav__links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link className={isActive(link.href) ? "is-active" : ""} href={link.href} key={link.href} prefetch>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="site-nav__cta" href="/contact" prefetch>
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
