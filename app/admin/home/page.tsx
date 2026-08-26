import Link from "next/link";
import { ArrowUpRight, Eye, EyeOff, Home, Layers3, Settings } from "lucide-react";
import { AdminHomeSettingsForm } from "@/components/admin/AdminHomeSettingsForm";
import { Container } from "@/components/ui/Container";
import { requireAdmin } from "@/lib/admin/auth";
import { getSiteSettings } from "@/lib/backend/site-settings";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function AdminHomePage({ searchParams }: Props) {
  await requireAdmin();
  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : undefined;
  const settings = await getSiteSettings();
  const visibleSlides = settings.containerSlides.filter((slide) => slide.isPublished !== false).length;
  const hiddenSlides = settings.containerSlides.length - visibleSlides;
  const summaryCards = [
    {
      label: "Hero Visual",
      value: settings.hero.mediaType === "video" ? "Video" : "Image",
      detail: "First-screen media",
      icon: Home,
    },
    {
      label: "Hero Text",
      value: "1",
      detail: "Headline and buttons",
      icon: Settings,
    },
    {
      label: "Carousel Cards",
      value: settings.containerSlides.length,
      detail: `${visibleSlides} visible on home`,
      icon: Layers3,
    },
    {
      label: "Hidden Cards",
      value: hiddenSlides,
      detail: "Saved but not shown",
      icon: hiddenSlides > 0 ? EyeOff : Eye,
    },
  ];

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Home Page</p>
            <h1>CHANGE HOME PAGE.</h1>
            <p>Update the top banner and the container cards below it.</p>
          </div>
          <div className="admin-actions">
            <Link className="admin-secondary" href="/admin">
              Dashboard
            </Link>
            <Link className="admin-secondary" href="/" target="_blank">
              View Home
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>

        <div className="admin-page-summary" aria-label="Home page summary">
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

        {query.saved ? <div className="demo-submit">Home page content saved.</div> : null}
        {query.deleted ? <div className="demo-submit">Home carousel slide deleted.</div> : null}
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The home page action could not be completed. Please check the fields and try again."}
          </div>
        ) : null}

        <div className="admin-guidance-strip">
          <div>
            <p className="kicker">Home Page Helper</p>
            <h2>Update the home page from top to bottom.</h2>
            <p>
              Start with the hero video or image, confirm the headline and buttons, then manage the product cards that appear below it.
            </p>
          </div>
          <Link className="admin-secondary" href="/admin/products">
            Manage Products
          </Link>
        </div>

        <AdminHomeSettingsForm hero={settings.hero} slides={settings.containerSlides} />
      </Container>
    </section>
  );
}
