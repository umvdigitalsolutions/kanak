"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ProductEnquiryForm({ productName }: { productName: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const city = String(formData.get("city") || "").trim();
    const note = String(formData.get("message") || "").trim();

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        body: JSON.stringify({
          capacity: "",
          color: "",
          company: String(formData.get("company") || ""),
          compartments: "",
          containerType: productName,
          customConfig: false,
          email: String(formData.get("email") || ""),
          expectedQuantity: String(formData.get("quantity") || ""),
          foodType: "",
          lidRequirement: "",
          message: [city ? `City: ${city}` : "", note].filter(Boolean).join("\n"),
          name: String(formData.get("name") || ""),
          phone: String(formData.get("phone") || ""),
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message || "Could not submit enquiry.");
      }

      form.reset();
      setStatus("success");
      setMessage("Enquiry submitted. The Kanak Mouldings team can follow up with product and quantity details.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not submit enquiry.");
    }
  }

  return (
    <form className="pdp-enquiry-form" onSubmit={handleSubmit}>
      <div className="pdp-enquiry-form__grid">
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Company Name
          <input name="company" required />
        </label>
        <label>
          Phone
          <input name="phone" required />
        </label>
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          City
          <input name="city" />
        </label>
        <label>
          Required Quantity
          <input name="quantity" placeholder="Example: 10,000 pieces" />
        </label>
      </div>
      <label>
        Product
        <input name="product" readOnly value={productName} />
      </label>
      <label>
        Message
        <textarea name="message" placeholder="Mention capacity, lid style, colour or packing requirement." rows={4} />
      </label>
      <button className="admin-submit pdp-enquiry-form__button" disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Sending Enquiry" : "Request Product Enquiry"}
      </button>
      {message ? <p className={status === "success" ? "demo-submit" : "form-error"}>{message}</p> : null}
    </form>
  );
}
