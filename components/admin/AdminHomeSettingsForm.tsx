import Image from "next/image";
import {
  deleteHomeCarouselSlideAction,
  saveHomeCarouselSlideAction,
  saveHomeHeroAction,
} from "@/app/admin/actions";
import type { HomeCarouselSlide, HomeHeroSettings } from "@/data/site";

function lines(value?: string[]) {
  return value?.join("\n") ?? "";
}

function SlideEditor({ slide }: { slide?: HomeCarouselSlide }) {
  const isEditing = Boolean(slide);

  return (
    <form action={saveHomeCarouselSlideAction} className="admin-form" encType="multipart/form-data">
      <div className="admin-form__intro">
        <span>{isEditing ? "Edit" : "New"}</span>
        <div>
          <h2>{isEditing ? "Edit carousel card" : "Add one carousel card"}</h2>
          <p>Each card should explain one container type with one strong image.</p>
        </div>
      </div>

      <div className="admin-form__grid admin-form__grid--simple">
        <label>
          Card Title
          <input name="title" required defaultValue={slide?.title ?? ""} placeholder="Round Plastic Containers" />
        </label>
        <label>
          Small Label
          <input name="badge" required defaultValue={slide?.badge ?? ""} placeholder="Hot meal bowls" />
        </label>
        <label>
          Upload Card Image
          <input accept="image/avif,image/gif,image/jpeg,image/png,image/webp" name="slideImageFile" type="file" />
        </label>
      </div>

      <label>
        Short Description
        <textarea
          name="copy"
          required
          defaultValue={slide?.copy ?? ""}
          placeholder="Explain why this container is useful for food delivery."
          rows={3}
        />
      </label>

      <div className="admin-form__grid admin-form__grid--simple">
        <label>
          Material
          <input name="material" defaultValue={slide?.material ?? ""} placeholder="Food-grade PP / PET" />
        </label>
        <label>
          Best For
          <input name="bestFor" defaultValue={slide?.bestFor ?? ""} placeholder="Noodles, rice bowls, curries" />
        </label>
      </div>

      <label>
        Three Short Highlights
        <textarea
          name="specs"
          defaultValue={lines(slide?.specs)}
          placeholder={"Round format\nClear lid\nStackable"}
          rows={3}
        />
      </label>

      <label className="checkbox-label">
        <input name="isPublished" type="checkbox" defaultChecked={slide?.isPublished !== false} />
        Show this card on home page
      </label>

      <details className="admin-details admin-advanced">
        <summary>Advanced settings</summary>
        <div className="admin-form__grid">
          <label>
            Card ID
            <input name="id" defaultValue={slide?.id ?? ""} placeholder="Auto-created from title" />
          </label>
          <label>
            Existing Image Path
            <input name="image" defaultValue={slide?.image ?? ""} placeholder="/images/generated/container-carousel/item.webp" />
          </label>
          <label>
            Display Order
            <input name="order" defaultValue={slide?.order ?? 100} type="number" />
          </label>
        </div>
      </details>

      <button className="admin-submit" type="submit">
        {isEditing ? "Save Card" : "Add Card"}
      </button>
    </form>
  );
}

export function AdminHomeSettingsForm({ hero, slides }: { hero: HomeHeroSettings; slides: HomeCarouselSlide[] }) {
  return (
    <div className="admin-cms-grid">
      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <p className="kicker">Home Page</p>
            <h2>Change top banner</h2>
          </div>
          <small>This is the first thing visitors see.</small>
        </div>

        <form action={saveHomeHeroAction} className="admin-form" encType="multipart/form-data">
          <div className="admin-form__intro">
            <span>Step 1</span>
            <div>
              <h2>Write the banner text</h2>
              <p>Keep it clear and business-focused.</p>
            </div>
          </div>

          <label>
            Small Top Label
            <input name="kicker" required defaultValue={hero.kicker} placeholder="Food packaging manufacturer" />
          </label>
          <label>
            Main Heading
            <input name="title" required defaultValue={hero.title} placeholder="Food delivery containers made for scale." />
          </label>
          <label>
            Short Paragraph
            <textarea name="copy" required defaultValue={hero.copy} rows={3} />
          </label>

          <div className="admin-form__intro">
            <span>Step 2</span>
            <div>
              <h2>Choose the banner visual</h2>
              <p>Upload a video for motion, or an image for a lighter page.</p>
            </div>
          </div>

          <div className="admin-form__grid admin-form__grid--simple">
            <label>
              Visual Type
              <select name="mediaType" defaultValue={hero.mediaType}>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </label>
            <label>
              Upload Video or Image
              <input
                accept="image/avif,image/gif,image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
                name="heroMediaFile"
                type="file"
              />
            </label>
            <label>
              Upload Video Poster
              <input accept="image/avif,image/gif,image/jpeg,image/png,image/webp" name="heroPosterFile" type="file" />
              <small>Optional image shown before video loads.</small>
            </label>
          </div>

          <div className="admin-form__intro">
            <span>Step 3</span>
            <div>
              <h2>Buttons and trust points</h2>
              <p>These guide visitors to products or contact.</p>
            </div>
          </div>

          <div className="admin-form__grid admin-form__grid--simple">
            <label>
              Main Button Text
              <input name="primaryLabel" required defaultValue={hero.primaryLabel} />
            </label>
            <label>
              Main Button Opens
              <input name="primaryHref" required defaultValue={hero.primaryHref} />
            </label>
            <label>
              Second Button Text
              <input name="secondaryLabel" required defaultValue={hero.secondaryLabel} />
            </label>
            <label>
              Second Button Opens
              <input name="secondaryHref" required defaultValue={hero.secondaryHref} />
            </label>
          </div>

          <label>
            Three Trust Points Below Banner
            <textarea name="specs" defaultValue={lines(hero.specs)} rows={3} />
          </label>

          <details className="admin-details admin-advanced">
            <summary>Advanced media paths</summary>
            <div className="admin-form__grid">
              <label>
                Current Visual Path
                <input name="mediaSrc" defaultValue={hero.mediaSrc} />
              </label>
              <label>
                Current Poster Path
                <input name="posterSrc" defaultValue={hero.posterSrc} />
              </label>
            </div>
          </details>

          <button className="admin-submit" type="submit">
            Save Top Banner
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <p className="kicker">Carousel</p>
            <h2>Manage container cards</h2>
          </div>
          <small>These cards appear just below the hero.</small>
        </div>

        <SlideEditor />

        <div className="admin-media-list">
          {slides.map((slide) => (
            <article className="admin-media-card" key={slide.id}>
              <div className="admin-media-card__image">
                <Image alt="" fill sizes="9rem" src={slide.image} />
              </div>
              <div>
                <span>{slide.isPublished === false ? "Hidden" : slide.badge}</span>
                <h3>{slide.title}</h3>
                <p>{slide.copy}</p>
                <small>{slide.material}</small>
              </div>
              <details className="admin-details admin-media-card__edit">
                <summary>Edit this card</summary>
                <SlideEditor slide={slide} />
              </details>
              <form action={deleteHomeCarouselSlideAction} className="admin-media-card__delete">
                <input name="id" type="hidden" value={slide.id} />
                <button className="admin-danger" type="submit">
                  Delete
                </button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
