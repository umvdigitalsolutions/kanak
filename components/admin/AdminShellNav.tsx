"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Camera,
  FolderTree,
  Home,
  Inbox,
  LayoutDashboard,
  PackagePlus,
} from "lucide-react";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    helper: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    helper: "Catalogue",
    icon: Boxes,
  },
  {
    href: "/admin/products/new",
    label: "Add Product",
    helper: "Upload item",
    icon: PackagePlus,
  },
  {
    href: "/admin/home",
    label: "Home Page",
    helper: "Hero and media",
    icon: Home,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    helper: "Product groups",
    icon: FolderTree,
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    helper: "Website photos",
    icon: Camera,
  },
  {
    href: "/admin/inquiries",
    label: "Inquiries",
    helper: "Quote requests",
    icon: Inbox,
  },
];

export function AdminShellNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-shell-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={isActive ? "admin-shell-nav__item is-active" : "admin-shell-nav__item"}
            href={item.href}
            key={item.href}
          >
            <Icon aria-hidden="true" size={18} />
            <span>
              <strong>{item.label}</strong>
              <small>{item.helper}</small>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
