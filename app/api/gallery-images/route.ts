import { isAdminAuthenticated } from "@/lib/admin/auth";
import { databaseAwareMessage, databaseAwareStatus, logBackendError } from "@/lib/backend/errors";
import { saveGalleryImage } from "@/lib/backend/gallery-images";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Your admin session has expired. Sign in again before uploading.", 401);
  }

  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File) || image.size === 0) {
      return jsonError("Choose an image to upload.", 400);
    }

    const storedImage = await saveGalleryImage(image);
    return Response.json({ ok: true, ...storedImage }, { status: 201 });
  } catch (error) {
    logBackendError("MongoDB gallery image upload failed", error);
    const fallback = error instanceof Error ? error.message : "The gallery image could not be uploaded.";
    return jsonError(databaseAwareMessage(error, fallback), databaseAwareStatus(error, 400));
  }
}
