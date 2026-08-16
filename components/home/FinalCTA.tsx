import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { assetPath } from "@/lib/assets";

export function FinalCTA() {
  return (
    <section className="final-cta">
      <Container className="final-cta__grid">
        <div>
          <p className="kicker">Quotation ready</p>
          <h2>
            READY
            <br />
            TO SPEC A
            <br />
            CONTAINER.
          </h2>
          <p>
            Share the container shape, colour, lid requirement, material grade,
            packing quantity and application details for a focused quotation.
          </p>
          <div className="hero__actions">
            <Button href="/contact" variant="accent">
              Request a Quote
            </Button>
            <Button href="/products" variant="outline">
              Explore Containers
            </Button>
          </div>
        </div>
        <ProductVisual
          accent="empty"
          alt="Rectangle Container - Black"
          baseColor="black"
          compartments={1}
          image={assetPath("/images/products/kanak/rectangle-container-black.png")}
          shape="rectangular"
        />
      </Container>
    </section>
  );
}
