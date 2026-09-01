import { Resend } from "resend";
import type { ContactInquiry, ProductRequest } from "@/lib/backend/inquiries";

export type InquiryNotificationResult =
  | { sent: true; id: string | null }
  | { sent: false; skipped: true; reason: "not_configured" };

const defaultRecipient = "info@kanakmouldings.co.in";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function display(value: string) {
  return value || "Not provided";
}

function formatSubmittedAt(value: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function requestName(request: ProductRequest) {
  return request.product || request.productRange || request.category || "Product requirement";
}

function renderProductRows(requests: ProductRequest[]) {
  return requests
    .map(
      (request, index) => `
        <tr>
          <td style="padding:12px 10px;border-bottom:1px solid #dce7df;color:#61746a;font-size:13px;vertical-align:top;">${index + 1}</td>
          <td style="padding:12px 10px;border-bottom:1px solid #dce7df;color:#173f2d;font-size:13px;vertical-align:top;">
            <strong style="display:block;font-size:14px;">${escapeHtml(requestName(request))}</strong>
            <span style="color:#61746a;">${escapeHtml(display(request.category))} / ${escapeHtml(display(request.productRange))}</span>
          </td>
          <td style="padding:12px 10px;border-bottom:1px solid #dce7df;color:#173f2d;font-size:13px;vertical-align:top;">${escapeHtml(display(request.quantity))}</td>
          <td style="padding:12px 10px;border-bottom:1px solid #dce7df;color:#173f2d;font-size:13px;vertical-align:top;white-space:pre-wrap;">${escapeHtml(display(request.notes))}</td>
        </tr>`,
    )
    .join("");
}

function renderDetailRow(label: string, value: string) {
  return `
    <tr>
      <td style="width:170px;padding:9px 0;color:#6f8178;font-size:13px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:9px 0;color:#173f2d;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(display(value))}</td>
    </tr>`;
}

export function buildInquiryEmail(inquiry: ContactInquiry) {
  const submittedAt = formatSubmittedAt(inquiry.createdAt);
  const productSummary = inquiry.productRequests.length
    ? `${inquiry.productRequests.length} product ${inquiry.productRequests.length === 1 ? "request" : "requests"}`
    : display(inquiry.containerType);
  const contactEmail = inquiry.email
    ? `<a href="mailto:${encodeURIComponent(inquiry.email)}" style="color:#046a3d;text-decoration:none;">${escapeHtml(inquiry.email)}</a>`
    : "Not provided";
  const phoneHref = inquiry.phone.replace(/[^+\d]/g, "");
  const contactPhone = inquiry.phone
    ? `<a href="tel:${phoneHref}" style="color:#046a3d;text-decoration:none;">${escapeHtml(inquiry.phone)}</a>`
    : "Not provided";

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#edf3ef;font-family:Arial,Helvetica,sans-serif;color:#173f2d;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#edf3ef;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#ffffff;border:1px solid #d6e3da;">
            <tr>
              <td style="padding:28px 32px;background:#053d27;border-top:5px solid #ffb512;">
                <p style="margin:0 0 8px;color:#ffca4f;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Kanak Mouldings</p>
                <h1 style="margin:0;color:#ffffff;font-size:26px;line-height:1.25;">New product enquiry</h1>
                <p style="margin:10px 0 0;color:#cde0d4;font-size:14px;">${escapeHtml(inquiry.id)} &nbsp;|&nbsp; ${escapeHtml(submittedAt)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 12px;">
                <p style="margin:0 0 8px;color:#708178;font-size:12px;font-weight:700;text-transform:uppercase;">Customer</p>
                <h2 style="margin:0 0 4px;color:#053d27;font-size:22px;">${escapeHtml(inquiry.name)}</h2>
                <p style="margin:0 0 22px;color:#40594c;font-size:15px;">${escapeHtml(inquiry.company)}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="width:50%;padding:12px 14px;background:#f5f8f6;border-right:6px solid #ffffff;color:#61746a;font-size:12px;vertical-align:top;">
                      EMAIL<br><span style="display:inline-block;margin-top:6px;font-size:14px;font-weight:700;">${contactEmail}</span>
                    </td>
                    <td style="width:50%;padding:12px 14px;background:#f5f8f6;border-left:6px solid #ffffff;color:#61746a;font-size:12px;vertical-align:top;">
                      PHONE<br><span style="display:inline-block;margin-top:6px;font-size:14px;font-weight:700;">${contactPhone}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 8px;">
                <p style="margin:0 0 12px;color:#708178;font-size:12px;font-weight:700;text-transform:uppercase;">Requirement summary</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #dce7df;border-bottom:1px solid #dce7df;">
                  ${renderDetailRow("Product interest", productSummary)}
                  ${renderDetailRow("Expected quantity", inquiry.expectedQuantity)}
                  ${renderDetailRow("Capacity / size", inquiry.capacity)}
                  ${renderDetailRow("Compartments", inquiry.compartments)}
                  ${renderDetailRow("Food type", inquiry.foodType)}
                  ${renderDetailRow("Colour", inquiry.color)}
                  ${renderDetailRow("Lid requirement", inquiry.lidRequirement)}
                  ${renderDetailRow("Custom configuration", inquiry.customConfig ? "Yes" : "No")}
                </table>
              </td>
            </tr>
            ${
              inquiry.productRequests.length
                ? `<tr>
                    <td style="padding:24px 32px 8px;">
                      <p style="margin:0 0 12px;color:#708178;font-size:12px;font-weight:700;text-transform:uppercase;">Selected products</p>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dce7df;border-collapse:collapse;">
                        <thead>
                          <tr style="background:#f5f8f6;">
                            <th style="padding:10px;text-align:left;color:#61746a;font-size:11px;">#</th>
                            <th style="padding:10px;text-align:left;color:#61746a;font-size:11px;">PRODUCT</th>
                            <th style="padding:10px;text-align:left;color:#61746a;font-size:11px;">QUANTITY</th>
                            <th style="padding:10px;text-align:left;color:#61746a;font-size:11px;">NOTES</th>
                          </tr>
                        </thead>
                        <tbody>${renderProductRows(inquiry.productRequests)}</tbody>
                      </table>
                    </td>
                  </tr>`
                : ""
            }
            <tr>
              <td style="padding:24px 32px 32px;">
                <p style="margin:0 0 10px;color:#708178;font-size:12px;font-weight:700;text-transform:uppercase;">Customer message</p>
                <div style="padding:16px;background:#fff8e8;border-left:4px solid #ffb512;color:#344d40;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(display(inquiry.message))}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const requestLines = inquiry.productRequests.length
    ? inquiry.productRequests.map(
        (request, index) =>
          `${index + 1}. ${requestName(request)}\n   Category: ${display(request.category)}\n   Range: ${display(request.productRange)}\n   Quantity: ${display(request.quantity)}\n   Notes: ${display(request.notes)}`,
      )
    : [display(inquiry.containerType)];

  const text = [
    "NEW KANAK MOULDINGS PRODUCT ENQUIRY",
    `Enquiry ID: ${inquiry.id}`,
    `Submitted: ${submittedAt}`,
    "",
    "CUSTOMER",
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company}`,
    `Email: ${display(inquiry.email)}`,
    `Phone: ${display(inquiry.phone)}`,
    "",
    "REQUIREMENT",
    `Expected quantity: ${display(inquiry.expectedQuantity)}`,
    `Capacity / size: ${display(inquiry.capacity)}`,
    `Compartments: ${display(inquiry.compartments)}`,
    `Food type: ${display(inquiry.foodType)}`,
    `Colour: ${display(inquiry.color)}`,
    `Lid requirement: ${display(inquiry.lidRequirement)}`,
    `Custom configuration: ${inquiry.customConfig ? "Yes" : "No"}`,
    "",
    "SELECTED PRODUCTS",
    ...requestLines,
    "",
    "CUSTOMER MESSAGE",
    display(inquiry.message),
  ].join("\n");

  return { html, text };
}

function recipientsFromEnvironment() {
  return (process.env.RESEND_TO_EMAIL || defaultRecipient)
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);
}

export async function sendInquiryNotification(
  inquiry: ContactInquiry,
): Promise<InquiryNotificationResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = recipientsFromEnvironment();

  if (!apiKey || !from || to.length === 0) {
    return { sent: false, skipped: true, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const { html, text } = buildInquiryEmail(inquiry);
  const subjectCompany = singleLine(inquiry.company || inquiry.name).slice(0, 80);
  const { data, error } = await resend.emails.send(
    {
      from,
      to,
      replyTo: inquiry.email || undefined,
      subject: `[${inquiry.id}] New product enquiry from ${subjectCompany}`,
      html,
      text,
    },
    { idempotencyKey: `inquiry-notification-${inquiry.id}` },
  );

  if (error) {
    throw new Error(`Resend delivery failed: ${error.message}`);
  }

  return { sent: true, id: data?.id ?? null };
}
