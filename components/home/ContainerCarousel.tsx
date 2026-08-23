"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  Leaf,
  PackageCheck,
  Recycle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { defaultContainerSlides, type HomeCarouselSlide } from "@/data/site";

function SlideIcon({ slide }: { slide: HomeCarouselSlide }) {
  const text = `${slide.id} ${slide.title} ${slide.badge}`.toLowerCase();
  if (text.includes("coffee") || text.includes("cup")) return <Coffee size={18} strokeWidth={1.8} />;
  if (text.includes("bio") || text.includes("eco") || text.includes("kraft")) return <Leaf size={18} strokeWidth={1.8} />;
  if (text.includes("clear") || text.includes("seal")) return <ShieldCheck size={18} strokeWidth={1.8} />;
  if (text.includes("rect") || text.includes("tray")) return <Recycle size={18} strokeWidth={1.8} />;
  return <PackageCheck size={18} strokeWidth={1.8} />;
}

function wrapIndex(index: number, total: number) {
  return (index + total) % total;
}

export function ContainerCarousel({ slides = defaultContainerSlides }: { slides?: HomeCarouselSlide[] }) {
  const containerSlides = slides.filter((slide) => slide.isPublished !== false);
  const [activeIndex, setActiveIndex] = useState(0);
  const safeSlides = containerSlides.length ? containerSlides : defaultContainerSlides;
  const safeActiveIndex = Math.min(activeIndex, safeSlides.length - 1);
  const activeSlide = safeSlides[safeActiveIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, safeSlides.length));
    }, 5400);

    return () => window.clearInterval(timer);
  }, [safeSlides.length]);

  return (
    <section className="container-carousel-section" id="container-range">
      <Container className="container-carousel">
        <div className="container-carousel__header">
          <div className="container-carousel__intro">
            <p className="kicker">Container range</p>
            <h2>Every delivery format, made to look premium.</h2>
            <p>
              Plastic, transparent and biodegradable packaging formats for food delivery,
              cafe dispatch, meal prep and high-volume takeaway supply.
            </p>
          </div>
          <div className="container-carousel__header-actions">
            <div className="container-carousel__controls" aria-label="Container carousel controls">
              <button
                aria-label="Show previous container type"
                onClick={() => setActiveIndex((current) => wrapIndex(current - 1, safeSlides.length))}
                type="button"
              >
                <ChevronLeft size={20} strokeWidth={1.8} />
              </button>
              <button
                aria-label="Show next container type"
                onClick={() => setActiveIndex((current) => wrapIndex(current + 1, safeSlides.length))}
                type="button"
              >
                <ChevronRight size={20} strokeWidth={1.8} />
              </button>
            </div>
            <Button href="/products" variant="outline">
              View Products
            </Button>
          </div>
        </div>

        <div className="container-carousel__stage" aria-live="polite">
          <div className="container-carousel__media">
            <Image
              alt={`${activeSlide.title} with food for delivery packaging`}
              className="container-carousel__image"
              fill
              key={activeSlide.id}
              sizes="(max-width: 980px) 100vw, 62vw"
              src={activeSlide.image}
            />
            <div className="container-carousel__media-badge">
              <SlideIcon slide={activeSlide} />
              <span>{activeSlide.badge}</span>
            </div>
          </div>

          <div className="container-carousel__detail" key={`${activeSlide.id}-detail`}>
            <p className="container-carousel__count">
              {String(safeActiveIndex + 1).padStart(2, "0")} / {String(safeSlides.length).padStart(2, "0")}
            </p>
            <h3>{activeSlide.title}</h3>
            <p>{activeSlide.copy}</p>

            <dl className="container-carousel__facts">
              <div>
                <dt>Material</dt>
                <dd>{activeSlide.material}</dd>
              </div>
              <div>
                <dt>Best for</dt>
                <dd>{activeSlide.bestFor}</dd>
              </div>
            </dl>

            <ul className="container-carousel__specs" aria-label={`${activeSlide.title} highlights`}>
              {activeSlide.specs.map((spec) => (
                <li key={spec}>
                  <Sparkles size={14} strokeWidth={1.8} />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-carousel__thumbs" role="tablist" aria-label="Container types">
          {safeSlides.map((slide, index) => (
            <button
              aria-label={`Show ${slide.title}`}
              aria-selected={safeActiveIndex === index}
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              <span className="container-carousel__thumb-image">
                <Image
                  alt=""
                  fill
                  sizes="10rem"
                  src={slide.image}
                />
              </span>
              <span className="container-carousel__thumb-title">{slide.badge}</span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
