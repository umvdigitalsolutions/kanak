import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Boxes,
  CheckCircle2,
  Factory,
  Layers3,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Truck,
  Utensils,
} from "lucide-react";
import { notFound } from "next/navigation";
import { defaultContainerSlides } from "@/data/site";
import { products as staticProducts, type Product } from "@/data/products";
import { getProductBySlug, getProducts } from "@/lib/backend/products";
import { assetPath } from "@/lib/assets";
import { productDisplayImage, productPageImages as getProductPageImages } from "@/lib/product-visual-assets";
import { quoteHref } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductScrollStory } from "@/components/products/ProductScrollStory";
import { ProductEnquiryForm } from "@/components/products/ProductEnquiryForm";

type Props = {
  params: Promise<{ slug: string }>;
};

type SpecItem = {
  label: string;
  value: string;
};

export const revalidate = 300;

export function generateStaticParams() {
  return staticProducts.map((product) => ({ slug: product.slug }));
}

const unavailableValues = new Set([
  "",
  "specification pending",
  "confirm with manufacturer",
  "capacity range to be confirmed",
]);

function isMeaningful(value: string | null | undefined) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return !unavailableValues.has(normalized);
}

function joinValues(values: Array<number | string> | undefined) {
  return (values ?? []).map((value) => String(value).trim()).filter(Boolean).join(", ");
}

function productImage(product: Product) {
  return productDisplayImage(product);
}

function formatShape(shape: Product["shape"]) {
  return shape.charAt(0).toUpperCase() + shape.slice(1);
}

function displayValue(value: string | null | undefined, fallback = "Confirm during quotation") {
  return isMeaningful(value) ? String(value) : fallback;
}

function buildSpecs(product: Product): SpecItem[] {
  const specs: SpecItem[] = [
    { label: "Product Code", value: product.id },
    { label: "Category", value: product.category },
    { label: "Shape", value: formatShape(product.shape) },
  ];

  if (isMeaningful(product.capacity)) specs.push({ label: "Capacity", value: product.capacity });
  if (isMeaningful(product.material)) specs.push({ label: "Material", value: product.material });
  if (isMeaningful(product.dimensions)) specs.push({ label: "Dimensions", value: product.dimensions });

  const colours = joinValues(product.colourOptions);
  const lids = joinValues(product.lidOptions);
  const compartments = product.compartments.length
    ? product.compartments.map((item) => `${item} compartment${item > 1 ? "s" : ""}`).join(", ")
    : "";
  const applications = joinValues(product.applications.slice(0, 4));

  if (colours) specs.push({ label: "Colour Options", value: colours });
  if (lids) specs.push({ label: "Lid Type", value: lids });
  if (compartments) specs.push({ label: "Compartments", value: compartments });
  if (applications) specs.push({ label: "Application", value: applications });
  if (isMeaningful(product.customisation)) specs.push({ label: "Customisation", value: product.customisation });

  return specs;
}

function buildBadges(product: Product) {
  const searchable = `${product.description} ${product.features.join(" ")} ${product.applications.join(" ")}`.toLowerCase();
  const badges = new Set<string>();

  if (product.category === "Biodegradables" || searchable.includes("biodegradable")) badges.add("Biodegradable Direction");
  if (searchable.includes("food-grade") || searchable.includes("food grade")) badges.add("Food Grade");
  if (product.lidOptions.length > 0 || searchable.includes("airtight")) badges.add("Secure Lid Fit");
  if (searchable.includes("delivery") || searchable.includes("takeaway")) badges.add("Delivery Friendly");
  if (searchable.includes("packing") || searchable.includes("shipping")) badges.add("Protective Packing");
  badges.add("Stackable Form");

  return Array.from(badges).slice(0, 5);
}

function relatedProducts(product: Product, products: Product[]) {
  const closeMatches = products.filter(
    (item) => item.slug !== product.slug && (item.category === product.category || item.shape === product.shape),
  );
  const fill = products.filter((item) => item.slug !== product.slug && !closeMatches.some((match) => match.slug === item.slug));

  return [...closeMatches, ...fill].slice(0, 4);
}

