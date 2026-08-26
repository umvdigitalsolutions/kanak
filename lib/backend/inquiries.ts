import type { Collection, ObjectId } from "mongodb";
import { requireDb } from "@/lib/backend/mongodb";

export type InquiryStatus = "new" | "contacted" | "quoted" | "closed";

export type ContactInquiry = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  containerType: string;
  foodType: string;
  expectedQuantity: string;
  capacity: string;
  compartments: string;
  color: string;
  lidRequirement: string;
  productRequests: ProductRequest[];
  customConfig: boolean;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
};

type InquiryDocument = ContactInquiry & {
  _id?: ObjectId;
};

export type ProductRequest = {
  category: string;
  productRange: string;
  product: string;
  quantity: string;
  notes: string;
};

export type InquiryInput = Omit<ContactInquiry, "id" | "status" | "createdAt" | "updatedAt">;

const statuses = new Set<InquiryStatus>(["new", "contacted", "quoted", "closed"]);

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeProductRequests(value: unknown): ProductRequest[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      const source = item && typeof item === "object" ? (item as Partial<ProductRequest>) : {};

      return {
        category: text(source.category),
        productRange: text(source.productRange),
        product: text(source.product),
        quantity: text(source.quantity),
        notes: text(source.notes),
      };
    })
    .filter((item) => item.category || item.productRange || item.product || item.quantity || item.notes);
}

function normalizeInquiry(input: Partial<ContactInquiry>): ContactInquiry {
  const now = new Date().toISOString();

  return {
    id: input.id || `INQ-${Date.now()}`,
    name: text(input.name),
    company: text(input.company),
    phone: text(input.phone),
    email: text(input.email),
    containerType: text(input.containerType),
    foodType: text(input.foodType),
    expectedQuantity: text(input.expectedQuantity),
    capacity: text(input.capacity),
    compartments: text(input.compartments),
    color: text(input.color),
    lidRequirement: text(input.lidRequirement),
    productRequests: normalizeProductRequests(input.productRequests),
    customConfig: Boolean(input.customConfig),
    message: text(input.message),
    status: statuses.has(input.status as InquiryStatus) ? (input.status as InquiryStatus) : "new",
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now,
  };
}

function serializeInquiry(document: InquiryDocument): ContactInquiry {
  const { _id, ...inquiry } = document;
  void _id;
  return normalizeInquiry(inquiry);
}

async function inquiryCollection(): Promise<Collection<InquiryDocument>> {
  const db = await requireDb();
  return db.collection<InquiryDocument>("inquiries");
}

export function validateInquiryInput(input: Partial<InquiryInput>) {
  const inquiry = normalizeInquiry(input);
  const errors: Record<string, string> = {};

  if (!inquiry.name) errors.name = "Name is required.";
  if (!inquiry.company) errors.company = "Company is required.";
  if (!inquiry.phone && !inquiry.email) errors.phone = "Phone or email is required.";
  if (inquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    errors.email = "Enter a valid email.";
  }
  if (!inquiry.containerType && !inquiry.productRequests.length) errors.containerType = "Product category is required.";

  return { inquiry, errors };
}

export async function createInquiry(input: Partial<InquiryInput>) {
  const { inquiry, errors } = validateInquiryInput(input);

  if (Object.keys(errors).length > 0) {
    return { inquiry, errors };
  }

  const collection = await inquiryCollection();
  await collection.insertOne(inquiry);
  return { inquiry, errors: {} };
}

export async function getInquiries() {
  const collection = await inquiryCollection();
  const documents = await collection.find({}).sort({ createdAt: -1 }).limit(100).toArray();
  return documents.map(serializeInquiry);
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  if (!statuses.has(status)) {
    throw new Error("Invalid inquiry status.");
  }

  const collection = await inquiryCollection();
  await collection.updateOne({ id }, { $set: { status, updatedAt: new Date().toISOString() } });
}

export function isInquiryStatus(value: string): value is InquiryStatus {
  return statuses.has(value as InquiryStatus);
}
