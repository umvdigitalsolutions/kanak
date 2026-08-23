import Link from "next/link";
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
            <Link className="admin-secondary" href="/">
              View Home
            </Link>
          </div>
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

        <AdminHomeSettingsForm hero={settings.hero} slides={settings.containerSlides} />
      </Container>
    </section>
  );
}
