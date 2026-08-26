"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, CircleAlert, CircleCheck, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { Field } from "@/components/forms/Field";
import {
  biodegradableProductRanges,
  plasticProductRanges,
  productFilters,
  productRangeOrder,
  type Product,
} from "@/data/products";

export type ContactInitialValues = {
  product?: string;
  shape?: string;
  size?: string;
  color?: string;
  compartments?: string;
  quantity?: string;
};

type ProductRequestForm = {
  id: string;
  category: string;
  productRange: string;
  product: string;
  quantity: string;
  notes: string;
};

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  containerType: string;
  productRequests: ProductRequestForm[];
  expectedQuantity: string;
  capacity: string;
  compartments: string;
  customConfig: boolean;
  message: string;
};

const defaultCategory = "Biodegradables";
const blankRequest = (index: number): ProductRequestForm => ({
  id: `REQ-${index}`,
  category: "",
  productRange: "",
  product: "",
  quantity: "",
  notes: "",
});

function requestFromProduct(product: Product, values: ContactInitialValues): ProductRequestForm {
  return {
    id: "REQ-1",
    category: product.category,
    productRange: product.productRange ?? "",
    product: product.name,
    quantity: values.quantity ?? "",
    notes: values.size ? `Required size: ${values.size}` : "",
  };
}

function requestFromCustomValues(values: ContactInitialValues): ProductRequestForm {
  return {
    id: "REQ-1",
    category: values.shape ? "Plastic Containers" : defaultCategory,
    productRange: values.shape ? "Custom Packaging" : "",
    product: values.shape ? "Custom container configuration" : "",
    quantity: values.quantity ?? "",
    notes: [values.shape, values.size ? `Size: ${values.size}` : "", values.color ? `Colour: ${values.color}` : ""]
      .filter(Boolean)
      .join(", "),
  };
}

function cleanRequests(requests: ProductRequestForm[]) {
  return requests
    .map((request) => ({
      category: request.category.trim(),
      productRange: request.productRange.trim(),
      product: request.product.trim(),
      quantity: request.quantity.trim(),
      notes: request.notes.trim(),
    }))
    .filter((request) => request.category || request.productRange || request.product || request.quantity || request.notes);
}

function summarizeRequests(requests: ReturnType<typeof cleanRequests>) {
  return requests
    .map((request) => {
      const productLabel = request.product || request.productRange || request.category;
      return [productLabel, request.quantity ? `Qty: ${request.quantity}` : ""].filter(Boolean).join(" - ");
    })
    .join("; ");
}

function initialForm(values: ContactInitialValues, products: Product[]): FormState {
  const product = products.find((item) => item.slug === values.product);
  const productRequests = product ? [requestFromProduct(product, values)] : [requestFromCustomValues(values)];
  const cleanedRequests = cleanRequests(productRequests);
  const containerType = summarizeRequests(cleanedRequests);

  return {
    name: "",
    company: "",
    phone: "",
    email: "",
    containerType,
    productRequests: cleanedRequests.length ? productRequests : [blankRequest(1)],
    expectedQuantity: values.quantity ?? "",
    capacity: values.size ?? "",
    compartments: values.compartments ?? "",
    customConfig: Boolean(values.shape || values.product),
    message: product
      ? `Quote request for ${product.name}.`
      : values.shape
        ? `Custom configuration: ${values.shape}, ${values.color ?? "colour pending"}, ${values.compartments ?? "compartments pending"} compartments.`
        : "",
  };
}

function initialValuesFromUrl(): ContactInitialValues {
  const search = new URLSearchParams(window.location.search);

  return {
    product: search.get("product") ?? undefined,
    shape: search.get("shape") ?? undefined,
    size: search.get("size") ?? undefined,
    color: search.get("color") ?? undefined,
    compartments: search.get("compartments") ?? undefined,
    quantity: search.get("quantity") ?? undefined,
  };
}

