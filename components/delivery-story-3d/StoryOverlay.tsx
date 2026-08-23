import { Button } from "@/components/ui/Button";
import { storyBeats } from "@/components/delivery-story-3d/storyProgress";

type StoryOverlayProps = {
  activeIndex: number;
};

export function StoryOverlay({ activeIndex }: StoryOverlayProps) {
  const beat = storyBeats[activeIndex] ?? storyBeats[0];

  return (
    <div className={`delivery-3d-overlay delivery-3d-overlay--${beat.align}`} aria-live="polite">
      <div className="delivery-3d-copy" key={beat.title}>
        <p className="kicker">{beat.kicker}</p>
        <h2>{beat.title}</h2>
        <p>{beat.body}</p>
        {beat.cta ? (
          <Button className="delivery-3d-copy__cta" href="/products" variant="accent">
            Explore Our Containers
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function StoryHud() {
  return (
    <div aria-hidden="true" className="delivery-3d-hud">
      <span>Material</span>
      <i>
        <b />
      </i>
      <span>Packing quality</span>
    </div>
  );
}
