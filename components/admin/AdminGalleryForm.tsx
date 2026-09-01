import { saveGalleryItemAction } from "@/app/admin/actions";
import type { GalleryItem } from "@/data/gallery";

export function AdminGalleryForm({ item }: { item?: GalleryItem }) {
  return (
    <form action={saveGalleryItemAction} className="admin-form admin-form--compact" encType="multipart/form-data">
      <input name="id" type="hidden" value={item?.id ?? ""} />
      <div className="admin-form__intro">
        <span>Photo</span>
        <div>
          <h2>{item ? "Edit gallery photo" : "Add a gallery photo"}</h2>
          <p>Upload a factory, packing, quality or delivery image for the gallery page.</p>
        </div>
      </div>
      <div className="admin-form__grid admin-form__grid--simple">
        <label>
          Photo Title
          <input name="title" required defaultValue={item?.title ?? ""} placeholder="Container packing line" />
        </label>
        <label>
          Photo Type
          <select name="category" defaultValue={item?.category ?? "Gallery"}>
            <option value="Gallery">Gallery</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Quality">Quality</option>
            <option value="Packing">Packing</option>
          </select>
        </label>
        <label>
          Upload Photo
          <input
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            name="imageFile"
            required={!item?.src}
            type="file"
          />
          <small>Choose a JPG, PNG or WEBP image.</small>
        </label>
      </div>
      <label>
        Caption
        <textarea name="description" defaultValue={item?.description ?? ""} placeholder="Short caption shown below the photo." rows={3} />
      </label>
      <label className="checkbox-label">
        <input name="isPublished" type="checkbox" defaultChecked={item?.isPublished !== false} />
        Show this photo on website
      </label>
      <details className="admin-details admin-advanced">
        <summary>Advanced settings</summary>
        <div className="admin-form__grid">
          <label>
            Existing Image Path
            <input name="src" defaultValue={item?.src ?? ""} placeholder="/images/gallery/factory.jpg" />
          </label>
          <label>
            Display Order
            <input name="order" defaultValue={item?.order ?? 100} type="number" />
          </label>
        </div>
      </details>
      <button className="admin-submit" type="submit">
        Save Photo
      </button>
    </form>
  );
}