function orderedRanges(ranges: string[]) {
  return [...new Set(ranges)].sort((a, b) => {
    const aIndex = productRangeOrder.indexOf(a as (typeof productRangeOrder)[number]);
    const bIndex = productRangeOrder.indexOf(b as (typeof productRangeOrder)[number]);

    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

function hasSpecificationValues(form: FormState) {
  return Boolean(form.expectedQuantity || form.capacity || form.compartments);
}

function validateForm(form: FormState) {
  const nextErrors: Record<string, string> = {};
  const requests = cleanRequests(form.productRequests);

  if (!form.name.trim()) nextErrors.name = "Please tell us your name.";
  if (!form.company.trim()) nextErrors.company = "Please add your company name.";
  if (!form.phone.trim() && !form.email.trim()) nextErrors.phone = "Add a phone number or an email so we can reply.";
  if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 7) nextErrors.phone = "Enter a complete phone number.";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    nextErrors.email = "Enter a valid email address.";
  }
  if (!requests.length) nextErrors.containerType = "Add at least one product you would like quoted.";
  if (requests.some((request) => !request.productRange && !request.product)) {
    nextErrors.containerType = "Choose a product range for each item you have added.";
  }

  return nextErrors;
}

const errorFieldOrder = ["name", "company", "phone", "email", "containerType"] as const;

export function ContactForm({
  initialValues,
  products,
}: {
  initialValues: ContactInitialValues;
  products: Product[];
}) {
  const [form, setForm] = useState<FormState>(() => initialForm(initialValues, products));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [specsOpen, setSpecsOpen] = useState(() => hasSpecificationValues(initialForm(initialValues, products)));
  const requestCounter = useRef(form.productRequests.length + 1);
  const hasValidated = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const rangesByCategory = useMemo(() => {
    const dynamicRanges = productFilters.reduce<Record<string, string[]>>((groups, category) => {
      groups[category] = products
        .filter((product) => product.category === category && product.productRange)
        .map((product) => product.productRange as string);
      return groups;
    }, {});

    return {
      "Plastic Containers": orderedRanges([...plasticProductRanges, ...(dynamicRanges["Plastic Containers"] ?? [])]),
      Biodegradables: orderedRanges([...biodegradableProductRanges, ...(dynamicRanges.Biodegradables ?? [])]),
    };
  }, [products]);

  const selectedProducts = useMemo(
    () =>
      form.productRequests
        .map((request) => products.find((product) => product.name === request.product))
        .filter(Boolean) as Product[],
    [form.productRequests, products],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const urlValues = initialValuesFromUrl();
      const hasUrlValues = Object.values(urlValues).some(Boolean);

      if (hasUrlValues) {
        const nextForm = initialForm({ ...initialValues, ...urlValues }, products);
        setForm(nextForm);
        setSpecsOpen(hasSpecificationValues(nextForm));
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialValues, products]);

  const revalidate = (nextForm: FormState) => {
    if (!hasValidated.current) return;
    setErrors(validateForm(nextForm));
  };

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      revalidate(next);
      return next;
    });
  };

  const updateRequest = <Key extends keyof ProductRequestForm>(id: string, key: Key, value: ProductRequestForm[Key]) => {
    setForm((current) => {
      const next = {
        ...current,
        productRequests: current.productRequests.map((request) => {
          if (request.id !== id) return request;

          if (key === "category") {
            return { ...request, category: value, productRange: "", product: "" };
          }

          if (key === "productRange") {
            return { ...request, productRange: value, product: "" };
          }

          return { ...request, [key]: value };
        }),
      };
      revalidate(next);
      return next;
    });
  };

  const addRequest = () => {
    const nextIndex = requestCounter.current;
    requestCounter.current += 1;
    setForm((current) => ({ ...current, productRequests: [...current.productRequests, blankRequest(nextIndex)] }));
  };

  const removeRequest = (id: string) => {
    setForm((current) => {
      if (current.productRequests.length === 1) {
        const nextIndex = requestCounter.current;
        requestCounter.current += 1;
        const next = { ...current, productRequests: [blankRequest(nextIndex)] };
        revalidate(next);
        return next;
      }

      const next = { ...current, productRequests: current.productRequests.filter((request) => request.id !== id) };
      revalidate(next);
      return next;
    });
  };

  const focusFirstError = (nextErrors: Record<string, string>) => {
    const firstKey = errorFieldOrder.find((key) => nextErrors[key]);
    if (!firstKey) return;

    if (firstKey === "containerType") {
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const target = formRef.current?.querySelector<HTMLInputElement>(`#quote-${firstKey}`);
    target?.focus();
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");
    hasValidated.current = true;

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setSubmitState("error");
      focusFirstError(nextErrors);
      return;
    }

    setSubmitState("submitting");

    try {
      const productRequests = cleanRequests(form.productRequests);
      const requestSummary = summarizeRequests(productRequests);
      const response = await fetch("/api/inquiries", {
        body: JSON.stringify({
          ...form,
          color: "",
          foodType: "",
          lidRequirement: "",
          containerType: requestSummary,
          customConfig: form.customConfig || productRequests.length > 1 || productRequests.some((request) => !request.product),
          expectedQuantity:
            form.expectedQuantity.trim() ||
            productRequests
              .map((request) => request.quantity)
              .filter(Boolean)
              .join("; "),
          productRequests,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? {});
        setSubmitState("error");
        setSubmitMessage(payload.message ?? "We could not submit this request. Please try again in a moment.");
        return;
      }

      setErrors({});
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setSubmitMessage("We could not reach the server. Please check your connection and try again.");
    }
  };

  const startNewRequest = () => {
    hasValidated.current = false;
    requestCounter.current = 2;
    setForm(initialForm({}, products));
    setErrors({});
    setSubmitMessage("");
    setSubmitState("idle");
    setSpecsOpen(false);
  };

  const errorList = errorFieldOrder.filter((key) => errors[key]);
  const isSubmitting = submitState === "submitting";
  const itemCount = form.productRequests.length;

  if (submitState === "success") {
    return (
      <div className="quote-form quote-form--success" role="status">
        <span className="quote-success__mark" aria-hidden="true">
          <CircleCheck size={26} strokeWidth={1.8} />
        </span>
        <h3>Request received</h3>
        <p>
          Thank you, {form.name.split(" ")[0] || "there"}. Your requirement has reached the Kanak Mouldings team and someone
          will get back to you with product and pricing details.
        </p>
        <button className="quote-form__ghost-button" onClick={startNewRequest} type="button">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" noValidate onSubmit={submit} ref={formRef}>
      <header className="quote-form__intro">
        <p className="quote-form__eyebrow">Request a quote</p>
        <p className="quote-form__lede">
          Share your requirement below. Only the first two fields and one product line are needed to get started.
        </p>
      </header>

      {errorList.length ? (
        <div className="quote-form__alert quote-form__alert--error" role="alert" tabIndex={-1}>
          <CircleAlert aria-hidden="true" size={16} strokeWidth={2.1} />
          <div>
            <strong>Please check {errorList.length === 1 ? "one field" : `${errorList.length} fields`} before sending</strong>
            <ul>
              {errorList.map((key) => (
                <li key={key}>{errors[key]}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {submitMessage ? (
        <div className="quote-form__alert quote-form__alert--error" role="alert">
          <CircleAlert aria-hidden="true" size={16} strokeWidth={2.1} />
          <div>
            <strong>{submitMessage}</strong>
          </div>
        </div>
      ) : null}

      <section className="quote-form__section">
        <div className="quote-form__section-head">
          <span className="quote-form__step" aria-hidden="true">
            1
          </span>
          <div>
            <h3>Your details</h3>
            <p>So we know who to send the quotation to.</p>
          </div>
        </div>
        <div className="quote-form__fields quote-form__fields--two">
          <Field error={errors.name} id="quote-name" label="Full name">
            <input
              aria-describedby={errors.name ? "quote-name-error" : undefined}
              aria-invalid={Boolean(errors.name)}
              autoComplete="name"
              id="quote-name"
              name="name"
              onChange={(event) => update("name", event.target.value)}
              placeholder="Your name"
              type="text"
              value={form.name}
            />
          </Field>
          <Field error={errors.company} id="quote-company" label="Company">
            <input
              aria-describedby={errors.company ? "quote-company-error" : undefined}
              aria-invalid={Boolean(errors.company)}
              autoComplete="organization"
              id="quote-company"
              name="company"
              onChange={(event) => update("company", event.target.value)}
              placeholder="Business or brand name"
              type="text"
              value={form.company}
            />
          </Field>
          <Field
            error={errors.phone}
            hint="Phone or email — whichever suits you."
            id="quote-phone"
            label="Phone"
          >
            <input
              aria-describedby={errors.phone ? "quote-phone-error" : "quote-phone-hint"}
              aria-invalid={Boolean(errors.phone)}
              autoComplete="tel"
              id="quote-phone"
              inputMode="tel"
              name="phone"
              onChange={(event) => update("phone", event.target.value)}
              placeholder="+91 00000 00000"
              type="tel"
              value={form.phone}
            />
          </Field>
          <Field error={errors.email} id="quote-email" label="Email">
            <input
              aria-describedby={errors.email ? "quote-email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              id="quote-email"
              inputMode="email"
              name="email"
              onChange={(event) => update("email", event.target.value)}
              placeholder="you@company.com"
              type="email"
              value={form.email}
            />
          </Field>
        </div>
      </section>

      <section className="quote-form__section" ref={summaryRef}>
        <div className="quote-form__section-head">
          <span className="quote-form__step" aria-hidden="true">
            2
          </span>
          <div>
            <h3>What you need</h3>
            <p>Add a line for every product you would like quoted.</p>
          </div>
          <span className="quote-form__count">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        <div className={errors.containerType ? "quote-form__items quote-form__items--invalid" : "quote-form__items"}>
          {form.productRequests.map((request, index) => {
            const rangeOptions = rangesByCategory[request.category as keyof typeof rangesByCategory] ?? [];
            const availableProducts = products.filter(
              (product) =>
                product.category === request.category && (!request.productRange || product.productRange === request.productRange),
            );

            return (
              <article className="line-item" key={request.id}>
                <div className="line-item__head">
                  <span className="line-item__index">Item {index + 1}</span>
                  <button
                    aria-label={`Remove item ${index + 1}`}
                    className="line-item__remove"
                    onClick={() => removeRequest(request.id)}
                    type="button"
                  >
                    <Trash2 aria-hidden="true" size={14} strokeWidth={1.9} />
                    <span>{itemCount === 1 ? "Clear" : "Remove"}</span>
                  </button>
                </div>
                <div className="line-item__grid">
                  <Field id={`${request.id}-category`} label="Material">
                    <select
                      id={`${request.id}-category`}
                      onChange={(event) => updateRequest(request.id, "category", event.target.value)}
                      value={request.category}
                    >
                      <option value="">Select material</option>
                      {productFilters.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id={`${request.id}-range`} label="Product range">
                    <select
                      disabled={!request.category}
                      id={`${request.id}-range`}
                      onChange={(event) => updateRequest(request.id, "productRange", event.target.value)}
                      value={request.productRange}
                    >
                      <option value="">{request.category ? "Select range" : "Choose a material first"}</option>
                      {rangeOptions.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id={`${request.id}-product`} label="Specific product" optional>
                    <select
                      disabled={!request.category}
                      id={`${request.id}-product`}
                      onChange={(event) => updateRequest(request.id, "product", event.target.value)}
                      value={request.product}
                    >
                      <option value="">Any suitable product</option>
                      {availableProducts.map((product) => (
                        <option key={product.slug} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                      <option value="Custom container configuration">Custom container configuration</option>
                    </select>
                  </Field>
                  <Field id={`${request.id}-quantity`} label="Quantity" optional>
                    <input
                      id={`${request.id}-quantity`}
                      onChange={(event) => updateRequest(request.id, "quantity", event.target.value)}
                      placeholder="e.g. 10,000 pieces"
                      type="text"
                      value={request.quantity}
                    />
                  </Field>
                </div>
                <Field id={`${request.id}-notes`} label="Size, lid or packing notes" optional>
                  <input
                    id={`${request.id}-notes`}
                    onChange={(event) => updateRequest(request.id, "notes", event.target.value)}
                    placeholder="e.g. 250 ml, with lid, printed logo"
                    type="text"
                    value={request.notes}
                  />
                </Field>
              </article>
            );
          })}
        </div>

        {errors.containerType ? (
          <p className="field__message field__message--error" role="alert">
            <CircleAlert aria-hidden="true" size={13} strokeWidth={2.2} />
            {errors.containerType}
          </p>
        ) : null}

        <button className="quote-form__add" onClick={addRequest} type="button">
          <Plus aria-hidden="true" size={15} strokeWidth={2.1} />
          Add another product
        </button>
      </section>

      <section className="quote-form__section">
        <div className="quote-form__section-head">
          <span className="quote-form__step" aria-hidden="true">
            3
          </span>
          <div>
            <h3>Quantity and sizing</h3>
            <p>Helpful if you already know them — skip anything you are unsure about.</p>
          </div>
          <button
            aria-controls="quote-specifications"
            aria-expanded={specsOpen}
            className="quote-form__disclosure"
            onClick={() => setSpecsOpen((open) => !open)}
            type="button"
          >
            {specsOpen ? "Hide" : "Add details"}
            <ChevronDown aria-hidden="true" size={15} strokeWidth={2.1} />
          </button>
        </div>

        {specsOpen ? (
          <div className="quote-form__fields quote-form__fields--three" id="quote-specifications">
            <Field hint="Across all items" id="quote-expected-quantity" label="Total quantity" optional>
              <input
                id="quote-expected-quantity"
                onChange={(event) => update("expectedQuantity", event.target.value)}
                placeholder="e.g. 50,000 pieces / month"
                type="text"
                value={form.expectedQuantity}
              />
            </Field>
            <Field id="quote-capacity" label="Capacity" optional>
              <input
                id="quote-capacity"
                onChange={(event) => update("capacity", event.target.value)}
                placeholder="250 ml, 500 ml"
                type="text"
                value={form.capacity}
              />
            </Field>
            <Field id="quote-compartments" label="Compartments" optional>
              <input
                id="quote-compartments"
                onChange={(event) => update("compartments", event.target.value)}
                placeholder="2, 3, 4"
                type="text"
                value={form.compartments}
              />
            </Field>
          </div>
        ) : null}
      </section>

      <section className="quote-form__section">
        <div className="quote-form__section-head">
          <span className="quote-form__step" aria-hidden="true">
            4
          </span>
          <div>
            <h3>Anything else</h3>
            <p>Timelines, branding, sampling — whatever helps us quote accurately.</p>
          </div>
        </div>
        <Field id="quote-message" label="Message" optional>
          <textarea
            id="quote-message"
            name="message"
            onChange={(event) => update("message", event.target.value)}
            placeholder="Tell us about your packing requirement, timeline or branding needs."
            rows={4}
            value={form.message}
          />
        </Field>
        <label className="quote-form__checkbox" htmlFor="quote-custom-config">
          <input
            checked={form.customConfig}
            id="quote-custom-config"
            onChange={(event) => update("customConfig", event.target.checked)}
            type="checkbox"
          />
          <span>
            <strong>I need a custom container configuration</strong>
            <small>Tick this if an off-the-shelf product will not fit your requirement.</small>
          </span>
        </label>
      </section>

      {selectedProducts.some((product) => product.placeholderSpecification) ? (
        <p className="quote-form__alert quote-form__alert--note">
          <CircleAlert aria-hidden="true" size={16} strokeWidth={2.1} />
          <span>Specifications shown on this site are indicative until confirmed by our production team.</span>
        </p>
      ) : null}

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
              Request quote
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2.1} />
            </>
          )}
        </button>
      </footer>
    </form>
  );
}