function applicationSlides(product: Product) {
  const applicationText = product.applications.join(" ").toLowerCase();

  if (!applicationText) return defaultContainerSlides;

  const preferred = defaultContainerSlides.filter((slide) => {
    const text = `${slide.title} ${slide.bestFor} ${slide.copy}`.toLowerCase();
    return product.applications.some((application) => text.includes(application.toLowerCase().split(" ")[0]));
  });

  return [...preferred, ...defaultContainerSlides.filter((slide) => !preferred.includes(slide))].slice(0, 5);
}

function dimensionLabel(product: Product, label: "Top" | "Height" | "Base") {
  if (isMeaningful(product.dimensions)) return product.dimensions;
  return `${label} dimension on request`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} Product Details`,
    description: product.shortDescription,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [productImage(product)],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const products = await getProducts();
  const specs = buildSpecs(product);
  const badges = buildBadges(product);
  const applications = applicationSlides(product);
  const related = relatedProducts(product, products);
  const variants = products.filter((item) => item.slug === product.slug || item.category === product.category).slice(0, 6);
  const image = productImage(product);
  const pageImages = getProductPageImages(product);
  const heroImageClass = pageImages.hero.includes("/pdp/hero-")
    ? "pdp-hero__photo"
    : "pdp-hero__photo pdp-hero__photo--contain";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image,
    brand: {
      "@type": "Brand",
      name: "Kanak Mouldings",
    },
    sku: product.id,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        item: "/",
        name: "Home",
        position: 1,
      },
      {
        "@type": "ListItem",
        item: "/products",
        name: "Products",
        position: 2,
      },
      {
        "@type": "ListItem",
        item: `/products/${product.slug}`,
        name: product.name,
        position: 3,
      },
    ],
  };

  return (
    <article className="pdp">
      <section className="pdp-hero">
        <Container>
          <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/products">Products</Link>
            <span>/</span>
            <strong>{product.name}</strong>
          </nav>

          <div className="pdp-hero__grid">
            <div className="pdp-hero__copy">
              <p className="kicker">{product.category} Food Container</p>
              <h1>Built for Freshness. Designed for Delivery.</h1>
              <p>{product.shortDescription || product.description}</p>

              <div className="pdp-hero__badges" aria-label="Product highlights">
                {badges.map((badge) => (
                  <span key={badge}>
                    <CheckCircle2 size={16} strokeWidth={1.8} />
                    {badge}
                  </span>
                ))}
              </div>

              <div className="hero__actions pdp-hero__actions">
                <Button href={quoteHref({ product: product.slug })} variant="accent">
                  Request Bulk Quote
                </Button>
                <Button href="#specifications" variant="outline">
                  View Specifications
                </Button>
              </div>
            </div>

            <div className="pdp-hero__visual-wrap">
              <div className="pdp-hero__visual">
                <Image
                  alt={`${product.name} premium container presentation`}
                  className={heroImageClass}
                  fill
                  priority
                  sizes="(max-width: 980px) 100vw, 48rem"
                  src={pageImages.hero}
                />
                <div className="pdp-hero__media-note">
                  <span>Container system</span>
                  <strong>{formatShape(product.shape)} format</strong>
                </div>
              </div>
              <div className="pdp-hero__spec-strip">
                <span>
                  <PackageCheck size={17} />
                  {product.id}
                </span>
                <span>
                  <Ruler size={17} />
                  {displayValue(product.capacity)}
                </span>
                <span>
                  <Layers3 size={17} />
                  {joinValues(product.lidOptions) || "Lid option on request"}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProductScrollStory
        finish={joinValues(product.colourOptions) || product.category}
        image={pageImages.story}
        name={product.name}
        shape={product.shape}
      />

      <section className="pdp-section pdp-specs" id="specifications">
        <Container>
          <div className="pdp-section__head">
            <p className="kicker">Technical Profile</p>
            <h2>Specifications that support B2B selection.</h2>
            <p>
              Product details are shown only where they are available. Remaining capacity, material grade, packing quantity
              and dimension checks can be confirmed during quotation.
            </p>
          </div>

          <div className="pdp-spec-table" role="table" aria-label={`${product.name} specifications`}>
            {specs.map((spec) => (
              <div className="pdp-spec-row" role="row" key={spec.label}>
                <span role="cell">{spec.label}</span>
                <strong role="cell">{spec.value}</strong>
              </div>
            ))}
          </div>

          {product.placeholderSpecification ? (
            <p className="placeholder-alert pdp-specs__note">
              Some technical values are marked for manufacturer confirmation, so they are not presented as final product
              specifications on this page.
            </p>
          ) : null}
        </Container>
      </section>

      <section className="pdp-section pdp-exploded">
        <Container>
          <div className="pdp-exploded__grid">
            <div className="pdp-section__head">
              <p className="kicker">Exploded View</p>
              <h2>Closure, food zone and base shown as one system.</h2>
              <p>
                The visual separates the lid, rim, food-contact area and stable base to make the container construction
                easy to understand before a bulk enquiry.
              </p>
            </div>

            <div className="pdp-exploded__stage pdp-image-stage" aria-label={`${product.name} exploded construction view`}>
              <Image
                alt={`${product.name} with lid lifted and food packed inside`}
                className="pdp-image-stage__photo"
                fill
                sizes="(max-width: 980px) 100vw, 42rem"
                src={pageImages.exploded}
              />
              <div className="pdp-image-stage__chips">
                <span>Transparent Lid</span>
                <span>Secure Rim</span>
                <span>Food Zone</span>
                <span>Stable Base</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pdp-section pdp-stack">
        <Container>
          <div className="pdp-stack__grid">
            <div className="pdp-stack__stage" aria-label="Stacked containers visual">
              <Image
                alt={`${product.name} stacked for storage and dispatch`}
                className="pdp-stack__photo"
                fill
                sizes="(max-width: 980px) 100vw, 40rem"
                src={pageImages.stack}
              />
            </div>
            <div className="pdp-section__head">
              <p className="kicker">Stackability</p>
              <h2>Engineered to Stack.</h2>
              <p>
                Efficient stacking helps optimise kitchen organisation, packaging operations, storage and transportation
                across repeated food-service dispatch.
              </p>
              <div className="pdp-proof-grid">
                <span>Kitchen Storage</span>
                <span>Dispatch Packing</span>
                <span>Bulk Movement</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pdp-section pdp-delivery">
        <Container>
          <div className="pdp-delivery__scene">
            <Image alt="" className="pdp-delivery__scenery" fill sizes="100vw" src={assetPath("/scenery.png")} />
            <div className="pdp-delivery__shade" />
            <div className="pdp-delivery__copy">
              <p className="kicker">Delivery Use Case</p>
              <h2>Built for Delivery Routes.</h2>
              <p>
                Designed to support organised takeaway packaging and reliable food movement from kitchen packing to the
                customer handover.
              </p>
            </div>
            <div className="pdp-delivery__handover">
              <Image
                alt="Kanak Mouldings delivery handover"
                fill
                sizes="(max-width: 760px) 82vw, 34rem"
                src={assetPath("/delivered.png")}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pdp-section pdp-applications">
        <Container>
          <div className="pdp-section__head">
            <p className="kicker">Food Applications</p>
            <h2>One Container. Multiple Possibilities.</h2>
            <p>
              Use cases shown below reflect practical food-service packaging contexts such as takeaway meals, cafe
              dispatch, counters and delivery preparation.
            </p>
          </div>

          <div className="pdp-application-grid">
            {applications.map((slide) => (
              <article className="pdp-application-card" key={slide.id}>
                <div className="pdp-application-card__image">
                  <Image alt={slide.title} fill sizes="(max-width: 760px) 100vw, 24rem" src={slide.image} />
                </div>
                <div>
                  <p className="kicker">{slide.badge}</p>
                  <h3>{slide.title}</h3>
                  <p>{slide.bestFor}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pdp-section pdp-quality">
        <Container>
          <div className="pdp-quality__grid">
            <div className="pdp-quality__visual">
              <Image
                alt="Material pellets and food packaging quality inspection scene"
                className="pdp-quality__photo"
                fill
                sizes="(max-width: 980px) 100vw, 42rem"
                src={pageImages.quality}
              />
            </div>
            <div>
              <div className="pdp-section__head">
                <p className="kicker">Material & Quality</p>
                <h2>Made for Professional Food Packaging.</h2>
                <p>
                  The product profile focuses on the details food-service teams ask about most: closure, presentation,
                  handling, packing and suitability for commercial movement.
                </p>
              </div>
              <div className="pdp-quality__cards">
                {(product.features.length
                  ? product.features
                  : ["Food packaging focus", "Secure lid direction", "Packing discussion"]
                ).map((feature) => (
                  <article key={feature}>
                    <ShieldCheck size={22} strokeWidth={1.7} />
                    <h3>{feature}</h3>
                    <p>Available product information can be reviewed and confirmed during the quotation process.</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pdp-section pdp-dimensions">
        <Container>
          <div className="pdp-dimensions__grid">
            <div className={`pdp-dimension-card pdp-dimension-card--${product.shape}`} aria-label="Product dimension view">
              <div className="pdp-dimension-card__media">
                <Image
                  alt={`${product.name} dimension reference`}
                  className="pdp-dimension-card__image"
                  fill
                  sizes="(max-width: 980px) 100vw, 42rem"
                  src={pageImages.dimension}
                />
                <span className="pdp-dimension-guide pdp-dimension-guide--top">{dimensionLabel(product, "Top")}</span>
                <span className="pdp-dimension-guide pdp-dimension-guide--height">
                  {dimensionLabel(product, "Height")}
                </span>
                <span className="pdp-dimension-guide pdp-dimension-guide--base">{dimensionLabel(product, "Base")}</span>
              </div>
              <div className="pdp-dimension-card__legend">
                <span>Top opening</span>
                <span>Lid profile</span>
                <span>Base footprint</span>
              </div>
            </div>
            <div className="pdp-section__head">
              <p className="kicker">Dimension Visual</p>
              <h2>Product geometry before final specs.</h2>
              <p>
                This view keeps the selected container visible while top, height and base references are prepared for
                final manufacturer confirmation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pdp-section pdp-variants">
        <Container>
          <div className="pdp-section__head">
            <p className="kicker">Available Variants</p>
            <h2>Explore the product family.</h2>
          </div>
          <div className="pdp-variant-track" aria-label="Available product variants">
            {variants.map((item) => (
              <Link
                className={item.slug === product.slug ? "pdp-variant-card is-current" : "pdp-variant-card"}
                href={`/products/${item.slug}`}
                key={item.slug}
              >
                <div className="pdp-variant-card__image">
                <Image alt={item.name} fill sizes="15rem" src={productImage(item)} />
                </div>
                <span>{item.id}</span>
                <h3>{item.name}</h3>
                <p>{displayValue(item.capacity, "Specification on request")}</p>
                <strong>{item.slug === product.slug ? "Current Product" : "View Product"}</strong>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="pdp-section pdp-why">
        <Container>
          <div className="pdp-section__head">
            <p className="kicker">Why Kanak Mouldings</p>
            <h2>Practical support for food packaging supply.</h2>
          </div>
          <div className="pdp-why-grid">
            <article>
              <Utensils size={24} strokeWidth={1.7} />
              <h3>Food Packaging Focus</h3>
              <p>Products are presented around professional food-service requirements.</p>
            </article>
            <article>
              <Boxes size={24} strokeWidth={1.7} />
              <h3>Product Range</h3>
              <p>Plastic containers and biodegradable packaging directions are available.</p>
            </article>
            <article>
              <Factory size={24} strokeWidth={1.7} />
              <h3>Manufacturing Context</h3>
              <p>Built for repeat commercial conversations around packing and supply.</p>
            </article>
            <article>
              <Truck size={24} strokeWidth={1.7} />
              <h3>Delivery Ready Thinking</h3>
              <p>Container presentation is shaped around takeaway and dispatch workflows.</p>
            </article>
            <article>
              <BadgeCheck size={24} strokeWidth={1.7} />
              <h3>Custom Enquiries</h3>
              <p>Business-specific colour, capacity, lid and quantity needs can be discussed.</p>
            </article>
          </div>
        </Container>
      </section>

      <section className="pdp-section pdp-enquiry">
        <Container>
          <div className="pdp-enquiry__grid">
            <div className="pdp-section__head">
              <p className="kicker">B2B Enquiry</p>
              <h2>Looking for Bulk Packaging?</h2>
              <p>Tell us your required product, capacity and estimated quantity.</p>
              <Button href="/products" variant="outline">
                View Product Catalogue
              </Button>
            </div>
            <ProductEnquiryForm productName={product.name} />
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="pdp-section pdp-related">
          <Container>
            <div className="pdp-section__head">
              <p className="kicker">Related Products</p>
              <h2>You May Also Explore</h2>
            </div>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        suppressHydrationWarning
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
        type="application/ld+json"
      />
    </article>
  );
}
