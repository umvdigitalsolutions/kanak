import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm, type ContactInitialValues } from "@/components/forms/ContactForm";
import { toSingleValue } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Kanak Mouldings for B2B food packaging container requirements, product details and quotation support.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: Props) {
  const query = await searchParams;
  const initialValues: ContactInitialValues = {
    product: toSingleValue(query.product),
    shape: toSingleValue(query.shape),
    size: toSingleValue(query.size),
    color: toSingleValue(query.color),
    lid: toSingleValue(query.lid),
    compartments: toSingleValue(query.compartments),
    application: toSingleValue(query.application),
    foodType: toSingleValue(query.foodType),
    quantity: toSingleValue(query.quantity),
  };

  return (
    <section className="page-shell contact-page">
      <Container>
        <div className="contact-page__grid">
          <SectionHeading
            kicker="Contact Us"
            title={"TELL US WHAT\nYOU NEED TO PACK."}
            copy="Share your container direction, food type and expected quantity so the team can respond with the right product and quotation details."
          />
          <ContactForm initialValues={initialValues} />
        </div>
      </Container>
    </section>
  );
}
