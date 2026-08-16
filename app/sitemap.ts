import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/gallery", "/about", "/contact"];

  return [
    ...routes.map((route) => ({
      url: `${company.siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...products.map((product) => ({
      url: `${company.siteUrl}/products/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}
