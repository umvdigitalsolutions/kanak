import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Boxes, Eye, EyeOff, Layers3, PackagePlus, RefreshCcw, Tag } from "lucide-react";
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
  const visibleProducts = products.filter((product) => product.isPublished !== false).length;
  const hiddenProducts = products.length - visibleProducts;
  const plasticProducts = products.filter((product) => product.category === "Plastic Containers").length;
  const biodegradableProducts = products.filter((product) => product.category === "Biodegradables").length;
  const featuredProducts = products.filter((product) => product.featured).length;
  const summaryCards = [
    {
      label: "Total Products",
      value: products.length,
      detail: "All catalogue items",
      icon: Boxes,
    },
    {
      label: "Plastic",
      value: plasticProducts,
      detail: "Plastic Containers",
      icon: Layers3,
    },
    {
      label: "Biodegradable",
      value: biodegradableProducts,
      detail: "Paper, kraft and eco range",
      icon: BadgeCheck,
    },
    {
      label: "Visible",
      value: visibleProducts,
      detail: `${hiddenProducts} hidden, ${featuredProducts} featured`,
      icon: Eye,
    },
  ];

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

        <div className="admin-page-summary" aria-label="Product summary">
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

        {query.seeded ? <div className="demo-submit">Static products synced to MongoDB.</div> : null}
        {query.deleted ? <div className="demo-submit">Product deleted.</div> : null}
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The product action could not be completed. Please check the fields and try again."}
          </div>
        ) : null}

        <div className="admin-guidance-strip">
          <div>
            <p className="kicker">Catalogue Helper</p>
            <h2>Add product details in the same order a customer checks them.</h2>
            <p>
              Category first, then product image, size options, material, lid option and publish status.
              Keep new items hidden until the public product card looks correct.
            </p>
          </div>
          <form action={syncProductsAction} className="admin-inline-form">
            <button className="admin-secondary" type="submit">
              <RefreshCcw aria-hidden="true" size={16} />
              Restore Default Products
            </button>
          </form>
        </div>

        <div className="admin-list">
          {products.map((product) => (
            <article className="admin-list-card admin-product-card" key={product.slug}>
              <div className="admin-product-card__image">
                {product.image ? (
                  <Image alt="" fill sizes="8rem" src={product.image} />
                ) : (
                  <PackagePlus aria-hidden="true" size={34} />
                )}
              </div>
              <div>
                <span>{product.category}</span>
                <h2>{product.name}</h2>
                <p>{product.shortDescription}</p>
                <div className="admin-chip-row">
                  <em className={product.isPublished === false ? "admin-chip admin-chip--muted" : "admin-chip admin-chip--success"}>
                    {product.isPublished === false ? (
                      <>
                        <EyeOff aria-hidden="true" size={14} />
                        Hidden
                      </>
                    ) : (
                      <>
                        <Eye aria-hidden="true" size={14} />
                        Live
                      </>
                    )}
                  </em>
                  <em className={product.featured ? "admin-chip admin-chip--accent" : "admin-chip admin-chip--muted"}>
                    {product.featured ? "Featured" : "Normal"}
                  </em>
                  <em className="admin-chip">
                    <Tag aria-hidden="true" size={14} />
                    {product.sizeOptions.length ? `${product.sizeOptions.length} sizes` : "Sizes on request"}
                  </em>
                </div>
              </div>
              <div className="admin-list-card__meta">
                <small>
                  {product.sizeOptions.length
                    ? product.sizeOptions.slice(0, 3).join(", ")
                    : "Add sizes from edit page"}
                  {product.sizeOptions.length > 3 ? "..." : ""}
                </small>
                <small>
                  {categories.find((category) => category.name === product.category)?.isPublished === false
                    ? "Category hidden"
                    : "Category visible"}
                </small>
                <div className="admin-list-card__actions">
                  <Link className="admin-secondary" href={`/products/${product.slug}`} target="_blank">
                    View
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </Link>
                  <Link className="admin-submit" href={`/admin/products/${product.slug}`}>
                    Edit
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
