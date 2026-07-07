"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { saveUploadedImages } from "@/lib/upload";

async function uniqueCategorySlug(name: string, excludeId?: number) {
  const base = slugify(name) || "danh-muc";
  let slug = base;
  let i = 2;
  while (
    await prisma.category.findFirst({
      where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    })
  ) {
    slug = `${base}-${i}`;
    i++;
  }
  return slug;
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Thiếu tên danh mục");

  const image = (formData.get("image") as File | null) ?? null;
  const [imageUrl] = image ? await saveUploadedImages([image]) : [];

  const slug = await uniqueCategorySlug(name);
  const maxOrder = await prisma.category.aggregate({ _max: { order: true } });

  await prisma.category.create({
    data: {
      name,
      slug,
      image: imageUrl,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/san-pham");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function updateCategory(categoryId: number, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Thiếu tên danh mục");

  const current = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!current) throw new Error("Không tìm thấy danh mục");

  const image = (formData.get("image") as File | null) ?? null;
  const [imageUrl] = image ? await saveUploadedImages([image]) : [];

  const slug = name === current.name ? current.slug : await uniqueCategorySlug(name, categoryId);

  await prisma.category.update({
    where: { id: categoryId },
    data: {
      name,
      slug,
      ...(imageUrl ? { image: imageUrl } : {}),
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/san-pham");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function deleteCategory(categoryId: number) {
  const productCount = await prisma.product.count({ where: { categoryId } });
  if (productCount > 0) {
    redirect("/admin/categories?error=has-products");
  }

  await prisma.category.delete({ where: { id: categoryId } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}
