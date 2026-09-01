import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { company } from "@/data/company";
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
          <div>
            <SectionHeading
              kicker="Contact Us"
              title={"TELL US WHAT\nYOU NEED TO PACK."}
              copy="Share your container direction, food type and expected quantity so the team can respond with the right product and quotation details."
            />
            <ul className="contact-direct">
              <li>
                <a href={company.phoneHref}>
                  <span className="contact-direct__icon">
                    <Phone aria-hidden="true" size={17} strokeWidth={1.9} />
                  </span>
                  <span>
                    <strong>Call us</strong>
                    <small>{company.phone}</small>
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="contact-direct--whatsapp"
                  href={company.whatsappHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="contact-direct__icon">
                    <WhatsAppIcon size={17} />
                  </span>
                  <span>
                    <strong>WhatsApp</strong>
                    <small>Chat with the team</small>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`}>
                  <span className="contact-direct__icon">
                    <Mail aria-hidden="true" size={17} strokeWidth={1.9} />
                  </span>
                  <span>
                    <strong>Email</strong>
                    <small>{company.email}</small>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <ContactForm initialValues={{}} products={products} />
        </div>
      </Container>
    </section>
  );
}
