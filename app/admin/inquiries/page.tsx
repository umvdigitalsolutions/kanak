import Link from "next/link";
import { ArrowUpRight, BadgeCheck, ClipboardCheck, Clock3, Inbox, Mail, Phone } from "lucide-react";
import { updateInquiryStatusAction } from "@/app/admin/actions";
import { getAdminSetupStatus, requireAdmin } from "@/lib/admin/auth";
import { getInquiries, type InquiryStatus } from "@/lib/backend/inquiries";
import { Container } from "@/components/ui/Container";

const statuses: InquiryStatus[] = ["new", "contacted", "quoted", "closed"];
const statusLabels: Record<InquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  closed: "Closed",
};

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
  const statusCounts = statuses.reduce<Record<InquiryStatus, number>>(
    (counts, status) => ({ ...counts, [status]: inquiries.filter((inquiry) => inquiry.status === status).length }),
    { new: 0, contacted: 0, quoted: 0, closed: 0 },
  );
  const openInquiries = inquiries.length - statusCounts.closed;
  const summaryCards = [
    {
      label: "Total Requests",
      value: inquiries.length,
      detail: "Latest 100 inquiries",
      icon: Inbox,
    },
    {
      label: "New",
      value: statusCounts.new,
      detail: "Needs first response",
      icon: Clock3,
    },
    {
      label: "Quoted",
      value: statusCounts.quoted,
      detail: "Pricing shared",
      icon: ClipboardCheck,
    },
    {
      label: "Open",
      value: openInquiries,
      detail: `${statusCounts.closed} closed`,
      icon: BadgeCheck,
    },
  ];

  return (
    <section className="page-shell admin-page">
      <Container>
        <div className="admin-hero">
          <div>
            <p className="kicker">Admin Inquiries</p>
            <h1>QUOTE REQUESTS.</h1>
            <p>Contact form submissions from B2B buyers are stored here once MongoDB is configured.</p>
          </div>
          <div className="admin-actions">
            <Link className="admin-secondary" href="/admin">
              Dashboard
            </Link>
            <Link className="admin-secondary" href="/contact" target="_blank">
              View Form
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>

        <div className="admin-page-summary" aria-label="Inquiry summary">
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

        {!setup.mongoConfigured ? (
          <div className="form-error">
            MongoDB is not configured, so inquiries cannot be stored yet.
          </div>
        ) : null}
        {query.updated ? <div className="demo-submit">Inquiry status updated.</div> : null}
        {error ? (
          <div className="form-error">
            {error === "db"
              ? "Database is temporarily unavailable. Check MongoDB Atlas network access, DNS, and environment variables."
              : "The inquiry action could not be completed. Please try again."}
          </div>
        ) : null}

        <div className="admin-guidance-strip">
          <div>
            <p className="kicker">Inquiry Helper</p>
            <h2>Move every request through a simple sales status.</h2>
            <p>
              New means not contacted yet. Contacted means the buyer has been called or emailed. Quoted means pricing is shared.
              Closed means no follow-up is pending.
            </p>
          </div>
          <span className="admin-icon-badge">
            <Inbox aria-hidden="true" size={18} />
          </span>
        </div>

        <div className="admin-list">
          {inquiries.length ? (
            inquiries.map((inquiry) => (
              <article className="admin-list-card admin-list-card--inquiry" key={inquiry.id}>
                <div>
                  <div className="admin-chip-row">
                    <em className={inquiry.status === "closed" ? "admin-chip admin-chip--muted" : "admin-chip admin-chip--accent"}>
                      {statusLabels[inquiry.status]}
                    </em>
                    {inquiry.customConfig ? <em className="admin-chip">Custom Requirement</em> : null}
                  </div>
                  <h2>{inquiry.name}</h2>
                  <p>{inquiry.company}</p>
                  <div className="admin-contact-line">
                    {inquiry.phone ? (
                      <span>
                        <Phone aria-hidden="true" size={14} />
                        {inquiry.phone}
                      </span>
                    ) : null}
                    {inquiry.email ? (
                      <span>
                        <Mail aria-hidden="true" size={14} />
                        {inquiry.email}
                      </span>
                    ) : null}
                  </div>
                  <dl className="admin-inquiry-specs">
                    <div>
                      <dt>Products</dt>
                      <dd>{inquiry.containerType || "Not specified"}</dd>
                    </div>
                    <div>
                      <dt>Food Use</dt>
                      <dd>{inquiry.foodType || "Not specified"}</dd>
                    </div>
                    <div>
                      <dt>Quantity</dt>
                      <dd>{inquiry.expectedQuantity || "Not specified"}</dd>
                    </div>
                    <div>
                      <dt>Capacity</dt>
                      <dd>{inquiry.capacity || "Not specified"}</dd>
                    </div>
                  </dl>
                  {inquiry.productRequests.length ? (
                    <div className="admin-inquiry-products">
                      {inquiry.productRequests.map((request, index) => (
                        <div key={`${inquiry.id}-${index}`}>
                          <strong>{request.product || request.productRange || request.category}</strong>
                          <span>{[request.category, request.productRange, request.quantity ? `Qty: ${request.quantity}` : ""].filter(Boolean).join(" / ")}</span>
                          {request.notes ? <small>{request.notes}</small> : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <small>{new Date(inquiry.createdAt).toLocaleString("en-IN")}</small>
                </div>
                <div>
                  <p className="admin-inquiry-message">{inquiry.message || "No message added."}</p>
                  <form action={updateInquiryStatusAction} className="admin-status-form">
                    <input name="id" type="hidden" value={inquiry.id} />
                    <select name="status" defaultValue={inquiry.status}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {statusLabels[status]}
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
