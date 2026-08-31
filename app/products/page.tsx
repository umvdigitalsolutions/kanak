import type { Metadata } from "next";
import Image from "next/image";
import { Boxes, Factory, Layers3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductFilter } from "@/components/products/ProductFilter";
import { primaryProductCategories } from "@/data/products";
import { getProducts } from "@/lib/backend/products";
import { assetPath } from "@/lib/assets";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Kanak Mouldings round, rectangular, black, white and transparent food packaging containers for B2B quotations.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = primaryProductCategories;
  const publishedCount = products.length.toString().padStart(2, "0");
  const categoryCount = categories.length.toString().padStart(2, "0");

  return (
    <section className="products-page">
      <Container>
        <div className="products-page__hero">
          <Image
            alt="Kanak Mouldings plastic and biodegradable food packaging range"
            className="products-page__image"
            fill
            priority
            sizes="100vw"
            src={assetPath("/images/generated/pdp/product-range-premium.webp")}
          />
          <div className="products-page__hero-shade" />
          <div className="products-page__copy">
            <p className="kicker">Kanak Mouldings Catalogue</p>
            <h1>Food Packaging Products</h1>
            <p>
              Explore plastic containers and biodegradable packaging for restaurants, cloud kitchens, caterers and
              delivery-led businesses.
            </p>
            <div className="products-page__actions">
              <Button href="/contact" variant="accent">
                Request Bulk Quote
              </Button>
              <Button href="#product-range" variant="outline">
                View Products
              </Button>
            </div>
          </div>
          <div className="products-page__visual-label">
            <span>Plastic Containers</span>
            <strong>Biodegradable Packaging</strong>
          </div>
        </div>

        <div className="products-page__stats" aria-label="Product range summary">
          <span>
            <Boxes size={18} strokeWidth={1.7} />
            <strong>{publishedCount}</strong>
            Product lines
          </span>
          <span>
            <Layers3 size={18} strokeWidth={1.7} />
            <strong>{categoryCount}</strong>
            Core ranges
          </span>
          <span>
            <Factory size={18} strokeWidth={1.7} />
            <strong>B2B</strong>
            Bulk supply enquiries
          </span>
        </div>

        <div className="products-page__browser" id="product-range">
          <ProductFilter categories={categories} products={products} />
        </div>
      </Container>
    </section>
  );
}
