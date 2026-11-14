import { describe, it, expect } from "vitest";
import type ExcelJS from "exceljs";
import ledgerJson from "@/content/so-ke-toan.json";
import {
  CASH_LIMIT,
  FUND_BANK,
  FUND_CASH,
  JOURNAL_HEADERS,
  NO,
  SHEETS,
  YES,
  buildLedgerWorkbook,
  citRateLayout,
  formLayout,
  ledgerLayout,
  type LedgerSpec,
} from "@/lib/so-ke-toan";

const SPEC = ledgerJson as LedgerSpec;
const GROUPS = [...SPEC.income_groups, ...SPEC.expense_groups];
const LAYOUT = ledgerLayout(SPEC);
const WORKBOOK = buildLedgerWorkbook(SPEC, 2026);
const ALL_SHEETS = [...Object.values(SHEETS), ...SPEC.forms.map((form) => form.sheet), SPEC.cit_rate_sheet.sheet];

function sheet(name: string): ExcelJS.Worksheet {
  const ws = WORKBOOK.getWorksheet(name);
  if (!ws) throw new Error(`Thiếu trang ${name}`);
  return ws;
}

function formulaOf(ws: ExcelJS.Worksheet, address: string): string {
  const value = ws.getCell(address).value;
  return value && typeof value === "object" && "formula" in value ? (value.formula ?? "") : "";
}

function validations(ws: ExcelJS.Worksheet): Record<string, ExcelJS.DataValidation> {
  return (ws as unknown as { dataValidations: { model: Record<string, ExcelJS.DataValidation> } }).dataValidations.model;
}

describe("so-ke-toan.json", () => {
  it("SK1: bản nháp có sample_notice MẪU – CHƯA XÁC MINH", () => {
    expect(SPEC.status).toBe("draft");
    expect(SPEC.sample_notice).toContain("MẪU – CHƯA XÁC MINH");
  });

  it("SK2: tên nhóm không trống, không trùng nhau", () => {
    const names = GROUPS.map((group) => group.name.trim());
    expect(names.every((name) => name.length > 0)).toBe(true);
    expect(new Set(names.map((name) => name.toLowerCase())).size).toBe(names.length);
  });

  it("SK3: ví dụ chỉ dùng nhóm và quỹ có trong sổ, mỗi dòng một chiều tiền", () => {
    const names = GROUPS.map((group) => group.name);
    for (const example of SPEC.examples) {
      expect(names).toContain(example.group);
      expect([FUND_CASH, FUND_BANK]).toContain(example.fund);
      expect([example.money_in, example.money_out].filter((amount) => amount !== null)).toHaveLength(1);
    }
  });

  it("SK4: danh sách trang trong JSON khớp với file", () => {
    expect(SPEC.sheets.map((s) => s.name)).toEqual(ALL_SHEETS);
    expect(WORKBOOK.worksheets.map((ws) => ws.name)).toEqual(ALL_SHEETS);
  });
});

