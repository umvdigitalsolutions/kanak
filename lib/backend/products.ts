import type { Collection, Filter, ObjectId } from "mongodb";
import { assetPath } from "@/lib/assets";
import {
  primaryProductCategories,
  products as seedProducts,
  type ContainerColor,
  type ContainerShape,
  type Product,
} from "@/data/products";
import { getOptionalDb, requireDb } from "@/lib/backend/mongodb";
import { logBackendError } from "@/lib/backend/errors";
import { toSlug } from "@/lib/backend/form";

type ProductDocument = Product & {
  _id?: ObjectId;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = Partial<Product> & {
  originalSlug?: string;
};

type GetProductsOptions = {
  includeDrafts?: boolean;
};

const shapeValues = new Set<ContainerShape>(["rectangular", "round", "square", "tray"]);
const colorValues = new Set<ContainerColor>(["black", "white", "clear", "custom"]);
const accentValues = new Set(["rice", "curry", "noodles", "dessert", "salad", "empty"]);

function isContainerShape(value: unknown): value is ContainerShape {
  return typeof value === "string" && shapeValues.has(value as ContainerShape);
}

function isContainerColor(value: unknown): value is ContainerColor {
  return typeof value === "string" && colorValues.has(value as ContainerColor);
}

function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeNumberArray(value: unknown) {
  const source = Array.isArray(value) ? value : typeof value === "string" ? value.split(/\r?\n|,/) : [];

  return source
    .map((item) => Number(String(item).trim()))
    .filter((item) => Number.isFinite(item) && item > 0);
}

function normalizeProductCategory(value: unknown, shape: ContainerShape) {
  const category = String(value || "").trim();

  if (primaryProductCategories.includes(category as (typeof primaryProductCategories)[number])) {
    return category;
  }

  if (/bio|kraft|paper|compost|eco/i.test(category)) {
    return "Biodegradables";
  }

  if (["Round", "Rectangular", "Rectangle", "Custom", "Tray", "Square"].includes(category)) {
    return "Plastic Containers";
  }

  return category || (shape === "tray" ? "Biodegradables" : "Plastic Containers");
}

function normalizeAsset(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? assetPath(trimmed) : null;
}

function normalizeGallery(value: unknown) {
  return normalizeStringArray(value).map((item) => assetPath(item));
}

export function normalizeProduct(input: ProductInput): Product {
  const name = String(input.name ?? "").trim();
  const slug = toSlug(String(input.slug ?? name));
  const now = new Date().toISOString();
  const shape = isContainerShape(input.shape) ? input.shape : "rectangular";
  const baseColor = isContainerColor(input.visual?.baseColor) ? input.visual.baseColor : "black";
  const visualCompartments = Number(input.visual?.compartments ?? input.compartments?.[0] ?? 1);
  const accent = accentValues.has(String(input.visual?.accent)) ? input.visual?.accent : "empty";

  if (!name) {
    throw new Error("Product name is required.");
  }

  if (!slug) {
    throw new Error("Product slug is required.");
  }

  return {
    id: String(input.id || `P-${slug.toUpperCase()}`).trim(),
    slug,
    name,
    category: normalizeProductCategory(input.category, shape),
    shape,
    shortDescription: String(input.shortDescription || "").trim(),
    description: String(input.description || input.shortDescription || "").trim(),
    capacity: String(input.capacity || "Capacity range to be confirmed").trim(),
    dimensions: String(input.dimensions || "Specification pending").trim(),
    colourOptions: normalizeStringArray(input.colourOptions),
    lidOptions: normalizeStringArray(input.lidOptions),
    compartments: normalizeNumberArray(input.compartments).length ? normalizeNumberArray(input.compartments) : [1],
    material: String(input.material || "Confirm with manufacturer").trim(),
    applications: normalizeStringArray(input.applications),
    features: normalizeStringArray(input.features),
    customisation: String(input.customisation || "").trim(),
    image: normalizeAsset(input.image),
    gallery: normalizeGallery(input.gallery),
    featured: Boolean(input.featured),
    isPublished: input.isPublished !== false,
    order: Number.isFinite(Number(input.order)) ? Number(input.order) : 100,
    placeholderSpecification: input.placeholderSpecification !== false,
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now,
    visual: {
      baseColor,
      compartments: Number.isFinite(visualCompartments) && visualCompartments > 0 ? visualCompartments : 1,
      lid: input.visual?.lid !== false,
      accent: accent as Product["visual"]["accent"],
    },
  };
}

function serializeProduct(document: ProductDocument): Product {
  const { _id, ...product } = document;
  void _id;

  return normalizeProduct({
    ...product,
    image: product.image,
    gallery: product.gallery,
  });
}

async function productCollection(): Promise<Collection<ProductDocument> | null> {
  const db = await getOptionalDb();
  return db ? db.collection<ProductDocument>("products") : null;
}

async function requiredProductCollection() {
  const db = await requireDb();
  return db.collection<ProductDocument>("products");
}

function publicFilter(includeDrafts = false): Filter<ProductDocument> {
  return includeDrafts ? {} : { isPublished: { $ne: false } };
}

function sortProducts(items: Product[]) {
  return [...items].sort((a, b) => {
    const orderDelta = (a.order ?? 100) - (b.order ?? 100);
    return orderDelta || a.name.localeCompare(b.name);
  });
}

function mergeStaticFallbackProducts(documents: Product[], fallback: Product[]) {
  const documentSlugs = new Set(documents.map((product) => product.slug));
  const missingFallbacks = fallback.filter((product) => !documentSlugs.has(product.slug));

  return sortProducts([...documents, ...missingFallbacks]);
}

export async function syncStaticProductsToMongo() {
  const collection = await requiredProductCollection();
  const now = new Date().toISOString();

  await collection.bulkWrite(
    seedProducts.map((product, index) => {
      const normalized = normalizeProduct({
        ...product,
        isPublished: product.isPublished ?? true,
        order: product.order ?? index * 10,
        updatedAt: now,
      });
      const { createdAt, ...productForUpdate } = normalized;

      return {
        updateOne: {
          filter: { slug: normalized.slug },
          update: {
            $set: { ...productForUpdate, updatedAt: now },
            $setOnInsert: { createdAt: createdAt || now },
          },
          upsert: true,
        },
      };
    }),
  );
}

async function seedProductsIfEmpty(collection: Collection<ProductDocument>) {
  const count = await collection.estimatedDocumentCount();
  if (count === 0) {
    await syncStaticProductsToMongo();
  }
}

export async function getProducts(options: GetProductsOptions = {}) {
  const fallback = sortProducts(
    seedProducts
      .map((product, index) => ({
        ...product,
        isPublished: product.isPublished ?? true,
        order: product.order ?? index * 10,
      }))
      .filter((product) => options.includeDrafts || product.isPublished !== false),
  );

  try {
    const collection = await productCollection();
    if (!collection) {
      return fallback;
    }

    await seedProductsIfEmpty(collection);

    const documents = await collection
      .find(publicFilter(options.includeDrafts))
      .sort({ order: 1, name: 1 })
      .toArray();

    return mergeStaticFallbackProducts(documents.map(serializeProduct), fallback);
  } catch (error) {
    logBackendError("Product database read failed. Falling back to static products", error);
    return fallback;
  }
}

export async function getProductBySlug(slug: string, options: GetProductsOptions = {}) {
  try {
    const collection = await productCollection();
    if (!collection) {
      return seedProducts.find((product) => product.slug === slug);
    }

    await seedProductsIfEmpty(collection);
    const document = await collection.findOne({ slug, ...publicFilter(options.includeDrafts) });
    return document ? serializeProduct(document) : seedProducts.find((product) => product.slug === slug);
  } catch (error) {
    logBackendError("Product database read failed. Falling back to static product", error);
    return seedProducts.find((product) => product.slug === slug);
  }
}

export async function saveProduct(input: ProductInput) {
  const collection = await requiredProductCollection();
  const now = new Date().toISOString();
  const product = normalizeProduct({
    ...input,
    updatedAt: now,
  });
  const { createdAt, ...productForUpdate } = product;

  if (input.originalSlug && input.originalSlug !== product.slug) {
    await collection.deleteOne({ slug: input.originalSlug });
  }

  await collection.updateOne(
    { slug: product.slug },
    {
      $set: {
        ...productForUpdate,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: input.createdAt || createdAt || now,
      },
    },
    { upsert: true },
  );

  return product;
}

export async function deleteProduct(slug: string) {
  const collection = await requiredProductCollection();
  await collection.deleteOne({ slug });
}
