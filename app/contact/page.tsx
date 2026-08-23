import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { getProducts } from "@/lib/backend/products";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Kanak Mouldings for B2B food packaging container requirements, product details and quotation support.",
};

export default async function ContactPage() {
  const products = await getProducts();

  return (
    <section className="page-shell contact-page">
      <Container>
        <div className="contact-page__grid">
          <SectionHeading
            kicker="Contact Us"
            title={"TELL US WHAT\nYOU NEED TO PACK."}
            copy="Share your container direction, food type and expected quantity so the team can respond with the right product and quotation details."
          />
          <ContactForm initialValues={{}} products={products} />
        </div>
      </Container>
    </section>
  );
}
