import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Eye, EyeOff, ImagePlus, Tag, Trash2 } from "lucide-react";
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

  const summaryCards = [
    {
      label: "Status",
      value: product.isPublished === false ? "Hidden" : "Live",
      detail: product.isPublished === false ? "Not visible on website" : "Visible on website",
      icon: product.isPublished === false ? EyeOff : Eye,
    },
    {
      label: "Category",
      value: product.category === "Biodegradables" ? "Bio" : "Plastic",
      detail: product.category,
      icon: Tag,
    },
    {
      label: "Sizes",
      value: product.sizeOptions.length || "0",
      detail: product.sizeOptions.length ? "Size options added" : "Add sizes in buyer details",
      icon: Tag,
    },
    {
      label: "Images",
      value: product.gallery.length + (product.image ? 1 : 0),
      detail: product.image ? "Main image available" : "Main image missing",
      icon: ImagePlus,
    },
  ];

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
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>

        <div className="admin-page-summary" aria-label="Product editing summary">
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

        {query.saved ? <div className="demo-submit">Product saved.</div> : null}
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The product could not be saved. Please check the fields and try again."}
          </div>
        ) : null}

        <div className="admin-guidance-strip">
          <div>
            <p className="kicker">Edit Product Helper</p>
            <h2>Update the details buyers actually check first.</h2>
            <p>
              Confirm the category, product image, available sizes, material and publish status. The product link stays in Advanced settings only when needed.
            </p>
          </div>
          <Link className="admin-secondary" href="/admin/products">
            Back to Products
          </Link>
        </div>

        <AdminProductForm categories={categories} product={product} />

        <form action={deleteProductAction} className="admin-delete-form">
          <input name="slug" type="hidden" value={product.slug} />
          <button className="admin-danger" type="submit">
            <Trash2 aria-hidden="true" size={15} />
            Delete This Product
          </button>
        </form>
      </Container>
    </section>
  );
}
