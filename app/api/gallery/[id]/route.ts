import { isAdminAuthenticated } from "@/lib/admin/auth";
import { databaseAwareMessage, databaseAwareStatus, logBackendError } from "@/lib/backend/errors";
import { deleteGalleryItem, saveGalleryItem } from "@/lib/backend/gallery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ id: string }>;
};

function jsonError(message: string, status = 500) {
  return Response.json({ ok: false, message }, { status });
}

export async function PATCH(request: Request, context: Context) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Unauthorized.", 401);
  }

  try {
    const { id } = await context.params;
    const item = await saveGalleryItem({ ...(await request.json()), id });
    return Response.json({ ok: true, item });
  } catch (error) {
    logBackendError("Gallery API update failed", error);
    return jsonError(databaseAwareMessage(error, "Could not update gallery item."), databaseAwareStatus(error, 400));
  }
}

export async function DELETE(_request: Request, context: Context) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Unauthorized.", 401);
  }

  try {
    const { id } = await context.params;
    await deleteGalleryItem(id);
    return Response.json({ ok: true });
  } catch (error) {
    logBackendError("Gallery API delete failed", error);
    return jsonError(databaseAwareMessage(error, "Could not delete gallery item."), databaseAwareStatus(error, 500));
  }
}
