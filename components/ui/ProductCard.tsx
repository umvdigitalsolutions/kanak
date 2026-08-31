import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { productDisplayImage } from "@/lib/product-visual-assets";

type ProductCardProps = {
  compact?: boolean;
  product: Product;
};

export function ProductCard({ compact = false, product }: ProductCardProps) {
  const sizeOptions = product.sizeOptions ?? [];

  return (
    <article className={compact ? "product-card product-card--compact group" : "product-card group"}>
      <Link className="product-card__link" href={`/products/${product.slug}`}>
        <div className="product-card__visual">
          <ProductVisual
            accent={product.visual.accent}
            baseColor={product.visual.baseColor}
            compartments={product.visual.compartments}
            image={productDisplayImage(product)}
            alt={product.name}
            lid={product.visual.lid}
            shape={product.shape}
          />
        </div>
        <div className="product-card__body">
          <p className="kicker">{product.productRange ? `${product.category} / ${product.productRange}` : product.category}</p>
          <h3>{product.name}</h3>
          {compact ? null : <p>{product.shortDescription}</p>}
        </div>
        <span className="product-card__arrow" aria-hidden="true">
          <ArrowUpRight size={18} strokeWidth={1.7} />
        </span>
      </Link>
      {sizeOptions.length ? (
        <label className="product-card__size">
          <span>Available Size</span>
          <select className="product-card__select" defaultValue={sizeOptions[0]} aria-label={`${product.name} available size`}>
            {sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      ) : null}
    </article>
  );
}
