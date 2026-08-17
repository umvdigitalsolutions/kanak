import type { Metadata } from "next";
import { products } from "@/data/products";
import { assetPath } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { GalleryGrid, type GalleryItem } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View Kanak Mouldings product and manufacturing visuals for food packaging containers, material preparation, forming, lid fit and packing.",
};

const manufacturingItems = [
  {
    src: assetPath("/images/generated/flow/01-material.jpg"),
    title: "Material Preparation",
    description: "Plastic resin and biodegradable material direction visualized before forming.",
  },
  {
    src: assetPath("/images/generated/flow/02-forming.jpg"),
    title: "Container Forming",
    description: "Rigid container shapes formed for food-service handling and consistent presentation.",
  },
  {
    src: assetPath("/images/generated/flow/03-trimming.jpg"),
    title: "Rim Trimming",
    description: "Clean rim geometry supports practical lid alignment and stacked movement.",
  },
  {
    src: assetPath("/images/generated/flow/04-lid-fit.jpg"),
    title: "Lid Fit Check",
    description: "Matching lid direction is checked around the rim before packing decisions.",
  },
  {
    src: assetPath("/images/generated/flow/05-quality.jpg"),
    title: "Quality Review",
    description: "Shape, finish and batch presentation are reviewed before product movement.",
  },
  {
    src: assetPath("/images/generated/flow/06-packing.jpg"),
    title: "Packing Ready",
    description: "Nested stacks are prepared for clean dispatch and food-service supply.",
  },
];

const galleryItems: GalleryItem[] = [
  ...products
    .filter((product) => product.image)
    .map((product) => ({
      src: product.image as string,
      title: product.name,
      description: product.shortDescription,
      category: "Product" as const,
    })),
  ...manufacturingItems.map((item) => ({
    ...item,
    category: "Manufacturing" as const,
  })),
];

export default function GalleryPage() {
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

        <GalleryGrid items={galleryItems} />
      </Container>
    </section>
  );
}
