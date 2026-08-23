import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { assetPath } from "@/lib/assets";
import { toSlug } from "@/lib/backend/form";

const publicUploadRoot = path.join(process.cwd(), "public", "uploads");
const allowedTypes = new Map([
  ["image/avif", "avif"],
  ["image/gif", "gif"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["video/mp4", "mp4"],
  ["video/quicktime", "mov"],
  ["video/webm", "webm"],
]);

const imageLimit = 12 * 1024 * 1024;
const videoLimit = 110 * 1024 * 1024;

function isFile(value: FormDataEntryValue | null): value is File {
  return typeof File !== "undefined" && value instanceof File && value.size > 0;
}

function cleanScope(scope: string) {
  return toSlug(scope) || "media";
}

function safeBaseName(name: string) {
  const withoutExtension = name.replace(/\.[^.]+$/, "");
  return toSlug(withoutExtension).slice(0, 64) || "upload";
}

export async function saveUploadedMedia(file: File, scope: string) {
  const extension = allowedTypes.get(file.type);

  if (!extension) {
    throw new Error("Unsupported media type. Upload JPG, PNG, WEBP, AVIF, GIF, MP4, WEBM or MOV files.");
  }

  const limit = file.type.startsWith("video/") ? videoLimit : imageLimit;
  if (file.size > limit) {
    throw new Error(file.type.startsWith("video/") ? "Video upload is too large." : "Image upload is too large.");
  }

  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const safeScope = cleanScope(scope);
  const uploadDir = path.join(publicUploadRoot, safeScope, month);
  const fileName = `${safeBaseName(file.name)}-${randomBytes(5).toString("hex")}.${extension}`;
  const absolutePath = path.join(uploadDir, fileName);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()), { mode: 0o644 });

  return assetPath(`/uploads/${safeScope}/${month}/${fileName}`);
}

export async function saveUploadedMediaFromForm(formData: FormData, key: string, scope: string) {
  const value = formData.get(key);
  return isFile(value) ? saveUploadedMedia(value, scope) : null;
}

export async function saveUploadedMediaListFromForm(formData: FormData, key: string, scope: string) {
  const files = formData.getAll(key).filter(isFile);
  return Promise.all(files.map((file) => saveUploadedMedia(file, scope)));
}
