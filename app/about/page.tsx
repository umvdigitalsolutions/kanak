import type { Metadata } from "next";
import Image from "next/image";
import {
  Globe2,
  Leaf,
  Lightbulb,
  Network,
  PackageCheck,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Kanak Mouldings, explore our food-packaging vision and hear from directors Manan Dhoot and Aniket Dhoot.",
};

const principles = [
  {
    icon: PackageCheck,
    title: "Food-grade focus",
    copy: "Packaging selected around dependable daily food-service use.",
  },
  {
    icon: Network,
    title: "Pan-India supply",
    copy: "A growing network supporting customers across domestic markets.",
  },
  {
    icon: Globe2,
    title: "International presence",
    copy: "Product and supply relationships extending into the United States.",
  },
];

const ranges = [
  {
    label: "Rigid Plastic",
    title: "Round and rectangular containers",
    copy: "Food-service containers in black, white and transparent finishes with application-specific lid options.",
    detail: "Round formats from 100 ml to 1200 ml, plus rectangular and compartment-led formats.",
  },
  {
    label: "Biodegradable",
    title: "Paper-led packaging",
    copy: "Bowls, containers, cups, pizza boxes, wrapping sheets, noodle boxes, meal boxes and food trays.",
    detail: "Multiple capacities, materials and constructions organised by product category.",
  },
  {
    label: "Product Development",
    title: "IML and evolving formats",
    copy: "In-mould-labelled containers and new packaging directions developed around market and branding requirements.",
    detail: "Selection aligned to use case, volume, finish, lid fit and supply requirements.",
  },
];

const capabilities = [
  {
    icon: PackageCheck,
    title: "Performance",
    copy: "Food-grade material direction, dependable closure formats and consistent construction.",
  },
  {
    icon: Leaf,
    title: "Material responsibility",
    copy: "Reusable, recyclable and BPA-free directions where the selected specification supports them.",
  },
  {
    icon: Lightbulb,
    title: "Everyday utility",
    copy: "Formats considered around storage, service, transport and food-delivery workflows.",
  },
];

const journey = [
  {
    number: "01",
    title: "Practical beginnings",
    copy: "Early involvement in the family business built an understanding of customers and day-to-day operations.",
  },
  {
    number: "02",
    title: "A family-led venture",
    copy: "Kanak Mouldings brought together operating experience, business education and long-term family support.",
  },
  {
    number: "03",
    title: "Packaging with purpose",
    copy: "The industry offered a practical way to improve how food is protected, transported and experienced.",
  },
  {
    number: "04",
    title: "A wider horizon",
    copy: "The portfolio now grows across materials, domestic markets and international partnerships.",
  },
];

const directors = [
  {
    name: "Manan Dhoot",
    designation: "Managing Director",
    image: "/images/about/manan-dhoot-director.jpg",
    alt: "Manan Dhoot, Managing Director of Kanak Mouldings",
    intro: "Built on experience. Driven by possibility.",
    bio: [
      "From a young age, business was more than a career option for me; it was a genuine passion. Academic study provided a foundation, but hands-on experience in our family business after school was what truly developed my entrepreneurial outlook.",
      "Kanak Mouldings began as a family idea, developed with my younger brother and supported by my mother. Packaging stood out because it connects with almost every kind of business and directly influences how products are protected, transported and experienced.",
      "Our ambition is to make Kanak Mouldings a centre for innovation and collaboration: a place where ideas flourish, partnerships are valued and high-quality packaging solutions are built for a changing market.",
    ],
    quote: "This is the legacy we are building, from our family to the world.",
  },
  {
    name: "Aniket Dhoot",
    designation: "Director",
    image: "/images/about/aniket-dhoot-director.jpg",
    alt: "Aniket Dhoot, Director of Kanak Mouldings",
    intro: "Global exposure brought back into family enterprise.",
    bio: [
      "My journey has always been driven by curiosity, learning and the desire to build something meaningful. After completing my Master's in Management in the United States, I chose to bring that global exposure back into our family business and take a deeper role in the packaging industry.",
      "At Kanak Mouldings, I work closely across exports, product quality and business development, with a constant focus on making our products competitive in global markets.",
      "For me, it is not just about manufacturing packaging; it is about building a company that people across the world can trust.",
    ],
    quote:
      "I believe every product we deliver represents our commitment to quality, consistency and the global standards we stand for. Built on Quality. Driven by Trust. Ready for the World.",
  },
];

