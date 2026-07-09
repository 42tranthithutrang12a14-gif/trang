"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { saveUploadedImages } from "@/lib/upload";

async function uniqueProductSlug(name: string, excludeId?: number) {
  const base = slugify(name) || "san-pham";
  let slug = base;
  let i = 2;
  while (
    await prisma.product.findFirst({
      where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    })
  ) {
    slug = `${base}-${i}`;
    i++;
  }
  return slug;
}

function parsePrice(value: FormDataEntryValue | null) {
  const str = String(value ?? "").trim();
  if (!str) return null;
  const num = Number(str.replace(/[^\d]/g, ""));
  return Number.isFinite(num) ? num : null;
}

function parseStock(value: FormDataEntryValue | null) {
  const num = Number(String(value ?? "0").replace(/[^\d]/g, ""));
  return Number.isFinite(num) ? num : 0;
}

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = Number(formData.get("categoryId"));
  const description = String(formData.get("description") ?? "").trim();
  const price = parsePrice(formData.get("price"));
  const stock = parseStock(formData.get("stock"));
  const showStock = formData.get("showStock") === "on";
  const featured = formData.get("featured") === "on";
  const images = formData.getAll("images") as File[];

  if (!name || !categoryId) {
    throw new Error("Thiếu tên sản phẩm hoặc danh mục");
  }

  const slug = await uniqueProductSlug(name);
  const imageUrls = await saveUploadedImages(images);

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      stock,
      showStock,
      featured,
      categoryId,
      images: { create: imageUrls.map((url) => ({ url })) },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/san-pham");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateProduct(productId: number, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = Number(formData.get("categoryId"));
  const description = String(formData.get("description") ?? "").trim();
  const price = parsePrice(formData.get("price"));
  const stock = parseStock(formData.get("stock"));
  const showStock = formData.get("showStock") === "on";
  const featured = formData.get("featured") === "on";
  const newImages = formData.getAll("images") as File[];
  const removeImageIds = formData.getAll("removeImages").map(Number);

  if (!name || !categoryId) {
    throw new Error("Thiếu tên sản phẩm hoặc danh mục");
  }

  const current = await prisma.product.findUnique({ where: { id: productId } });
  if (!current) throw new Error("Không tìm thấy sản phẩm");

  const slug = name === current.name ? current.slug : await uniqueProductSlug(name, productId);
  const imageUrls = await saveUploadedImages(newImages);

  if (removeImageIds.length > 0) {
    await prisma.productImage.deleteMany({
      where: { id: { in: removeImageIds }, productId },
    });
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      slug,
      description,
      price,
      stock,
      showStock,
      featured,
      categoryId,
      images: { create: imageUrls.map((url) => ({ url })) },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/san-pham");
  revalidatePath(`/san-pham/${slug}`);
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteProduct(productId: number) {
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin");
  revalidatePath("/san-pham");
  revalidatePath("/");
  redirect("/admin");
}
