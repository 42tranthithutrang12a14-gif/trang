"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { saveUploadedImages } from "@/lib/upload";
import { getSelfAndDescendantIds } from "@/lib/categories";

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

function parseParentId(formData: FormData): number | null {
  const raw = String(formData.get("parentId") ?? "").trim();
  if (!raw) return null;
  const id = Number(raw);
  return Number.isFinite(id) ? id : null;
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Thiếu tên danh mục");

  const image = (formData.get("image") as File | null) ?? null;
  const [imageUrl] = image ? await saveUploadedImages([image]) : [];
  const parentId = parseParentId(formData);

  const slug = await uniqueCategorySlug(name);
  const maxOrder = await prisma.category.aggregate({ _max: { order: true } });

  await prisma.category.create({
    data: {
      name,
      slug,
      image: imageUrl,
      order: (maxOrder._max.order ?? -1) + 1,
      parentId,
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

  let parentId = parseParentId(formData);
  if (parentId !== null) {
    const allCategories = await prisma.category.findMany();
    const forbidden = getSelfAndDescendantIds(categoryId, allCategories);
    if (forbidden.has(parentId)) {
      // Không cho chọn chính nó hoặc con/cháu của nó làm danh mục cha (tránh vòng lặp).
      parentId = current.parentId;
    }
  }

  const image = (formData.get("image") as File | null) ?? null;
  const [imageUrl] = image ? await saveUploadedImages([image]) : [];

  const slug = name === current.name ? current.slug : await uniqueCategorySlug(name, categoryId);

  await prisma.category.update({
    where: { id: categoryId },
    data: {
      name,
      slug,
      parentId,
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

  // Danh mục con của mục này sẽ tự động trở thành danh mục gốc (không bị xoá theo).
  await prisma.category.delete({ where: { id: categoryId } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}
