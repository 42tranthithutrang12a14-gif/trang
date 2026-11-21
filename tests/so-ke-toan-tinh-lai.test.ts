import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import ExcelJS from "exceljs";
import { describe, it, expect } from "vitest";
import ledgerJson from "@/content/so-ke-toan.json";
import { FUND_BANK, FUND_CASH, SHEETS, buildLedgerWorkbook, ledgerLayout, type LedgerSpec } from "@/lib/so-ke-toan";

// Fills the workbook with test rows, lets LibreOffice recalculate it, and compares every summary
// figure and running balance with values computed here. Skipped where LibreOffice is not installed.
const hasLibreOffice = spawnSync("soffice", ["--version"]).status === 0;

const SPEC = ledgerJson as LedgerSpec;
const LAYOUT = ledgerLayout(SPEC);
const YEAR = 2026;
const CASH_OPEN = 2_000_000;
const BANK_OPEN = 30_000_000;
const CUSTOM = "Cho thuê lại mặt bằng";
const SALES = SPEC.income_groups[0].name;
const OTHER = SPEC.income_groups[1].name;
const group = (name: string) => {
  const found = [...SPEC.income_groups, ...SPEC.expense_groups].find((g) => g.name === name);
  if (!found) throw new Error(`Không có nhóm ${name}`);
  return found.name;
};
const day = (d: number, m: number, y = YEAR) => new Date(Date.UTC(y, m - 1, d));

type Entry = { date: Date | null; group: string | null; in?: number; out?: number; vat?: number; fund: string | null };

const ENTRIES: (Entry | null)[] = [
  { date: day(5, 1), group: group("Chủ sở hữu góp vốn"), in: 50_000_000, fund: FUND_BANK },
  { date: day(6, 1), group: group("Mua hàng hóa, nguyên vật liệu"), out: 11_000_000, vat: 1_000_000, fund: FUND_BANK },
  { date: day(7, 1), group: SALES, in: 3_300_000, vat: 300_000, fund: FUND_CASH },
  { date: day(10, 1), group: group("Thuê mặt bằng, văn phòng"), out: 5_000_000, fund: FUND_CASH },
  { date: day(12, 1), group: group("Chuyển tiền nội bộ đi"), out: 10_000_000, fund: FUND_BANK },
  { date: day(12, 1), group: group("Nhận tiền chuyển nội bộ"), in: 10_000_000, fund: FUND_CASH },
  { date: day(31, 1), group: SALES, in: 22_000_000, vat: 2_000_000, fund: FUND_BANK },
  { date: day(1, 2), group: group("Lương, tiền công"), out: 8_000_000, fund: FUND_CASH },
  { date: day(15, 2), group: SALES, out: 1_100_000, vat: 100_000, fund: FUND_CASH }, // trả lại tiền cho khách
  { date: day(20, 2), group: OTHER, in: 500_000, fund: FUND_CASH },
  { date: day(28, 2), group: group("Nộp thuế"), out: 1_200_000, fund: FUND_BANK }, // không tính vào lãi lỗ
  { date: day(3, 3), group: CUSTOM, in: 2_200_000, vat: 200_000, fund: FUND_BANK }, // nhóm người dùng tự thêm
  { date: day(10, 3), group: SALES, in: 1_000_000, fund: null }, // thiếu quỹ
  { date: day(11, 3), group: null, out: 300_000, fund: FUND_CASH }, // thiếu nhóm
  { date: null, group: group("Mua hàng hóa, nguyên vật liệu"), out: 700_000, fund: FUND_CASH }, // thiếu ngày
  { date: day(15, 12, YEAR - 1), group: SALES, in: 900_000, fund: FUND_CASH }, // ngoài năm ghi sổ
  { date: day(31, 12), group: SALES, in: 1_100_000, vat: 100_000, fund: FUND_CASH },
  null, // dòng trống ở giữa
  { date: day(5, 4), group: group("Điện, nước, internet, điện thoại"), out: 550_000, vat: 50_000, fund: FUND_BANK },
];

