"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  CookingPot,
  CupSoda,
  Grid3X3,
  Layers3,
  LayoutGrid,
  Package,
  Pizza,
  Rows3,
  ScrollText,
  Sandwich,
  Soup,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { productFilters, productRangeOrder, productsByFilter, type Product } from "@/data/products";
import { ensureGsap } from "@/lib/animations";
import { ProductCard } from "@/components/ui/ProductCard";

const allRangeLabel = "All Product Categories";
const rangeIcons: Record<string, LucideIcon> = {
  [allRangeLabel]: LayoutGrid,
  "Plastic Food Containers": Package,
  "Custom Packaging": Layers3,
  "Paper Bowl": Soup,
  "Paper Container": Package,
  "Paper Cups": CupSoda,
  "Pizza Box": Pizza,
  "Food Wrapping Paper": ScrollText,
  "Baking Paper Sheet": CookingPot,
  "Noodle Box": Utensils,
  "Fries Box": Sandwich,
  "Paper Fast Food Boxes": Box,
  "Paper Food Box With Compartment": Grid3X3,
  "Paper Meal Box": Package,
  "Food Tray": Rows3,
};

function ProductCategoryButton({
  count,
  isSelected,
  label,
  onClick,
}: {
  count: number;
  isSelected: boolean;
  label: string;
  onClick: () => void;
}) {
  const Icon = rangeIcons[label] ?? Package;

  return (
    <button aria-pressed={isSelected} className={isSelected ? "is-selected" : ""} onClick={onClick} type="button">
      <span className="product-category-columns__icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <span className="product-category-columns__label">{label}</span>
      <strong>{count.toString().padStart(2, "0")}</strong>
    </button>
  );
}

export function ProductFilter({
  categories,
  initialFilter = productFilters[0],
  products,
}: {
  categories?: string[];
  initialFilter?: string;
  products: Product[];
}) {
  const filters = useMemo(
    () => (categories?.length ? categories : productFilters.filter((filter) => products.some((product) => product.category === filter))),
    [categories, products],
  );
  const [filter, setFilter] = useState<string>(() => (filters.includes(initialFilter) ? initialFilter : productFilters[0]));
  const [productRange, setProductRange] = useState(allRangeLabel);
  const gridRef = useRef<HTMLDivElement>(null);
  const categoryProducts = useMemo(() => productsByFilter(filter, products), [filter, products]);
  const productRanges = useMemo(() => {
    const ranges = [...new Set(categoryProducts.map((product) => product.productRange).filter(Boolean) as string[])];

    return ranges.sort((a, b) => {
      const aIndex = productRangeOrder.indexOf(a as (typeof productRangeOrder)[number]);
      const bIndex = productRangeOrder.indexOf(b as (typeof productRangeOrder)[number]);

      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, [categoryProducts]);
  const productRangeCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const product of categoryProducts) {
      if (!product.productRange) continue;
      counts.set(product.productRange, (counts.get(product.productRange) ?? 0) + 1);
    }

    return counts;
  }, [categoryProducts]);
  const visibleProducts = useMemo(() => {
    if (productRange === allRangeLabel) return categoryProducts;
    return categoryProducts.filter((product) => product.productRange === productRange);
  }, [categoryProducts, productRange]);

  useEffect(() => {
    const applyFilterFromUrl = () => {
      const requestedFilter = new URLSearchParams(window.location.search).get("filter");

      if (requestedFilter && filters.includes(requestedFilter)) {
        setFilter(requestedFilter);
        setProductRange(allRangeLabel);
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
  }, [filter, productRange]);

  return (
    <div className="products-browser">
      <div className="products-browser__bar" aria-live="polite">
        <div>
          <span>Showing</span>
          <strong>{visibleProducts.length.toString().padStart(2, "0")}</strong>
        </div>
        <p>{productRange === allRangeLabel ? `${filter} range` : `${filter} / ${productRange}`} for bulk packaging enquiries.</p>
      </div>
      <div className="filter-row filter-row--primary" aria-label="Product ranges">
        {filters.map((item) => (
          <button
            aria-pressed={filter === item}
            className={filter === item ? "is-selected" : ""}
            key={item}
            onClick={() => {
              setFilter(item);
              setProductRange(allRangeLabel);
            }}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      {productRanges.length ? (
        <div className="product-range-panel">
          <div className="product-range-panel__head">
            <span>Product Category Range</span>
            <strong>{productRanges.length.toString().padStart(2, "0")}</strong>
          </div>
          <div className="product-category-columns" aria-label={`${filter} product category range`}>
            <ProductCategoryButton
              count={categoryProducts.length}
              isSelected={productRange === allRangeLabel}
              label={allRangeLabel}
              onClick={() => setProductRange(allRangeLabel)}
            />
            {productRanges.map((item) => (
              <ProductCategoryButton
                count={productRangeCounts.get(item) ?? 0}
                isSelected={productRange === item}
                key={item}
                label={item}
                onClick={() => setProductRange(item)}
              />
            ))}
          </div>
        </div>
      ) : null}
      <div className="product-grid product-grid--wide product-grid--gsap" ref={gridRef}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
