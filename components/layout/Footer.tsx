import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

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
            <ul className="footer__contact">
              <li>
                <Phone aria-hidden="true" size={15} strokeWidth={1.8} />
                <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <WhatsAppIcon size={15} />
                <a href={company.whatsappHref} rel="noopener noreferrer" target="_blank">
                  WhatsApp us
                </a>
              </li>
              <li>
                <Mail aria-hidden="true" size={15} strokeWidth={1.8} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <MapPin aria-hidden="true" size={15} strokeWidth={1.8} />
                <span>{company.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__legal">
            <p>(c) {new Date().getFullYear()} Kanak Mouldings. Food packaging containers for food-service supply.</p>
            <p>Product range, material grade and order details can be confirmed through the quotation desk.</p>
          </div>
          <a
            aria-label="Developed by UMV Digital Solutions"
            className="footer__credit"
            href="https://umvdigitalsolutions.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Developed by</span>
            <Image
              alt="UMV Digital Solutions"
              height={53}
              src="/images/umv-digital-solutions-transparent.png"
              width={120}
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
