import { saveProductAction } from "@/app/admin/actions";
import type { ProductCategory } from "@/lib/backend/categories";
import { primaryProductCategories, type Product } from "@/data/products";

const shapes: Product["shape"][] = ["round", "rectangular", "square", "tray"];
const baseColors: Product["visual"]["baseColor"][] = ["black", "white", "clear", "custom"];
const accents: Product["visual"]["accent"][] = ["empty", "rice", "curry", "noodles", "dessert", "salad"];

function lines(value?: string[]) {
  return value?.join("\n") ?? "";
}

export function AdminProductForm({ categories = [], product }: { categories?: ProductCategory[]; product?: Product }) {
  const visual = product?.visual;
  const categoryNames = [
    ...new Set(
      [
        ...primaryProductCategories,
        ...categories
          .map((category) => category.name)
          .filter((category) => primaryProductCategories.includes(category as (typeof primaryProductCategories)[number])),
        product?.category,
      ].filter(Boolean) as string[],
    ),
  ];

  return (
    <form action={saveProductAction} className="admin-form" encType="multipart/form-data">
      <input name="originalSlug" type="hidden" value={product?.slug ?? ""} />

      <div className="admin-form__intro">
        <span>Step 1</span>
        <div>
          <h2>Basic product details</h2>
          <p>Add the name, category and short text customers will see first.</p>
        </div>
      </div>

      <div className="admin-form__grid admin-form__grid--simple">
        <label>
          Product Name
          <input name="name" required defaultValue={product?.name ?? ""} placeholder="Round Container - Black" />
        </label>
        <label>
          Category
          <select name="category" defaultValue={product?.category ?? categoryNames[0] ?? ""}>
            {categoryNames.length ? null : <option value="">Create a category first</option>}
            {categoryNames.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Shape
          <select name="shape" defaultValue={product?.shape ?? "rectangular"}>
            {shapes.map((shape) => (
              <option key={shape} value={shape}>
                {shape}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Short Text
        <textarea
          name="shortDescription"
          required
          defaultValue={product?.shortDescription ?? ""}
          placeholder="One clear sentence shown on product cards."
          rows={3}
        />
      </label>

      <div className="admin-checks admin-checks--primary">
        <label className="checkbox-label">
          <input name="isPublished" type="checkbox" defaultChecked={product?.isPublished !== false} />
          Show this product on website
        </label>
        <label className="checkbox-label">
          <input name="featured" type="checkbox" defaultChecked={Boolean(product?.featured)} />
          Highlight this product
        </label>
      </div>

      <div className="admin-form__intro">
        <span>Step 2</span>
        <div>
          <h2>Product photo</h2>
          <p>Upload a clean product image. This will be used on product cards and gallery pages.</p>
        </div>
      </div>

      <div className="admin-form__grid admin-form__grid--simple">
        <label>
          Upload Product Photo
          <input accept="image/avif,image/gif,image/jpeg,image/png,image/webp" name="imageFile" type="file" />
          <small>Recommended: square or wide product photo, JPG/PNG/WEBP.</small>
        </label>
        <label>
          Add More Product Photos
          <input accept="image/avif,image/gif,image/jpeg,image/png,image/webp" multiple name="galleryFiles" type="file" />
          <small>Optional. These are added to the product gallery.</small>
        </label>
      </div>

      <div className="admin-form__intro">
        <span>Step 3</span>
        <div>
          <h2>Details for buyers</h2>
          <p>These help restaurants and distributors understand size, material and use.</p>
        </div>
      </div>

      <label>
        Full Product Description
        <textarea name="description" defaultValue={product?.description ?? ""} rows={4} />
      </label>

      <div className="admin-form__grid admin-form__grid--simple">
        <label>
          Capacity
          <small>Example: 500 ml, 750 ml, custom range</small>
          <input name="capacity" defaultValue={product?.capacity ?? ""} />
        </label>
        <label>
          Available Sizes
          <small>Write one per line. Example: 500 ML, 750 ML, 1000 ML</small>
          <textarea name="sizeOptions" defaultValue={lines(product?.sizeOptions)} rows={4} />
        </label>
        <label>
          Dimensions
          <small>Example: Top 12 cm, height 6 cm</small>
          <input name="dimensions" defaultValue={product?.dimensions ?? ""} />
        </label>
        <label>
          Material
          <small>Example: Food-grade PP, PET, biodegradable fiber</small>
          <input name="material" defaultValue={product?.material ?? ""} />
        </label>
      </div>

      <div className="admin-form__grid">
        <label>
          Available Colours
          <small>Write one per line.</small>
          <textarea name="colourOptions" defaultValue={lines(product?.colourOptions)} rows={4} />
        </label>
        <label>
          Lid Types
          <small>Write one per line.</small>
          <textarea name="lidOptions" defaultValue={lines(product?.lidOptions)} rows={4} />
        </label>
        <label>
          Compartments Available
          <small>Write numbers, one per line.</small>
          <textarea name="compartments" defaultValue={product?.compartments?.join("\n") ?? "1"} rows={4} />
        </label>
      </div>

      <div className="admin-form__grid">
        <label>
          Suitable For
          <small>Restaurants, cloud kitchens, noodles, rice bowls etc.</small>
          <textarea name="applications" defaultValue={lines(product?.applications)} rows={5} />
        </label>
        <label>
          Key Selling Points
          <small>Leak-resistant lid, stackable, food-safe etc.</small>
          <textarea name="features" defaultValue={lines(product?.features)} rows={5} />
        </label>
      </div>

      <label>
        Customisation Note for Buyers
        <textarea name="customisation" defaultValue={product?.customisation ?? ""} rows={3} />
      </label>

      <details className="admin-details admin-advanced">
        <summary>Advanced settings</summary>
        <div className="admin-form__grid">
          <label>
            Product ID
            <input name="id" defaultValue={product?.id ?? ""} placeholder="Auto-created if blank" />
          </label>
          <label>
            Page Link Slug
            <input name="slug" defaultValue={product?.slug ?? ""} placeholder="Auto-created from product name" />
          </label>
          <label>
            Display Order
            <input name="order" defaultValue={product?.order ?? 100} type="number" />
          </label>
          <label>
            Existing Main Image Path
            <input name="image" defaultValue={product?.image ?? ""} placeholder="/images/products/kanak/..." />
          </label>
          <label>
            Existing Gallery Image Paths
            <textarea name="gallery" defaultValue={lines(product?.gallery)} rows={4} />
          </label>
          <label>
            Fallback Visual Colour
            <select name="visualBaseColor" defaultValue={visual?.baseColor ?? "black"}>
              {baseColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
          <label>
            Fallback Compartments
            <input name="visualCompartments" defaultValue={visual?.compartments ?? 1} min={1} type="number" />
          </label>
          <label>
            Fallback Food Accent
            <select name="visualAccent" defaultValue={visual?.accent ?? "empty"}>
              {accents.map((accent) => (
                <option key={accent} value={accent}>
                  {accent}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="admin-checks">
          <label className="checkbox-label">
            <input name="placeholderSpecification" type="checkbox" defaultChecked={product?.placeholderSpecification !== false} />
            Specifications are still approximate
          </label>
          <label className="checkbox-label">
            <input name="visualLid" type="checkbox" defaultChecked={visual?.lid !== false} />
            Show lid in fallback visual
          </label>
        </div>
      </details>

      <button className="admin-submit" type="submit">
        Save Product
      </button>
    </form>
  );
}
