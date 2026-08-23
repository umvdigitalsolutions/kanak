"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, requireAdmin, signInAdmin } from "@/lib/admin/auth";
import { categoryInputFromForm, deleteCategory, saveCategory } from "@/lib/backend/categories";
import { isDatabaseConnectionError, logBackendError } from "@/lib/backend/errors";
import { formBoolean, formString, splitLines, toSlug } from "@/lib/backend/form";
import { deleteGalleryItem, saveGalleryItem } from "@/lib/backend/gallery";
import { isInquiryStatus, updateInquiryStatus } from "@/lib/backend/inquiries";
import { saveUploadedMediaFromForm, saveUploadedMediaListFromForm } from "@/lib/backend/media";
import { deleteProduct, saveProduct, syncStaticProductsToMongo, type ProductInput } from "@/lib/backend/products";
import { deleteHomeCarouselSlide, saveHomeCarouselSlide, saveHomeHero } from "@/lib/backend/site-settings";
import type { Product } from "@/data/products";

function productInputFromForm(formData: FormData): ProductInput {
  const name = formString(formData, "name");
  const slug = toSlug(formString(formData, "slug") || name);
  const visualCompartments = Number(formString(formData, "visualCompartments", "1"));

  return {
    originalSlug: formString(formData, "originalSlug"),
    id: formString(formData, "id"),
    slug,
    name,
    category: formString(formData, "category"),
    shape: formString(formData, "shape") as Product["shape"],
    shortDescription: formString(formData, "shortDescription"),
    description: formString(formData, "description"),
    capacity: formString(formData, "capacity"),
    dimensions: formString(formData, "dimensions"),
    colourOptions: splitLines(formString(formData, "colourOptions")),
    lidOptions: splitLines(formString(formData, "lidOptions")),
    compartments: splitLines(formString(formData, "compartments")).map(Number),
    material: formString(formData, "material"),
    applications: splitLines(formString(formData, "applications")),
    features: splitLines(formString(formData, "features")),
    customisation: formString(formData, "customisation"),
    image: formString(formData, "image") || null,
    gallery: splitLines(formString(formData, "gallery")),
    featured: formBoolean(formData, "featured"),
    isPublished: formBoolean(formData, "isPublished"),
    order: Number(formString(formData, "order", "100")),
    placeholderSpecification: formBoolean(formData, "placeholderSpecification"),
    visual: {
      baseColor: formString(formData, "visualBaseColor") as Product["visual"]["baseColor"],
      compartments: Number.isFinite(visualCompartments) ? visualCompartments : 1,
      lid: formBoolean(formData, "visualLid"),
      accent: formString(formData, "visualAccent") as Product["visual"]["accent"],
    },
  };
}

function adminErrorRedirect(path: string, error: unknown) {
  const code = isDatabaseConnectionError(error) ? "db" : "action";
  return `${path}${path.includes("?") ? "&" : "?"}error=${code}`;
}

export async function loginAction(formData: FormData) {
  const ok = await signInAdmin(formString(formData, "password"));

  if (!ok) {
    redirect("/admin/login?error=1");
  }

  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function syncProductsAction() {
  await requireAdmin();
  let target = "/admin/products?seeded=1";

  try {
    await syncStaticProductsToMongo();
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/gallery");
  } catch (error) {
    logBackendError("Admin product seed failed", error);
    target = adminErrorRedirect("/admin/products", error);
  }

  redirect(target);
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin();
  const originalSlug = formString(formData, "originalSlug");
  let target = originalSlug ? `/admin/products/${originalSlug}?error=action` : "/admin/products/new?error=action";

  try {
    const input = productInputFromForm(formData);
    const uploadedImage = await saveUploadedMediaFromForm(formData, "imageFile", "products");
    const uploadedGallery = await saveUploadedMediaListFromForm(formData, "galleryFiles", "products");

    if (uploadedImage) {
      input.image = uploadedImage;
    }

    if (uploadedGallery.length > 0) {
      input.gallery = [...(input.gallery ?? []), ...uploadedGallery];
    }

    const product = await saveProduct(input);
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);
    revalidatePath("/gallery");
    target = `/admin/products/${product.slug}?saved=1`;
  } catch (error) {
    logBackendError("Admin product save failed", error);
    target = adminErrorRedirect(originalSlug ? `/admin/products/${originalSlug}` : "/admin/products/new", error);
  }

  redirect(target);
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  let target = "/admin/products?deleted=1";

  try {
    await deleteProduct(formString(formData, "slug"));
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/gallery");
  } catch (error) {
    logBackendError("Admin product delete failed", error);
    target = adminErrorRedirect("/admin/products", error);
  }

  redirect(target);
}

