import type { Metadata } from "next";
import Image from "next/image";
import { manufacturingGalleryItems } from "@/data/gallery";
import { getManagedGalleryItems } from "@/lib/backend/gallery";
import { getProducts } from "@/lib/backend/products";
import { Container } from "@/components/ui/Container";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View Kanak Mouldings product and manufacturing visuals for food packaging containers, material preparation, forming, lid fit and packing.",
};

export default async function GalleryPage() {
  const products = await getProducts();
  const managedGalleryItems = await getManagedGalleryItems();
  const galleryItems = [
    ...products
      .filter((product) => product.image)
      .map((product) => ({
        src: product.image as string,
        title: product.name,
        description: product.shortDescription,
        category: "Product",
      })),
    ...manufacturingGalleryItems,
    ...managedGalleryItems,
  ];

  return (
    <section className="page-shell gallery-page">
      <Container>
        <div className="page-hero">
          <p className="kicker">Gallery</p>
          <h1>PRODUCT AND MANUFACTURING VISUALS.</h1>
          <p>
            A focused view of container formats, material flow, lid-fit checks
            and packing stages used to explain the product range.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <article className="gallery-card" key={`${item.category}-${item.title}`}>
              <div className="gallery-card__media">
                <Image
                  alt={item.title}
                  className="gallery-card__image"
                  fill
                  priority={index < 2}
                  sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw"
                  src={item.src}
                />
              </div>
              <div className="gallery-card__body">
                <span>{item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
