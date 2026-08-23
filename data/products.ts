import { assetPath } from "@/lib/assets";

export type ContainerShape = "rectangular" | "round" | "square" | "tray";
export type ContainerColor = "black" | "white" | "clear" | "custom";
export type ProductCategoryName = "Plastic Containers" | "Biodegradables";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shape: ContainerShape;
  shortDescription: string;
  description: string;
  capacity: string;
  dimensions: string;
  colourOptions: string[];
  lidOptions: string[];
  compartments: number[];
  material: string;
  applications: string[];
  features: string[];
  customisation: string;
  image: string | null;
  gallery: string[];
  featured: boolean;
  isPublished?: boolean;
  order?: number;
  placeholderSpecification: boolean;
  createdAt?: string;
  updatedAt?: string;
  visual: {
    baseColor: ContainerColor;
    compartments: number;
    lid: boolean;
    accent: "rice" | "curry" | "noodles" | "dessert" | "salad" | "empty";
  };
};

const pending = "Specification pending";
const confirm = "Confirm with manufacturer";

export const productFilters = [
  "All",
  "Plastic Containers",
  "Biodegradables",
  "Round",
  "Rectangular",
  "Black",
  "White",
  "Transparent",
  "Custom",
] as const;

export const primaryProductCategories: ProductCategoryName[] = ["Plastic Containers", "Biodegradables"];

