"use server";

export type QuoteRequestPayload = {
  name: string;
  company: string;
  phone: string;
  email: string;
  containerType: string;
  foodType: string;
  expectedQuantity: string;
  capacity: string;
  compartments: string;
  color: string;
  lidRequirement: string;
  customConfig: boolean;
  message: string;
  /** Hidden honeypot field — real visitors never fill this in. */
  website: string;
};

export type QuoteRequestResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof QuoteRequestPayload, string>> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: QuoteRequestPayload) {
  const fieldErrors: Partial<Record<keyof QuoteRequestPayload, string>> = {};

  if (!payload.name.trim()) fieldErrors.name = "Name is required.";
  if (!payload.company.trim()) fieldErrors.company = "Company is required.";
  if (!payload.phone.trim() && !payload.email.trim()) {
    fieldErrors.phone = "Phone or email is required.";
  }
  if (payload.email && !emailPattern.test(payload.email)) {
    fieldErrors.email = "Enter a valid email.";
  }
  if (!payload.containerType.trim()) fieldErrors.containerType = "Container type is required.";

  return fieldErrors;
}

/**
 * No email/CRM provider is configured for this project yet. Until one is wired in
 * (e.g. Resend, SendGrid, HubSpot — via an API key in an environment variable),
 * submissions are recorded to the server log so nothing is silently dropped.
 */
function recordQuoteRequest(payload: QuoteRequestPayload) {
  const { website: _honeypot, ...record } = payload;
  console.log("[quote-request]", JSON.stringify({ receivedAt: new Date().toISOString(), ...record }));
}

export async function submitQuoteRequest(payload: QuoteRequestPayload): Promise<QuoteRequestResult> {
  // Honeypot tripped: pretend success so bots gain no signal, do nothing further.
  if (payload.website.trim()) {
    return { ok: true };
  }

  const fieldErrors = validate(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Check the highlighted fields.", fieldErrors };
  }

  recordQuoteRequest(payload);

  return { ok: true };
}
