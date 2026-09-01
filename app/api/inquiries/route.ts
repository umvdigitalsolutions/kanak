import { isAdminAuthenticated } from "@/lib/admin/auth";
import { databaseAwareMessage, databaseAwareStatus, logBackendError } from "@/lib/backend/errors";
import { getInquiries, validateInquiryInput } from "@/lib/backend/inquiries";
import { sendInquiryNotification } from "@/lib/email/inquiry-notification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const undeliveredMessage =
  "We could not send your enquiry right now. Please try again, or reach us directly at admin@kanakmoulding.com.";

function jsonError(message: string, status = 500, errors?: Record<string, string>) {
  return Response.json({ ok: false, message, errors }, { status });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Unauthorized.", 401);
  }

  try {
    return Response.json({ ok: true, inquiries: await getInquiries() });
  } catch (error) {
    logBackendError("Inquiry API read failed", error);
    return jsonError(databaseAwareMessage(error, "Could not load inquiries."), databaseAwareStatus(error, 500));
  }
}

/**
 * Enquiries are delivered by email only - nothing is written to the database,
 * so the send is the submission. A failure here loses the lead outright, which
 * is why it surfaces to the customer instead of being logged and swallowed.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inquiry, errors } = validateInquiryInput(body);

    if (Object.keys(errors).length > 0) {
      return jsonError("Please check the highlighted fields.", 422, errors);
    }

    const notification = await sendInquiryNotification(inquiry);

    if (!notification.sent) {
      logBackendError(
        "Inquiry email not sent",
        new Error(`Resend reported: ${notification.reason ?? "unknown"}`),
      );
      return jsonError(undeliveredMessage, 502);
    }

    return Response.json({ ok: true, inquiry, notificationSent: true }, { status: 201 });
  } catch (error) {
    logBackendError("Inquiry email failed", error);
    return jsonError(undeliveredMessage, 502);
  }
}