export const products: Product[] = [
  {
    id: "P-ROUND-BLK",
    slug: "round-container-black",
    name: "Round Container - Black",
    category: "Plastic Containers",
    shape: "round",
    shortDescription:
      "A black round food-grade packaging container with a clear, airtight lid direction for takeaway service.",
    description:
      "A round black container from the Kanak Mouldings range, positioned for food-grade packaging with an airtight lid, easy-clean handling and freezer-safe use.",
    capacity: "Capacity range to be confirmed",
    dimensions: pending,
    colourOptions: ["Black"],
    lidOptions: ["Clear Lid", "Airtight Lid"],
    compartments: [1],
    material: confirm,
    applications: ["Cafeterias", "Family get-togethers", "Group events", "Curries", "Rice bowls"],
    features: [
      "Food-grade packaging container",
      "Airtight lid direction",
      "Easy-clean container form",
      "Freezer-safe use",
      "Protective packing for shipping and handling",
    ],
    customisation: "Capacity, lid fit and packing quantity can be confirmed during quotation.",
    image: assetPath("/images/products/kanak/round-container-black.png"),
    gallery: [assetPath("/images/products/kanak/round-container-black.png")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "black", compartments: 1, lid: true, accent: "curry" },
  },
  {
    id: "P-ROUND-WHT",
    slug: "round-container-white",
    name: "Round Container - White",
    category: "Plastic Containers",
    shape: "round",
    shortDescription:
      "A clean white round packaging container for food-service menus that need a lighter presentation.",
    description:
      "A white round container from the Kanak Mouldings range, made for food-grade packaging with an airtight lid direction, easy-clean handling and freezer-safe use.",
    capacity: "Capacity range to be confirmed",
    dimensions: pending,
    colourOptions: ["White"],
    lidOptions: ["Clear Lid", "Airtight Lid"],
    compartments: [1],
    material: confirm,
    applications: ["Cafeterias", "Family get-togethers", "Group events", "Sweets", "Cafe meals"],
    features: [
      "Food-grade packaging container",
      "Airtight lid direction",
      "Clean white base presentation",
      "Freezer-safe use",
      "Protective packing for shipping and handling",
    ],
    customisation: "Capacity, lid fit and packing quantity can be confirmed during quotation.",
    image: assetPath("/images/products/kanak/round-container-white.png"),
    gallery: [assetPath("/images/products/kanak/round-container-white.png")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "white", compartments: 1, lid: true, accent: "dessert" },
  },
  {
    id: "P-RECT-CLR",
    slug: "rectangle-container-transparent",
    name: "Rectangle Container - Transparent",
    category: "Plastic Containers",
    shape: "rectangular",
    shortDescription:
      "A transparent rectangular food container for display-led takeaway, packing and storage workflows.",
    description:
      "A transparent rectangular container from the Kanak Mouldings range, giving packed food clear visibility with easy-clean handling, freezer-safe use and an airtight-lid direction.",
    capacity: "Capacity range to be confirmed",
    dimensions: pending,
    colourOptions: ["Transparent"],
    lidOptions: ["Transparent Lid", "Airtight Lid"],
    compartments: [1],
    material: confirm,
    applications: ["Cafeterias", "Family get-togethers", "Group events", "Salads", "Display counters"],
    features: [
      "Food-grade packaging container",
      "Transparent food visibility",
      "Airtight lid direction",
      "Freezer-safe use",
      "Protective packing for shipping and handling",
    ],
    customisation: "Capacity, lid fit and packing quantity can be confirmed during quotation.",
    image: assetPath("/images/products/kanak/rectangle-container-transparent.png"),
    gallery: [assetPath("/images/products/kanak/rectangle-container-transparent.png")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "clear", compartments: 1, lid: true, accent: "salad" },
  },
  {
    id: "P-RECT-BLK",
    slug: "rectangle-container-black",
    name: "Rectangle Container - Black",
    category: "Plastic Containers",
    shape: "rectangular",
    shortDescription:
      "A black rectangular food-grade packaging container with a clear lid direction for delivery-ready meals.",
    description:
      "A black rectangular container from the Kanak Mouldings range, suited to takeaway meals that need a crisp black-base presentation with an airtight lid direction, easy-clean handling and freezer-safe use.",
    capacity: "Capacity range to be confirmed",
    dimensions: pending,
    colourOptions: ["Black"],
    lidOptions: ["Clear Lid", "Airtight Lid"],
    compartments: [1],
    material: confirm,
    applications: ["Cafeterias", "Family get-togethers", "Group events", "Food delivery", "Takeaway packing"],
    features: [
      "Food-grade packaging container",
      "Black base presentation",
      "Airtight lid direction",
      "Easy-clean container form",
      "Protective packing for shipping and handling",
    ],
    customisation: "Capacity, lid fit and packing quantity can be confirmed during quotation.",
    image: assetPath("/images/products/kanak/rectangle-container-black.png"),
    gallery: [assetPath("/images/products/kanak/rectangle-container-black.png")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "black", compartments: 1, lid: true, accent: "empty" },
  },
  {
    id: "P-CUSTOM",
    slug: "custom-food-packaging-container",
    name: "Custom Food Packaging Container",
    category: "Plastic Containers",
    shape: "rectangular",
    shortDescription:
      "A quotation path for food-service teams that need a specific shape, capacity, colour or lid direction.",
    description:
      "Share your target use case, food type, colour direction and packing requirement so Kanak Mouldings can confirm feasibility, tooling, MOQ and production details.",
    capacity: "Custom requirement",
    dimensions: "Custom requirement",
    colourOptions: ["Black", "White", "Transparent", "Custom"],
    lidOptions: ["Clear Lid", "Airtight Lid", "Matching Lid"],
    compartments: [1, 2, 3, 4],
    material: confirm,
    applications: ["Restaurants", "Cloud kitchens", "QSR chains", "Caterers", "Institutional catering"],
    features: ["Shape direction", "Colour direction", "Lid direction", "Packing quantity discussion"],
    customisation: "Share the required shape, capacity, colour, lid direction and order quantity through the contact form.",
    image: null,
    gallery: [],
    featured: false,
    placeholderSpecification: true,
    visual: { baseColor: "custom", compartments: 3, lid: true, accent: "rice" },
  },
  {
    id: "B-CLAM-BOX",
    slug: "biodegradable-clamshell-box",
    name: "Biodegradable Clamshell Box",
    category: "Biodegradables",
    shape: "tray",
    shortDescription:
      "A kraft-style clamshell food box for takeaway meals that need a biodegradable packaging direction.",
    description:
      "A biodegradable clamshell food box direction for restaurants, caterers and cloud kitchens looking for paper-fiber takeaway packaging with a secure closing profile.",
    capacity: "Capacity range to be confirmed",
    dimensions: pending,
    colourOptions: ["Natural Kraft"],
    lidOptions: ["Attached Lid", "Fold-lock Closure"],
    compartments: [1],
    material: "Biodegradable paper-fiber direction",
    applications: ["Takeaway meals", "Bakery items", "Cafe meals", "Catering packs"],
    features: [
      "Biodegradable packaging direction",
      "Fold-lock lid profile",
      "Stackable for dispatch",
      "Food-service presentation",
    ],
    customisation: "Size, GSM, print direction and order quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/hero-real-float/biodegradable-empty-clamshell.webp"),
    gallery: [assetPath("/images/generated/container-carousel/biodegradable-clamshell.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "custom", compartments: 1, lid: true, accent: "empty" },
  },
  {
    id: "B-COFFEE-CUP",
    slug: "biodegradable-coffee-cups",
    name: "Biodegradable Coffee Cups",
    category: "Biodegradables",
    shape: "round",
    shortDescription:
      "Biodegradable takeaway coffee cups for cafes, beverage counters and event-service requirements.",
    description:
      "A biodegradable coffee cup direction for hot beverage service, cafe dispatch and branded counter packaging enquiries.",
    capacity: "Cup size range to be confirmed",
    dimensions: pending,
    colourOptions: ["Natural", "White", "Custom Print"],
    lidOptions: ["Sip Lid", "Matching Lid"],
    compartments: [1],
    material: "Biodegradable paper-cup direction",
    applications: ["Coffee counters", "Tea service", "Events", "Cafe takeaway"],
    features: ["Hot beverage packaging direction", "Branding discussion", "Lid option support", "Bulk supply enquiry"],
    customisation: "Cup size, lid type, print artwork and quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/hero-real-float/biodegradable-coffee-cups.webp"),
    gallery: [assetPath("/images/generated/container-carousel/biodegradable-coffee-cups.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "custom", compartments: 1, lid: true, accent: "empty" },
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function productsByFilter(filter: string, sourceProducts: Product[] = products) {
  if (filter === "All") {
    return sourceProducts;
  }

  if (primaryProductCategories.includes(filter as ProductCategoryName)) {
    return sourceProducts.filter((product) => product.category === filter);
  }

  if (filter === "Round") {
    return sourceProducts.filter((product) => product.shape === "round");
  }

  if (filter === "Rectangular") {
    return sourceProducts.filter((product) => product.shape === "rectangular" || product.shape === "tray");
  }

  if (filter === "Black") {
    return sourceProducts.filter((product) => product.colourOptions.includes("Black") || product.visual.baseColor === "black");
  }

  if (filter === "White") {
    return sourceProducts.filter((product) => product.colourOptions.includes("White") || product.visual.baseColor === "white");
  }

  if (filter === "Transparent") {
    return sourceProducts.filter((product) => product.colourOptions.includes("Transparent") || product.visual.baseColor === "clear");
  }

  if (filter === "Custom") {
    return sourceProducts.filter(
      (product) => product.visual.baseColor === "custom" || product.colourOptions.some((option) => option.toLowerCase().includes("custom")),
    );
  }

  return sourceProducts.filter((product) => product.category === filter);
}