const incomeNames = [...SPEC.income_groups.map((g) => g.name), CUSTOM];
const expenseNames = SPEC.expense_groups.map((g) => g.name);
const inResult = new Map([...SPEC.income_groups, ...SPEC.expense_groups].map((g) => [g.name, g.in_result]));
inResult.set(CUSTOM, true);

const numberAt = (ws: ExcelJS.Worksheet, address: string): number | string => {
  const cell = ws.getCell(address);
  const value = cell.formula ? cell.result : cell.value;
  return typeof value === "number" ? value : value === null || value === undefined ? "" : String(value);
};

async function recalculated(): Promise<ExcelJS.Workbook> {
  const workbook = buildLedgerWorkbook(SPEC, YEAR);
  const setup = workbook.getWorksheet(SHEETS.setup)!;
  setup.getCell(LAYOUT.setup.cashOpen).value = CASH_OPEN;
  setup.getCell(LAYOUT.setup.bankOpen).value = BANK_OPEN;
  setup.getCell(LAYOUT.setup.incomeFirst + SPEC.income_groups.length, 1).value = CUSTOM;
  const journal = workbook.getWorksheet(SHEETS.journal)!;
  ENTRIES.forEach((entry, i) => {
    if (!entry) return;
    const row = LAYOUT.journal.first + i;
    const cells: [number, ExcelJS.CellValue | undefined][] = [
      [1, entry.date], [4, entry.group], [5, entry.in], [6, entry.out], [7, entry.vat], [8, entry.fund],
    ];
    for (const [column, value] of cells) {
      if (value !== null && value !== undefined) journal.getCell(row, column).value = value;
    }
  });
  // Drop cached results so LibreOffice has to compute every formula.
  for (const ws of workbook.worksheets) {
    ws.eachRow((row) => row.eachCell((cell) => {
      if (cell.formula) cell.value = { formula: cell.formula };
    }));
  }
  const dir = mkdtempSync(path.join(os.tmpdir(), "so-thu-chi-"));
  const source = path.join(dir, "so.xlsx");
  await workbook.xlsx.writeFile(source);
  execFileSync(
    "soffice",
    [`-env:UserInstallation=file://${dir}/profile`, "--headless", "--norestore", "--convert-to", "xlsx", "--outdir", path.join(dir, "out"), source],
    { timeout: 240_000, stdio: "ignore" },
  );
  const result = new ExcelJS.Workbook();
  await result.xlsx.readFile(path.join(dir, "out", "so.xlsx"));
  return result;
}

