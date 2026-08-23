"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { productFilters, productsByFilter, type Product } from "@/data/products";
import { ensureGsap } from "@/lib/animations";
import { ProductCard } from "@/components/ui/ProductCard";

const attributeFilters = ["Round", "Rectangular", "Black", "White", "Transparent", "Custom"];

export function ProductFilter({
  categories,
  initialFilter = productFilters[0],
  products,
}: {
  categories?: string[];
  initialFilter?: string;
  products: Product[];
}) {
  const filters = useMemo(() => {
    const dynamicCategories = categories?.length ? categories : [...new Set(products.map((product) => product.category))];
    return ["All", ...dynamicCategories, ...attributeFilters.filter((filter) => !dynamicCategories.includes(filter))];
  }, [categories, products]);
  const [filter, setFilter] = useState<string>(() => (filters.includes(initialFilter) ? initialFilter : productFilters[0]));
  const gridRef = useRef<HTMLDivElement>(null);
  const visibleProducts = useMemo(() => productsByFilter(filter, products), [filter, products]);

  useEffect(() => {
    const applyFilterFromUrl = () => {
      const requestedFilter = new URLSearchParams(window.location.search).get("filter");

      if (requestedFilter && filters.includes(requestedFilter)) {
        setFilter(requestedFilter);
      }
    };

    const applyAfterNavigation = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;

      if (!(target instanceof HTMLAnchorElement)) return;

      const url = new URL(target.href);
      if (url.origin === window.location.origin && url.pathname === "/products") {
        window.setTimeout(applyFilterFromUrl, 80);
      }
    };

    applyFilterFromUrl();
    window.addEventListener("popstate", applyFilterFromUrl);
    window.addEventListener("hashchange", applyFilterFromUrl);
    document.addEventListener("click", applyAfterNavigation);

    return () => {
      window.removeEventListener("popstate", applyFilterFromUrl);
      window.removeEventListener("hashchange", applyFilterFromUrl);
      document.removeEventListener("click", applyAfterNavigation);
    };
  }, [filters]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap } = ensureGsap();
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".product-card"));
    const visuals = cards
      .map((card) => card.querySelector<HTMLElement>(".product-card__visual"))
      .filter(Boolean) as HTMLElement[];

    const context = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, scale: 0.965, y: 34 },
        {
          autoAlpha: 1,
          duration: 0.58,
          ease: "power3.out",
          scale: 1,
          stagger: { each: 0.07, from: "start", grid: "auto" },
          y: 0,
        },
      );

      gsap.fromTo(
        visuals,
        { scale: 1.06, y: 18 },
        { duration: 0.7, ease: "power3.out", scale: 1, stagger: 0.07, y: 0 },
      );
    }, grid);

    return () => context.revert();
  }, [filter]);

  return (
    <div className="products-browser">
      <div className="products-browser__bar" aria-live="polite">
        <div>
          <span>Showing</span>
          <strong>{visibleProducts.length.toString().padStart(2, "0")}</strong>
        </div>
        <p>{filter === "All" ? "Complete product range" : `${filter} product direction`} for bulk packaging enquiries.</p>
      </div>
      <div className="filter-row" aria-label="Product filters">
        {filters.map((item) => (
          <button
            aria-pressed={filter === item}
            className={filter === item ? "is-selected" : ""}
            key={item}
            onClick={() => setFilter(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="product-grid product-grid--wide product-grid--gsap" ref={gridRef}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
