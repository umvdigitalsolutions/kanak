import { assetPath } from "@/lib/assets";
import { biodegradableProducts } from "@/data/biodegradable-products";

export type ContainerShape = "rectangular" | "round" | "square" | "tray";
export type ContainerColor = "black" | "white" | "clear" | "custom";
export type ProductCategoryName = "Plastic Containers" | "Biodegradables";

export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  productRange?: string;
  shape: ContainerShape;
  shortDescription: string;
  description: string;
  capacity: string;
  sizeOptions: string[];
  dimensions: string;
  colourOptions: string[];
  lidOptions: string[];
  compartments: number[];
  material: string;
  applications: string[];
  features: string[];
  customisation: string;
  specifications?: ProductSpecification[];
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
const roundContainerSizes = ["250 ML", "350 ML", "500 ML", "750 ML", "1000 ML"];
const rectangularContainerSizes = ["500 ML", "650 ML", "750 ML", "1000 ML"];
const clamshellSizes = ["6 Inch", "7 Inch", "8 Inch", "9 Inch"];
const paperBowlSizes = ["250 ML", "350 ML", "500 ML", "750 ML", "1000 ML", "1300 ML"];
const paperBucketSizes = ["500 ML", "750 ML", "1000 ML", "1300 ML"];
const coffeeCupSizes = ["90 ML", "150 ML", "210 ML", "250 ML", "350 ML"];
const carrierSizes = ["2 Cup Carrier", "4 Cup Carrier"];
export const productFilters = [
  "Plastic Containers",
  "Biodegradables",
] as const;

export const primaryProductCategories: ProductCategoryName[] = ["Plastic Containers", "Biodegradables"];
export const plasticProductRanges = ["Plastic Food Containers", "Custom Packaging"] as const;
export const biodegradableProductRanges = [
  "Paper Bowl",
  "Paper Container",
  "Paper Cups",
  "Pizza Box",
  "Food Wrapping Paper",
  "Baking Paper Sheet",
  "Noodle Box",
  "Fries Box",
  "Paper Fast Food Boxes",
  "Paper Food Box With Compartment",
  "Paper Meal Box",
  "Food Tray",
] as const;
export const productRangeOrder = [...plasticProductRanges, ...biodegradableProductRanges] as const;

