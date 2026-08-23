"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import type { Product } from "@/data/products";
import { ensureGsap } from "@/lib/animations";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ProductTypes({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const { gsap } = ensureGsap();
      const introParts = gsap.utils.toArray<HTMLElement>("[data-product-list-part]", scope);
      const cards = gsap.utils.toArray<HTMLElement>(".product-card", scope);
      const visuals = cards
        .map((card) => card.querySelector<HTMLElement>(".product-card__visual"))
        .filter(Boolean) as HTMLElement[];
      const arrows = gsap.utils.toArray<HTMLElement>(".product-card__arrow", scope);

      gsap.set(introParts, { autoAlpha: 0, filter: "blur(5px)", y: 24 });
      gsap.set(cards, { autoAlpha: 0, scale: 0.96, y: 48 });
      gsap.set(visuals, { scale: 1.08, y: 24 });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            once: true,
            start: "top 72%",
            trigger: scope,
          },
        })
        .to(introParts, {
          autoAlpha: 1,
          duration: 0.54,
          filter: "blur(0px)",
          stagger: 0.08,
          y: 0,
        })
        .to(
          cards,
          {
            autoAlpha: 1,
            duration: 0.72,
            scale: 1,
            stagger: { each: 0.1, from: "start", grid: "auto" },
            y: 0,
          },
          "-=0.22",
        )
        .to(
          visuals,
          {
            duration: 0.86,
            scale: 1,
            stagger: 0.1,
            y: 0,
          },
          "<",
        )
        .fromTo(
          arrows,
          { autoAlpha: 0, rotate: -8, x: -8, y: 8 },
          { autoAlpha: 1, duration: 0.42, ease: "back.out(1.7)", rotate: 0, stagger: 0.08, x: 0, y: 0 },
          "-=0.45",
        );
    },
    { scope: root },
  );

  return (
    <section className="product-types" id="products" ref={root}>
      <Container>
        <div className="section-split" data-product-list-part>
          <SectionHeading
            kicker="Product collection"
            title={"FOOD-GRADE\nPACKAGING CONTAINERS."}
            copy="Round, rectangular, black, white, transparent and custom Kanak Mouldings containers with airtight lid direction for food-service packing."
          />
          <Button href="/products" variant="outline">
            View All Products
          </Button>
        </div>
        <div className="product-grid product-grid--gsap">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
