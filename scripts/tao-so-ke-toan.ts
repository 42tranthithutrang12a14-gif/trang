import { writeFile } from "node:fs/promises";
import ledgerJson from "../src/content/so-ke-toan.json";
import { buildLedgerWorkbook, type LedgerSpec } from "../src/lib/so-ke-toan";

const output = process.argv[2];

if (!output) {
  console.error("Cách dùng: npm run tao-so -- duong-dan/so-thu-chi.xlsx");
  process.exit(1);
}

const workbook = buildLedgerWorkbook(ledgerJson as LedgerSpec, new Date().getFullYear());
workbook.xlsx
  .writeBuffer()
  .then((buffer) => writeFile(output, Buffer.from(buffer)))
  .then(() => console.log(`Đã tạo ${output}`));
