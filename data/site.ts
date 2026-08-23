import { assetPath } from "@/lib/assets";

export type HomeHeroSettings = {
  kicker: string;
  title: string;
  copy: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  posterSrc: string;
  specs: string[];
};

export type HomeCarouselSlide = {
  id: string;
  title: string;
  badge: string;
  copy: string;
  material: string;
  bestFor: string;
  specs: string[];
  image: string;
  order?: number;
  isPublished?: boolean;
};

export type SiteSettings = {
  id: "home";
  hero: HomeHeroSettings;
  containerSlides: HomeCarouselSlide[];
  updatedAt?: string;
};

export const defaultHomeHero: HomeHeroSettings = {
  kicker: "Food packaging manufacturer",
  title: "Food delivery containers made for scale.",
  copy:
    "Rigid round and rectangular food containers built around material consistency, practical stacking, reliable lid fit and food-service supply requirements.",
  primaryLabel: "View Product Range",
  primaryHref: "/products",
  secondaryLabel: "Request Specifications",
  secondaryHref: "/contact",
  mediaType: "video",
  mediaSrc: assetPath("/videos/noodles-scrub.mp4"),
  posterSrc: assetPath("/images/generated/cinematic-noodle-container.png"),
  specs: ["Food-grade material focus", "Secure lid-fit range", "Bulk supply for food service"],
};

export const defaultContainerSlides: HomeCarouselSlide[] = [
  {
    badge: "Hot meal bowls",
    bestFor: "Noodles, rice bowls, curries",
    copy:
      "Round black bases with clear lids keep food visible while the rim geometry supports a confident delivery seal.",
    id: "round-plastic",
    image: assetPath("/images/generated/container-carousel/round-plastic-noodles.webp"),
    material: "Food-grade PP / PET",
    order: 10,
    specs: ["Round format", "Clear lid", "Hot-fill use"],
    title: "Round Plastic Containers",
  },
  {
    badge: "Meal trays",
    bestFor: "Combos, thali, biryani, meal prep",
    copy:
      "Rectangular formats give restaurants clean portioning, stackable dispatch and practical lid-fit across bulk orders.",
    id: "rectangle-plastic",
    image: assetPath("/images/generated/container-carousel/rectangle-plastic-meal.webp"),
    material: "Rigid food-grade plastic",
    order: 20,
    specs: ["Rectangular tray", "Compartment option", "Stackable"],
    title: "Rectangle Plastic Meal Boxes",
  },
  {
    badge: "Eco food boxes",
    bestFor: "Snacks, cafe meals, takeaway",
    copy:
      "Biodegradable clamshell options bring natural fiber texture with practical fold-lock closures for food-service packing.",
    id: "biodegradable-clamshell",
    image: assetPath("/images/generated/container-carousel/biodegradable-clamshell.webp"),
    material: "Biodegradable fiber",
    order: 30,
    specs: ["Kraft finish", "Fold-lock lid", "Takeaway ready"],
    title: "Biodegradable Clamshells",
  },
  {
    badge: "Cafe dispatch",
    bestFor: "Coffee, tea, hot beverages",
    copy:
      "Biodegradable cups and compostable lids give beverage brands a clean, dependable format for daily delivery volume.",
    id: "bio-coffee-cups",
    image: assetPath("/images/generated/container-carousel/biodegradable-coffee-cups.webp"),
    material: "Paper fiber + bio lid",
    order: 40,
    specs: ["Hot beverage", "Compostable lid", "Cafe supply"],
    title: "Biodegradable Coffee Cups",
  },
  {
    badge: "Cold prep",
    bestFor: "Salads, desserts, fresh counter",
    copy:
      "Clear deli containers make freshness visible while the snap-fit lid profile supports hygienic handling and display.",
    id: "clear-deli",
    image: assetPath("/images/generated/container-carousel/clear-deli-containers.webp"),
    material: "Transparent PET / PP",
    order: 50,
    specs: ["Food visibility", "Snap-fit lid", "Cold display"],
    title: "Clear Deli Containers",
  },
];

export const defaultSiteSettings: SiteSettings = {
  id: "home",
  hero: defaultHomeHero,
  containerSlides: defaultContainerSlides,
};
