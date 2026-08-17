import Image from "next/image";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/assets";
import type { ContainerColor, ContainerShape } from "@/data/products";

type ProductVisualProps = {
  shape?: ContainerShape;
  baseColor?: ContainerColor;
  compartments?: number;
  lid?: boolean;
  accent?: "rice" | "curry" | "noodles" | "dessert" | "salad" | "empty";
  image?: string | null;
  alt?: string;
  className?: string;
};

export function ProductVisual({
  shape = "rectangular",
  baseColor = "black",
  compartments = 1,
  lid = true,
  accent = "rice",
  image,
  alt,
  className,
}: ProductVisualProps) {
  const hasSourceImage = Boolean(image);
  const imageSrc = image ?? assetPath("/images/generated/cinematic-noodle-container.png");
  const labels = [
    shape,
    baseColor === "custom" ? "custom finish" : `${baseColor} base`,
    lid ? "clear lid" : "open pack",
    accent !== "empty" ? accent : null,
    compartments > 1 ? `${compartments} zones` : null,
  ].filter(Boolean);

  return (
    <div
      className={cn(
        "product-visual",
        `product-visual--${shape}`,
        `product-visual--${baseColor}`,
        hasSourceImage && "product-visual--source",
        className,
      )}
      aria-hidden={alt ? undefined : true}
    >
      <Image
        alt={alt ?? ""}
        className="product-visual__image"
        fill
        sizes="(max-width: 680px) 85vw, 24rem"
        src={imageSrc}
      />
      <span className="product-visual__shine" />
      {hasSourceImage ? null : (
        <span className="product-visual__labels">
          {labels.map((label) => (
            <small key={label}>{label}</small>
          ))}
        </span>
      )}
    </div>
  );
}
