"use client";

import { useState } from "react";
import type { ContainerColor } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { ProductPhotoScene } from "@/components/ui/ProductPhotoScene";

const colors: { value: ContainerColor; label: string }[] = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "clear", label: "Clear" },
  { value: "custom", label: "Custom" },
];

export function ColorSwitcher() {
  const [color, setColor] = useState<ContainerColor>("black");

  return (
    <section className="color-section">
      <Container className="color-section__grid">
        <div>
          <p className="kicker">Material look</p>
          <h2>
            ONE PACK.
            <br />
            DIFFERENT FINISHES.
          </h2>
          <p>
            Review common black, white, transparent and custom finish directions
            before confirming material grade, lid type and order requirements.
          </p>
          <div className="swatch-row">
            {colors.map((item) => (
              <button
                aria-label={`Switch to ${item.label}`}
                aria-pressed={color === item.value}
                className={`swatch swatch--${item.value} ${color === item.value ? "is-selected" : ""}`}
                key={item.value}
                onClick={() => setColor(item.value)}
                type="button"
              />
            ))}
          </div>
        </div>
        <ProductPhotoScene
          badges={[`${colors.find((item) => item.value === color)?.label ?? "Custom"} finish`, "Lid direction", "Food-grade application"]}
          caption="Finish planning preview for container quotation and material discussion."
          eyebrow="Material finish preview"
          smoke
          tone={color}
        />
      </Container>
    </section>
  );
}
