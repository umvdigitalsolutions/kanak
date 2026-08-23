import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeroCorner3DFigures } from "@/components/home/HeroCorner3DFigures";
import { assetPath } from "@/lib/assets";
import { defaultHomeHero, type HomeHeroSettings } from "@/data/site";

function videoType(src: string) {
  if (src.endsWith(".webm")) return "video/webm";
  if (src.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}

export function TopHero({ settings = defaultHomeHero }: { settings?: HomeHeroSettings }) {
  const specs = settings.specs.length ? settings.specs : defaultHomeHero.specs;

  return (
    <section className="top-hero" id="home">
      <div className="top-hero__shade" aria-hidden="true" />
      <div className="top-hero__content">
        <div className="top-hero__copy">
          <p className="kicker">{settings.kicker}</p>
          <h1>{settings.title}</h1>
          <p>{settings.copy}</p>
          <div className="top-hero__actions">
            <Button href={settings.primaryHref} variant="accent">
              {settings.primaryLabel}
            </Button>
            <Button href={settings.secondaryHref} variant="outline">
              {settings.secondaryLabel}
            </Button>
          </div>
        </div>
        <div className="top-hero__visual" aria-label="Kanak Mouldings food container showcase">
          <div className="top-hero__image top-hero__image--primary">
            {settings.mediaType === "image" ? (
              <Image
                alt="Kanak Mouldings food container hero visual"
                className="top-hero__video"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 56vw"
                src={assetPath(settings.mediaSrc)}
              />
            ) : (
              <video
                aria-label="Food packed in a clear-lid Kanak food container"
                autoPlay
                className="top-hero__video"
                disablePictureInPicture
                loop
                muted
                playsInline
                poster={assetPath(settings.posterSrc)}
                preload="metadata"
              >
                <source src={assetPath(settings.mediaSrc)} type={videoType(settings.mediaSrc)} />
              </video>
            )}
          </div>
          <HeroCorner3DFigures />
        </div>
        <div className="top-hero__specs" aria-label="Container manufacturing highlights">
          {specs.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
