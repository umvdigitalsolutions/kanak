import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getCategories } from "@/lib/backend/categories";
import { AdminProductForm } from "@/components/admin/AdminProductForm";
import { Container } from "@/components/ui/Container";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function NewProductPage({ searchParams }: Props) {
  await requireAdmin();
  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : undefined;
  const categories = await getCategories({ includeDrafts: true });

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Products</p>
            <h1>ADD NEW PRODUCT.</h1>
            <p>Fill the simple fields first. Advanced fields are optional.</p>
          </div>
          <Link className="admin-secondary" href="/admin/products">
            All Products
          </Link>
        </div>
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The product could not be created. Please check the fields and try again."}
          </div>
        ) : null}
        <AdminProductForm categories={categories} />
      </Container>
    </section>
  );
}
