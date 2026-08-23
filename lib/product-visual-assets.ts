import type { ContainerColor, ContainerShape, Product } from "@/data/products";
import { assetPath } from "@/lib/assets";

type ProductPdpAssetSet = {
  display: string;
  exploded?: string;
  hero?: string;
  stack?: string;
};

export type ProductPageAssetSet = {
  exploded: string;
  hero: string;
  quality: string;
  stack: string;
  story: string;
  dimension: string;
};

const fallbackImage = assetPath("/images/generated/cinematic-noodle-container.png");
const qualityImage = assetPath("/images/generated/pdp/material-quality-lab.webp");
const productRangeImage = assetPath("/images/generated/pdp/product-range-premium.webp");
const biodegradableClamshellImage = assetPath("/images/generated/hero-real-float/biodegradable-empty-clamshell.webp");
const biodegradableClamshellScene = assetPath("/images/generated/container-carousel/biodegradable-clamshell.webp");
const biodegradableCupImage = assetPath("/images/generated/hero-real-float/biodegradable-coffee-cups.webp");
const biodegradableCupScene = assetPath("/images/generated/container-carousel/biodegradable-coffee-cups.webp");

const fallbackAssets: Record<ContainerShape, Partial<Record<ContainerColor, ProductPdpAssetSet>>> = {
  rectangular: {
    black: {
      display: assetPath("/images/generated/hero-real-float/rectangle-empty-tray.webp"),
      exploded: assetPath("/images/generated/pdp/product-specific/rectangle-black-exploded.webp"),
      stack: assetPath("/images/generated/pdp/product-specific/rectangle-black-stacked.webp"),
    },
    clear: {
      display: assetPath("/images/generated/pdp/product-specific/rectangle-transparent-product-cutout.webp"),
      exploded: assetPath("/images/generated/pdp/product-specific/rectangle-transparent-exploded.webp"),
      stack: assetPath("/images/generated/pdp/product-specific/rectangle-transparent-stacked.webp"),
    },
    custom: {
      display: productRangeImage,
    },
    white: {
      display: assetPath("/images/generated/pdp/product-specific/round-white-product-cutout.webp"),
    },
  },
  round: {
    black: {
      display: assetPath("/images/generated/hero-real-float/round-empty-container.webp"),
      exploded: assetPath("/images/generated/pdp/exploded-food-container.webp"),
      hero: assetPath("/images/generated/pdp/hero-round-black-container.webp"),
      stack: assetPath("/images/generated/pdp/stacked-round-containers.webp"),
    },
    clear: {
      display: assetPath("/images/generated/hero-real-float/round-empty-container.webp"),
    },
    custom: {
      display: productRangeImage,
    },
    white: {
      display: assetPath("/images/generated/pdp/product-specific/round-white-product-cutout.webp"),
      exploded: assetPath("/images/generated/pdp/product-specific/round-white-exploded.webp"),
      stack: assetPath("/images/generated/pdp/product-specific/round-white-stacked.webp"),
    },
  },
  square: {
    black: {
      display: assetPath("/images/generated/hero-real-float/rectangle-empty-tray.webp"),
    },
    clear: {
      display: assetPath("/images/generated/pdp/product-specific/rectangle-transparent-product-cutout.webp"),
    },
    custom: {
      display: productRangeImage,
    },
    white: {
      display: assetPath("/images/generated/pdp/product-specific/round-white-product-cutout.webp"),
    },
  },
  tray: {
    black: {
      display: assetPath("/images/generated/hero-real-float/rectangle-empty-tray.webp"),
    },
    clear: {
      display: assetPath("/images/generated/pdp/product-specific/rectangle-transparent-product-cutout.webp"),
    },
    custom: {
      display: productRangeImage,
    },
    white: {
      display: assetPath("/images/generated/pdp/product-specific/round-white-product-cutout.webp"),
    },
  },
};

function isLegacySeedImage(src: string) {
  return src.includes("/images/products/kanak/");
}

function productMedia(product: Product) {
  const media = [product.image, ...product.gallery]
    .filter((src): src is string => Boolean(src))
    .map((src) => assetPath(src));

  return [...new Set(media)];
}

function uploadedProductMedia(product: Product) {
  return productMedia(product).filter((src) => !isLegacySeedImage(src));
}

function fallbackForProduct(product: Product) {
  if (product.category === "Biodegradables") {
    if (product.shape === "round") {
      return {
        display: biodegradableCupImage,
        exploded: biodegradableCupScene,
        stack: biodegradableCupImage,
      };
    }

    return {
      display: biodegradableClamshellImage,
      exploded: biodegradableClamshellScene,
      stack: biodegradableClamshellImage,
    };
  }

  return fallbackAssets[product.shape]?.[product.visual.baseColor] ?? fallbackAssets[product.shape]?.custom;
}

export function productDisplayImage(product: Product) {
  return uploadedProductMedia(product)[0] ?? fallbackForProduct(product)?.display ?? productMedia(product)[0] ?? fallbackImage;
}

export function productPageImages(product: Product): ProductPageAssetSet {
  const uploadedMedia = uploadedProductMedia(product);
  const fallback = fallbackForProduct(product);
  const display = productDisplayImage(product);

  return {
    dimension: uploadedMedia[0] ?? display,
    exploded: uploadedMedia[1] ?? fallback?.exploded ?? uploadedMedia[0] ?? display,
    hero: uploadedMedia[0] ?? fallback?.hero ?? display,
    quality: qualityImage,
    stack: uploadedMedia[2] ?? fallback?.stack ?? uploadedMedia[1] ?? display,
    story: uploadedMedia[0] ?? display,
  };
}
