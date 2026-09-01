"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { saveGalleryItemAction } from "@/app/admin/actions";
import type { GalleryItem } from "@/data/gallery";
import styles from "./AdminGalleryForm.module.css";

const maximumSourceSize = 40 * 1024 * 1024;
const maximumRequestSize = 3_400_000;
const allowedImageTypes = new Set(["image/avif", "image/gif", "image/jpeg", "image/png", "image/webp"]);

type UploadState =
  | { status: "idle" }
  | { status: "processing" }
  | { status: "uploading"; progress: number }
  | { status: "saving" }
  | { status: "error"; message: string };

type UploadResponse = {
  ok?: boolean;
  src?: string;
  message?: string;
};

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.decoding = "async";
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("The selected image could not be read."));
    };
    image.src = objectUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("The selected image could not be prepared for upload."));
      },
      "image/webp",
      quality,
    );
  });
}

async function prepareImage(file: File) {
  if (!allowedImageTypes.has(file.type)) {
    throw new Error("Choose a JPG, PNG, WEBP, AVIF or GIF image.");
  }

  if (file.size > maximumSourceSize) {
    throw new Error("Choose an image smaller than 40 MB.");
  }

  if (file.size <= maximumRequestSize) {
    return file;
  }

  if (file.type === "image/gif") {
    throw new Error("Animated GIF files must be smaller than 3.4 MB. Choose a smaller GIF or a JPG, PNG or WEBP image.");
  }

  const image = await loadImage(file);
  const longestEdge = Math.max(image.naturalWidth, image.naturalHeight);
  const initialScale = Math.min(1, 2400 / longestEdge);

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const scale = initialScale * 0.86 ** attempt;
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("This browser cannot prepare the selected image.");
    }

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, width, height);

    const blob = await canvasToBlob(canvas, Math.max(0.68, 0.9 - attempt * 0.05));
    if (blob.size <= maximumRequestSize) {
      const baseName = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]+/g, "-") || "gallery-image";
      return new File([blob], `${baseName}.webp`, { lastModified: file.lastModified, type: "image/webp" });
    }
  }

  throw new Error("The image is too large to upload. Please choose a smaller image.");
}

function uploadImage(file: File, onProgress: (percentage: number) => void) {
  return new Promise<string>((resolve, reject) => {
    const request = new XMLHttpRequest();
    const formData = new FormData();

    formData.set("image", file);
    request.open("POST", "/api/gallery-images");
    request.responseType = "json";
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    request.onerror = () => reject(new Error("The upload was interrupted. Check your connection and try again."));
    request.onload = () => {
      const response = request.response as UploadResponse | null;
      if (request.status >= 200 && request.status < 300 && response?.src) {
        resolve(response.src);
        return;
      }

      if (request.status === 401) {
        reject(new Error("Your admin session has expired. Sign in again and retry the upload."));
        return;
      }

      reject(new Error(response?.message || "The image could not be saved to MongoDB."));
    };
    request.send(formData);
  });
}

export function AdminGalleryForm({ item }: { item?: GalleryItem }) {
  const [uploadState, setUploadState] = useState<UploadState>({ status: "idle" });
  const isBusy = ["processing", "uploading", "saving"].includes(uploadState.status);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (isBusy) {
      event.preventDefault();
      return;
    }

    const form = event.currentTarget;
    const input = form.elements.namedItem("imageFile");
    const file = input instanceof HTMLInputElement ? input.files?.[0] : undefined;

    // An existing gallery entry can be edited without replacing its image.
    if (!file) {
      return;
    }

    event.preventDefault();
    const formData = new FormData(form);

    try {
      setUploadState({ status: "processing" });
      const preparedImage = await prepareImage(file);
      setUploadState({ status: "uploading", progress: 0 });
      const src = await uploadImage(preparedImage, (progress) => {
        setUploadState({ status: "uploading", progress });
      });

      formData.delete("imageFile");
      formData.set("src", src);
      formData.set("newGalleryImage", src);
      setUploadState({ status: "saving" });
      await saveGalleryItemAction(formData);
    } catch (error) {
      setUploadState({
        status: "error",
        message: error instanceof Error ? error.message : "The gallery photo could not be uploaded.",
      });
    }
  }

  const buttonLabel =
    uploadState.status === "processing"
      ? "Preparing Image..."
      : uploadState.status === "uploading"
        ? `Uploading ${uploadState.progress}%`
        : uploadState.status === "saving"
          ? "Saving Photo..."
          : "Save Photo";

  return (
    <form
      action={saveGalleryItemAction}
      className="admin-form admin-form--compact"
      onSubmit={handleSubmit}
    >
      <input name="id" type="hidden" value={item?.id ?? ""} />
      <div className="admin-form__intro">
        <span>Photo</span>
        <div>
          <h2>{item ? "Edit gallery photo" : "Add a gallery photo"}</h2>
          <p>Upload a factory, packing, quality or delivery image for the gallery page.</p>
        </div>
      </div>
      <div className="admin-form__grid admin-form__grid--simple">
        <label>
          Photo Title
          <input name="title" required defaultValue={item?.title ?? ""} placeholder="Container packing line" />
        </label>
        <label>
          Photo Type
          <select name="category" defaultValue={item?.category ?? "Gallery"}>
            <option value="Gallery">Gallery</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Quality">Quality</option>
            <option value="Packing">Packing</option>
          </select>
        </label>
        <label>
          Upload Photo
          <input
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            disabled={isBusy}
            name="imageFile"
            required={!item?.src}
            type="file"
          />
          <small>JPG, PNG, WEBP, AVIF or GIF. Large photos are optimized automatically.</small>
        </label>
      </div>
      <label>
        Caption
        <textarea name="description" defaultValue={item?.description ?? ""} placeholder="Short caption shown below the photo." rows={3} />
      </label>
      <label className="checkbox-label">
        <input name="isPublished" type="checkbox" defaultChecked={item?.isPublished !== false} />
        Show this photo on website
      </label>
      <details className="admin-details admin-advanced">
        <summary>Advanced settings</summary>
        <div className="admin-form__grid">
          <label>
            Existing Image Path
            <input name="src" defaultValue={item?.src ?? ""} placeholder="/images/gallery/factory.jpg" />
          </label>
          <label>
            Display Order
            <input name="order" defaultValue={item?.order ?? 100} type="number" />
          </label>
        </div>
      </details>
      {uploadState.status === "processing" ? (
        <div className={styles.uploadStatus} aria-live="polite">
          Preparing the image for a reliable upload...
        </div>
      ) : null}
      {uploadState.status === "uploading" ? (
        <div className={styles.uploadStatus} aria-live="polite">
          <span>
            <i style={{ width: `${uploadState.progress}%` }} />
          </span>
          Saving image to MongoDB: {uploadState.progress}%
        </div>
      ) : null}
      {uploadState.status === "error" ? (
        <div className="form-error" role="alert">
          {uploadState.message}
        </div>
      ) : null}
      <button className="admin-submit" disabled={isBusy} type="submit">
        {buttonLabel}
      </button>
    </form>
  );
}
