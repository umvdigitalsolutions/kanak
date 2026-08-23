import type { Collection, ObjectId } from "mongodb";
import { primaryProductCategories } from "@/data/products";
import { logBackendError } from "@/lib/backend/errors";
import { formString, toSlug } from "@/lib/backend/form";
import { getOptionalDb, requireDb } from "@/lib/backend/mongodb";

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type CategoryDocument = ProductCategory & {
  _id?: ObjectId;
};

export type CategoryInput = Partial<ProductCategory>;

function fallbackCategories() {
  return primaryProductCategories.map<ProductCategory>((name, index) => ({
    id: toSlug(name),
    name,
    slug: toSlug(name),
    description:
      name === "Biodegradables"
        ? "Paper, kraft, fiber and biodegradable packaging products."
        : "Food-grade plastic containers for takeaway and delivery packaging.",
    order: index * 10,
    isPublished: true,
  }));
}

function normalizeCategory(input: CategoryInput): ProductCategory {
  const now = new Date().toISOString();
  const name = String(input.name || "").trim();
  const slug = toSlug(String(input.slug || name));

  if (!name) {
    throw new Error("Category name is required.");
  }

  if (!slug) {
    throw new Error("Category slug is required.");
  }

  return {
    id: String(input.id || slug).trim(),
    name,
    slug,
    description: String(input.description || "").trim(),
    order: Number.isFinite(Number(input.order)) ? Number(input.order) : 100,
    isPublished: input.isPublished !== false,
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now,
  };
}

function serializeCategory(document: CategoryDocument) {
  const { _id, ...category } = document;
  void _id;
  return normalizeCategory(category);
}

function mergeDefaultCategories(documents: ProductCategory[]) {
  const allowed = new Set(primaryProductCategories);
  const visibleDocuments = documents.filter((category) => allowed.has(category.name as (typeof primaryProductCategories)[number]));
  const documentSlugs = new Set(visibleDocuments.map((category) => category.slug));
  const missingDefaults = fallbackCategories().filter((category) => !documentSlugs.has(category.slug));

  return [...visibleDocuments, ...missingDefaults].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

async function categoryCollection(): Promise<Collection<CategoryDocument> | null> {
  const db = await getOptionalDb();
  return db ? db.collection<CategoryDocument>("categories") : null;
}

async function requiredCategoryCollection() {
  const db = await requireDb();
  return db.collection<CategoryDocument>("categories");
}

async function seedCategoriesIfEmpty(collection: Collection<CategoryDocument>) {
  const count = await collection.estimatedDocumentCount();
  if (count > 0) return;

  const now = new Date().toISOString();
  await collection.bulkWrite(
    fallbackCategories().map((category) => {
      const normalized = normalizeCategory({ ...category, updatedAt: now });
      const { createdAt, ...categoryForUpdate } = normalized;

      return {
        updateOne: {
          filter: { slug: normalized.slug },
          update: {
            $set: { ...categoryForUpdate, updatedAt: now },
            $setOnInsert: { createdAt: createdAt || now },
          },
          upsert: true,
        },
      };
    }),
  );
}

export async function getCategories({ includeDrafts = false } = {}) {
  const fallback = fallbackCategories().filter((category) => includeDrafts || category.isPublished);

  try {
    const collection = await categoryCollection();
    if (!collection) return fallback;

    await seedCategoriesIfEmpty(collection);
    const filter = includeDrafts ? {} : { isPublished: { $ne: false } };
    const documents = await collection.find(filter).sort({ order: 1, name: 1 }).toArray();
    return mergeDefaultCategories(documents.map(serializeCategory));
  } catch (error) {
    logBackendError("Category database read failed. Falling back to static categories", error);
    return fallback;
  }
}

export async function getCategoryNames(options?: { includeDrafts?: boolean }) {
  const categories = await getCategories(options);
  return categories.map((category) => category.name);
}

export async function saveCategory(input: CategoryInput) {
  const collection = await requiredCategoryCollection();
  const now = new Date().toISOString();
  const category = normalizeCategory({ ...input, updatedAt: now });
  const { createdAt, ...categoryForUpdate } = category;

  await collection.updateOne(
    { slug: category.slug },
    {
      $set: { ...categoryForUpdate, updatedAt: now },
      $setOnInsert: { createdAt: input.createdAt || createdAt || now },
    },
    { upsert: true },
  );

  return category;
}

export async function deleteCategory(slug: string) {
  const collection = await requiredCategoryCollection();
  await collection.deleteOne({ slug });
}

export function categoryInputFromForm(formData: FormData): CategoryInput {
  const name = formString(formData, "name");

  return {
    id: formString(formData, "id"),
    name,
    slug: toSlug(formString(formData, "slug") || name),
    description: formString(formData, "description"),
    order: Number(formString(formData, "order", "100")),
    isPublished: formData.get("isPublished") === "on",
  };
}
