import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Eye, EyeOff, ImagePlus, LayoutGrid, Trash2 } from "lucide-react";
import { deleteGalleryItemAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { getManagedGalleryItems } from "@/lib/backend/gallery";
import { AdminGalleryForm } from "@/components/admin/AdminGalleryForm";
import { Container } from "@/components/ui/Container";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage({ searchParams }: Props) {
  await requireAdmin();
  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : undefined;
  const items = await getManagedGalleryItems({ includeDrafts: true });
  const visibleItems = items.filter((item) => item.isPublished !== false).length;
  const hiddenItems = items.length - visibleItems;
  const galleryTypes = new Set(items.map((item) => item.category)).size;
  const summaryCards = [
    {
      label: "Total Photos",
      value: items.length,
      detail: "Saved gallery images",
      icon: Camera,
    },
    {
      label: "Visible",
      value: visibleItems,
      detail: "Shown on gallery page",
      icon: Eye,
    },
    {
      label: "Hidden",
      value: hiddenItems,
      detail: "Kept inside admin",
      icon: EyeOff,
    },
    {
      label: "Photo Types",
      value: galleryTypes,
      detail: "Product, factory, packing etc.",
      icon: LayoutGrid,
    },
  ];

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Gallery</p>
            <h1>ADD WEBSITE PHOTOS.</h1>
            <p>Upload product, factory, packaging or quality images for the gallery page.</p>
          </div>
          <div className="admin-actions">
            <Link className="admin-secondary" href="/admin">
              Dashboard
            </Link>
            <Link className="admin-secondary" href="/gallery" target="_blank">
              View Gallery
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>

        <div className="admin-page-summary" aria-label="Gallery summary">
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

        {query.saved ? <div className="demo-submit">Gallery item saved.</div> : null}
        {query.deleted ? <div className="demo-submit">Gallery item deleted.</div> : null}
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The gallery action could not be completed. Please check the fields and try again."}
          </div>
        ) : null}

        <div className="admin-guidance-strip">
          <div>
            <p className="kicker">Gallery Helper</p>
            <h2>Add only clear product, factory, packing and quality photos.</h2>
            <p>
              Choose the photo type, upload one clean image and keep unfinished photos hidden until they look right on the public gallery.
            </p>
          </div>
          <span className="admin-icon-badge">
            <ImagePlus aria-hidden="true" size={18} />
          </span>
        </div>

        <AdminGalleryForm />

        <div className="admin-list">
          {items.length ? (
            items.map((item) => (
              <article className="admin-media-card admin-gallery-card" key={item.id}>
                <div className="admin-media-card__image">
                  <Image alt="" fill sizes="9rem" src={item.src} />
                </div>
                <div>
                  <span>{item.category}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description || "No caption added."}</p>
                  <div className="admin-chip-row">
                    <em className={item.isPublished === false ? "admin-chip admin-chip--muted" : "admin-chip admin-chip--success"}>
                      {item.isPublished === false ? (
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
                    <em className="admin-chip">Order {item.order ?? 100}</em>
                  </div>
                  <small>{item.src}</small>
                </div>
                <form action={deleteGalleryItemAction} className="admin-media-card__delete">
                  <input name="id" type="hidden" value={item.id} />
                  <button className="admin-danger" type="submit">
                    <Trash2 aria-hidden="true" size={15} />
                    Delete
                  </button>
                </form>
                <details className="admin-details admin-media-card__edit">
                  <summary>Edit this photo</summary>
                  <AdminGalleryForm item={item} />
                </details>
              </article>
            ))
          ) : (
            <div className="admin-empty">No gallery photos yet. Add the first photo above.</div>
          )}
        </div>
      </Container>
    </section>
  );
}
