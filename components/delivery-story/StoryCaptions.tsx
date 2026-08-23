import { Button } from "@/components/ui/Button";

/**
 * Copy overlay. Every caption is stacked in the same box and cross-faded by
 * the master timeline — the headline itself wipes up out of an overflow mask.
 */
const captions = [
  {
    copy: "Every delivery journey starts with the right packaging.",
    kicker: "Scene 01 — Kitchen",
    title: "From the kitchen",
  },
  {
    copy: "Designed to protect every order from the first mile to the last.",
    kicker: "Scene 02 — Packed",
    title: "Securely packed",
  },
  {
    copy: "Sealed at the counter, loaded without a second thought.",
    kicker: "Scene 03 — Handover",
    title: "Ready to move",
  },
  {
    copy: "Stable. Secure. Ready for delivery.",
    kicker: "Scene 04 — In transit",
    title: "Built for the journey",
  },
  {
    copy: "Through the traffic, the turns and the wait at the door.",
    kicker: "Scene 05 — Arrival",
    side: "right",
    title: "Arrived securely",
  },
  {
    copy: "Fresh. Protected. Presentable.",
    kicker: "Scene 06 — Handoff",
    title: "Delivered the way it was packed.",
  },
] as const;

export function StoryCaptions() {
  return (
    <div className="story-captions">
      {captions.map((caption, index) => (
        <article
          className={
            "side" in caption ? "story-caption story-caption--right" : "story-caption"
          }
          data-caption={index}
          key={caption.title}
        >
          <p className="kicker">{caption.kicker}</p>
          <h2>
            <span className="story-caption__mask">
              <span className="story-caption__line">{caption.title}</span>
            </span>
          </h2>
          <p className="story-caption__copy">{caption.copy}</p>
        </article>
      ))}

      <article className="story-caption story-caption--final" data-caption={captions.length}>
        <p className="kicker">Kanak Mouldings</p>
        <h2>
          <span className="story-caption__mask">
            <span className="story-caption__line">Packaging that completes the journey.</span>
          </span>
        </h2>
        <p className="story-caption__copy">
          From kitchen to doorstep, engineered for modern food delivery.
        </p>
        <div className="story-caption__cta">
          <Button href="/products" variant="accent">
            Explore Our Containers
          </Button>
        </div>
      </article>
    </div>
  );
}
