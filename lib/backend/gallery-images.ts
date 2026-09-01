import { GridFSBucket, ObjectId } from "mongodb";
import { requireDb } from "@/lib/backend/mongodb";

const bucketName = "galleryImages";
const maximumImageSize = 3_750_000;
const allowedImageTypes = new Set(["image/avif", "image/gif", "image/jpeg", "image/png", "image/webp"]);

function galleryBucket(db: Awaited<ReturnType<typeof requireDb>>) {
  return new GridFSBucket(db, { bucketName });
}

function safeFileName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100) || "gallery-image";
}

function hasExpectedSignature(buffer: Buffer, contentType: string) {
  if (contentType === "image/jpeg") {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (contentType === "image/png") {
    return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }

  if (contentType === "image/gif") {
    const signature = buffer.subarray(0, 6).toString("ascii");
    return signature === "GIF87a" || signature === "GIF89a";
  }

  if (contentType === "image/webp") {
    return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
  }

  if (contentType === "image/avif") {
    const header = buffer.subarray(0, 32).toString("ascii");
    return header.slice(4, 8) === "ftyp" && /avif|avis|mif1|msf1/.test(header);
  }

  return false;
}

export function galleryImageIdFromSrc(src: string) {
  return src.match(/\/api\/gallery-images\/([a-f\d]{24})(?:$|[?#])/i)?.[1] ?? null;
}

export async function saveGalleryImage(file: File) {
  if (!allowedImageTypes.has(file.type)) {
    throw new Error("Choose a JPG, PNG, WEBP, AVIF or GIF image.");
  }

  if (file.size <= 0 || file.size > maximumImageSize) {
    throw new Error("The processed gallery image must be smaller than 3.75 MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!hasExpectedSignature(buffer, file.type)) {
    throw new Error("The selected file does not contain a valid image.");
  }

  const db = await requireDb();
  const bucket = galleryBucket(db);
  const uploadStream = bucket.openUploadStream(safeFileName(file.name), {
    metadata: {
      contentType: file.type,
      originalName: file.name,
    },
  });

  await new Promise<void>((resolve, reject) => {
    uploadStream.once("error", reject);
    uploadStream.once("finish", resolve);
    uploadStream.end(buffer);
  });

  const id = uploadStream.id.toString();
  return {
    id,
    src: `/api/gallery-images/${id}`,
  };
}

export async function readGalleryImage(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await requireDb();
  const bucket = galleryBucket(db);
  const objectId = new ObjectId(id);
  const file = await bucket.find({ _id: objectId }).next();

  if (!file) {
    return null;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of bucket.openDownloadStream(objectId)) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return {
    contentType: String(file.metadata?.contentType || "application/octet-stream"),
    data: Buffer.concat(chunks),
    etag: `"${id}"`,
    lastModified: file.uploadDate,
  };
}

export async function deleteGalleryImageBySrc(src: string) {
  const id = galleryImageIdFromSrc(src);
  if (!id || !ObjectId.isValid(id)) {
    return;
  }

  const db = await requireDb();
  const bucket = galleryBucket(db);
  const objectId = new ObjectId(id);
  const file = await bucket.find({ _id: objectId }).next();

  if (file) {
    await bucket.delete(objectId);
  }
}