export async function saveGalleryItemAction(formData: FormData) {
  await requireAdmin();
  let target = "/admin/gallery?saved=1";

  try {
    const uploadedImage = await saveUploadedMediaFromForm(formData, "imageFile", "gallery");
    await saveGalleryItem({
      id: formString(formData, "id") || undefined,
      title: formString(formData, "title"),
      description: formString(formData, "description"),
      category: formString(formData, "category"),
      src: uploadedImage || formString(formData, "src"),
      order: Number(formString(formData, "order", "100")),
      isPublished: formBoolean(formData, "isPublished"),
    });
    revalidatePath("/gallery");
  } catch (error) {
    logBackendError("Admin gallery save failed", error);
    target = adminErrorRedirect("/admin/gallery", error);
  }

  redirect(target);
}

export async function deleteGalleryItemAction(formData: FormData) {
  await requireAdmin();
  let target = "/admin/gallery?deleted=1";

  try {
    await deleteGalleryItem(formString(formData, "id"));
    revalidatePath("/gallery");
  } catch (error) {
    logBackendError("Admin gallery delete failed", error);
    target = adminErrorRedirect("/admin/gallery", error);
  }

  redirect(target);
}

export async function saveCategoryAction(formData: FormData) {
  await requireAdmin();
  let target = "/admin/categories?saved=1";

  try {
    await saveCategory(categoryInputFromForm(formData));
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/contact");
  } catch (error) {
    logBackendError("Admin category save failed", error);
    target = adminErrorRedirect("/admin/categories", error);
  }

  redirect(target);
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin();
  let target = "/admin/categories?deleted=1";

  try {
    await deleteCategory(formString(formData, "slug"));
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/contact");
  } catch (error) {
    logBackendError("Admin category delete failed", error);
    target = adminErrorRedirect("/admin/categories", error);
  }

  redirect(target);
}

export async function saveHomeHeroAction(formData: FormData) {
  await requireAdmin();
  let target = "/admin/home?saved=hero";

  try {
    const uploadedMedia = await saveUploadedMediaFromForm(formData, "heroMediaFile", "home");
    const uploadedPoster = await saveUploadedMediaFromForm(formData, "heroPosterFile", "home");

    await saveHomeHero({
      kicker: formString(formData, "kicker"),
      title: formString(formData, "title"),
      copy: formString(formData, "copy"),
      primaryLabel: formString(formData, "primaryLabel"),
      primaryHref: formString(formData, "primaryHref"),
      secondaryLabel: formString(formData, "secondaryLabel"),
      secondaryHref: formString(formData, "secondaryHref"),
      mediaType: formString(formData, "mediaType") === "image" ? "image" : "video",
      mediaSrc: uploadedMedia || formString(formData, "mediaSrc"),
      posterSrc: uploadedPoster || formString(formData, "posterSrc"),
      specs: splitLines(formString(formData, "specs")),
    });
    revalidatePath("/");
  } catch (error) {
    logBackendError("Admin home hero save failed", error);
    target = adminErrorRedirect("/admin/home", error);
  }

  redirect(target);
}

export async function saveHomeCarouselSlideAction(formData: FormData) {
  await requireAdmin();
  let target = "/admin/home?saved=slide";

  try {
    const title = formString(formData, "title");
    const uploadedImage = await saveUploadedMediaFromForm(formData, "slideImageFile", "home");

    await saveHomeCarouselSlide({
      id: toSlug(formString(formData, "id") || title),
      title,
      badge: formString(formData, "badge"),
      copy: formString(formData, "copy"),
      material: formString(formData, "material"),
      bestFor: formString(formData, "bestFor"),
      specs: splitLines(formString(formData, "specs")),
      image: uploadedImage || formString(formData, "image"),
      order: Number(formString(formData, "order", "100")),
      isPublished: formBoolean(formData, "isPublished"),
    });
    revalidatePath("/");
  } catch (error) {
    logBackendError("Admin home carousel save failed", error);
    target = adminErrorRedirect("/admin/home", error);
  }

  redirect(target);
}

export async function deleteHomeCarouselSlideAction(formData: FormData) {
  await requireAdmin();
  let target = "/admin/home?deleted=slide";

  try {
    await deleteHomeCarouselSlide(formString(formData, "id"));
    revalidatePath("/");
  } catch (error) {
    logBackendError("Admin home carousel delete failed", error);
    target = adminErrorRedirect("/admin/home", error);
  }

  redirect(target);
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdmin();
  const status = formString(formData, "status");

  if (!isInquiryStatus(status)) {
    redirect("/admin/inquiries?error=action");
  }

  let target = "/admin/inquiries?updated=1";

  try {
    await updateInquiryStatus(formString(formData, "id"), status);
  } catch (error) {
    logBackendError("Admin inquiry status update failed", error);
    target = adminErrorRedirect("/admin/inquiries", error);
  }

  redirect(target);
}
