import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import { quoteHref } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ProductCard } from "@/components/ui/ProductCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.image ?? "/images/generated/cinematic-noodle-container.png"],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.slug !== product.slug && (item.category === product.category || item.shape === product.shape))
    .slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.image ?? "/images/generated/cinematic-noodle-container.png",
  };

  return (
    <article className="product-detail">
      <Container>
        <div className="product-detail__hero">
          <div className="product-detail__visual">
            <ProductVisual
              accent={product.visual.accent}
              baseColor={product.visual.baseColor}
              compartments={product.visual.compartments}
              image={product.image}
              alt={product.name}
              lid={product.visual.lid}
              shape={product.shape}
            />
          </div>
          <div>
            <p className="kicker">{product.category}</p>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="hero__actions">
              <Button href={quoteHref({ product: product.slug })} variant="accent">
                Request Quote For This Container
              </Button>
              <Button href="/products" variant="outline">
                Browse Products
              </Button>
            </div>
          </div>
        </div>

        <div className="spec-grid">
          {[
            ["Shape", product.shape],
            ["Capacity", product.capacity],
            ["Dimensions", product.dimensions],
            ["Material", product.material],
            ["Colour Options", product.colourOptions.join(", ")],
            ["Lid Options", product.lidOptions.join(", ")],
            ["Compartments", product.compartments.join(", ")],
            ["Customisation", product.customisation],
          ].map(([label, value]) => (
            <div className="spec-card" key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>

        <div className="product-detail__lists">
          <section>
            <h2>Applications</h2>
            <ul>
              {product.applications.map((application) => (
                <li key={application}>{application}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Features</h2>
            <ul>
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>

        {product.placeholderSpecification ? (
          <p className="placeholder-alert">
            Capacity, dimensions, material grade, compliance and temperature details are placeholders until supplied by the manufacturer.
          </p>
        ) : null}

        {related.length ? (
          <section className="related-products">
            <h2>Related Containers</h2>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        suppressHydrationWarning
        type="application/ld+json"
      />
    </article>
  );
}
