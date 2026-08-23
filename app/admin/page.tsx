import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { getAdminSetupStatus, requireAdmin } from "@/lib/admin/auth";
import { getCategories } from "@/lib/backend/categories";
import { getManagedGalleryItems } from "@/lib/backend/gallery";
import { getInquiries } from "@/lib/backend/inquiries";
import { getProducts } from "@/lib/backend/products";
import { getSiteSettings } from "@/lib/backend/site-settings";
import { Container } from "@/components/ui/Container";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const setup = getAdminSetupStatus();
  const products = await getProducts({ includeDrafts: true });
  const categories = await getCategories({ includeDrafts: true });
  const galleryItems = await getManagedGalleryItems({ includeDrafts: true });
  const inquiries = setup.mongoConfigured ? await getInquiries().catch(() => []) : [];
  const siteSettings = await getSiteSettings();

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Website Admin</p>
            <h1>WHAT DO YOU WANT TO UPDATE?</h1>
            <p>Choose one task below. Each section has simple fields, upload buttons and a save button.</p>
          </div>
          <form action={logoutAction}>
            <button className="admin-secondary" type="submit">
              Sign Out
            </button>
          </form>
        </div>

        {!setup.mongoConfigured ? (
          <div className="form-error">
            MongoDB is not configured yet. Public pages are using static fallback data, and admin writes need <code>MONGODB_URI</code>.
          </div>
        ) : null}

        <div className="admin-task-grid" aria-label="Admin tasks">
          <Link href="/admin/home">
            <span>Home Page</span>
            <h2>Change banner and carousel</h2>
            <p>Update the first video/image, headline, buttons and container cards.</p>
            <strong>{siteSettings.containerSlides.length} cards</strong>
          </Link>
          <Link href="/admin/products">
            <span>Products</span>
            <h2>Add or edit products</h2>
            <p>Upload product photos, write descriptions and choose categories.</p>
            <strong>{products.length} products</strong>
          </Link>
          <Link href="/admin/categories">
            <span>Categories</span>
            <h2>Create product groups</h2>
            <p>Make simple groups like Round, Rectangular, Biodegradable or Cups.</p>
            <strong>{categories.length} groups</strong>
          </Link>
          <Link href="/admin/gallery">
            <span>Gallery</span>
            <h2>Add gallery photos</h2>
            <p>Upload product, factory, packing or quality-check photos.</p>
            <strong>{galleryItems.length} photos</strong>
          </Link>
          <Link href="/admin/inquiries">
            <span>Inquiries</span>
            <h2>See quote requests</h2>
            <p>Read customer messages and update their follow-up status.</p>
            <strong>{inquiries.length} requests</strong>
          </Link>
        </div>

        <div className="admin-quick-panel">
          <div>
            <p className="kicker">Easy Order</p>
            <h2>For a new product, do this.</h2>
          </div>
          <ol>
            <li>Create the category if it does not already exist.</li>
            <li>Add the product name, photo and short details.</li>
            <li>Keep it hidden until everything looks correct.</li>
            <li>Add extra photos to the gallery when ready.</li>
          </ol>
        </div>

        <details className="admin-details admin-system-details">
          <summary>Website system status</summary>
          <div className="admin-status-grid">
            <div>
              <span>Database</span>
              <strong>{setup.mongoConfigured ? "Connected" : "Missing"}</strong>
            </div>
            <div>
              <span>Login Password</span>
              <strong>{setup.adminPasswordConfigured ? "Ready" : "Missing"}</strong>
            </div>
            <div>
              <span>Login Session</span>
              <strong>{setup.adminSessionSecretConfigured ? "Ready" : "Basic"}</strong>
            </div>
          </div>
        </details>
      </Container>
    </section>
  );
}
