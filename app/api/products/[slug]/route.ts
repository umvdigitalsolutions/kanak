import { isAdminAuthenticated } from "@/lib/admin/auth";
import { databaseAwareMessage, databaseAwareStatus, logBackendError } from "@/lib/backend/errors";
import { deleteProduct, getProductBySlug, saveProduct } from "@/lib/backend/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ slug: string }>;
};

function jsonError(message: string, status = 500) {
  return Response.json({ ok: false, message }, { status });
}

export async function GET(_request: Request, context: Context) {
  const { slug } = await context.params;
  const includeDrafts = await isAdminAuthenticated();
  const product = await getProductBySlug(slug, { includeDrafts });

  if (!product) {
    return jsonError("Product not found.", 404);
  }

  return Response.json({ ok: true, product });
}

export async function PATCH(request: Request, context: Context) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Unauthorized.", 401);
  }

  try {
    const { slug } = await context.params;
    const product = await saveProduct({ ...(await request.json()), originalSlug: slug });
    return Response.json({ ok: true, product });
  } catch (error) {
    logBackendError("Product API update failed", error);
    return jsonError(databaseAwareMessage(error, "Could not update product."), databaseAwareStatus(error, 400));
  }
}

export async function DELETE(_request: Request, context: Context) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Unauthorized.", 401);
  }

  try {
    const { slug } = await context.params;
    await deleteProduct(slug);
    return Response.json({ ok: true });
  } catch (error) {
    logBackendError("Product API delete failed", error);
    return jsonError(databaseAwareMessage(error, "Could not delete product."), databaseAwareStatus(error, 500));
  }
}
