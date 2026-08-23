import { Db, MongoClient, ServerApiVersion } from "mongodb";
import { logBackendError } from "@/lib/backend/errors";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "kanakmouldings";
const timeout = Number(process.env.MONGODB_TIMEOUT_MS || 2500);

declare global {
  var __kanakMongoClientPromise: Promise<MongoClient> | undefined;
  var __kanakMongoIndexesPromise: Promise<void> | undefined;
}

export function isMongoConfigured() {
  return Boolean(uri);
}

async function getMongoClient() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!globalThis.__kanakMongoClientPromise) {
    const client = new MongoClient(uri, {
      connectTimeoutMS: timeout,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: timeout,
    });

    globalThis.__kanakMongoClientPromise = client.connect().catch((error) => {
      globalThis.__kanakMongoClientPromise = undefined;
      globalThis.__kanakMongoIndexesPromise = undefined;
      logBackendError("MongoDB connection failed", error);
      throw error;
    });
  }

  return globalThis.__kanakMongoClientPromise;
}

export async function getOptionalDb(): Promise<Db | null> {
  if (!uri) {
    return null;
  }

  const client = await getMongoClient();
  const db = client.db(dbName);
  await ensureIndexes(db);
  return db;
}

export async function requireDb() {
  const db = await getOptionalDb();

  if (!db) {
    throw new Error("MongoDB is not configured. Set MONGODB_URI and MONGODB_DB in the environment.");
  }

  return db;
}

async function ensureIndexes(db: Db) {
  if (!globalThis.__kanakMongoIndexesPromise) {
    globalThis.__kanakMongoIndexesPromise = Promise.all([
      db.collection("products").createIndex({ slug: 1 }, { unique: true }),
      db.collection("products").createIndex({ isPublished: 1, order: 1 }),
      db.collection("categories").createIndex({ slug: 1 }, { unique: true }),
      db.collection("categories").createIndex({ isPublished: 1, order: 1 }),
      db.collection("galleryItems").createIndex({ isPublished: 1, order: 1 }),
      db.collection("inquiries").createIndex({ createdAt: -1 }),
      db.collection("inquiries").createIndex({ status: 1, createdAt: -1 }),
      db.collection("siteSettings").createIndex({ id: 1 }, { unique: true }),
    ])
      .then(() => undefined)
      .catch((error) => {
        globalThis.__kanakMongoIndexesPromise = undefined;
        logBackendError("MongoDB index setup failed", error);
        throw error;
      });
  }

  return globalThis.__kanakMongoIndexesPromise;
}
