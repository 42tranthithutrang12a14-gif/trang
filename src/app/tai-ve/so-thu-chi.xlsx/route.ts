import ledgerJson from "@/content/so-ke-toan.json";
import { isVisible } from "@/lib/bat-dau";
import { CONTENT_PREVIEW } from "@/lib/content/preview";
import { buildLedgerWorkbook, type LedgerSpec } from "@/lib/so-ke-toan";

export const dynamic = "force-static";

const SPEC = ledgerJson as LedgerSpec;

export async function GET() {
  if (!isVisible(SPEC.status, CONTENT_PREVIEW)) {
    return new Response("Không tìm thấy", { status: 404 });
  }
  const workbook = buildLedgerWorkbook(SPEC, new Date().getFullYear());
  const buffer = await workbook.xlsx.writeBuffer();
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${SPEC.file_name}"`,
    },
  });
}
