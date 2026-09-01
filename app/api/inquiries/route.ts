import { isAdminAuthenticated } from "@/lib/admin/auth";
import { databaseAwareMessage, databaseAwareStatus, logBackendError } from "@/lib/backend/errors";
import { createInquiry, getInquiries } from "@/lib/backend/inquiries";
import { sendInquiryNotification } from "@/lib/email/inquiry-notification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inquiry, errors } = await createInquiry(body);

    if (Object.keys(errors).length > 0) {
      return jsonError("Please check the highlighted fields.", 422, errors);
    }

    let notificationSent = false;

    try {
      const notification = await sendInquiryNotification(inquiry);
      notificationSent = notification.sent;

      if (!notification.sent) {
        console.warn("Inquiry email notification skipped: Resend is not configured.");
      }
    } catch (error) {
      logBackendError("Inquiry email notification failed", error);
    }

    return Response.json({ ok: true, inquiry, notificationSent }, { status: 201 });
  } catch (error) {
    logBackendError("Inquiry API submit failed", error);
    return jsonError(databaseAwareMessage(error, "Could not submit inquiry."), databaseAwareStatus(error, 500));
  }
}
