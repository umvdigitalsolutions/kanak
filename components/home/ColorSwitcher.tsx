import { Award, BadgeCheck, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const certificates = [
  { icon: BadgeCheck, label: "Food safety", name: "FSSAI", detail: "Food-grade packaging aligned with responsible food handling requirements." },
  { icon: Award, label: "Quality system", name: "ISO 9001", detail: "A quality-led approach to consistent manufacturing and customer supply." },
  { icon: ShieldCheck, label: "Company compliance", name: "FDI", detail: "A compliant business foundation supporting dependable long-term partnerships." },
];

function CertificateCard({ certificate }: { certificate: (typeof certificates)[number] }) {
  const Icon = certificate.icon;

  return (
    <article className="certificate-card">
      <div className="certificate-card__head">
        <span>Kanak Mouldings</span>
        <span>Certificate</span>
      </div>
      <div className="certificate-card__body">
        <div className="certificate-card__seal">
          <Icon aria-hidden="true" size={31} strokeWidth={1.65} />
          <span>Certified</span>
        </div>
        <div>
          <p className="certificate-card__type">{certificate.label}</p>
          <strong>{certificate.name}</strong>
          <p className="certificate-card__detail">{certificate.detail}</p>
        </div>
      </div>
      <div className="certificate-card__foot">
        <span>Packaging compliance</span>
        <i aria-hidden="true" />
        <span>Kanak Mouldings</span>
      </div>
    </article>
  );
}

export function ColorSwitcher() {
  return (
    <section className="certificate-section">
      <Container className="certificate-section__grid">
        <div>
          <p className="kicker">Certified to deliver</p>
          <h2>
            QUALITY YOU
            <br />
            CAN VERIFY.
          </h2>
          <p>
            Kanak Mouldings builds every partnership on food safety, consistent
            quality and a compliant business foundation.
          </p>
        </div>
        <div className="certificate-section__cards">
          {certificates.map((certificate) => (
            <CertificateCard certificate={certificate} key={certificate.name} />
          ))}
        </div>
      </Container>
    </section>
  );
}
