import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function saveUploadedImages(files: File[]): Promise<string[]> {
  const validFiles = files.filter((file) => file.size > 0);
  if (validFiles.length === 0) return [];

  await mkdir(UPLOAD_DIR, { recursive: true });

  const urls: string[] = [];
  for (const file of validFiles) {
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${randomUUID()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    urls.push(`/uploads/${filename}`);
  }
  return urls;
}
