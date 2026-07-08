"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { saveUploadedImages } from "@/lib/upload";

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
  const removeLogo = formData.get("removeLogo") === "on";
  const logoFile = formData.get("logo") as File | null;
  const removeHeroImage = formData.get("removeHeroImage") === "on";
  const heroImageFile = formData.get("heroImage") as File | null;

  if (!companyName || !shortName) {
    throw new Error("Thiếu tên công ty");
  }

  const current = await prisma.settings.findUnique({ where: { id: 1 } });

  let logoUrl = current?.logoUrl ?? null;
  if (removeLogo) {
    logoUrl = null;
  } else if (logoFile && logoFile.size > 0) {
    const [uploaded] = await saveUploadedImages([logoFile]);
    if (uploaded) logoUrl = uploaded;
  }

  let heroImage = current?.heroImage ?? null;
  if (removeHeroImage) {
    heroImage = null;
  } else if (heroImageFile && heroImageFile.size > 0) {
    const [uploaded] = await saveUploadedImages([heroImageFile]);
    if (uploaded) heroImage = uploaded;
  }

  const data = {
    companyName,
    shortName,
    slogan,
    taxId,
    representative,
    address,
    phone,
    email,
    businessLines,
    logoUrl,
    heroImage,
  };

  await prisma.settings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
