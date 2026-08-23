import { isAdminAuthenticated } from "@/lib/admin/auth";
import { databaseAwareMessage, databaseAwareStatus, logBackendError } from "@/lib/backend/errors";
import { getProducts, saveProduct } from "@/lib/backend/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 500) {
  return Response.json({ ok: false, message }, { status });
}

export async function GET() {
  const includeDrafts = await isAdminAuthenticated();
  return Response.json({ ok: true, products: await getProducts({ includeDrafts }) });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Unauthorized.", 401);
  }

  try {
    const product = await saveProduct(await request.json());
    return Response.json({ ok: true, product }, { status: 201 });
  } catch (error) {
    logBackendError("Product API save failed", error);
    return jsonError(databaseAwareMessage(error, "Could not save product."), databaseAwareStatus(error, 400));
  }
}
