import { saveCategoryAction } from "@/app/admin/actions";
import type { ProductCategory } from "@/lib/backend/categories";

export function AdminCategoryForm({ category }: { category?: ProductCategory }) {
  return (
    <form action={saveCategoryAction} className="admin-form admin-form--compact">
      <input name="id" type="hidden" value={category?.id ?? ""} />
      <div className="admin-form__intro">
        <span>Category</span>
        <div>
          <h2>{category ? "Edit category" : "Create a product category"}</h2>
          <p>Keep the product range simple: Plastic Containers or Biodegradables.</p>
        </div>
      </div>
      <div className="admin-form__grid admin-form__grid--simple">
        <label>
          Category Name
          <input name="name" required defaultValue={category?.name ?? ""} placeholder="Plastic Containers" />
        </label>
        <label className="checkbox-label">
          <input name="isPublished" type="checkbox" defaultChecked={category?.isPublished !== false} />
          Show this category
        </label>
      </div>
      <label>
        Short Note
        <textarea
          name="description"
          defaultValue={category?.description ?? ""}
          placeholder="Optional note for your team."
          rows={3}
        />
      </label>
      <details className="admin-details admin-advanced">
        <summary>Advanced settings</summary>
        <div className="admin-form__grid">
          <label>
            Page Slug
            <input name="slug" defaultValue={category?.slug ?? ""} placeholder="Auto-created from category name" />
          </label>
          <label>
            Display Order
            <input name="order" defaultValue={category?.order ?? 100} type="number" />
          </label>
        </div>
      </details>
      <button className="admin-submit" type="submit">
        Save Category
      </button>
    </form>
  );
}