export default function AboutPage() {
  return (
    <main className="page-shell about-page">
      <section className="about-hero" aria-labelledby="about-page-title">
        <Image
          alt="Kanak Mouldings plastic and biodegradable food-packaging range"
          className="about-hero__image"
          fill
          priority
          sizes="100vw"
          src="/images/generated/pdp/product-range-premium.webp"
        />
        <div className="about-hero__shade" aria-hidden="true" />
        <Container className="about-hero__content">
          <div className="about-hero__copy">
            <p className="kicker">Food Packaging Manufacturer</p>
            <h1 id="about-page-title">KANAK MOULDINGS.</h1>
            <p className="about-hero__statement">From our family to the world.</p>
            <p className="about-hero__lead">
              We develop practical food-packaging solutions across rigid plastic
              and biodegradable ranges for growing food-service businesses.
            </p>
            <div className="about-hero__actions">
              <Button href="/products" variant="accent">
                Explore Our Range
              </Button>
              <Button href="/contact" variant="outline">
                Talk To Our Team
              </Button>
            </div>
          </div>

          <div className="about-hero__facts" aria-label="Company reach">
            <div>
              <strong>02</strong>
              <span>Core packaging ranges</span>
            </div>
            <div>
              <strong>PAN INDIA</strong>
              <span>Domestic supply presence</span>
            </div>
            <div>
              <strong>INDIA + USA</strong>
              <span>Growing market reach</span>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section className="about-story" aria-labelledby="about-story-title">
          <div className="about-story__heading">
            <p className="kicker">Our Story</p>
            <h2 id="about-story-title">PACKAGING BUILT AROUND REAL BUSINESS.</h2>
            <p className="about-story__intro">
              Kanak Mouldings Pvt. Ltd. was established with a practical belief:
              packaging should protect the product, support the operation and
              strengthen the experience a business delivers to its customer.
            </p>
          </div>

          <div className="about-story__body">
            <p>
              We specialise in food-packaging solutions shaped around the varied
              needs of restaurants, cloud kitchens, caterers, distributors and
              corporate buyers. Every product conversation starts with the actual
              application: food type, capacity, lid fit, storage, transport and
              order volume.
            </p>
            <p>
              Our portfolio brings together functionality, consistent
              construction and considered material choices. As it expands across
              rigid plastic and biodegradable formats, the focus remains the same:
              dependable packaging for today and better possibilities for what
              comes next.
            </p>
          </div>

          <aside className="about-principles" aria-label="Company strengths">
            {principles.map(({ icon: Icon, title, copy }) => (
              <div key={title}>
                <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                <span>
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </span>
              </div>
            ))}
          </aside>
        </section>

        <section className="director-story" aria-labelledby="director-story-title">
          <div className="director-story__copy">
            <p className="kicker">Director&apos;s Note</p>
            <h2 id="director-story-title">
              TWO PERSPECTIVES. ONE FAMILY-LED VISION.
            </h2>
            <p>
              Kanak Mouldings is guided by practical operating experience,
              contemporary business thinking and a clear focus on building
              dependable packaging for domestic and international customers.
            </p>
            <p>
              Click a director card to read the story behind each role.
            </p>
          </div>

          <div className="director-cards" aria-label="Kanak Mouldings directors">
            {directors.map(({ name, designation, image, alt, intro, bio, quote }, index) => {
              const toggleId = `director-card-${index + 1}`;

              return (
                <article className="director-card" key={name}>
                  <input
                    aria-label={`Read ${name}'s director note`}
                    className="director-card__toggle"
                    id={toggleId}
                    type="checkbox"
                  />
                  <label className="director-card__surface" htmlFor={toggleId}>
                    <span className="director-card__face director-card__face--front">
                      <span className="director-card__media">
                        <Image
                          alt={alt}
                          fill
                          sizes="(max-width: 820px) calc(100vw - 32px), 35vw"
                          src={image}
                        />
                      </span>
                      <span className="director-card__identity">
                        <span>
                          <strong>{name}</strong>
                          <em>{designation}</em>
                        </span>
                        <small>Tap to read</small>
                      </span>
                    </span>

                    <span className="director-card__face director-card__face--back">
                      <span className="director-card__back-head">
                        <span>
                          <strong>{name}</strong>
                          <em>{designation}</em>
                        </span>
                        <small>Tap to return</small>
                      </span>
                      <span className="director-card__intro">{intro}</span>
                      {bio.map((paragraph) => (
                        <span className="director-card__bio" key={paragraph}>
                          {paragraph}
                        </span>
                      ))}
                      <span className="director-card__quote">{quote}</span>
                    </span>
                  </label>
                </article>
              );
            })}
          </div>
        </section>
      </Container>

      <section className="about-direction" aria-label="Vision and mission">
        <Container className="about-direction__grid">
          <article>
            <Target aria-hidden="true" size={27} strokeWidth={1.7} />
            <div>
              <p className="kicker">Our Vision</p>
              <h2>TO BECOME A TRUSTED GLOBAL PACKAGING PARTNER.</h2>
            </div>
            <p>
              Build a wide and relevant portfolio, grow domestic and international
              partnerships, and establish a recognisable packaging brand defined
              by quality and customer-centred thinking.
            </p>
          </article>
          <article>
            <Lightbulb aria-hidden="true" size={27} strokeWidth={1.7} />
            <div>
              <p className="kicker">Our Mission</p>
              <h2>TO CREATE WHAT THE MARKET NEEDS NEXT.</h2>
            </div>
            <p>
              Develop practical, forward-looking solutions that respond to current
              food-service requirements while strengthening responsible
              manufacturing and more considered material choices.
            </p>
          </article>
        </Container>
      </section>

      <Container>
        <section className="about-range" aria-labelledby="about-range-title">
          <figure className="about-range__media">
            <Image
              alt="Food containers prepared for bulk packing and supply"
              fill
              sizes="(max-width: 820px) calc(100vw - 32px), 48vw"
              src="/images/generated/flow/06-packing.jpg"
            />
            <figcaption>Packaging prepared for food-service supply</figcaption>
          </figure>

          <div className="about-range__content">
            <p className="kicker">What We Make</p>
            <h2 id="about-range-title">A RANGE BUILT AROUND REAL ORDERS.</h2>
            <p className="about-range__lead">
              Product selection is organised by category, then refined by
              capacity, material, construction, colour and application.
            </p>
            <ol className="about-range__list">
              {ranges.map(({ label, title, copy, detail }, index) => (
                <li key={label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <small>{label}</small>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                    <em>{detail}</em>
                  </div>
                </li>
              ))}
            </ol>
            <Button href="/products" variant="outline">
              View Product Categories
            </Button>
          </div>
        </section>

        <section className="about-quality" aria-labelledby="about-quality-title">
          <div className="about-quality__content">
            <p className="kicker">How We Think</p>
            <h2 id="about-quality-title">DETAILS THAT MATTER IN DAILY USE.</h2>
            <p className="about-quality__lead">
              Packaging decisions are evaluated against the realities of filling,
              closing, storing, carrying and serving food.
            </p>
            <div className="about-quality__list">
              {capabilities.map(({ icon: Icon, title, copy }) => (
                <article key={title}>
                  <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
            <small>
              Individual features depend on the selected product, material and
              final specification.
            </small>
          </div>

          <figure className="about-quality__media">
            <Image
              alt="Food container inspected under a quality-control light"
              fill
              sizes="(max-width: 820px) calc(100vw - 32px), 45vw"
              src="/images/generated/flow/05-quality.jpg"
            />
            <figcaption>Product inspection and consistency checks</figcaption>
          </figure>
        </section>

        <section className="about-journey" aria-labelledby="about-journey-title">
          <div className="about-journey__head">
            <p className="kicker">Our Journey</p>
            <h2 id="about-journey-title">A BUSINESS SHAPED STEP BY STEP.</h2>
          </div>
          <ol>
            {journey.map(({ number, title, copy }) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="page-cta about-page__cta">
          <div>
            <p className="kicker">Start A Conversation</p>
            <h2>LET&apos;S BUILD THE RIGHT PACKAGING RANGE.</h2>
            <p>Share your categories, sizes and order requirements with our team.</p>
          </div>
          <Button href="/contact" variant="accent">
            Talk To Our Team
          </Button>
        </div>
      </Container>
    </main>
  );
}
