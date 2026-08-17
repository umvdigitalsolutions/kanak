"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

export type GalleryItem = {
  src: string;
  title: string;
  description: string;
  category: "Product" | "Manufacturing";
};

const filters = ["All", "Products", "Manufacturing"] as const;
type Filter = (typeof filters)[number];

function matchesFilter(item: GalleryItem, filter: Filter) {
  if (filter === "All") return true;
  if (filter === "Products") return item.category === "Product";
  return item.category === "Manufacturing";
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const visibleItems = useMemo(() => items.filter((item) => matchesFilter(item, filter)), [filter, items]);
  const activeItem = activeIndex !== null ? visibleItems[activeIndex] : null;

  useLockBodyScroll(activeIndex !== null);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === null ? current : (current + 1) % visibleItems.length));
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + visibleItems.length) % visibleItems.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, visibleItems.length]);

  const openAt = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  const close = () => {
    setActiveIndex(null);
    triggerRef.current?.focus();
  };

  return (
    <>
      <div aria-label="Gallery filters" className="filter-row">
        {filters.map((item) => (
          <button
            aria-pressed={filter === item}
            className={filter === item ? "is-selected" : ""}
            key={item}
            onClick={() => {
              setFilter(item);
              setActiveIndex(null);
            }}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {visibleItems.map((item, index) => (
          <article className="gallery-card" key={`${item.category}-${item.title}`}>
            <button
              aria-label={`View ${item.title} fullscreen`}
              className="gallery-card__media"
              onClick={(event) => openAt(index, event)}
              type="button"
            >
              <Image
                alt={item.title}
                className="gallery-card__image"
                fill
                priority={index < 2}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw"
                src={item.src}
              />
              <span className="gallery-card__view" aria-hidden="true">
                View
              </span>
            </button>
            <div className="gallery-card__body">
              <span>{item.category}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div
          aria-label={activeItem.title}
          aria-modal="true"
          className="lightbox"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          role="dialog"
        >
          <button aria-label="Close" className="lightbox__close" onClick={close} ref={closeButtonRef} type="button">
            <X size={22} strokeWidth={1.7} />
          </button>

          {visibleItems.length > 1 ? (
            <>
              <button
                aria-label="Previous image"
                className="lightbox__nav lightbox__nav--prev"
                onClick={() => setActiveIndex((current) => (current === null ? current : (current - 1 + visibleItems.length) % visibleItems.length))}
                type="button"
              >
                <ChevronLeft size={26} strokeWidth={1.7} />
              </button>
              <button
                aria-label="Next image"
                className="lightbox__nav lightbox__nav--next"
                onClick={() => setActiveIndex((current) => (current === null ? current : (current + 1) % visibleItems.length))}
                type="button"
              >
                <ChevronRight size={26} strokeWidth={1.7} />
              </button>
            </>
          ) : null}

          <figure className="lightbox__figure">
            <span className="lightbox__media">
              <Image alt={activeItem.title} fill sizes="90vw" src={activeItem.src} />
            </span>
            <figcaption>
              <span>{activeItem.category}</span>
              <h2>{activeItem.title}</h2>
              <p>{activeItem.description}</p>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
