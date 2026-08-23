import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { productDisplayImage } from "@/lib/product-visual-assets";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link className="product-card group" href={`/products/${product.slug}`}>
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
        <p className="kicker">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
      </div>
      <span className="product-card__arrow" aria-hidden="true">
        <ArrowUpRight size={18} strokeWidth={1.7} />
      </span>
    </Link>
  );
}
