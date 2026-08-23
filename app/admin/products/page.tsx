import Link from "next/link";
import { syncProductsAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { getCategories } from "@/lib/backend/categories";
import { getProducts } from "@/lib/backend/products";
import { Container } from "@/components/ui/Container";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({ searchParams }: Props) {
  await requireAdmin();
  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : undefined;
  const categories = await getCategories({ includeDrafts: true });
  const products = await getProducts({ includeDrafts: true });

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Products</p>
            <h1>ADD OR EDIT PRODUCTS.</h1>
            <p>Manage the containers customers see on the products page.</p>
          </div>
          <div className="admin-actions">
            <Link className="admin-secondary" href="/admin">
              Dashboard
            </Link>
            <Link className="admin-secondary" href="/admin/categories">
              Categories
            </Link>
            <Link className="admin-submit" href="/admin/products/new">
              Add Product
            </Link>
          </div>
        </div>

        {query.seeded ? <div className="demo-submit">Static products synced to MongoDB.</div> : null}
        {query.deleted ? <div className="demo-submit">Product deleted.</div> : null}
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The product action could not be completed. Please check the fields and try again."}
          </div>
        ) : null}

        <details className="admin-details admin-system-details">
          <summary>Advanced maintenance</summary>
          <form action={syncProductsAction} className="admin-inline-form">
            <button className="admin-secondary" type="submit">
              Restore Default Products
            </button>
          </form>
        </details>

        <div className="admin-list">
          {products.map((product) => (
            <article className="admin-list-card" key={product.slug}>
              <div>
                <span>{product.category}</span>
                <h2>{product.name}</h2>
                <p>{product.shortDescription}</p>
              </div>
              <div className="admin-list-card__meta">
                <small>{product.isPublished === false ? "Hidden from website" : "Visible on website"}</small>
                <small>{product.featured ? "Highlighted" : "Normal"}</small>
                <small>{categories.find((category) => category.name === product.category)?.isPublished === false ? "Category hidden" : "Category visible"}</small>
                <Link className="admin-secondary" href={`/admin/products/${product.slug}`}>
                  Edit
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
