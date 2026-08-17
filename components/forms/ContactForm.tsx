"use client";

import { useMemo, useState, useTransition } from "react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { submitQuoteRequest } from "@/app/contact/actions";

export type ContactInitialValues = {
  product?: string;
  shape?: string;
  size?: string;
  color?: string;
  lid?: string;
  compartments?: string;
  application?: string;
  foodType?: string;
  quantity?: string;
};

type FormState = {
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
};

function initialForm(values: ContactInitialValues): FormState {
  const product = products.find((item) => item.slug === values.product);
  const containerType = product?.name ?? values.shape ?? "";

  return {
    name: "",
    company: "",
    phone: "",
    email: "",
    containerType,
    foodType: values.foodType ?? values.application ?? "",
    expectedQuantity: values.quantity ?? "",
    capacity: values.size ?? "",
    compartments: values.compartments ?? "",
    color: values.color ?? "",
    lidRequirement: values.lid ?? "",
    customConfig: Boolean(values.shape || values.product),
    message: product
      ? `Quote request for ${product.name}.`
      : values.shape
        ? `Custom configuration: ${values.shape}, ${values.color ?? "colour pending"}, ${values.compartments ?? "compartments pending"} compartments.`
        : "",
  };
}

export function ContactForm({ initialValues }: { initialValues: ContactInitialValues }) {
  const [form, setForm] = useState<FormState>(() => initialForm(initialValues));
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedProduct = useMemo(
    () => products.find((product) => product.name === form.containerType),
    [form.containerType],
  );

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.company.trim()) nextErrors.company = "Company is required.";
    if (!form.phone.trim() && !form.email.trim()) nextErrors.phone = "Phone or email is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.containerType.trim()) nextErrors.containerType = "Container type is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return (
    <form
      className="quote-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (isPending) return;

        setSubmitted(false);
        setSubmitError(null);
        if (!validate()) return;

        startTransition(async () => {
          const result = await submitQuoteRequest({ ...form, website });

          if (result.ok) {
            setSubmitted(true);
            setErrors({});
          } else {
            setSubmitError(result.error);
            if (result.fieldErrors) setErrors(result.fieldErrors);
          }
        });
      }}
    >
      <div aria-hidden="true" className="quote-form__honeypot">
        <label htmlFor="website">Website</label>
        <input
          autoComplete="off"
          id="website"
          name="website"
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          type="text"
          value={website}
        />
      </div>

      <div className="form-grid">
        <label>
          Name
          <input
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => update("name", event.target.value)}
            required
            type="text"
            value={form.name}
          />
          {errors.name ? <small id="name-error">{errors.name}</small> : null}
        </label>
        <label>
          Company
          <input
            aria-describedby={errors.company ? "company-error" : undefined}
            aria-invalid={Boolean(errors.company)}
            onChange={(event) => update("company", event.target.value)}
            required
            type="text"
            value={form.company}
          />
          {errors.company ? <small id="company-error">{errors.company}</small> : null}
        </label>
        <label>
          Phone
          <input
            aria-describedby={errors.phone ? "phone-error" : undefined}
            aria-invalid={Boolean(errors.phone)}
            onChange={(event) => update("phone", event.target.value)}
            type="tel"
            value={form.phone}
          />
          {errors.phone ? <small id="phone-error">{errors.phone}</small> : null}
        </label>
        <label>
          Email
          <input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            onChange={(event) => update("email", event.target.value)}
            type="email"
            value={form.email}
          />
          {errors.email ? <small id="email-error">{errors.email}</small> : null}
        </label>
      </div>

      <label>
        Container Type
        <select
          aria-describedby={errors.containerType ? "container-error" : undefined}
          aria-invalid={Boolean(errors.containerType)}
          onChange={(event) => update("containerType", event.target.value)}
          required
          value={form.containerType}
        >
          <option value="">Select a container</option>
          {products.map((product) => (
            <option key={product.slug} value={product.name}>
              {product.name}
            </option>
          ))}
          <option value="Custom container configuration">Custom container configuration</option>
        </select>
        {errors.containerType ? <small id="container-error">{errors.containerType}</small> : null}
      </label>

      <div className="form-grid">
        <label>
          Food Type
          <input onChange={(event) => update("foodType", event.target.value)} type="text" value={form.foodType} />
        </label>
        <label>
          Expected Quantity
          <input onChange={(event) => update("expectedQuantity", event.target.value)} type="text" value={form.expectedQuantity} />
        </label>
        <label>
          Required Capacity
          <input onChange={(event) => update("capacity", event.target.value)} type="text" value={form.capacity} />
        </label>
        <label>
          Required Compartments
          <input onChange={(event) => update("compartments", event.target.value)} type="text" value={form.compartments} />
        </label>
        <label>
          Colour Preference
          <input onChange={(event) => update("color", event.target.value)} type="text" value={form.color} />
        </label>
        <label>
          Lid Requirement
          <input onChange={(event) => update("lidRequirement", event.target.value)} type="text" value={form.lidRequirement} />
        </label>
      </div>

      <label className="checkbox-label">
        <input
          checked={form.customConfig}
          onChange={(event) => update("customConfig", event.target.checked)}
          type="checkbox"
        />
        I need a custom container configuration.
      </label>

      <label>
        Message
        <textarea onChange={(event) => update("message", event.target.value)} rows={5} value={form.message} />
      </label>

      {selectedProduct?.placeholderSpecification ? (
        <p className="form-note">Product specifications on this site are placeholders until verified by the manufacturer.</p>
      ) : null}

      {submitError ? (
        <div className="form-error" role="alert">
          {submitError}
        </div>
      ) : null}

      {submitted ? (
        <div className="demo-submit" role="status">
          Quote request received. Our team will follow up using the phone or email you provided.
        </div>
      ) : null}

      <Button disabled={isPending} type="submit" variant="accent">
        {isPending ? "Sending..." : "Request Quote"}
      </Button>
    </form>
  );
}
