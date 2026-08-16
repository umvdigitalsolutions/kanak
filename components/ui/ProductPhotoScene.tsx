import Image from "next/image";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/assets";

const productImage = assetPath("/images/generated/cinematic-noodle-container.png");

type ProductPhotoSceneProps = {
  alt?: string;
  badges?: string[];
  caption?: string;
  className?: string;
  eyebrow?: string;
  smoke?: boolean;
  tone?: "black" | "white" | "clear" | "custom" | "warm";
  variant?: "default" | "stack" | "lid" | "exploded" | "configurator";
};

export function ProductPhotoScene({
  alt = "Cinematic black takeaway food container with a clear lid",
  badges = [],
  caption,
  className,
  eyebrow,
  smoke = false,
  tone = "warm",
  variant = "default",
}: ProductPhotoSceneProps) {
  return (
    <figure
      className={cn(
        "product-photo-scene",
        `product-photo-scene--${variant}`,
        `product-photo-scene--tone-${tone}`,
        className,
      )}
    >
      <div className="product-photo-scene__media">
        <Image
          alt={alt}
          className="product-photo-scene__image"
          height={1024}
          priority={variant === "default"}
          sizes="(max-width: 980px) 100vw, 48vw"
          src={productImage}
          width={1536}
        />
      </div>
      {smoke ? (
        <div className="product-photo-scene__smoke" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : null}
      <figcaption className="product-photo-scene__content">
        {eyebrow ? <span>{eyebrow}</span> : null}
        {caption ? <strong>{caption}</strong> : null}
        {badges.length ? (
          <div className="product-photo-scene__badges">
            {badges.map((badge) => (
              <small key={badge}>{badge}</small>
            ))}
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}
