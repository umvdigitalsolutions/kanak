import { TopHero } from "@/components/home/TopHero";
import { ContainerCarousel } from "@/components/home/ContainerCarousel";
import { GlobalPresence } from "@/components/home/GlobalPresence";
import { DeliveryStory3D } from "@/components/delivery-story-3d/DeliveryStory3D";
import { ProductTypes } from "@/components/home/ProductTypes";
import { ColorSwitcher } from "@/components/home/ColorSwitcher";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getProducts } from "@/lib/backend/products";
import { getSiteSettings } from "@/lib/backend/site-settings";

export const revalidate = 300;

export default async function Home() {
  const [products, siteSettings] = await Promise.all([getProducts(), getSiteSettings()]);

  return (
    <>
      <DeliveryStory3D />
      <TopHero settings={siteSettings.hero} />
      <ContainerCarousel slides={siteSettings.containerSlides} />
      <GlobalPresence />
      <ProductTypes products={products} />
      <ColorSwitcher />
      <FinalCTA />
    </>
  );
}
