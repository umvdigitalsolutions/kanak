"use client";

import { useMemo, useState } from "react";
import { productFilters, productsByFilter } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export function ProductFilter() {
  const [filter, setFilter] = useState<(typeof productFilters)[number]>("All");
  const visibleProducts = useMemo(() => productsByFilter(filter), [filter]);

  return (
    <div className="products-browser">
      <div className="filter-row" aria-label="Product filters">
        {productFilters.map((item) => (
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
      <div className="product-grid product-grid--wide">
        {visibleProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
