import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductFilter } from "@/components/products/ProductFilter";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Kanak Mouldings round, rectangular, black, white and transparent food packaging containers for B2B quotations.",
};

export default function ProductsPage() {
  return (
    <section className="page-shell">
      <Container>
        <SectionHeading
          kicker="Products"
          title={"TAKEAWAY CONTAINERS\nFOR EVERY MENU."}
          copy="Browse round and rectangular food packaging containers in black, white and transparent finishes for delivery, takeaway and food-service supply."
        />
        <ProductFilter />
      </Container>
    </section>
  );
}
