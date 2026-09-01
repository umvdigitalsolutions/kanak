import type { Metadata } from "next";
import Image from "next/image";
import { manufacturingGalleryItems } from "@/data/gallery";
import { getManagedGalleryItems } from "@/lib/backend/gallery";
import { Container } from "@/components/ui/Container";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View Kanak Mouldings manufacturing visuals for material preparation, container forming, lid-fit checks, quality review and packing.",
};

export default async function GalleryPage() {
  const managedGalleryItems = (await getManagedGalleryItems()).filter(
    (item) => item.category.trim().toLowerCase() !== "product",
  );
  const galleryItems = Array.from(
    new Map(
      [...manufacturingGalleryItems, ...managedGalleryItems].map((item) => [item.src, item]),
    ).values(),
  );

  return (
    <section className="page-shell gallery-page">
      <Container>
        <div className="page-hero">
          <p className="kicker">Gallery</p>
          <h1>MANUFACTURING AND QUALITY VISUALS.</h1>
          <p>
            A focused view of material preparation, forming, lid-fit checks,
            quality review and dispatch-ready packing.
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
