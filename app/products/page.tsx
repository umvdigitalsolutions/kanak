import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Boxes, Factory, Layers3, Leaf } from "lucide-react";
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
  const plasticCount = products.filter((product) => product.category === "Plastic Containers").length;
  const biodegradableCount = products.filter((product) => product.category === "Biodegradables").length;

  return (
    <section className="products-page">
      <Container>
        <div className="products-page__hero">
          <div className="products-page__copy">
            <p className="kicker">Product Range</p>
            <h1>Plastic containers and biodegradable packaging.</h1>
            <p>
              Browse food-service packaging for restaurants, cloud kitchens, caterers and delivery-led businesses,
              organised into two clear product families.
            </p>
            <div className="products-page__actions">
              <Button href="/contact" variant="accent">
                Request Bulk Quote
              </Button>
              <Button href="#product-range" variant="outline">
                View Products
              </Button>
            </div>
            <div className="products-page__category-strip" aria-label="Product categories">
              <Link href="/products?filter=Plastic%20Containers#product-range">
                <Boxes size={21} strokeWidth={1.7} />
                <span>
                  <strong>Plastic Containers</strong>
                  Round, rectangular, black, white and transparent formats.
                </span>
                <em>{plasticCount.toString().padStart(2, "0")}</em>
              </Link>
              <Link href="/products?filter=Biodegradables#product-range">
                <Leaf size={21} strokeWidth={1.7} />
                <span>
                  <strong>Biodegradables</strong>
                  Kraft, paper-fiber and beverage packaging directions.
                </span>
                <em>{biodegradableCount.toString().padStart(2, "0")}</em>
              </Link>
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
                Categories
              </span>
              <span>
                <Factory size={18} strokeWidth={1.7} />
                <strong>B2B</strong>
                Manufacturing supply
              </span>
            </div>
          </div>

          <div className="products-page__visual">
            <Image
              alt="Kanak Mouldings product range with plastic and biodegradable food packaging containers"
              className="products-page__image"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 48rem"
              src={assetPath("/images/generated/pdp/product-range-premium.webp")}
            />
            <div className="products-page__visual-label">
              <span>Plastic Containers</span>
              <strong>Biodegradables</strong>
            </div>
          </div>
        </div>

        <div className="products-page__browser" id="product-range">
          <ProductFilter categories={categories} products={products} />
        </div>
      </Container>
    </section>
  );
}