describe.skipIf(!hasLibreOffice)("sổ thu chi: LibreOffice tính lại với số liệu thử", () => {
  it("SK11: tồn quỹ từng dòng và mọi chỉ tiêu tổng hợp 12 tháng khớp số tính độc lập", async () => {
    const workbook = await recalculated();
    const journal = workbook.getWorksheet(SHEETS.journal)!;
    const summary = workbook.getWorksheet(SHEETS.summary)!;
    const s = LAYOUT.summary;
    const mismatches: string[] = [];
    const check = (label: string, got: number | string, want: number | string) => {
      if (got !== want) mismatches.push(`${label}: file=${JSON.stringify(got)} mong đợi=${JSON.stringify(want)}`);
    };

    for (const ws of workbook.worksheets) {
      ws.eachRow((row) => row.eachCell((cell) => {
        const value = cell.formula ? cell.result : cell.value;
        const text = value && typeof value === "object" && "error" in value ? String(value.error) : String(value ?? "");
        if (/^#(REF|NAME|VALUE|DIV|N\/A|NUM|NULL)/.test(text)) mismatches.push(`${ws.name}!${cell.address}: ${text}`);
      }));
    }

    let cash = CASH_OPEN;
    let bank = BANK_OPEN;
    ENTRIES.forEach((entry, i) => {
      const row = LAYOUT.journal.first + i;
      if (!entry) {
        check(`L${row} (dòng trống)`, numberAt(journal, `L${row}`), "");
        return;
      }
      const delta = (entry.in ?? 0) - (entry.out ?? 0);
      if (entry.fund === FUND_CASH) cash += delta;
      if (entry.fund === FUND_BANK) bank += delta;
      check(`L${row} tồn tiền mặt`, numberAt(journal, `L${row}`), cash);
      check(`M${row} tồn ngân hàng`, numberAt(journal, `M${row}`), bank);
    });
    check("dòng chưa ghi vẫn trống", numberAt(journal, `L${LAYOUT.journal.first + ENTRIES.length}`), "");

    const entries = ENTRIES.filter((entry): entry is Entry => entry !== null);
    const net = (amount: number | undefined, vat: number | undefined) => (amount ? amount - (vat ?? 0) : 0);
    const yearTotals = new Map<number, number>();
    for (let month = 1; month <= 12; month++) {
      const column = String.fromCharCode("A".charCodeAt(0) + month);
      const inMonth = entries.filter((e) => e.date && e.date.getUTCFullYear() === YEAR && e.date.getUTCMonth() === month - 1);
      const upToMonthEnd = entries.filter((e) => e.date && e.date.getTime() < Date.UTC(YEAR, month, 1));
      const fundEnd = (open: number, fund: string) =>
        open + upToMonthEnd.filter((e) => e.fund === fund).reduce((sum, e) => sum + (e.in ?? 0) - (e.out ?? 0), 0);
      const detail = (names: string[], sign: 1 | -1) =>
        names.map((name) => inMonth.filter((e) => e.group === name).reduce((sum, e) => sum + sign * (net(e.in, e.vat) - net(e.out, e.vat)), 0));
      const incomeDetail = detail(incomeNames, 1);
      const expenseDetail = detail(expenseNames, -1);
      const flagged = (names: string[], values: number[]) => values.reduce((sum, value, i) => sum + (inResult.get(names[i]) ? value : 0), 0);
      const totalIn = inMonth.reduce((sum, e) => sum + (e.in ?? 0), 0);
      const totalOut = inMonth.reduce((sum, e) => sum + (e.out ?? 0), 0);
      const revenue = flagged(incomeNames, incomeDetail);
      const cost = flagged(expenseNames, expenseDetail);
      const expected = new Map<number, number>([
        [s.totalIn, totalIn],
        [s.totalOut, totalOut],
        [s.net, totalIn - totalOut],
        [s.cashEnd, fundEnd(CASH_OPEN, FUND_CASH)],
        [s.bankEnd, fundEnd(BANK_OPEN, FUND_BANK)],
        [s.revenue, revenue],
        [s.expense, cost],
        [s.profit, revenue - cost],
        [s.vatOut, inMonth.reduce((sum, e) => sum + (e.in ? (e.vat ?? 0) : 0), 0)],
        [s.vatIn, inMonth.reduce((sum, e) => sum + (e.out ? (e.vat ?? 0) : 0), 0)],
        [s.incomeTotal, incomeDetail.reduce((a, b) => a + b, 0)],
        [s.expenseTotal, expenseDetail.reduce((a, b) => a + b, 0)],
      ]);
      incomeDetail.forEach((value, i) => expected.set(s.incomeDetailFirst + i, value));
      expenseDetail.forEach((value, i) => expected.set(s.expenseDetailFirst + i, value));
      for (const [row, want] of expected) {
        check(`Tổng hợp tháng ${month}, dòng ${row}`, numberAt(summary, `${column}${row}`), want);
        const keepsLast = row === s.cashEnd || row === s.bankEnd;
        yearTotals.set(row, keepsLast ? want : (yearTotals.get(row) ?? 0) + want);
      }
    }
    for (const [row, want] of yearTotals) {
      check(`Tổng hợp cả năm, dòng ${row}`, numberAt(summary, `N${row}`), want);
    }

    incomeNames.forEach((name, i) => check(`tên nhóm thu ${i + 1}`, numberAt(summary, `A${s.incomeDetailFirst + i}`), name));
    expenseNames.forEach((name, i) => check(`tên nhóm chi ${i + 1}`, numberAt(summary, `A${s.expenseDetailFirst + i}`), name));
    for (const row of [s.checkNoDate, s.checkNoGroup, s.checkNoFund, s.checkOutsideYear]) {
      check(`ô kiểm tra dòng ${row}`, numberAt(summary, `B${row}`), 1);
    }

    expect(mismatches).toEqual([]);
  }, 300_000);
});
