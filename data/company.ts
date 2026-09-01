const phoneDigits = "919602848000";

export const company = {
  name: "Kanak Mouldings",
  legalName: "Kanak Mouldings",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanakmoulding.com",
  tagline: "Food grade packaging containers",
  email: "info@kanakmouldings.co.in",
  phone: "+91 96028 48000",
  /** Digits only, for tel: and wa.me links. */
  phoneDigits,
  phoneHref: `tel:+${phoneDigits}`,
  whatsappHref: `https://wa.me/${phoneDigits}`,
  address: "T-9, Industrial Estate, Jodhpur, Rajasthan 342003",
  city: "Jodhpur, Rajasthan",
  description:
    "Food grade packaging containers with airtight lid direction, easy-clean handling and freezer-safe use for cafeterias, family get-togethers, group events and food-service businesses.",
  editNote:
    "Production capacity, material grade and compliance information still need manufacturer verification.",
} as const;
