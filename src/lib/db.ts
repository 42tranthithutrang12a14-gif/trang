import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "@/generated/prisma/client";

// Cần cho Node.js (next dev, Vercel Node functions) — không dùng khi chạy edge runtime.
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Tích hợp Neon trên Vercel có thể đặt tiền tố cho tên biến (VD: DAILOANGIA_DATABASE_URL)
// tuỳ vào tên bạn gõ lúc kết nối Storage — dò cả biến không tiền tố lẫn có tiền tố.
const connectionString =
  process.env.DATABASE_URL ??
  Object.entries(process.env).find(([key]) => key.endsWith("_DATABASE_URL"))?.[1];

const adapter = new PrismaNeon({ connectionString: connectionString! });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
