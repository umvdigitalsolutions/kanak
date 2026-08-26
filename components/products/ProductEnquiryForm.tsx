"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { Field } from "@/components/forms/Field";

type FormStatus = "idle" | "submitting" | "success" | "error";

type ProductEnquiryFormProps = {
  productName: string;
  sizeOptions?: string[];
};

type EnquiryState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  quantity: string;
  size: string;
  message: string;
};

const errorFieldOrder = ["name", "company", "phone", "email"] as const;

function emptyState(sizeOptions: string[]): EnquiryState {
  return {
    name: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    quantity: "",
    size: sizeOptions[0] ?? "",
    message: "",
  };
}

function validateEnquiry(form: EnquiryState) {
  const errors: Record<string, string> = {};

  if (!form.name.trim()) errors.name = "Please tell us your name.";
  if (!form.company.trim()) errors.company = "Please add your company name.";
  if (!form.phone.trim()) errors.phone = "We need a phone number to call you back.";
  else if (form.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a complete phone number.";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

export function ProductEnquiryForm({ productName, sizeOptions = [] }: ProductEnquiryFormProps) {
  const [form, setForm] = useState<EnquiryState>(() => emptyState(sizeOptions));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const update = <Key extends keyof EnquiryState>(key: Key, value: EnquiryState[Key]) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (validated) setErrors(validateEnquiry(next));
      return next;
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setValidated(true);

    const nextErrors = validateEnquiry(form);
    setErrors(nextErrors);

    const firstError = errorFieldOrder.find((key) => nextErrors[key]);
    if (firstError) {
      setStatus("error");
      const target = document.getElementById(`enquiry-${firstError}`);
      target?.focus();
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");

    try {
      const note = form.message.trim();
      const city = form.city.trim();
      const response = await fetch("/api/inquiries", {
        body: JSON.stringify({
          capacity: form.size,
          color: "",
          company: form.company,
          compartments: "",
          containerType: productName,
          customConfig: false,
          email: form.email,
          expectedQuantity: form.quantity,
          foodType: "",
          lidRequirement: "",
          message: [city ? `City: ${city}` : "", note].filter(Boolean).join("\n"),
          name: form.name,
          phone: form.phone,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const payload = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message || "We could not submit this enquiry.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not submit this enquiry.");
    }
  }

  const startNewEnquiry = () => {
    setForm(emptyState(sizeOptions));
    setErrors({});
    setMessage("");
    setValidated(false);
    setStatus("idle");
  };

  const isSubmitting = status === "submitting";

  if (status === "success") {
    return (
      <div className="quote-form pdp-enquiry-form quote-form--success" role="status">
        <span className="quote-success__mark" aria-hidden="true">
          <CircleCheck size={26} strokeWidth={1.8} />
        </span>
        <h3>Enquiry received</h3>
        <p>
          Thank you, {form.name.split(" ")[0] || "there"}. Your enquiry for {productName} has reached our team and someone
          will follow up with product and pricing details.
        </p>
        <button className="quote-form__ghost-button" onClick={startNewEnquiry} type="button">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form pdp-enquiry-form" noValidate onSubmit={handleSubmit}>
      <header className="quote-form__intro">
        <p className="quote-form__eyebrow">Product enquiry</p>
        <p className="quote-form__lede">
          Enquiring about <strong>{productName}</strong>. Share your quantity and we will come back with pricing.
        </p>
      </header>

      {message ? (
        <div className="quote-form__alert quote-form__alert--error" role="alert">
          <CircleAlert aria-hidden="true" size={16} strokeWidth={2.1} />
          <div>
            <strong>{message}</strong>
          </div>
        </div>
      ) : null}

      <div className="quote-form__fields quote-form__fields--two">
        <Field error={errors.name} id="enquiry-name" label="Full name">
          <input
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id="enquiry-name"
            name="name"
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
            type="text"
            value={form.name}
          />
        </Field>
        <Field error={errors.company} id="enquiry-company" label="Company">
          <input
            aria-describedby={errors.company ? "enquiry-company-error" : undefined}
            aria-invalid={Boolean(errors.company)}
            autoComplete="organization"
            id="enquiry-company"
            name="company"
            onChange={(event) => update("company", event.target.value)}
            placeholder="Business or brand name"
            type="text"
            value={form.company}
          />
        </Field>
        <Field error={errors.phone} id="enquiry-phone" label="Phone">
          <input
            aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
            id="enquiry-phone"
            inputMode="tel"
            name="phone"
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+91 00000 00000"
            type="tel"
            value={form.phone}
          />
        </Field>
        <Field error={errors.email} id="enquiry-email" label="Email" optional>
          <input
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="enquiry-email"
            inputMode="email"
            name="email"
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@company.com"
            type="email"
            value={form.email}
          />
        </Field>
        <Field id="enquiry-city" label="City" optional>
          <input
            autoComplete="address-level2"
            id="enquiry-city"
            name="city"
            onChange={(event) => update("city", event.target.value)}
            placeholder="Delivery location"
            type="text"
            value={form.city}
          />
        </Field>
        <Field id="enquiry-quantity" label="Required quantity" optional>
          <input
            id="enquiry-quantity"
            name="quantity"
            onChange={(event) => update("quantity", event.target.value)}
            placeholder="e.g. 10,000 pieces"
            type="text"
            value={form.quantity}
          />
        </Field>
      </div>

      {sizeOptions.length ? (
        <Field hint="Not sure? Pick the closest and mention it in your message." id="enquiry-size" label="Required size">
          <select id="enquiry-size" name="size" onChange={(event) => update("size", event.target.value)} value={form.size}>
            {sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </Field>
      ) : null}

      <Field id="enquiry-message" label="Message" optional>
        <textarea
          id="enquiry-message"
          name="message"
          onChange={(event) => update("message", event.target.value)}
          placeholder="Mention lid style, colour, branding or packing requirement."
          rows={4}
          value={form.message}
        />
      </Field>

      <footer className="quote-form__footer">
        <p>Your details are used only to respond to this enquiry.</p>
        <button className="quote-form__submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="quote-form__spinner" size={16} strokeWidth={2.2} />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2.1} />
            </>
          )}
        </button>
      </footer>
    </form>
  );
}
