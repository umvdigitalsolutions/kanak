import { TopHero } from "@/components/home/TopHero";
import { Hero } from "@/components/home/Hero";
import { HotFillStory } from "@/components/home/HotFillStory";
import { KitchenToCustomer } from "@/components/home/KitchenToCustomer";
import { ProductTypes } from "@/components/home/ProductTypes";
import { ColorSwitcher } from "@/components/home/ColorSwitcher";
import { DeliveryJourney } from "@/components/home/DeliveryJourney";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <TopHero />
      <Hero />
      <KitchenToCustomer />
      <ProductTypes />
      <HotFillStory />
      <ColorSwitcher />
      <DeliveryJourney />
      <FinalCTA />
    </>
  );
}
