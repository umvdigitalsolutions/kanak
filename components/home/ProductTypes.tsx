import { featuredProducts } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ProductTypes() {
  return (
    <section className="product-types" id="products">
      <Container>
        <div className="section-split">
          <SectionHeading
            kicker="Product collection"
            title={"FOOD-GRADE\nPACKAGING CONTAINERS."}
            copy="Round and rectangular Kanak Mouldings containers in black, white and transparent finishes, with airtight lid direction for food-service packing."
          />
          <Button href="/products" variant="outline">
            View All Products
          </Button>
        </div>
        <div className="product-grid">
          {featuredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
