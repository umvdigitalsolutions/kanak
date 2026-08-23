import Image from "next/image";
import Link from "next/link";
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

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Gallery</p>
            <h1>ADD WEBSITE PHOTOS.</h1>
            <p>Upload product, factory, packaging or quality images for the gallery page.</p>
          </div>
          <Link className="admin-secondary" href="/admin">
            Dashboard
          </Link>
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

        <AdminGalleryForm />

        <div className="admin-list">
          {items.map((item) => (
            <article className="admin-media-card" key={item.id}>
              <div className="admin-media-card__image">
                <Image alt="" fill sizes="9rem" src={item.src} />
              </div>
              <div>
                <span>{item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <small>{item.src}</small>
              </div>
              <form action={deleteGalleryItemAction}>
                <input name="id" type="hidden" value={item.id} />
                <button className="admin-danger" type="submit">
                  Delete
                </button>
              </form>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
