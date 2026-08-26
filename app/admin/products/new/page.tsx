import Link from "next/link";
import { Eye, ImagePlus, Link2, PackagePlus, Tag } from "lucide-react";
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
  const visibleCategories = categories.filter((category) => category.isPublished !== false).length;
  const summaryCards = [
    {
      label: "Product Link",
      value: "Auto",
      detail: "Slug is created from name",
      icon: Link2,
    },
    {
      label: "Categories",
      value: visibleCategories,
      detail: "Available product groups",
      icon: PackagePlus,
    },
    {
      label: "Main Photo",
      value: "1",
      detail: "Upload one clear product image",
      icon: ImagePlus,
    },
    {
      label: "Sizes",
      value: "Lines",
      detail: "Write one size per line",
      icon: Tag,
    },
  ];

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

        <div className="admin-page-summary" aria-label="New product setup summary">
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

        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The product could not be created. Please check the fields and try again."}
          </div>
        ) : null}

        <div className="admin-guidance-strip">
          <div>
            <p className="kicker">Easy Product Setup</p>
            <h2>No slug or page link has to be typed manually.</h2>
            <p>
              Add the product name, choose Plastic Containers or Biodegradables, upload the main image and write sizes one per line.
              Publish only when the preview looks correct.
            </p>
          </div>
          <span className="admin-icon-badge">
            <Eye aria-hidden="true" size={18} />
          </span>
        </div>

        <AdminProductForm categories={categories} />
      </Container>
    </section>
  );
}
