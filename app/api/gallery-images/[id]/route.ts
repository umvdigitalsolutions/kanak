import { databaseAwareStatus, logBackendError } from "@/lib/backend/errors";
import { readGalleryImage } from "@/lib/backend/gallery-images";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const image = await readGalleryImage(id);

    if (!image) {
      return new Response("Image not found.", { status: 404 });
    }

    const headers = new Headers({
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(image.data.length),
      "Content-Type": image.contentType,
      ETag: image.etag,
      "Last-Modified": image.lastModified.toUTCString(),
      "X-Content-Type-Options": "nosniff",
    });

    if (request.headers.get("if-none-match") === image.etag) {
      return new Response(null, { headers, status: 304 });
    }

    return new Response(new Uint8Array(image.data), { headers });
  } catch (error) {
    logBackendError("MongoDB gallery image read failed", error);
    return new Response("Image is temporarily unavailable.", { status: databaseAwareStatus(error, 500) });
  }
}
