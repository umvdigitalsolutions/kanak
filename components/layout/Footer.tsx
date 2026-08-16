import Link from "next/link";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";

const links = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Gallery", "/gallery"],
  ["About Us", "/about"],
  ["Contact Us", "/contact"],
] as const;

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div>
            <Link className="footer__brand" href="/">
              Kanak Mouldings
            </Link>
            <p>
              Food-grade packaging containers in round, rectangular, black,
              white and transparent formats for food-service businesses.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {links.map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div>
            <p className="footer__label">Quotation Desk</p>
            <p>{company.phone}</p>
            <p>{company.email}</p>
            <p>{company.address}</p>
          </div>
        </div>
        <div className="footer__bottom">
          <p>(c) {new Date().getFullYear()} Kanak Mouldings. Food packaging containers for food-service supply.</p>
          <p>Product range, material grade and order details can be confirmed through the quotation desk.</p>
        </div>
      </Container>
    </footer>
  );
}
