import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Tích hợp Blob trên Vercel có thể đặt tiền tố cho tên biến (VD: BLOB2_READ_WRITE_TOKEN)
// tuỳ vào tên gõ lúc kết nối Storage — dò cả biến không tiền tố lẫn có tiền tố.
const blobToken =
  process.env.BLOB_READ_WRITE_TOKEN ??
  Object.entries(process.env).find(([key]) => key.endsWith("_READ_WRITE_TOKEN"))?.[1];

// Trên Vercel, ổ đĩa không được giữ lại giữa các lần chạy nên phải lưu ảnh
// vào Vercel Blob. Khi chạy local (npm run dev) thì lưu thẳng vào public/uploads.
async function saveToVercelBlob(files: File[]): Promise<string[]> {
  const results = await Promise.all(
    files.map((file) =>
      put(file.name, file, { access: "public", addRandomSuffix: true, token: blobToken })
    )
  );
  return results.map((blob) => blob.url);
}

async function saveToLocalDisk(files: File[]): Promise<string[]> {
  await mkdir(UPLOAD_DIR, { recursive: true });

  const urls: string[] = [];
  for (const file of files) {
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${randomUUID()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    urls.push(`/uploads/${filename}`);
  }
  return urls;
}

export async function saveUploadedImages(files: File[]): Promise<string[]> {
  const validFiles = files.filter((file) => file.size > 0);
  if (validFiles.length === 0) return [];

  return process.env.VERCEL ? saveToVercelBlob(validFiles) : saveToLocalDisk(validFiles);
}
