import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { getProducts } from "@/lib/backend/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/products", "/gallery", "/about", "/contact"];
  const products = await getProducts();

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
