"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Box,
  CookingPot,
  CupSoda,
  Grid3X3,
  Leaf,
  Layers3,
  Package,
  Pizza,
  Rows3,
  Search,
  ScrollText,
  Sandwich,
  Soup,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { productFilters, productRangeOrder, productsByFilter, type Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { productDisplayImage } from "@/lib/product-visual-assets";

const rangeIcons: Record<string, LucideIcon> = {
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

const filterMeta: Record<string, { icon: LucideIcon; label: string }> = {
  "Plastic Containers": { icon: Package, label: "Plastic Containers" },
  Biodegradables: { icon: Leaf, label: "Biodegradable Range" },
};

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
  const [productRange, setProductRange] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const categoryProducts = useMemo(() => productsByFilter(filter, products), [filter, products]);
  const productRanges = useMemo(() => {
    const ranges = [...new Set(categoryProducts.map((product) => product.productRange).filter(Boolean) as string[])];

    return ranges.filter((range) => productRangeOrder.includes(range as (typeof productRangeOrder)[number])).sort((a, b) => {
      const aIndex = productRangeOrder.indexOf(a as (typeof productRangeOrder)[number]);
      const bIndex = productRangeOrder.indexOf(b as (typeof productRangeOrder)[number]);

      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, [categoryProducts]);
  const rangeProducts = useMemo(() => {
    if (!productRange) return [];
    return categoryProducts.filter((product) => product.productRange === productRange);
  }, [categoryProducts, productRange]);
  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return rangeProducts;

    return rangeProducts.filter((product) =>
      [product.name, product.capacity, product.material, ...product.sizeOptions]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, rangeProducts]);
  const productRangeSummaries = useMemo(
    () =>
      productRanges.map((range) => {
        const rangeProducts = categoryProducts.filter((product) => product.productRange === range);
        const representative = rangeProducts.find((product) => product.image) ?? rangeProducts[0];

        return {
          count: rangeProducts.length,
          range,
          representative,
        };
      }),
    [categoryProducts, productRanges],
  );

  useEffect(() => {
    const applyFilterFromUrl = () => {
      const requestedFilter = new URLSearchParams(window.location.search).get("filter");

      if (requestedFilter && filters.includes(requestedFilter)) {
        setFilter(requestedFilter);
        setProductRange(null);
        setQuery("");
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

  return (
    <div className="products-browser">
      <div className="products-browser__bar" aria-live="polite">
        <div>
          <span>{productRange ? "Products" : "Categories"}</span>
          <strong>{(productRange ? visibleProducts.length : productRanges.length).toString().padStart(2, "0")}</strong>
        </div>
        <p>
          {productRange
            ? `${filter} / ${productRange} complete range.`
            : `Complete ${filter.toLowerCase()} ranges for bulk packaging enquiries.`}
        </p>
      </div>
      <div className="filter-row filter-row--primary" aria-label="Product range switcher">
        {filters.map((item) => {
          const meta = filterMeta[item] ?? { icon: Package, label: item };
          const FilterIcon = meta.icon;

          return (
            <button
              aria-label={`Show ${meta.label}`}
              aria-pressed={filter === item}
              className={filter === item ? "is-selected" : ""}
              key={item}
              onClick={() => {
                setFilter(item);
                setProductRange(null);
                setQuery("");
              }}
              type="button"
            >
              <FilterIcon aria-hidden="true" size={19} strokeWidth={1.8} />
              <span>{meta.label}</span>
            </button>
          );
        })}
      </div>
      <div className="products-browser__content">
        {!productRange ? (
          <div className="product-category-overview">
            <div className="product-category-overview__head">
              <div>
                <p className="kicker">Product Category Range</p>
                <h2>{filter}</h2>
              </div>
              <span>{productRanges.length.toString().padStart(2, "0")} category families</span>
            </div>
            <div className="product-category-grid" aria-label={`${filter} product categories`}>
              {productRangeSummaries.map(({ count, range, representative }) => {
                if (!representative) return null;

                const Icon = rangeIcons[range] ?? Package;

                return (
                  <button
                    aria-label={`Open ${range} category with ${count} products`}
                    className="product-category-card"
                    key={range}
                    onClick={() => {
                      setProductRange(range);
                      setQuery("");
                    }}
                    type="button"
                  >
                    <span className="product-category-card__visual">
                      <ProductVisual
                        accent={representative.visual.accent}
                        alt={range}
                        baseColor={representative.visual.baseColor}
                        compartments={representative.visual.compartments}
                        image={productDisplayImage(representative)}
                        lid={representative.visual.lid}
                        shape={representative.shape}
                      />
                    </span>
                    <span className="product-category-card__body">
                      <span className="product-category-card__kicker">
                        <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
                        {filter}
                      </span>
                      <strong>{range}</strong>
                      <span>{count.toString().padStart(2, "0")} products in this range</span>
                    </span>
                    <span className="product-category-card__arrow" aria-hidden="true">
                      <ArrowUpRight size={19} strokeWidth={1.8} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="product-range-results">
            <div className="product-range-results__head">
              <button
                onClick={() => {
                  setProductRange(null);
                  setQuery("");
                }}
                type="button"
              >
                <ArrowLeft size={18} strokeWidth={1.8} />
                All categories
              </button>
              <div className="product-range-results__title">
                <p className="kicker">{filter}</p>
                <h2>{productRange}</h2>
                <span>{rangeProducts.length.toString().padStart(2, "0")} available products</span>
              </div>
              <label className="product-range-search">
                <Search aria-hidden="true" size={18} strokeWidth={1.8} />
                <input
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Search ${productRange}`}
                  type="search"
                  value={query}
                />
                <small>{visibleProducts.length.toString().padStart(2, "0")} shown</small>
              </label>
            </div>
            {visibleProducts.length ? (
              <div className="product-grid product-grid--wide">
                {visibleProducts.map((product) => (
                  <ProductCard compact key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="product-range-empty">
                <Search aria-hidden="true" size={24} strokeWidth={1.7} />
                <strong>No matching products</strong>
                <p>Try another size, material or product name.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