const baseProducts: Product[] = [
  {
    id: "P-ROUND-BLK",
    slug: "round-container-black",
    name: "Round Container - Black",
    category: "Plastic Containers",
    productRange: "Plastic Food Containers",
    shape: "round",
    shortDescription:
      "A black round food-grade packaging container with a clear, airtight lid direction for takeaway service.",
    description:
      "A round black container from the Kanak Mouldings range, positioned for food-grade packaging with an airtight lid, easy-clean handling and freezer-safe use.",
    capacity: "Capacity range to be confirmed",
    sizeOptions: roundContainerSizes,
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
    productRange: "Plastic Food Containers",
    shape: "round",
    shortDescription:
      "A clean white round packaging container for food-service menus that need a lighter presentation.",
    description:
      "A white round container from the Kanak Mouldings range, made for food-grade packaging with an airtight lid direction, easy-clean handling and freezer-safe use.",
    capacity: "Capacity range to be confirmed",
    sizeOptions: roundContainerSizes,
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
    productRange: "Plastic Food Containers",
    shape: "rectangular",
    shortDescription:
      "A transparent rectangular food container for display-led takeaway, packing and storage workflows.",
    description:
      "A transparent rectangular container from the Kanak Mouldings range, giving packed food clear visibility with easy-clean handling, freezer-safe use and an airtight-lid direction.",
    capacity: "Capacity range to be confirmed",
    sizeOptions: rectangularContainerSizes,
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
    productRange: "Plastic Food Containers",
    shape: "rectangular",
    shortDescription:
      "A black rectangular food-grade packaging container with a clear lid direction for delivery-ready meals.",
    description:
      "A black rectangular container from the Kanak Mouldings range, suited to takeaway meals that need a crisp black-base presentation with an airtight lid direction, easy-clean handling and freezer-safe use.",
    capacity: "Capacity range to be confirmed",
    sizeOptions: rectangularContainerSizes,
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
    productRange: "Custom Packaging",
    shape: "rectangular",
    shortDescription:
      "A quotation path for food-service teams that need a specific shape, capacity, colour or lid direction.",
    description:
      "Share your target use case, food type, colour direction and packing requirement so Kanak Mouldings can confirm feasibility, tooling, MOQ and production details.",
    capacity: "Custom requirement",
    sizeOptions: ["Custom Capacity", "Custom Cavity", "Custom Tooling"],
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
    productRange: "Paper Fast Food Boxes",
    shape: "tray",
    shortDescription:
      "A kraft-style clamshell food box for takeaway meals that need a biodegradable packaging direction.",
    description:
      "A biodegradable clamshell food box direction for restaurants, caterers and cloud kitchens looking for paper-fiber takeaway packaging with a secure closing profile.",
    capacity: "Capacity range to be confirmed",
    sizeOptions: clamshellSizes,
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
    productRange: "Paper Cups",
    shape: "round",
    shortDescription:
      "Biodegradable takeaway coffee cups for cafes, beverage counters and event-service requirements.",
    description:
      "A biodegradable coffee cup direction for hot beverage service, cafe dispatch and branded counter packaging enquiries.",
    capacity: "Cup size range to be confirmed",
    sizeOptions: coffeeCupSizes,
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
  {
    id: "B-PAPER-BOWL-KRAFT",
    slug: "biodegradable-kraft-paper-bowl",
    name: "Biodegradable Kraft Paper Bowl",
    category: "Biodegradables",
    productRange: "Paper Bowl",
    shape: "round",
    shortDescription:
      "A natural kraft paper bowl for soups, rice bowls, desserts and takeaway meals.",
    description:
      "A biodegradable kraft paper bowl direction for restaurants, cloud kitchens, cafes and caterers that need a natural food-service presentation for takeaway meals.",
    capacity: "Capacity range to be confirmed",
    sizeOptions: paperBowlSizes,
    dimensions: pending,
    colourOptions: ["Natural Kraft"],
    lidOptions: ["Lid option on request", "Custom lid direction"],
    compartments: [1],
    material: "Biodegradable kraft paper direction",
    applications: ["Soups", "Rice bowls", "Desserts", "Cafe service", "Takeaway meals"],
    features: ["Natural kraft finish", "Food-service paper construction", "Bulk supply direction", "Custom print discussion"],
    customisation:
      "Capacity, lid direction, print requirement and order quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/product-variants/provided/bio-kraft-paper-bowl.webp"),
    gallery: [assetPath("/images/generated/product-variants/provided/bio-kraft-paper-bowl.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "custom", compartments: 1, lid: false, accent: "empty" },
  },
  {
    id: "B-PAPER-BOWL-SILVER",
    slug: "white-silver-paper-bowl",
    name: "White/Silver Paper Bowl",
    category: "Biodegradables",
    productRange: "Paper Bowl",
    shape: "round",
    shortDescription:
      "A white paper bowl with a lined silver interior direction for clean takeaway presentation.",
    description:
      "A white exterior paper bowl with a lined interior direction for food-service teams that need a neat serving look and practical takeaway packing.",
    capacity: "Capacity range to be confirmed",
    sizeOptions: paperBowlSizes,
    dimensions: pending,
    colourOptions: ["White with Silver Interior"],
    lidOptions: ["Lid option on request", "Custom lid direction"],
    compartments: [1],
    material: "Paper bowl with lined interior direction",
    applications: ["Soups", "Rice bowls", "Desserts", "Cafe service", "Takeaway meals"],
    features: ["Clean white exterior", "Lined interior direction", "Bulk supply direction", "Custom print discussion"],
    customisation:
      "Capacity, lid direction, print requirement and order quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/product-variants/provided/bio-silver-paper-bowl.webp"),
    gallery: [assetPath("/images/generated/product-variants/provided/bio-silver-paper-bowl.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "white", compartments: 1, lid: false, accent: "empty" },
  },
  {
    id: "B-PAPER-BOWL-WHITE",
    slug: "biodegradable-white-paper-bowl",
    name: "Biodegradable White Paper Bowl",
    category: "Biodegradables",
    productRange: "Paper Bowl",
    shape: "round",
    shortDescription:
      "A minimal white paper bowl for cafes, desserts, soups and branded takeaway packaging.",
    description:
      "A biodegradable white paper bowl direction for restaurants, cafes and cloud kitchens that need a clean, neutral presentation for takeaway and counter service.",
    capacity: "Capacity range to be confirmed",
    sizeOptions: paperBowlSizes,
    dimensions: pending,
    colourOptions: ["White"],
    lidOptions: ["Lid option on request", "Custom lid direction"],
    compartments: [1],
    material: "Biodegradable white paper direction",
    applications: ["Soups", "Desserts", "Cafe service", "Takeaway meals", "Branded packaging"],
    features: ["Clean white finish", "Food-service paper construction", "Bulk supply direction", "Custom print discussion"],
    customisation:
      "Capacity, lid direction, print requirement and order quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/product-variants/provided/bio-white-paper-bowl.webp"),
    gallery: [assetPath("/images/generated/product-variants/provided/bio-white-paper-bowl.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "custom", compartments: 1, lid: false, accent: "empty" },
  },
  {
    id: "B-CLEAR-BOWL-LID",
    slug: "transparent-paper-bowl-lid",
    name: "Transparent Paper Bowl Lid",
    category: "Biodegradables",
    productRange: "Paper Bowl",
    shape: "round",
    shortDescription:
      "A clear matching lid direction for paper bowls that need visible, secure takeaway presentation.",
    description:
      "A transparent lid option for paper bowl ranges, useful for cafes, restaurants and delivery kitchens that need clear food visibility with clean closing support.",
    capacity: "Matching bowl size to be confirmed",
    sizeOptions: paperBowlSizes.map((size) => `Fits ${size} Bowl`),
    dimensions: pending,
    colourOptions: ["Transparent"],
    lidOptions: ["Transparent Lid"],
    compartments: [1],
    material: "Transparent lid direction",
    applications: ["Paper bowls", "Soups", "Rice bowls", "Desserts", "Takeaway meals"],
    features: ["Clear food visibility", "Matching bowl direction", "Lid fit discussion", "Bulk supply support"],
    customisation: "Bowl size match, lid fit and order quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/product-variants/provided/bio-clear-bowl-lid.webp"),
    gallery: [assetPath("/images/generated/product-variants/provided/bio-clear-bowl-lid.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "clear", compartments: 1, lid: true, accent: "empty" },
  },
  {
    id: "B-KRAFT-BUCKET-LID",
    slug: "kraft-paper-bucket-with-lid",
    name: "Kraft Paper Bucket with Lid",
    category: "Biodegradables",
    productRange: "Paper Container",
    shape: "round",
    shortDescription:
      "A kraft paper bucket with matching lid direction for soups, noodles, rice bowls and takeaway meals.",
    description:
      "A natural kraft paper bucket format for food-service brands that need a deeper round pack, matched lid direction and a warm biodegradable presentation for delivery menus.",
    capacity: "Bucket size range to be confirmed",
    sizeOptions: paperBucketSizes,
    dimensions: pending,
    colourOptions: ["Natural Kraft"],
    lidOptions: ["Matching Paper Lid", "Vented Lid Direction"],
    compartments: [1],
    material: "Biodegradable kraft paper bucket direction",
    applications: ["Soups", "Noodles", "Rice bowls", "Family meal packs", "Takeaway meals"],
    features: ["Deep bucket format", "Matching lid direction", "Natural kraft finish", "Bulk supply support"],
    customisation: "Bucket size, lid fit, vent direction, print artwork and order quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/product-variants/provided/bio-kraft-paper-bucket-lid.webp"),
    gallery: [assetPath("/images/generated/product-variants/provided/bio-kraft-paper-bucket-lid.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "custom", compartments: 1, lid: true, accent: "empty" },
  },
  {
    id: "B-SILVER-BUCKET-LID",
    slug: "white-silver-paper-bucket-with-lid",
    name: "White/Silver Paper Bucket with Lid",
    category: "Biodegradables",
    productRange: "Paper Container",
    shape: "round",
    shortDescription:
      "A white paper bucket with lined silver interior direction and matching lid for clean takeaway packing.",
    description:
      "A white paper bucket direction with lined interior finish for restaurants and delivery kitchens that need neat presentation, lid support and dependable food-service handling.",
    capacity: "Bucket size range to be confirmed",
    sizeOptions: paperBucketSizes,
    dimensions: pending,
    colourOptions: ["White with Silver Interior"],
    lidOptions: ["Matching Paper Lid", "Vented Lid Direction"],
    compartments: [1],
    material: "Paper bucket with lined interior direction",
    applications: ["Hot meals", "Soups", "Rice bowls", "Noodles", "Cafe takeaway"],
    features: ["Lined interior direction", "Clean white exterior", "Matching lid direction", "Bulk supply support"],
    customisation: "Bucket size, interior lining direction, lid fit, print artwork and order quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/product-variants/provided/bio-silver-paper-bucket-lid.webp"),
    gallery: [assetPath("/images/generated/product-variants/provided/bio-silver-paper-bucket-lid.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "white", compartments: 1, lid: true, accent: "empty" },
  },
  {
    id: "B-WHITE-BUCKET-LID",
    slug: "white-paper-bucket-with-lid",
    name: "White Paper Bucket with Lid",
    category: "Biodegradables",
    productRange: "Paper Container",
    shape: "round",
    shortDescription:
      "A minimal white paper bucket with lid direction for branded takeaway and delivery packaging.",
    description:
      "A white paper bucket format for cafes, QSR teams and cloud kitchens that want a clean surface for branding, practical lid pairing and daily delivery packing.",
    capacity: "Bucket size range to be confirmed",
    sizeOptions: paperBucketSizes,
    dimensions: pending,
    colourOptions: ["White"],
    lidOptions: ["Matching Paper Lid", "Vented Lid Direction"],
    compartments: [1],
    material: "Biodegradable white paper bucket direction",
    applications: ["Soups", "Rice bowls", "Noodles", "Desserts", "Branded takeaway"],
    features: ["Clean white finish", "Matching lid direction", "Branding discussion", "Bulk supply support"],
    customisation: "Bucket size, lid fit, print artwork and order quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/product-variants/provided/bio-white-paper-bucket-lid.webp"),
    gallery: [assetPath("/images/generated/product-variants/provided/bio-white-paper-bucket-lid.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "white", compartments: 1, lid: true, accent: "empty" },
  },
  {
    id: "B-KRAFT-BEVERAGE-CARRIER",
    slug: "kraft-beverage-carrier",
    name: "Kraft Beverage Carrier",
    category: "Biodegradables",
    productRange: "Paper Cups",
    shape: "tray",
    shortDescription:
      "A kraft beverage carrier direction for multi-cup takeaway, cafe dispatch and event-service orders.",
    description:
      "A kraft beverage carrier format for cafes and food-service teams that need stable multi-cup handling, dispatch-friendly stacking and a natural paper-fiber presentation.",
    capacity: "Carrier slot count to be confirmed",
    sizeOptions: carrierSizes,
    dimensions: pending,
    colourOptions: ["Natural Kraft"],
    lidOptions: ["Open Carrier"],
    compartments: [2, 4],
    material: "Biodegradable kraft paper carrier direction",
    applications: ["Coffee counters", "Tea service", "Cafe takeaway", "Events", "Beverage delivery"],
    features: ["Multi-cup handling", "Kraft paper construction", "Dispatch support", "Bulk supply discussion"],
    customisation: "Slot count, board grade, branding direction and order quantity can be confirmed during quotation.",
    image: assetPath("/images/generated/product-variants/provided/bio-kraft-beverage-carrier.webp"),
    gallery: [assetPath("/images/generated/product-variants/provided/bio-kraft-beverage-carrier.webp")],
    featured: true,
    placeholderSpecification: true,
    visual: { baseColor: "custom", compartments: 4, lid: false, accent: "empty" },
  },
];

export const products: Product[] = [...baseProducts, ...biodegradableProducts];

export const featuredProducts = products.filter((product) => product.featured);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function productsByFilter(filter: string, sourceProducts: Product[] = products) {
  if (primaryProductCategories.includes(filter as ProductCategoryName)) {
    return sourceProducts.filter((product) => product.category === filter);
  }

  return sourceProducts.filter((product) => product.productRange === filter);
}
