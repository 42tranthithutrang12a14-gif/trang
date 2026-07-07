"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSession } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const valid = await verifyCredentials(username, password);
  if (!valid) {
    redirect("/admin/login?error=1");
  }

  await createSession();
  redirect("/admin");
}
