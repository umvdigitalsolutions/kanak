import type { Metadata } from "next";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Kanak Mouldings and its takeaway food container manufacturing direction, product range and quality approach.",
};

const sections = [
  ["Who We Are", "Kanak Mouldings manufactures food packaging containers for restaurants, cloud kitchens, caterers and food-service buyers."],
  ["What We Make", "The range includes round and rectangular containers in black, white and transparent finishes with matching lid directions."],
  ["How We Work", "Material, shape, lid fit, stackability and packing requirements are discussed before quotation so the product brief is clear."],
  ["Quality Focus", "Product selection is guided by food-contact application, rigid forming, rim consistency and sample approval before supply."],
];

export default function AboutPage() {
  return (
    <section className="page-shell about-page">
      <Container>
        <div className="page-hero">
          <p className="kicker">About Us</p>
          <h1>FOOD PACKAGING MANUFACTURING FOR DELIVERY BRANDS.</h1>
          <p>{company.description}</p>
        </div>
        <div className="about-grid">
          {sections.map(([title, copy]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="page-cta">
          <h2>READY TO DISCUSS A CONTAINER FORMAT?</h2>
          <Button href="/contact" variant="accent">
            Talk To Our Team
          </Button>
        </div>
      </Container>
    </section>
  );
}
