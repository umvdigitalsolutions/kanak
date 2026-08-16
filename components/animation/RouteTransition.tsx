"use client";

import { usePathname } from "next/navigation";

export function RouteTransition() {
  const pathname = usePathname();

  return <div className="route-transition" aria-hidden="true" key={pathname} />;
}
