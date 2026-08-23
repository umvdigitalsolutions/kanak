import type { Collection, ObjectId } from "mongodb";
import { assetPath } from "@/lib/assets";
import type { GalleryItem } from "@/data/gallery";
import { logBackendError } from "@/lib/backend/errors";
import { getOptionalDb, requireDb } from "@/lib/backend/mongodb";

type GalleryDocument = GalleryItem & {
  _id?: ObjectId;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type GalleryInput = Partial<GalleryItem>;

function normalizeGalleryItem(input: GalleryInput): GalleryItem {
  const now = new Date().toISOString();
  const title = String(input.title || "").trim();

  if (!title) {
    throw new Error("Gallery title is required.");
  }

  return {
    id: String(input.id || `gallery-${Date.now()}`).trim(),
    title,
    description: String(input.description || "").trim(),
    category: String(input.category || "Gallery").trim(),
    src: assetPath(String(input.src || "").trim()),
    order: Number.isFinite(Number(input.order)) ? Number(input.order) : 100,
    isPublished: input.isPublished !== false,
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now,
  };
}

function serializeGalleryItem(document: GalleryDocument): GalleryItem {
  const { _id, ...item } = document;
  void _id;
  return normalizeGalleryItem(item);
}

async function galleryCollection(): Promise<Collection<GalleryDocument> | null> {
  const db = await getOptionalDb();
  return db ? db.collection<GalleryDocument>("galleryItems") : null;
}

async function requiredGalleryCollection() {
  const db = await requireDb();
  return db.collection<GalleryDocument>("galleryItems");
}

export async function getManagedGalleryItems({ includeDrafts = false } = {}) {
  try {
    const collection = await galleryCollection();
    if (!collection) {
      return [];
    }

    const filter = includeDrafts ? {} : { isPublished: { $ne: false } };
    const documents = await collection.find(filter).sort({ order: 1, title: 1 }).toArray();
    return documents.map(serializeGalleryItem);
  } catch (error) {
    logBackendError("Gallery database read failed", error);
    return [];
  }
}

export async function saveGalleryItem(input: GalleryInput) {
  const collection = await requiredGalleryCollection();
  const now = new Date().toISOString();
  const item = normalizeGalleryItem({ ...input, updatedAt: now });
  const { createdAt, ...itemForUpdate } = item;

  await collection.updateOne(
    { id: item.id },
    {
      $set: { ...itemForUpdate, updatedAt: now },
      $setOnInsert: { createdAt: input.createdAt || createdAt || now },
    },
    { upsert: true },
  );

  return item;
}

export async function deleteGalleryItem(id: string) {
  const collection = await requiredGalleryCollection();
  await collection.deleteOne({ id });
}
