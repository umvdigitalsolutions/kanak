import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Camera,
  ClipboardList,
  FolderTree,
  Home,
  Inbox,
  PackagePlus,
  Store,
  Upload,
} from "lucide-react";
import { getAdminSetupStatus, requireAdmin } from "@/lib/admin/auth";
import { getCategories } from "@/lib/backend/categories";
import { getManagedGalleryItems } from "@/lib/backend/gallery";
import { getInquiries } from "@/lib/backend/inquiries";
import { getProducts } from "@/lib/backend/products";
import { getSiteSettings } from "@/lib/backend/site-settings";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const setup = getAdminSetupStatus();
  const products = await getProducts({ includeDrafts: true });
  const categories = await getCategories({ includeDrafts: true });
  const galleryItems = await getManagedGalleryItems({ includeDrafts: true });
  const inquiries = setup.mongoConfigured ? await getInquiries().catch(() => []) : [];
  const siteSettings = await getSiteSettings();

  const visibleProducts = products.filter((product) => product.isPublished !== false).length;
  const hiddenProducts = products.length - visibleProducts;
  const visibleCategories = categories.filter((category) => category.isPublished !== false).length;
  const plasticProducts = products.filter((product) => product.category === "Plastic Containers").length;
  const biodegradableProducts = products.filter((product) => product.category === "Biodegradables").length;
  const newInquiries = inquiries.filter((inquiry) => inquiry.status === "new").length;
  const openInquiries = inquiries.filter((inquiry) => inquiry.status !== "closed").length;
  const recentProducts = products.slice(0, 5);
  const recentInquiries = inquiries.slice(0, 4);

  const overviewCards = [
    {
      label: "Products",
      value: products.length,
      detail: `${visibleProducts} live, ${hiddenProducts} hidden`,
      href: "/admin/products",
      icon: Boxes,
    },
    {
      label: "Categories",
      value: categories.length,
      detail: `${visibleCategories} visible on site`,
      href: "/admin/categories",
      icon: FolderTree,
    },
    {
      label: "Gallery Photos",
      value: galleryItems.length,
      detail: "Factory and product media",
      href: "/admin/gallery",
      icon: Camera,
    },
    {
      label: "Quote Requests",
      value: inquiries.length,
      detail: `${openInquiries} open, ${newInquiries} new`,
      href: "/admin/inquiries",
      icon: Inbox,
    },
  ];

  const quickActions = [
    {
      label: "Add Product",
      copy: "Create a plastic or biodegradable item with sizes and images.",
      href: "/admin/products/new",
      icon: PackagePlus,
    },
    {
      label: "Manage Products",
      copy: `${plasticProducts} plastic and ${biodegradableProducts} biodegradable products in catalogue.`,
      href: "/admin/products",
      icon: Boxes,
    },
    {
      label: "Edit Home Page",
      copy: `Update hero media and ${siteSettings.containerSlides.length} home product visuals.`,
      href: "/admin/home",
      icon: Home,
    },
    {
      label: "Upload Gallery",
      copy: "Add clean product, facility, packing and quality-check images.",
      href: "/admin/gallery",
      icon: Upload,
    },
    {
      label: "Categories",
      copy: "Control the groups shown on product filters and forms.",
      href: "/admin/categories",
      icon: FolderTree,
    },
    {
      label: "Inquiries",
      copy: "Review customer quote requests and update their status.",
      href: "/admin/inquiries",
      icon: ClipboardList,
    },
  ];

  const setupItems = [
    {
      label: "Database",
      value: setup.mongoConfigured ? "Connected" : "Missing",
      good: setup.mongoConfigured,
    },
    {
      label: "Password",
      value: setup.adminPasswordConfigured ? "Ready" : "Missing",
      good: setup.adminPasswordConfigured,
    },
    {
      label: "Session",
      value: setup.adminSessionSecretConfigured ? "Secure" : "Basic",
      good: setup.adminSessionSecretConfigured,
    },
  ];

  return (
    <section className="admin-page admin-dashboard-page">
      <div className="admin-dashboard-head">
        <div>
          <p className="kicker">Dashboard</p>
          <h1>Website Control Panel</h1>
          <p>
            Update products, product sizes, home-page media, gallery photos and quote requests from one clean place.
          </p>
        </div>
        <div className="admin-dashboard-head__actions">
          <Link className="admin-submit" href="/admin/products/new">
            <PackagePlus aria-hidden="true" size={17} />
            Add Product
          </Link>
          <Link className="admin-secondary" href="/" target="_blank">
            <Store aria-hidden="true" size={17} />
            View Website
          </Link>
        </div>
      </div>

      {!setup.mongoConfigured ? (
        <div className="form-error">
          MongoDB is not configured yet. Public pages are using static fallback data, and admin writes need{" "}
          <code>MONGODB_URI</code>.
        </div>
      ) : null}

      <div className="admin-kpi-grid" aria-label="Website overview">
        {overviewCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link className="admin-kpi-card" href={card.href} key={card.label}>
              <span className="admin-icon-badge">
                <Icon aria-hidden="true" size={18} />
              </span>
              <small>{card.label}</small>
              <strong>{card.value}</strong>
              <p>{card.detail}</p>
            </Link>
          );
        })}
      </div>

      <div className="admin-dashboard-layout">
        <section className="admin-panel-card admin-panel-card--primary">
          <div className="admin-panel-card__header">
            <div>
              <p className="kicker">Quick Tasks</p>
              <h2>What do you want to update?</h2>
            </div>
            <span>6 shortcuts</span>
          </div>
          <div className="admin-action-grid">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link className="admin-action-tile" href={action.href} key={action.label}>
                  <span className="admin-icon-badge">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <strong>{action.label}</strong>
                  <p>{action.copy}</p>
                  <em>
                    Open
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </em>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="admin-panel-card">
          <div className="admin-panel-card__header">
            <div>
              <p className="kicker">Publishing Check</p>
              <h2>Before making items live</h2>
            </div>
          </div>
          <ul className="admin-simple-checklist">
            <li>
              <BadgeCheck aria-hidden="true" size={17} />
              Choose the correct category: Plastic Containers or Biodegradables.
            </li>
            <li>
              <BadgeCheck aria-hidden="true" size={17} />
              Add a clear main image and size options before publishing.
            </li>
            <li>
              <BadgeCheck aria-hidden="true" size={17} />
              Keep unfinished products hidden until the preview looks right.
            </li>
          </ul>
        </section>

        <section className="admin-panel-card">
          <div className="admin-panel-card__header">
            <div>
              <p className="kicker">System</p>
              <h2>Admin setup status</h2>
            </div>
          </div>
          <div className="admin-status-stack">
            {setupItems.map((item) => (
              <div className={item.good ? "admin-status-pill is-good" : "admin-status-pill"} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel-card">
          <div className="admin-panel-card__header">
            <div>
              <p className="kicker">Recent Products</p>
              <h2>Latest catalogue edits</h2>
            </div>
            <Link className="admin-text-link" href="/admin/products">
              View all
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="admin-mini-list">
            {recentProducts.length ? (
              recentProducts.map((product) => (
                <Link className="admin-mini-row" href={`/admin/products/${product.slug}`} key={product.slug}>
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.category}</small>
                  </span>
                  <em className={product.isPublished === false ? "admin-chip admin-chip--muted" : "admin-chip admin-chip--success"}>
                    {product.isPublished === false ? "Hidden" : "Live"}
                  </em>
                </Link>
              ))
            ) : (
              <p className="admin-muted">No products added yet.</p>
            )}
          </div>
        </section>

        <section className="admin-panel-card">
          <div className="admin-panel-card__header">
            <div>
              <p className="kicker">Quote Requests</p>
              <h2>Customer follow-ups</h2>
            </div>
            <Link className="admin-text-link" href="/admin/inquiries">
              Open
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="admin-mini-list">
            {recentInquiries.length ? (
              recentInquiries.map((inquiry) => (
                <Link className="admin-mini-row" href="/admin/inquiries" key={inquiry.id}>
                  <span>
                    <strong>{inquiry.name}</strong>
                    <small>{inquiry.containerType || inquiry.company || inquiry.email}</small>
                  </span>
                  <em className="admin-chip admin-chip--accent">{inquiry.status}</em>
                </Link>
              ))
            ) : (
              <p className="admin-muted">No quote requests yet.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
