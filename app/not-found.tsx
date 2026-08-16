import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="simple-page">
      <Container narrow>
        <p className="kicker">Page not found</p>
        <h1>THIS CONTAINER IS NOT IN THE STACK.</h1>
        <p>The page you requested does not exist or has moved.</p>
        <Button href="/products" variant="accent">
          Explore Containers
        </Button>
      </Container>
    </section>
  );
}
