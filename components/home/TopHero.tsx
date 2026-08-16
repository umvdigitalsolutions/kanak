import { Button } from "@/components/ui/Button";

const heroSpecs = ["Food-grade material focus", "Secure lid-fit range", "Bulk supply for food service"];

export function TopHero() {
  return (
    <section className="top-hero" id="home">
      <video
        aria-hidden="true"
        autoPlay
        className="top-hero__video"
        disablePictureInPicture
        loop
        muted
        playsInline
        poster="/images/hero/hero-container-fallback.png"
        preload="metadata"
      >
        <source src="/videos/containers.mp4" type="video/mp4" />
      </video>
      <div className="top-hero__shade" aria-hidden="true" />
      <div className="top-hero__content">
        <div className="top-hero__copy">
          <p className="kicker">Food packaging manufacturer</p>
          <h1>Food delivery containers made for scale.</h1>
          <p>
            Rigid round and rectangular food containers built around material consistency,
            practical stacking, reliable lid fit and food-service supply requirements.
          </p>
          <div className="top-hero__actions">
            <Button href="/products" variant="light">
              View Product Range
            </Button>
            <Button href="/contact" variant="outline">
              Request Specifications
            </Button>
          </div>
        </div>
        <div className="top-hero__specs" aria-label="Container manufacturing highlights">
          {heroSpecs.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