describe("buildLedgerWorkbook", () => {
  it("SK5: trang Thiết lập liệt kê đủ nhóm, đúng loại và cờ lãi lỗ", () => {
    const setup = sheet(SHEETS.setup);
    SPEC.income_groups.forEach((group, i) => {
      const row = LAYOUT.setup.incomeFirst + i;
      expect(setup.getCell(row, 1).value).toBe(group.name);
      expect(setup.getCell(row, 2).value).toBe("Thu");
      expect(setup.getCell(row, 3).value).toBe(group.in_result ? YES : NO);
    });
    SPEC.expense_groups.forEach((group, i) => {
      const row = LAYOUT.setup.expenseFirst + i;
      expect(setup.getCell(row, 1).value).toBe(group.name);
      expect(setup.getCell(row, 2).value).toBe("Chi");
    });
    expect(setup.getCell(LAYOUT.setup.expenseLast, 2).value).toBe("Chi");
    expect(setup.getCell(LAYOUT.setup.year).value).toBe(2026);
  });

  it("SK6: nhật ký có đủ cột, danh sách chọn Nhóm trỏ tới toàn bộ danh mục", () => {
    const journal = sheet(SHEETS.journal);
    JOURNAL_HEADERS.forEach((label, i) => {
      expect(journal.getCell(LAYOUT.journal.header, i + 1).value).toBe(label);
    });
    const { first, last } = LAYOUT.journal;
    const model = validations(journal);
    expect(model[`D${first}:D${last}`].formulae[0]).toBe(
      `'${SHEETS.setup}'!$A$${LAYOUT.setup.incomeFirst}:$A$${LAYOUT.setup.expenseLast}`,
    );
    expect(model[`H${first}:H${last}`].formulae[0]).toBe(`"${FUND_CASH},${FUND_BANK}"`);
  });

  it("SK7: tồn quỹ tự tính ở mọi dòng nhật ký, theo đúng quỹ", () => {
    const journal = sheet(SHEETS.journal);
    const { first, last } = LAYOUT.journal;
    for (const row of [first, first + 1, last]) {
      const cash = formulaOf(journal, `L${row}`);
      const bank = formulaOf(journal, `M${row}`);
      expect(cash).toContain(`SUMIF($H$${first}:$H${row},"${FUND_CASH}",$E$${first}:$E${row})`);
      expect(cash).toContain("$B$7");
      expect(bank).toContain(`SUMIF($H$${first}:$H${row},"${FUND_BANK}",$F$${first}:$F${row})`);
      expect(bank).toContain("$B$8");
    }
    expect(formulaOf(journal, `L${last + 1}`)).toBe("");
  });

  it("SK8: trang Tổng hợp có công thức cho 12 tháng và cả năm ở mọi chỉ tiêu", () => {
    const summary = sheet(SHEETS.summary);
    const s = LAYOUT.summary;
    const rows = [
      s.totalIn, s.totalOut, s.net, s.cashEnd, s.bankEnd, s.revenue, s.expense, s.profit, s.vatOut, s.vatIn,
      s.incomeDetailFirst, s.incomeDetailLast, s.incomeTotal, s.expenseDetailFirst, s.expenseDetailLast, s.expenseTotal,
    ];
    for (const row of rows) {
      for (const column of ["B", "M", "N"]) {
        expect(formulaOf(summary, `${column}${row}`), `${column}${row}`).not.toBe("");
      }
    }
    expect(s.incomeDetailLast - s.incomeDetailFirst).toBe(LAYOUT.setup.incomeLast - LAYOUT.setup.incomeFirst);
    expect(s.expenseDetailLast - s.expenseDetailFirst).toBe(LAYOUT.setup.expenseLast - LAYOUT.setup.expenseFirst);
    expect(formulaOf(summary, `B${s.revenue}`)).toContain(`"${YES}"`);
  });

  it("SK9: mọi công thức tham chiếu trang khác đều đặt tên trang trong dấu nháy", () => {
    for (const ws of WORKBOOK.worksheets) {
      ws.eachRow((row) => {
        row.eachCell((cell) => {
          const text = formulaOf(ws, cell.address);
          for (const name of Object.values(SHEETS)) {
            const unquoted = text.split(`'${name}'!`).join("").includes(`${name}!`);
            expect(unquoted, `${ws.name}!${cell.address}`).toBe(false);
          }
        });
      });
    }
  });

  it("SK10: file ghi ra được và đọc lại đủ các trang", async () => {
    const buffer = await WORKBOOK.xlsx.writeBuffer();
    expect(buffer.byteLength).toBeGreaterThan(20_000);
    const { default: Excel } = await import("exceljs");
    const reread = new Excel.Workbook();
    await reread.xlsx.load(buffer);
    expect(reread.worksheets.map((ws) => ws.name)).toEqual(ALL_SHEETS);
  });

  it("SK11: trang sổ theo mẫu có mã mẫu, dòng ban hành, đủ cột và dòng cộng", () => {
    expect(SPEC.forms.map((form) => form.code)).toEqual(["S1-DNSN", "S2-DNSN", "S3-DNSN", "S4-DNSN"]);
    for (const form of SPEC.forms) {
      const ws = sheet(form.sheet);
      const layout = formLayout(form, SPEC.form_rows);
      const texts: string[] = [];
      ws.getRow(1).eachCell((cell) => texts.push(String(cell.value)));
      expect(texts, form.code).toContain(`Mẫu số ${form.code}`);
      let issue = "";
      ws.getRow(2).eachCell((cell) => {
        if (typeof cell.value === "string") issue = cell.value;
      });
      expect(issue).toContain("132/2018/TT-BTC");
      form.columns.forEach((column, i) => {
        expect(ws.getCell(layout.subHeader, i + 1).value, `${form.code} cột ${i + 1}`).toBe(column.label);
        const total = formulaOf(ws, ws.getCell(layout.total, i + 1).address);
        if (column.kind === "money" && column.total) {
          expect(total).toContain(`${layout.first}:`);
          expect(total).toContain(`${layout.last})`);
        } else {
          expect(total).toBe("");
        }
      });
      expect(layout.opening !== null).toBe(form.balances);
    }
  });

  it("SK12: trang thuế TNDN theo % doanh thu có đủ 6 tỷ lệ của Nghị định 320/2025 và tự nhân", () => {
    const calc = SPEC.cit_rate_sheet;
    expect(calc.rates.map((r) => r.rate)).toEqual([0.003, 0.012, 0.015, 0.04, 0.04, 0.005]);
    const ws = sheet(calc.sheet);
    const layout = citRateLayout(SPEC);
    calc.rates.forEach((rate, i) => {
      const row = layout.first + i;
      expect(ws.getCell(row, 1).value).toBe(rate.group);
      expect(ws.getCell(row, 2).value).toBe(rate.rate);
      expect(formulaOf(ws, `D${row}`)).toBe(`ROUND(B${row}*C${row},0)`);
    });
    expect(formulaOf(ws, `D${layout.total}`)).toBe(`SUM(D${layout.first}:D${layout.last})`);
  });

  it("SK13: tô màu dòng chi tiền mặt từ 5 triệu đồng (Nghị định 320/2025 Điều 9)", () => {
    expect(CASH_LIMIT).toBe(5_000_000);
    const journal = sheet(SHEETS.journal);
    const { first, last } = LAYOUT.journal;
    const list = (journal as unknown as { conditionalFormattings: { ref: string; rules: { formulae?: string[] }[] }[] })
      .conditionalFormattings;
    const rule = list.find((cf) => cf.ref === `F${first}:F${last}`);
    expect(rule).toBeDefined();
    const formulaText = rule!.rules[0].formulae?.[0] ?? "";
    expect(formulaText).toContain(`>=${CASH_LIMIT}`);
    expect(formulaText).toContain(`"${FUND_CASH}"`);
  });
});
