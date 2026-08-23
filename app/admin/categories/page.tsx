import Link from "next/link";
import { deleteCategoryAction } from "@/app/admin/actions";
import { AdminCategoryForm } from "@/components/admin/AdminCategoryForm";
import { Container } from "@/components/ui/Container";
import { requireAdmin } from "@/lib/admin/auth";
import { getCategories } from "@/lib/backend/categories";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage({ searchParams }: Props) {
  await requireAdmin();
  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : undefined;
  const categories = await getCategories({ includeDrafts: true });

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Categories</p>
            <h1>PRODUCT GROUPS.</h1>
            <p>Keep catalogue management simple with Plastic Containers and Biodegradables.</p>
          </div>
          <div className="admin-actions">
            <Link className="admin-secondary" href="/admin">
              Dashboard
            </Link>
            <Link className="admin-secondary" href="/admin/products/new">
              Add Product
            </Link>
          </div>
        </div>

        {query.saved ? <div className="demo-submit">Category saved.</div> : null}
        {query.deleted ? <div className="demo-submit">Category deleted.</div> : null}
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The category action could not be completed. Please check the fields and try again."}
          </div>
        ) : null}

        <AdminCategoryForm />

        <div className="admin-list">
          {categories.map((category) => (
            <article className="admin-list-card" key={category.slug}>
              <div>
                <span>{category.isPublished ? "Visible" : "Hidden"}</span>
                <h2>{category.name}</h2>
                <p>{category.description || "No category description added."}</p>
                <small>{category.slug}</small>
              </div>
              <div className="admin-list-card__meta">
                <small>Order {category.order}</small>
                <details className="admin-details">
                  <summary>Edit</summary>
                  <AdminCategoryForm category={category} />
                </details>
                <form action={deleteCategoryAction}>
                  <input name="slug" type="hidden" value={category.slug} />
                  <button className="admin-danger" type="submit">
                    Delete
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
