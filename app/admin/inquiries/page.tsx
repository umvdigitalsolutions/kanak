import Link from "next/link";
import { updateInquiryStatusAction } from "@/app/admin/actions";
import { getAdminSetupStatus, requireAdmin } from "@/lib/admin/auth";
import { getInquiries, type InquiryStatus } from "@/lib/backend/inquiries";
import { Container } from "@/components/ui/Container";

const statuses: InquiryStatus[] = ["new", "contacted", "quoted", "closed"];

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage({ searchParams }: Props) {
  await requireAdmin();
  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : undefined;
  const setup = getAdminSetupStatus();
  const inquiries = setup.mongoConfigured ? await getInquiries().catch(() => []) : [];

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Admin Inquiries</p>
            <h1>QUOTE REQUESTS.</h1>
            <p>Contact form submissions from B2B buyers are stored here once MongoDB is configured.</p>
          </div>
          <Link className="admin-secondary" href="/admin">
            Dashboard
          </Link>
        </div>

        {!setup.mongoConfigured ? (
          <div className="form-error">
            MongoDB is not configured, so inquiries cannot be stored yet.
          </div>
        ) : null}
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The inquiry action could not be completed. Please try again."}
          </div>
        ) : null}

        <div className="admin-list">
          {inquiries.length ? (
            inquiries.map((inquiry) => (
              <article className="admin-list-card admin-list-card--inquiry" key={inquiry.id}>
                <div>
                  <span>{inquiry.status}</span>
                  <h2>{inquiry.name}</h2>
                  <p>{inquiry.company}</p>
                  <p>{inquiry.phone || inquiry.email}</p>
                  <p>{inquiry.containerType}</p>
                  <small>{new Date(inquiry.createdAt).toLocaleString("en-IN")}</small>
                </div>
                <div>
                  <p>{inquiry.message || "No message added."}</p>
                  <form action={updateInquiryStatusAction} className="admin-status-form">
                    <input name="id" type="hidden" value={inquiry.id} />
                    <select name="status" defaultValue={inquiry.status}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button className="admin-secondary" type="submit">
                      Update
                    </button>
                  </form>
                </div>
              </article>
            ))
          ) : (
            <div className="admin-empty">No inquiries yet.</div>
          )}
        </div>
      </Container>
    </section>
  );
}
