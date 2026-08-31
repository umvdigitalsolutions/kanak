import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Layers3,
  PackageCheck,
  Ruler,
} from "lucide-react";
import { notFound } from "next/navigation";
import { products as staticProducts, type Product } from "@/data/products";
import { getProductBySlug, getProducts } from "@/lib/backend/products";
import { productDisplayImage, productPageImages as getProductPageImages } from "@/lib/product-visual-assets";
import { quoteHref } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
  "size-specific variant",
  "size on request",
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

function productSizeOptions(product: Product) {
  if (product.sizeOptions?.length) {
    return product.sizeOptions;
  }

  return isMeaningful(product.capacity) ? [product.capacity] : [];
}

function sizeSummary(sizes: string[]) {
  if (sizes.length > 1) {
    return `${sizes[0]} - ${sizes[sizes.length - 1]}`;
  }

  return sizes[0] || "Size on request";
}

function buildSpecs(product: Product): SpecItem[] {
  const sizes = joinValues(productSizeOptions(product));
  const specs: SpecItem[] = [];
  const seen = new Set<string>();
  const canonicalLabel = (label: string) => {
    const normalized = label.trim().toLowerCase();
    if (/usage|application/.test(normalized)) return "applications";
    if (/colour|color/.test(normalized)) return "colour";
    if (/dimension|box size/.test(normalized)) return "dimensions";
    if (/closure|lid type/.test(normalized)) return "closure";
    return normalized;
  };
  const add = (label: string, value: string) => {
    const key = canonicalLabel(label);
    if (!key || !isMeaningful(value) || seen.has(key)) return;
    seen.add(key);
    specs.push({ label, value });
  };

  add("Product Code", product.id);
  add("Product Range", product.productRange || product.category);
  product.specifications?.forEach((specification) => add(specification.label, specification.value));
  add("Shape", formatShape(product.shape));
  add("Capacity", product.capacity);
  if (sizes) add("Available Size", sizes);
  add("Material", product.material);
  add("Dimensions", product.dimensions);

  const colours = joinValues(product.colourOptions);
  const lids = joinValues(product.lidOptions);
  const compartments = product.compartments.length
    ? product.compartments.map((item) => `${item} compartment${item > 1 ? "s" : ""}`).join(", ")
    : "";
  const applications = joinValues(product.applications.slice(0, 4));

  if (colours) add("Colour Options", colours);
  if (lids) add("Closure", lids);
  if (compartments) add("Compartments", compartments);
  if (applications) add("Applications", applications);
  add("Customisation", product.customisation);

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
  const sizeOptions = productSizeOptions(product);
  const badges = buildBadges(product);
  const variants = products
    .filter((item) => item.slug === product.slug || item.productRange === product.productRange)
    .slice(0, 8);
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
              <p className="kicker">{product.productRange || product.category}</p>
              <h1>{product.name}</h1>
              <p>{product.description || product.shortDescription}</p>

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

              {sizeOptions.length ? (
                <label className="pdp-size-picker">
                  <span>Choose Size</span>
                  <select defaultValue={sizeOptions[0]} aria-label={`${product.name} available size`}>
                    {sizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
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
                  {sizeSummary(sizeOptions)}
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

      <section className="pdp-section pdp-specs" id="specifications">
        <Container>
          <div className="pdp-section__head">
            <p className="kicker">Technical Profile</p>
            <h2>Product specifications.</h2>
            <p>
              Review the available material, size, finish and format details before requesting a bulk quotation.
            </p>
          </div>

          <div className="pdp-spec-layout">
            <div className="pdp-spec-table" role="table" aria-label={`${product.name} specifications`}>
              {specs.map((spec) => (
                <div className="pdp-spec-row" role="row" key={spec.label}>
                  <span role="cell">{spec.label}</span>
                  <strong role="cell">{spec.value}</strong>
                </div>
              ))}
            </div>
            <aside className="pdp-selection-summary">
              <p className="kicker">Selection Notes</p>
              <h3>Built around your food-service requirement.</h3>
              <p>{product.shortDescription}</p>
              <div>
                <span>Applications</span>
                <ul>
                  {product.applications.slice(0, 6).map((application) => (
                    <li key={application}>{application}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span>Supply Options</span>
                <ul>
                  {product.features.slice(0, 5).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <Button href={quoteHref({ product: product.slug })} variant="accent">
                Request Product Quote
              </Button>
            </aside>
          </div>

          {product.placeholderSpecification ? (
            <p className="placeholder-alert pdp-specs__note">
              Some technical values are marked for manufacturer confirmation, so they are not presented as final product
              specifications on this page.
            </p>
          ) : null}
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
                <p>{sizeSummary(productSizeOptions(item))}</p>
                <strong>{item.slug === product.slug ? "Current Product" : "View Product"}</strong>
              </Link>
            ))}
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
            <ProductEnquiryForm productName={product.name} sizeOptions={sizeOptions} />
          </div>
        </Container>
      </section>

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
