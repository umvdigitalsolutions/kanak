import type { Collection, ObjectId } from "mongodb";
import {
  defaultContainerSlides,
  defaultHomeHero,
  defaultSiteSettings,
  type HomeCarouselSlide,
  type HomeHeroSettings,
  type SiteSettings,
} from "@/data/site";
import { assetPath } from "@/lib/assets";
import { logBackendError } from "@/lib/backend/errors";
import { toSlug } from "@/lib/backend/form";
import { getOptionalDb, requireDb } from "@/lib/backend/mongodb";

type SiteSettingsDocument = SiteSettings & {
  _id?: ObjectId;
};

export type HomeHeroInput = Partial<HomeHeroSettings>;
export type HomeCarouselSlideInput = Partial<HomeCarouselSlide>;

function normalizeStringArray(value: unknown, fallback: string[] = []) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return fallback;
}

function normalizeMedia(value: unknown, fallback: string) {
  const media = typeof value === "string" ? value.trim() : "";
  return media ? assetPath(media) : fallback;
}

export function normalizeHomeHero(input: HomeHeroInput = {}): HomeHeroSettings {
  const mediaType = input.mediaType === "image" ? "image" : "video";

  return {
    kicker: String(input.kicker || defaultHomeHero.kicker).trim(),
    title: String(input.title || defaultHomeHero.title).trim(),
    copy: String(input.copy || defaultHomeHero.copy).trim(),
    primaryLabel: String(input.primaryLabel || defaultHomeHero.primaryLabel).trim(),
    primaryHref: String(input.primaryHref || defaultHomeHero.primaryHref).trim(),
    secondaryLabel: String(input.secondaryLabel || defaultHomeHero.secondaryLabel).trim(),
    secondaryHref: String(input.secondaryHref || defaultHomeHero.secondaryHref).trim(),
    mediaType,
    mediaSrc: normalizeMedia(input.mediaSrc, defaultHomeHero.mediaSrc),
    posterSrc: normalizeMedia(input.posterSrc, defaultHomeHero.posterSrc),
    specs: normalizeStringArray(input.specs, defaultHomeHero.specs),
  };
}

export function normalizeCarouselSlide(input: HomeCarouselSlideInput): HomeCarouselSlide {
  const title = String(input.title || "").trim();
  const id = toSlug(String(input.id || title));

  if (!title) {
    throw new Error("Slide title is required.");
  }

  if (!id) {
    throw new Error("Slide ID is required.");
  }

  return {
    id,
    title,
    badge: String(input.badge || title).trim(),
    copy: String(input.copy || "").trim(),
    material: String(input.material || "").trim(),
    bestFor: String(input.bestFor || "").trim(),
    specs: normalizeStringArray(input.specs),
    image: normalizeMedia(input.image, defaultContainerSlides[0]?.image || ""),
    order: Number.isFinite(Number(input.order)) ? Number(input.order) : 100,
    isPublished: input.isPublished !== false,
  };
}

function normalizeSiteSettings(input: Partial<SiteSettings> = {}): SiteSettings {
  const slides = Array.isArray(input.containerSlides) && input.containerSlides.length ? input.containerSlides : defaultContainerSlides;

  return {
    id: "home",
    hero: normalizeHomeHero(input.hero),
    containerSlides: slides
      .map((slide, index) => normalizeCarouselSlide({ ...slide, order: slide.order ?? index * 10 }))
      .sort((a, b) => (a.order ?? 100) - (b.order ?? 100)),
    updatedAt: input.updatedAt,
  };
}

function serializeSiteSettings(document: SiteSettingsDocument) {
  const { _id, ...settings } = document;
  void _id;
  return normalizeSiteSettings(settings);
}

async function settingsCollection(): Promise<Collection<SiteSettingsDocument> | null> {
  const db = await getOptionalDb();
  return db ? db.collection<SiteSettingsDocument>("siteSettings") : null;
}

async function requiredSettingsCollection() {
  const db = await requireDb();
  return db.collection<SiteSettingsDocument>("siteSettings");
}

export async function getSiteSettings() {
  try {
    const collection = await settingsCollection();
    if (!collection) return defaultSiteSettings;

    const document = await collection.findOne({ id: "home" });
    return document ? serializeSiteSettings(document) : defaultSiteSettings;
  } catch (error) {
    logBackendError("Site settings database read failed. Falling back to defaults", error);
    return defaultSiteSettings;
  }
}

export async function saveHomeHero(input: HomeHeroInput) {
  const collection = await requiredSettingsCollection();
  const existing = await collection.findOne({ id: "home" });
  const now = new Date().toISOString();
  const current = existing ? serializeSiteSettings(existing) : defaultSiteSettings;
  const hero = normalizeHomeHero({ ...current.hero, ...input });

  await collection.updateOne(
    { id: "home" },
    {
      $set: {
        id: "home",
        hero,
        containerSlides: current.containerSlides,
        updatedAt: now,
      },
    },
    { upsert: true },
  );

  return hero;
}

export async function saveHomeCarouselSlide(input: HomeCarouselSlideInput) {
  const collection = await requiredSettingsCollection();
  const existing = await collection.findOne({ id: "home" });
  const now = new Date().toISOString();
  const current = existing ? serializeSiteSettings(existing) : defaultSiteSettings;
  const slide = normalizeCarouselSlide(input);
  const nextSlides = [...current.containerSlides.filter((item) => item.id !== slide.id), slide].sort(
    (a, b) => (a.order ?? 100) - (b.order ?? 100),
  );

  await collection.updateOne(
    { id: "home" },
    {
      $set: {
        id: "home",
        hero: current.hero,
        containerSlides: nextSlides,
        updatedAt: now,
      },
    },
    { upsert: true },
  );

  return slide;
}

export async function deleteHomeCarouselSlide(id: string) {
  const collection = await requiredSettingsCollection();
  const existing = await collection.findOne({ id: "home" });
  const current = existing ? serializeSiteSettings(existing) : defaultSiteSettings;
  const nextSlides = current.containerSlides.filter((slide) => slide.id !== id);

  await collection.updateOne(
    { id: "home" },
    {
      $set: {
        id: "home",
        hero: current.hero,
        containerSlides: nextSlides,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true },
  );
}
