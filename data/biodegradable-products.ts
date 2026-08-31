import catalog from "@/data/biodegradable-product-catalog.json";
import { assetPath } from "@/lib/assets";
import type { ContainerColor, ContainerShape, Product, ProductSpecification } from "@/data/products";

type CatalogRow = {
  catalogId: number;
  name: string;
  slug: string;
  image: string;
  unit: string;
  category: string;
  parentCategory: string;
  categorySlug: string;
  specifications: ProductSpecification[];
};

const variantImageBase = "/images/products/biodegradable-variants";
const pending = "Specification pending";

function includesAny(value: string, needles: string[]) {
  const lower = value.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

function rowText(row: CatalogRow) {
  return [row.name, row.category, row.parentCategory, row.categorySlug].join(" ").toLowerCase();
}

function specificationValue(row: CatalogRow, labels: string[]) {
  const normalizedLabels = labels.map((label) => label.toLowerCase());
  return row.specifications.find((item) => normalizedLabels.includes(item.label.toLowerCase()))?.value?.trim() ?? "";
}

function inferShape(row: CatalogRow): ContainerShape {
  const specification = specificationValue(row, ["Shape"]).toLowerCase();
  if (specification.includes("round")) return "round";
  if (specification.includes("square")) return "square";
  if (specification.includes("tray")) return "tray";

  const text = rowText(row);
  if (includesAny(text, ["tray", "fries", "french fries", "boat", "cone", "sleeve"])) return "tray";
  if (includesAny(text, ["cup", "bowl", "container", "lid", "round"])) return "round";
  if (text.includes("square")) return "square";
  return "rectangular";
}

function inferProductRange(row: CatalogRow) {
  const text = rowText(row);

  if (text.includes("paper bowl")) return "Paper Bowl";
  if (text.includes("paper container")) return "Paper Container";
  if (text.includes("paper cup") || text.includes("tea coaster") || text.includes("beverage")) return "Paper Cups";
  if (text.includes("pizza box")) return "Pizza Box";
  if (text.includes("wrapping paper")) return "Food Wrapping Paper";
  if (text.includes("bake oven") || text.includes("baking paper")) return "Baking Paper Sheet";
  if (text.includes("noodle") || text.includes("wok box")) return "Noodle Box";
  if (text.includes("fries") || text.includes("french fries")) return "Fries Box";
  if (text.includes("fast food")) return "Paper Fast Food Boxes";
  if (text.includes("compartment")) return "Paper Food Box With Compartment";
  if (text.includes("meal box")) return "Paper Meal Box";
  if (text.includes("food tray")) return "Food Tray";

  return "Paper Packaging";
}

function inferBaseColor(row: CatalogRow): ContainerColor {
  const text = `${row.name} ${specificationValue(row, ["Colour", "Color"])}`.toLowerCase();
  if (includesAny(text, ["transparent", "clear lid"])) return "clear";
  if (text.includes("black")) return "black";
  if (text.includes("white")) return "white";
  return "custom";
}

function inferColourOptions(row: CatalogRow) {
  const specified = specificationValue(row, ["Colour", "Color"]);
  if (specified) return specified.split(/,|\//).map((value) => value.trim()).filter(Boolean);

  const options = new Set<string>();
  const text = row.name.toLowerCase();
  const colourWords = [
    ["transparent", "Transparent"],
    ["black", "Black"],
    ["white", "White"],
    ["brown", "Brown Kraft"],
    ["kraft", "Natural Kraft"],
    ["orange", "Orange"],
    ["red", "Red"],
    ["blue", "Blue"],
    ["green", "Green"],
    ["yellow", "Yellow"],
    ["pink", "Pink"],
    ["magenta", "Magenta"],
    ["silver", "Silver"],
  ];

  for (const [needle, label] of colourWords) {
    if (text.includes(needle)) options.add(label);
  }

  return options.size ? Array.from(options) : ["Natural Kraft"];
}

function inferSize(name: string) {
  const patterns = [
    /\b\d+(?:\.\d+)?\s*(?:ml|ltr|liter|litre)\b/i,
    /\b\d+(?:\.\d+)?\s*oz\b/i,
    /\b\d+(?:\.\d+)?\s*inch\b/i,
    /\b\d+(?:\.\d+)?\s*[xX]\s*\d+(?:\.\d+)?(?:\s*[xX]\s*\d+(?:\.\d+)?)?\s*(?:inch|cm|mm)?\b/i,
    /\b\d+\s*(?:gsm|pcs|piece)\b/i,
  ];

  for (const pattern of patterns) {
    const match = name.match(pattern);
    if (match) {
      return match[0]
        .replace(/\s+/g, " ")
        .replace(/ml/i, "ML")
        .replace(/oz/i, "Oz")
        .replace(/ltr|liter|litre/i, "Ltr")
        .replace(/inch/i, "Inch")
        .trim();
    }
  }

  return "Size on request";
}

function inferDimensions(row: CatalogRow) {
  const specified = row.specifications.find((item) => /dimension|box size|paper size|sheet size/i.test(item.label))?.value;
  if (specified) return specified;

  const dimension = row.name.match(/\b\d+(?:\.\d+)?\s*[xX]\s*\d+(?:\.\d+)?(?:\s*[xX]\s*\d+(?:\.\d+)?)?\s*(?:inch|cm|mm)?\b/i);
  if (dimension) return dimension[0].replace(/\s+/g, " ").replace(/inch/i, "Inch").trim();

  const inch = row.name.match(/\b\d+(?:\.\d+)?\s*inch\b/i);
  return inch ? inch[0].replace(/inch/i, "Inch") : pending;
}

function inferCapacity(name: string) {
  const capacity = name.match(/\b\d+(?:\.\d+)?\s*(?:ml|ltr|liter|litre|oz)\b/i);
  return capacity
    ? capacity[0].replace(/ml/i, "ML").replace(/oz/i, "Oz").replace(/ltr|liter|litre/i, "Ltr")
    : "Size-specific variant";
}

function inferLidOptions(row: CatalogRow) {
  const text = rowText(row);
  if (text.includes("lid")) return [text.includes("transparent") ? "Transparent Lid" : "Matching Lid"];
  if (includesAny(text, ["pizza", "meal box", "food box", "noodle", "container"])) return ["Integrated Fold Closure"];
  if (text.includes("cup")) return ["Compatible Lid on Request"];
  return ["Open Format"];
}

function inferMaterial(row: CatalogRow) {
  const specified = specificationValue(row, ["Material", "Paper Material"]);
  if (specified) return specified;

  const text = rowText(row);
  if (includesAny(text, ["aluminium", "foil"])) return "Aluminium foil laminated paper";
  if (includesAny(text, ["corrugated", "3 ply", "pizza"])) return "3-ply corrugated paper";
  if (includesAny(text, ["baking", "silicone"])) return "Silicone-coated baking paper";
  if (includesAny(text, ["wrapping", "wrap"])) return "Food wrapping paper";
  if (includesAny(text, ["kraft", "brown"])) return "Food-grade kraft paper";
  if (text.includes("white")) return "Food-grade white paper";
  return "Food-service paper";
}

function inferApplications(row: CatalogRow) {
  const specified = specificationValue(row, ["Usage/ Applications", "Usage/Application", "Usage", "Applications"]);
  if (specified) {
    return specified
      .replace(/\.$/, "")
      .split(/,|\//)
      .map((value) => value.trim())
      .filter(Boolean);
  }

  const text = rowText(row);
  if (text.includes("pizza")) return ["Pizza delivery", "Garlic bread", "Bakery items", "Takeaway counters"];
  if (text.includes("cup")) return ["Tea service", "Coffee counters", "Beverages", "Events"];
  if (text.includes("bowl")) return ["Soups", "Rice bowls", "Salads", "Desserts"];
  if (text.includes("noodle")) return ["Noodles", "Wok meals", "Asian takeaway", "Food delivery"];
  if (text.includes("fries")) return ["French fries", "Snacks", "QSR counters", "Food festivals"];
  if (text.includes("wrapping")) return ["Burgers", "Sandwiches", "Rolls", "Bakery packing"];
  if (text.includes("baking")) return ["Bakery preparation", "Oven trays", "Cake tins", "Food preparation"];
  if (text.includes("tray")) return ["Snacks", "Fries", "Nachos", "Catering counters"];
  if (text.includes("meal")) return ["Lunch delivery", "Full meals", "Restaurant takeaway", "Catering"];
  return ["Restaurants", "Cloud kitchens", "Caterers", "Takeaway counters"];
}

function inferCompartments(name: string) {
  const match = name.match(/\b([2-6])\s*compartment/i);
  return [match ? Number(match[1]) : 1];
}

function inferAccent(row: CatalogRow): Product["visual"]["accent"] {
  const text = rowText(row);
  if (includesAny(text, ["rice", "meal", "biryani", "container"])) return "rice";
  if (includesAny(text, ["noodle", "wok"])) return "noodles";
  if (includesAny(text, ["salad", "bowl", "tray"])) return "salad";
  if (includesAny(text, ["cup", "dessert", "cake", "bakery"])) return "dessert";
  return "empty";
}

export const biodegradableProducts: Product[] = (catalog as CatalogRow[]).map((row, index) => {
  const image = assetPath(`${variantImageBase}/${row.image}`);
  const shape = inferShape(row);
  const material = inferMaterial(row);
  const applications = inferApplications(row);
  const compartments = inferCompartments(row.name);
  const lidOptions = inferLidOptions(row);
  const applicationSummary = applications.slice(0, 3).join(", ").toLowerCase();

  return {
    id: `KM-BIO-${row.catalogId}`,
    slug: row.slug,
    name: row.name,
    category: "Biodegradables",
    productRange: inferProductRange(row),
    shape,
    shortDescription: `${row.name} is a ${material.toLowerCase()} format for ${applicationSummary}.`,
    description: `${row.name} is part of the Kanak Mouldings biodegradable packaging range. Its ${material.toLowerCase()} construction is suited to ${applicationSummary}, with size, print and bulk order requirements confirmed during quotation.`,
    capacity: inferCapacity(row.name),
    sizeOptions: [inferSize(row.name)],
    dimensions: inferDimensions(row),
    colourOptions: inferColourOptions(row),
    lidOptions,
    compartments,
    material,
    applications,
    features: [
      "Food-service paper packaging",
      "Bulk supply enquiry support",
      "Custom printing discussion",
    ],
    customisation: "Size, colour, print artwork, closure pairing and order quantity can be confirmed during quotation.",
    specifications: row.specifications,
    image,
    gallery: [image],
    featured: false,
    isPublished: true,
    order: 1000 + index,
    placeholderSpecification: row.specifications.length === 0,
    visual: {
      baseColor: inferBaseColor(row),
      compartments: compartments[0],
      lid: lidOptions.every((option) => option !== "Open Format"),
      accent: inferAccent(row),
    },
  };
});
