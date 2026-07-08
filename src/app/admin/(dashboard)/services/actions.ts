"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function createService(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!title) throw new Error("Thiếu tên dịch vụ");

  const maxOrder = await prisma.service.aggregate({ _max: { order: true } });

  await prisma.service.create({
    data: { title, description, order: (maxOrder._max.order ?? -1) + 1 },
  });

  revalidatePath("/admin/services");
  revalidatePath("/dich-vu");
  redirect("/admin/services");
}

export async function updateService(serviceId: number, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!title) throw new Error("Thiếu tên dịch vụ");

  await prisma.service.update({
    where: { id: serviceId },
    data: { title, description },
  });

  revalidatePath("/admin/services");
  revalidatePath("/dich-vu");
  redirect("/admin/services");
}

export async function deleteService(serviceId: number) {
  await prisma.service.delete({ where: { id: serviceId } });
  revalidatePath("/admin/services");
  revalidatePath("/dich-vu");
  redirect("/admin/services");
}
