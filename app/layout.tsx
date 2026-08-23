import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { company } from "@/data/company";
import { assetPath } from "@/lib/assets";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/animation/ScrollProgress";
import { SmoothScroll } from "@/components/animation/SmoothScroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Takeaway Food Containers | Food Packaging Manufacturer",
    template: "%s | Kanak Mouldings",
  },
  description:
    "Food grade packaging containers from Kanak Mouldings for cafeterias, events, restaurants and food-service businesses. Explore round, rectangular, black, white and transparent containers.",
  openGraph: {
    title: "Takeaway Food Containers | Food Packaging Manufacturer",
    description:
      "Explore Kanak Mouldings round, rectangular, black, white and transparent food packaging containers.",
    images: [assetPath("/images/generated/cinematic-noodle-container.png")],
    siteName: "Kanak Mouldings",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.description,
  };

  return (
    <html className={`${manrope.variable} ${geistMono.variable}`} lang="en-IN">
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          suppressHydrationWarning
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
