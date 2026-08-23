import { isAdminAuthenticated } from "@/lib/admin/auth";
import { databaseAwareMessage, databaseAwareStatus, logBackendError } from "@/lib/backend/errors";
import { getManagedGalleryItems, saveGalleryItem } from "@/lib/backend/gallery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 500) {
  return Response.json({ ok: false, message }, { status });
}

export async function GET() {
  const includeDrafts = await isAdminAuthenticated();
  return Response.json({ ok: true, items: await getManagedGalleryItems({ includeDrafts }) });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Unauthorized.", 401);
  }

  try {
    const item = await saveGalleryItem(await request.json());
    return Response.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    logBackendError("Gallery API save failed", error);
    return jsonError(databaseAwareMessage(error, "Could not save gallery item."), databaseAwareStatus(error, 400));
  }
}
