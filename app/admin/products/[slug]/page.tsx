import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProductAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { getCategories } from "@/lib/backend/categories";
import { getProductBySlug } from "@/lib/backend/products";
import { AdminProductForm } from "@/components/admin/AdminProductForm";
import { Container } from "@/components/ui/Container";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params, searchParams }: Props) {
  await requireAdmin();
  const { slug } = await params;
  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : undefined;
  const categories = await getCategories({ includeDrafts: true });
  const product = await getProductBySlug(slug, { includeDrafts: true });

  if (!product) {
    notFound();
  }

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Products</p>
            <h1>{product.name}</h1>
            <p>Edit the product photo, description, buyer details and visibility.</p>
          </div>
          <div className="admin-actions">
            <Link className="admin-secondary" href="/admin/products">
              All Products
            </Link>
            <Link className="admin-secondary" href={`/products/${product.slug}`}>
              View Public Page
            </Link>
          </div>
        </div>

        {query.saved ? <div className="demo-submit">Product saved.</div> : null}
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The product could not be saved. Please check the fields and try again."}
          </div>
        ) : null}

        <AdminProductForm categories={categories} product={product} />

        <form action={deleteProductAction} className="admin-delete-form">
          <input name="slug" type="hidden" value={product.slug} />
          <button className="admin-danger" type="submit">
              Delete This Product
            </button>
        </form>
      </Container>
    </section>
  );
}
