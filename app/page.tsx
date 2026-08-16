import { TopHero } from "@/components/home/TopHero";
import { Hero } from "@/components/home/Hero";
import { ScrollVideoStory, type ScrollVideoStage } from "@/components/home/ScrollVideoStory";
import { KitchenToCustomer } from "@/components/home/KitchenToCustomer";
import { ProductTypes } from "@/components/home/ProductTypes";
import { ColorSwitcher } from "@/components/home/ColorSwitcher";
import { DeliveryJourney } from "@/components/home/DeliveryJourney";
import { FinalCTA } from "@/components/home/FinalCTA";

const hotFoodVideoStages: ScrollVideoStage[] = [
  {
    start: 0,
    end: 0.3,
    kicker: "Hot-fill packaging context",
    title: ["Designed", "for hot", "packing."],
    body: "This sequence shows a takeaway container in a hot-food use case where material stability, rim strength and lid fit matter.",
  },
  {
    start: 0.3,
    end: 0.52,
    kicker: "Material stability",
    title: ["Rigid", "under", "handling."],
    body: "For hot-fill applications, the container base should maintain practical form during filling, closing, stacking and dispatch.",
  },
  {
    start: 0.52,
    end: 0.72,
    kicker: "Lid-fit performance",
    title: ["Closure", "supports", "freshness."],
    body: "A well-matched lid direction helps reduce exposure during normal takeaway movement and supports food condition after packing.",
  },
  {
    start: 0.72,
    end: 0.9,
    kicker: "Protected movement",
    title: ["Less", "exposure", "in transit."],
    body: "Stable forming and practical closure help reduce leakage risk, handling damage and unnecessary exposure while orders move.",
  },
  {
    start: 0.9,
    end: 1,
    kicker: "Specification verification",
    title: ["Tested", "before", "supply."],
    body: "Exact heat tolerance, duration and food-contact compliance should be confirmed with manufacturer specifications.",
    cta: {
      label: "Request specifications",
      href: "/contact",
    },
  },
];

export default function Home() {
  return (
    <>
      <TopHero />
      <Hero />
      <ScrollVideoStory
        className="scroll-video-story--hot-food"
        objectPosition="center center"
        scrollDistance={6500}
        stages={hotFoodVideoStages}
        textPosition="left"
        videoSrc="/videos/noodles-scrub.mp4"
      />
      <KitchenToCustomer />
      <ProductTypes />
      <ColorSwitcher />
      <DeliveryJourney />
      <FinalCTA />
    </>
  );
}
