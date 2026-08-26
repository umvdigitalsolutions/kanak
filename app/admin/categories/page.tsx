import Link from "next/link";
import { BadgeCheck, Eye, EyeOff, FolderTree, PackagePlus, Trash2 } from "lucide-react";
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
  const visibleCategories = categories.filter((category) => category.isPublished !== false).length;
  const hiddenCategories = categories.length - visibleCategories;
  const summaryCards = [
    {
      label: "Total Groups",
      value: categories.length,
      detail: "All category records",
      icon: FolderTree,
    },
    {
      label: "Visible",
      value: visibleCategories,
      detail: "Shown to customers",
      icon: Eye,
    },
    {
      label: "Hidden",
      value: hiddenCategories,
      detail: "Saved for later",
      icon: EyeOff,
    },
    {
      label: "Main Range",
      value: "2",
      detail: "Plastic and Biodegradable",
      icon: BadgeCheck,
    },
  ];

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
            <Link className="admin-submit" href="/admin/products/new">
              <PackagePlus aria-hidden="true" size={16} />
              Add Product
            </Link>
          </div>
        </div>

        <div className="admin-page-summary" aria-label="Category summary">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label}>
                <span className="admin-icon-badge">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <small>{card.label}</small>
                <strong>{card.value}</strong>
                <p>{card.detail}</p>
              </div>
            );
          })}
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

        <div className="admin-guidance-strip">
          <div>
            <p className="kicker">Category Helper</p>
            <h2>Keep the product range simple for buyers.</h2>
            <p>
              Use Plastic Containers and Biodegradables as the main website filters. Hide a category when you do not want customers to see it.
            </p>
          </div>
          <Link className="admin-secondary" href="/admin/products">
            View Product List
          </Link>
        </div>

        <AdminCategoryForm />

        <div className="admin-list">
          {categories.map((category) => (
            <article className="admin-list-card admin-category-card" key={category.slug}>
              <div>
                <div className="admin-chip-row">
                  <em className={category.isPublished === false ? "admin-chip admin-chip--muted" : "admin-chip admin-chip--success"}>
                    {category.isPublished === false ? (
                      <>
                        <EyeOff aria-hidden="true" size={14} />
                        Hidden
                      </>
                    ) : (
                      <>
                        <Eye aria-hidden="true" size={14} />
                        Visible
                      </>
                    )}
                  </em>
                  <em className="admin-chip">Order {category.order}</em>
                </div>
                <h2>{category.name}</h2>
                <p>{category.description || "No category description added."}</p>
              </div>
              <div className="admin-list-card__meta">
                <small>Page filter: {category.slug}</small>
                <form action={deleteCategoryAction} className="admin-delete-form">
                  <input name="slug" type="hidden" value={category.slug} />
                  <button className="admin-danger" type="submit">
                    <Trash2 aria-hidden="true" size={15} />
                    Delete
                  </button>
                </form>
              </div>
              <details className="admin-details admin-list-card__edit">
                <summary>Edit this category</summary>
                <AdminCategoryForm category={category} />
              </details>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
