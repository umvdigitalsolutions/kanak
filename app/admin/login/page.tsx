import Link from "next/link";
import { redirect } from "next/navigation";
import { loginAction } from "@/app/admin/actions";
import { getAdminSetupStatus, isAdminAuthenticated } from "@/lib/admin/auth";
import { Container } from "@/components/ui/Container";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: Props) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const query = await searchParams;
  const setup = getAdminSetupStatus();
  const hasError = query.error === "1";

  return (
    <section className="page-shell admin-page">
      <Container narrow>
        <div className="admin-login">
          <p className="kicker">Admin</p>
          <h1>MANAGE SITE CONTENT.</h1>
          <p>
            Sign in to edit products, gallery visuals and customer quote
            requests backed by MongoDB.
          </p>

          {!setup.adminPasswordConfigured ? (
            <div className="form-error">
              Set <code>ADMIN_PASSWORD</code> in your environment before using the admin panel.
            </div>
          ) : null}

          {!setup.mongoConfigured ? (
            <div className="form-note">
              Set <code>MONGODB_URI</code> and <code>MONGODB_DB</code> to save admin changes.
            </div>
          ) : null}

          {hasError ? <div className="form-error">Incorrect admin password.</div> : null}

          <form action={loginAction} className="admin-form admin-form--compact">
            <label>
              Admin Password
              <input disabled={!setup.adminPasswordConfigured} name="password" required type="password" />
            </label>
            <button className="admin-submit" disabled={!setup.adminPasswordConfigured} type="submit">
              Sign In
            </button>
          </form>

          <Link className="admin-back-link" href="/">
            Back to website
          </Link>
        </div>
      </Container>
    </section>
  );
}
