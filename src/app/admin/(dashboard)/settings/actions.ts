"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function updateSettings(formData: FormData) {
  const companyName = String(formData.get("companyName") ?? "").trim();
  const shortName = String(formData.get("shortName") ?? "").trim();
  const slogan = String(formData.get("slogan") ?? "").trim();
  const taxId = String(formData.get("taxId") ?? "").trim();
  const representative = String(formData.get("representative") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const businessLines = String(formData.get("businessLines") ?? "").trim();

  if (!companyName || !shortName) {
    throw new Error("Thiếu tên công ty");
  }

  await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      companyName,
      shortName,
      slogan,
      taxId,
      representative,
      address,
      phone,
      email,
      businessLines,
    },
    create: {
      id: 1,
      companyName,
      shortName,
      slogan,
      taxId,
      representative,
      address,
      phone,
      email,
      businessLines,
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
