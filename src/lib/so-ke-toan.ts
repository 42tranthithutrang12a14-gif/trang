import ExcelJS from "exceljs";
import type { Reviewable } from "@/lib/bat-dau";

export type LedgerGroup = { name: string; in_result: boolean; example: string };

export type LedgerExample = {
  day: number;
  month: number;
  doc: string;
  content: string;
  group: string;
  money_in: number | null;
  money_out: number | null;
  vat: number | null;
  fund: string;
  invoice: string;
  partner: string;
  note: string;
};

export type FormColumn = { label: string; group?: string; kind: "date" | "text" | "money"; total?: boolean };

/** A book in the official template (e.g. S1-DNSN), left blank for the user to fill in. */
export type FormSpec = {
  code: string;
  sheet: string;
  title: string;
  subtitle: string;
  balances: boolean;
  columns: FormColumn[];
};

/** Calculator for CIT as a percentage of revenue, one row per rate group. */
export type CitRateSheet = {
  sheet: string;
  title: string;
  intro: string[];
  rates: { group: string; rate: number }[];
  source: string;
};

export type LedgerSpec = Reviewable & {
  updated_at: string;
  title: string;
  summary: string;
  file_name: string;
  notice: string;
  how_to_use: string[];
  notes: string[];
  sheets: { name: string; desc: string }[];
  income_groups: LedgerGroup[];
  expense_groups: LedgerGroup[];
  spare_income_rows: number;
  spare_expense_rows: number;
  examples: LedgerExample[];
  forms: FormSpec[];
  form_issue_line: string;
  form_rows: number;
  cit_rate_sheet: CitRateSheet;
};

export const SHEETS = {
  guide: "Hướng dẫn",
  setup: "Thiết lập",
  journal: "Nhật ký thu chi",
  summary: "Tổng hợp",
} as const;

export const FUND_CASH = "Tiền mặt";
export const FUND_BANK = "Ngân hàng";
export const YES = "Có";
export const NO = "Không";

export const JOURNAL_HEADERS = [
  "Ngày",
  "Số chứng từ",
  "Nội dung",
  "Nhóm",
  "Tiền vào (đồng)",
  "Tiền ra (đồng)",
  "Trong đó thuế GTGT (đồng)",
  "Quỹ",
  "Số hóa đơn",
  "Khách hàng / Nhà cung cấp",
  "Ghi chú",
  "Tồn tiền mặt (tự tính)",
  "Tồn ngân hàng (tự tính)",
] as const;

const JOURNAL_INPUT_COLUMNS = 11;
const JOURNAL_WIDTHS = [12, 13, 34, 30, 16, 16, 16, 13, 13, 24, 24, 18, 18];
const JOURNAL_ROWS = 3000;
const MONTH_COLUMNS = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const YEAR_COLUMN = "N";

const FONT = { name: "Arial", size: 10 };
const COLOR = { blue: "FF1565C0", grey: "FF757575", input: "FFFFF2CC", auto: "FFF2F2F2", section: "FFE3F2FD", alert: "FFFFC7CE", warn: "FFFFE0B2" };
/** Purchases from this amount (VAT included) need a non-cash payment record (Decree 320/2025 Art. 9; Decree 181/2025 Art. 26). */
export const CASH_LIMIT = 5_000_000;
const MONEY = "#,##0";
const MONEY_DASH = '#,##0;-#,##0;"-"';
const DATE = "dd/mm/yyyy";

export function ledgerLayout(spec: LedgerSpec) {
  const incomeCount = spec.income_groups.length + spec.spare_income_rows;
  const expenseCount = spec.expense_groups.length + spec.spare_expense_rows;
  const groupFirst = 12;
  const setup = {
    company: "B4",
    taxCode: "B5",
    year: "B6",
    cashOpen: "B7",
    bankOpen: "B8",
    groupHeader: groupFirst - 1,
    incomeFirst: groupFirst,
    incomeLast: groupFirst + incomeCount - 1,
    expenseFirst: groupFirst + incomeCount,
    expenseLast: groupFirst + incomeCount + expenseCount - 1,
  };
  const journal = { header: 4, first: 5, last: 5 + JOURNAL_ROWS - 1 };
  const incomeDetailFirst = 29;
  const incomeTotal = incomeDetailFirst + incomeCount;
  const expenseDetailFirst = incomeTotal + 3;
  const summary = {
    bounds: 3,
    checkNoDate: 5,
    checkNoGroup: 6,
    checkNoFund: 7,
    checkOutsideYear: 8,
    header: 11,
    totalIn: 13,
    totalOut: 14,
    net: 15,
    cashEnd: 16,
    bankEnd: 17,
    revenue: 20,
    expense: 21,
    profit: 22,
    vatOut: 25,
    vatIn: 26,
    incomeDetailFirst,
    incomeDetailLast: incomeTotal - 1,
    incomeTotal,
    expenseDetailFirst,
    expenseDetailLast: expenseDetailFirst + expenseCount - 1,
    expenseTotal: expenseDetailFirst + expenseCount,
  };
  return { setup, journal, summary };
}

type Sheet = ExcelJS.Worksheet;

const solid = (argb: string): ExcelJS.Fill => ({ type: "pattern", pattern: "solid", fgColor: { argb } });
const quoted = (sheet: string) => `'${sheet}'`;
const formula = (text: string, result: string | number): ExcelJS.CellFormulaValue => ({ formula: text, result });

function setColumns(ws: Sheet, widths: number[], formats: Record<number, string> = {}) {
  widths.forEach((width, i) => {
    const column = ws.getColumn(i + 1);
    column.width = width;
    column.font = FONT;
    column.alignment = { vertical: "top", wrapText: false };
    if (formats[i + 1]) column.numFmt = formats[i + 1];
  });
}

function titleCell(ws: Sheet, address: string, text: string) {
  const cell = ws.getCell(address);
  cell.value = text;
  cell.font = { ...FONT, size: 14, bold: true };
}

function headerCell(cell: ExcelJS.Cell, text: string, argb: string) {
  cell.value = text;
  cell.font = { ...FONT, bold: true, color: { argb: "FFFFFFFF" } };
  cell.fill = solid(argb);
  cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
}

function sectionRow(ws: Sheet, row: number, text: string, lastColumn: number) {
  for (let col = 1; col <= lastColumn; col++) {
    const cell = ws.getCell(row, col);
    cell.fill = solid(COLOR.section);
    cell.font = { ...FONT, bold: true };
  }
  ws.getCell(row, 1).value = text;
}

function addValidation(ws: Sheet, range: string, validation: ExcelJS.DataValidation) {
  // exceljs supports range addresses here at runtime, but its typings do not expose the collection.
  (ws as unknown as { dataValidations: { add(address: string, v: ExcelJS.DataValidation): void } }).dataValidations.add(
    range,
    validation,
  );
}

function alertRule(formulaText: string, priority: number): ExcelJS.ConditionalFormattingRule {
  return {
    type: "expression",
    priority,
    formulae: [formulaText],
    style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: COLOR.alert } } },
  };
}

function buildSetup(ws: Sheet, spec: LedgerSpec, year: number) {
  const { setup } = ledgerLayout(spec);
  setColumns(ws, [36, 16, 18, 62]);
  titleCell(ws, "A1", "THIẾT LẬP");
  ws.getCell("A2").value = "Ô nền vàng là ô bạn gõ vào. Các trang khác lấy số từ trang này.";

  const inputs: [string, string, ExcelJS.CellValue, string?][] = [
    ["Tên công ty", setup.company, "", "@"],
    ["Mã số thuế", setup.taxCode, "", "@"],
    ["Năm ghi sổ", setup.year, year, "0"],
    ["Tiền mặt đầu năm (đồng)", setup.cashOpen, 0, MONEY],
    ["Tiền ngân hàng đầu năm (đồng)", setup.bankOpen, 0, MONEY],
  ];
  for (const [label, address, value, numFmt] of inputs) {
    const cell = ws.getCell(address);
    ws.getCell(`A${cell.row}`).value = label;
    cell.value = value;
    cell.fill = solid(COLOR.input);
    cell.alignment = { horizontal: "left" };
    if (numFmt) cell.numFmt = numFmt;
  }
  ws.mergeCells("B4:D4");
  ws.mergeCells("B5:D5");
  addValidation(ws, setup.year, {
    type: "whole",
    operator: "between",
    formulae: [2000, 2100],
    allowBlank: false,
    showErrorMessage: true,
    errorTitle: "Năm ghi sổ",
    error: "Gõ năm bằng 4 chữ số, ví dụ 2026.",
  });
  addValidation(ws, `${setup.cashOpen}:${setup.bankOpen}`, {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formulae: [0],
    allowBlank: true,
    showErrorMessage: true,
    errorTitle: "Số tiền",
    error: "Chỉ gõ số, không gõ chữ.",
  });

  sectionRow(ws, setup.groupHeader - 1, "DANH MỤC NHÓM THU, NHÓM CHI", 4);
  ["Tên nhóm", "Loại", "Tính vào lãi, lỗ?", "Ví dụ"].forEach((text, i) => {
    headerCell(ws.getCell(setup.groupHeader, i + 1), text, i === 1 ? COLOR.grey : COLOR.blue);
  });
  const rows = [
    ...Array.from({ length: setup.incomeLast - setup.incomeFirst + 1 }, (_, i) => ({ type: "Thu", group: spec.income_groups[i] })),
    ...Array.from({ length: setup.expenseLast - setup.expenseFirst + 1 }, (_, i) => ({ type: "Chi", group: spec.expense_groups[i] })),
  ];
  rows.forEach(({ type, group }, i) => {
    const row = setup.incomeFirst + i;
    const name = ws.getCell(row, 1);
    name.value = group?.name ?? null;
    name.fill = solid(COLOR.input);
    const kind = ws.getCell(row, 2);
    kind.value = type;
    kind.fill = solid(COLOR.auto);
    const flag = ws.getCell(row, 3);
    flag.value = group ? (group.in_result ? YES : NO) : YES;
    flag.fill = solid(COLOR.input);
    flag.alignment = { horizontal: "center" };
    const example = ws.getCell(row, 4);
    example.value = group?.example ?? null;
    example.fill = solid(COLOR.input);
  });
  addValidation(ws, `C${setup.incomeFirst}:C${setup.expenseLast}`, {
    type: "list",
    formulae: [`"${YES},${NO}"`],
    allowBlank: false,
    showErrorMessage: true,
    errorTitle: "Tính vào lãi, lỗ?",
    error: `Chọn ${YES} hoặc ${NO}.`,
  });
  const hintRow = setup.expenseLast + 2;
  const hint = ws.getCell(hintRow, 1);
  ws.mergeCells(hintRow, 1, hintRow, 4);
  hint.value = "Thêm nhóm: gõ tên vào dòng trống của phần Thu hoặc phần Chi. Nhóm chọn \"Không\" sẽ không tính vào lãi, lỗ tạm tính.";
  hint.alignment = { vertical: "top", wrapText: true };
  ws.getRow(hintRow).height = 30;
}

function buildJournal(ws: Sheet, spec: LedgerSpec, year: number) {
  const { setup, journal } = ledgerLayout(spec);
  const S = quoted(SHEETS.setup);
  const { first, last } = journal;
  setColumns(ws, JOURNAL_WIDTHS, { 1: DATE, 2: "@", 5: MONEY, 6: MONEY, 7: MONEY, 9: "@", 12: MONEY, 13: MONEY });
  ws.getColumn(3).alignment = { vertical: "top", wrapText: true };

  titleCell(ws, "A1", "NHẬT KÝ THU CHI");
  ws.getCell("A2").value = formula(
    `IF(${S}!$B$4="","","Công ty: "&${S}!$B$4&"   –   ")&"Năm "&${S}!$B$6`,
    `Năm ${year}`,
  );
  ws.getCell("A3").value =
    "Mỗi khoản tiền vào hoặc tiền ra ghi một dòng. Gõ vào các cột tiêu đề xanh. Cột tiêu đề xám tự tính, không gõ vào.";

  JOURNAL_HEADERS.forEach((text, i) => {
    headerCell(ws.getCell(journal.header, i + 1), text, i < JOURNAL_INPUT_COLUMNS ? COLOR.blue : COLOR.grey);
  });
  ws.getRow(journal.header).height = 32;

  for (let row = first; row <= last; row++) {
    const empty = `AND($E${row}="",$F${row}="")`;
    const balance = (open: string, fund: string) =>
      `IF(${empty},"",${S}!${open}+SUMIF($H$${first}:$H${row},"${fund}",$E$${first}:$E${row})-SUMIF($H$${first}:$H${row},"${fund}",$F$${first}:$F${row}))`;
    const cash = ws.getCell(row, 12);
    cash.value = formula(balance("$B$7", FUND_CASH), "");
    cash.fill = solid(COLOR.auto);
    const bank = ws.getCell(row, 13);
    bank.value = formula(balance("$B$8", FUND_BANK), "");
    bank.fill = solid(COLOR.auto);
  }

  addValidation(ws, `A${first}:A${last}`, {
    type: "date",
    operator: "greaterThan",
    formulae: [new Date(Date.UTC(2000, 0, 1))],
    allowBlank: true,
    showErrorMessage: true,
    errorTitle: "Ngày",
    error: "Gõ ngày theo dạng ngày/tháng/năm, ví dụ 05/01/2026.",
  });
  addValidation(ws, `D${first}:D${last}`, {
    type: "list",
    formulae: [`${S}!$A$${setup.incomeFirst}:$A$${setup.expenseLast}`],
    allowBlank: true,
    showErrorMessage: true,
    errorTitle: "Nhóm",
    error: "Chọn nhóm trong danh sách. Muốn thêm nhóm, sang trang Thiết lập.",
  });
  addValidation(ws, `E${first}:G${last}`, {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formulae: [0],
    allowBlank: true,
    showErrorMessage: true,
    errorTitle: "Số tiền",
    error: "Chỉ gõ số lớn hơn 0, không gõ chữ.",
  });
  addValidation(ws, `H${first}:H${last}`, {
    type: "list",
    formulae: [`"${FUND_CASH},${FUND_BANK}"`],
    allowBlank: true,
    showErrorMessage: true,
    errorTitle: "Quỹ",
    error: `Chọn ${FUND_CASH} hoặc ${FUND_BANK}.`,
  });

  const hasMoney = `OR($E${first}<>"",$F${first}<>"")`;
  ["A", "D", "H"].forEach((column, i) => {
    ws.addConditionalFormatting({
      ref: `${column}${first}:${column}${last}`,
      rules: [alertRule(`AND(${hasMoney},$${column}${first}="")`, i + 1)],
    });
  });
  ws.addConditionalFormatting({
    ref: `E${first}:F${last}`,
    rules: [alertRule(`AND($E${first}<>"",$F${first}<>"")`, 4)],
  });
  ws.addConditionalFormatting({
    ref: `F${first}:F${last}`,
    rules: [
      {
        type: "expression",
        priority: 5,
        formulae: [`AND(N($F${first})>=${CASH_LIMIT},$H${first}="${FUND_CASH}")`],
        style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: COLOR.warn } } },
      },
    ],
  });

  ws.views = [{ state: "frozen", ySplit: journal.header, xSplit: 0 }];
  ws.autoFilter = { from: { row: journal.header, column: 1 }, to: { row: last, column: JOURNAL_HEADERS.length } };
  ws.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0, printTitlesRow: `${journal.header}:${journal.header}` };
}

function buildSummary(ws: Sheet, spec: LedgerSpec, year: number) {
  const { setup, journal, summary } = ledgerLayout(spec);
  const S = quoted(SHEETS.setup);
  const J = quoted(SHEETS.journal);
  const range = (column: string) => `${J}!$${column}$${journal.first}:$${column}$${journal.last}`;
  const lastColumn = MONTH_COLUMNS.length + 2;
  setColumns(ws, [50, ...MONTH_COLUMNS.map(() => 14), 16]);
  for (let col = 2; col <= lastColumn; col++) ws.getColumn(col).numFmt = MONEY_DASH;
  ws.getColumn(1).alignment = { vertical: "top", wrapText: true };

  titleCell(ws, "A1", "TỔNG HỢP THEO THÁNG");
  ws.getCell("A2").value = formula(`"Năm "&${S}!$B$6&". Trang này tự tính từ trang Nhật ký thu chi. Không gõ vào trang này."`, `Năm ${year}. Trang này tự tính từ trang Nhật ký thu chi. Không gõ vào trang này.`);

  MONTH_COLUMNS.forEach((column, i) => {
    ws.getCell(`${column}${summary.bounds}`).value = { formula: `DATE(${S}!$B$6,${i + 1},1)` };
  });
  ws.getCell(`${YEAR_COLUMN}${summary.bounds}`).value = { formula: `DATE(${S}!$B$6+1,1,1)` };
  ws.getRow(summary.bounds).numFmt = DATE;
  ws.getRow(summary.bounds).hidden = true;

  sectionRow(ws, 4, "KIỂM TRA TRƯỚC KHI XEM SỐ (cả 4 số phải bằng 0)", 2);
  const missing = (column: string) =>
    `SUMPRODUCT(((${range("E")}<>"")+(${range("F")}<>"")>0)*(${range(column)}=""))`;
  const checks: [number, string, string][] = [
    [summary.checkNoDate, "Số dòng có tiền nhưng chưa ghi Ngày", missing("A")],
    [summary.checkNoGroup, "Số dòng có tiền nhưng chưa chọn Nhóm", missing("D")],
    [summary.checkNoFund, "Số dòng có tiền nhưng chưa chọn Quỹ", missing("H")],
    [
      summary.checkOutsideYear,
      "Số dòng có ngày nằm ngoài năm ghi sổ",
      `COUNTIFS(${range("A")},"<"&$B$${summary.bounds})+COUNTIFS(${range("A")},">="&$${YEAR_COLUMN}$${summary.bounds})`,
    ],
  ];
  for (const [row, label, text] of checks) {
    ws.getCell(row, 1).value = label;
    const cell = ws.getCell(row, 2);
    cell.value = formula(text, 0);
    cell.numFmt = "0";
    cell.fill = solid(COLOR.auto);
  }
  ws.addConditionalFormatting({
    ref: `B${summary.checkNoDate}:B${summary.checkOutsideYear}`,
    rules: [
      {
        type: "cellIs",
        operator: "greaterThan",
        priority: 1,
        formulae: [0],
        style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: COLOR.alert } } },
      },
    ],
  });
  ws.getCell(summary.checkOutsideYear + 1, 1).value =
    "Số nào lớn hơn 0: sang trang Nhật ký thu chi, tìm các ô đỏ nhạt và điền cho đủ.";

  headerCell(ws.getCell(summary.header, 1), "Chỉ tiêu (đồng)", COLOR.grey);
  MONTH_COLUMNS.forEach((_, i) => headerCell(ws.getCell(summary.header, i + 2), `Tháng ${i + 1}`, COLOR.grey));
  headerCell(ws.getCell(summary.header, lastColumn), "Cả năm", COLOR.grey);

  const monthly = (row: number, label: string, build: (column: string, next: string) => string, yearTotal: "sum" | "last") => {
    ws.getCell(row, 1).value = label;
    MONTH_COLUMNS.forEach((column, i) => {
      const next = MONTH_COLUMNS[i + 1] ?? YEAR_COLUMN;
      ws.getCell(`${column}${row}`).value = formula(build(column, next), 0);
    });
    ws.getCell(`${YEAR_COLUMN}${row}`).value = formula(
      yearTotal === "sum" ? `SUM(B${row}:M${row})` : `M${row}`,
      0,
    );
  };
  const inMonth = (column: string, next: string) =>
    `${range("A")},">="&${column}$${summary.bounds},${range("A")},"<"&${next}$${summary.bounds}`;
  const fundEnd = (open: string, fund: string) => (_: string, next: string) =>
    `${S}!${open}+SUMIFS(${range("E")},${range("H")},"${fund}",${range("A")},"<"&${next}$${summary.bounds})-SUMIFS(${range("F")},${range("H")},"${fund}",${range("A")},"<"&${next}$${summary.bounds})`;

  sectionRow(ws, summary.totalIn - 1, "A. TIỀN VÀO, TIỀN RA", lastColumn);
  monthly(summary.totalIn, "Tổng tiền vào", (c, n) => `SUMIFS(${range("E")},${inMonth(c, n)})`, "sum");
  monthly(summary.totalOut, "Tổng tiền ra", (c, n) => `SUMIFS(${range("F")},${inMonth(c, n)})`, "sum");
  monthly(summary.net, "Tiền vào trừ tiền ra", (c) => `${c}${summary.totalIn}-${c}${summary.totalOut}`, "sum");
  monthly(summary.cashEnd, "Tồn tiền mặt cuối tháng", fundEnd("$B$7", FUND_CASH), "last");
  monthly(summary.bankEnd, "Tồn ngân hàng cuối tháng", fundEnd("$B$8", FUND_BANK), "last");

  sectionRow(ws, summary.revenue - 1, "B. LÃI, LỖ TẠM TÍNH (chưa gồm thuế GTGT; số theo dõi nội bộ, chưa phải lợi nhuận tính thuế)", lastColumn);
  const flagged = (firstSetup: number, lastSetup: number, firstDetail: number, lastDetail: number) => (c: string) =>
    `SUMIF(${S}!$C$${firstSetup}:$C$${lastSetup},"${YES}",${c}${firstDetail}:${c}${lastDetail})`;
  monthly(
    summary.revenue,
    "Thu tính vào lãi, lỗ",
    flagged(setup.incomeFirst, setup.incomeLast, summary.incomeDetailFirst, summary.incomeDetailLast),
    "sum",
  );
  monthly(
    summary.expense,
    "Chi tính vào lãi, lỗ",
    flagged(setup.expenseFirst, setup.expenseLast, summary.expenseDetailFirst, summary.expenseDetailLast),
    "sum",
  );
  monthly(summary.profit, "Lãi (+), lỗ (−) tạm tính", (c) => `${c}${summary.revenue}-${c}${summary.expense}`, "sum");
  ws.getRow(summary.profit).font = { ...FONT, bold: true };

  sectionRow(ws, summary.vatOut - 1, "C. THUẾ GTGT GHI TRÊN HÓA ĐƠN", lastColumn);
  monthly(summary.vatOut, "Thuế GTGT trong các khoản tiền vào (thường là thuế bán ra)", (c, n) => `SUMIFS(${range("G")},${range("E")},">0",${inMonth(c, n)})`, "sum");
  monthly(summary.vatIn, "Thuế GTGT trong các khoản tiền ra (thường là thuế mua vào)", (c, n) => `SUMIFS(${range("G")},${range("F")},">0",${inMonth(c, n)})`, "sum");

  const details = (title: string, firstDetail: number, lastDetail: number, totalRow: number, firstSetup: number, groups: LedgerGroup[], plus: string, minus: string) => {
    sectionRow(ws, firstDetail - 1, title, lastColumn);
    for (let row = firstDetail; row <= lastDetail; row++) {
      const source = `${S}!$A$${firstSetup + (row - firstDetail)}`;
      ws.getCell(row, 1).value = formula(`IF(${source}="","",${source})`, groups[row - firstDetail]?.name ?? "");
      MONTH_COLUMNS.forEach((column, i) => {
        const next = MONTH_COLUMNS[i + 1] ?? YEAR_COLUMN;
        const sums = (money: string) =>
          `SUMIFS(${range(money)},${range("D")},$A${row},${inMonth(column, next)})-SUMIFS(${range("G")},${range("D")},$A${row},${range(money)},">0",${inMonth(column, next)})`;
        ws.getCell(`${column}${row}`).value = formula(`IF($A${row}="",0,(${sums(plus)})-(${sums(minus)}))`, 0);
      });
      ws.getCell(`${YEAR_COLUMN}${row}`).value = formula(`SUM(B${row}:M${row})`, 0);
    }
    ws.getCell(totalRow, 1).value = "Cộng";
    [...MONTH_COLUMNS, YEAR_COLUMN].forEach((column) => {
      ws.getCell(`${column}${totalRow}`).value = formula(`SUM(${column}${firstDetail}:${column}${lastDetail})`, 0);
    });
    ws.getRow(totalRow).font = { ...FONT, bold: true };
  };
  details("D. CHI TIẾT CÁC NHÓM THU (chưa gồm thuế GTGT)", summary.incomeDetailFirst, summary.incomeDetailLast, summary.incomeTotal, setup.incomeFirst, spec.income_groups, "E", "F");
  details("E. CHI TIẾT CÁC NHÓM CHI (chưa gồm thuế GTGT)", summary.expenseDetailFirst, summary.expenseDetailLast, summary.expenseTotal, setup.expenseFirst, spec.expense_groups, "F", "E");

  ws.views = [{ state: "frozen", ySplit: summary.header, xSplit: 1 }];
  ws.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
}

function buildGuide(ws: Sheet, spec: LedgerSpec, year: number) {
  const textColumns = [2, 5] as const;
  const textWidth = JOURNAL_WIDTHS.slice(0, 4).reduce((sum, width) => sum + width, 0);
  setColumns(ws, [3, ...JOURNAL_WIDTHS.slice(0, JOURNAL_INPUT_COLUMNS)]);
  let row = 1;

  const text = (value: string, font: Partial<ExcelJS.Font> = {}) => {
    ws.mergeCells(row, textColumns[0], row, textColumns[1]);
    const cell = ws.getCell(row, textColumns[0]);
    cell.value = value;
    const size = font.size ?? FONT.size;
    cell.font = { ...FONT, ...font };
    cell.alignment = { vertical: "top", wrapText: true };
    const charsPerLine = textWidth * (FONT.size / size);
    ws.getRow(row).height = Math.ceil(value.length / charsPerLine) * (size + 4) + 2;
    row++;
  };
  const heading = (value: string) => {
    row++;
    ws.mergeCells(row, textColumns[0], row, textColumns[1]);
    const cell = ws.getCell(row, textColumns[0]);
    cell.value = value;
    cell.font = { ...FONT, bold: true };
    cell.fill = solid(COLOR.section);
    row++;
  };

  text(`${spec.title.toUpperCase()} – DOANH NGHIỆP SIÊU NHỎ`, { size: 14, bold: true });
  if (spec.status !== "published" && spec.sample_notice) {
    text(`${spec.sample_notice}. ${spec.notice}`, { bold: true, color: { argb: "FFC62828" } });
  } else {
    text(spec.notice);
  }

  heading("CÁCH DÙNG");
  spec.how_to_use.forEach((line, i) => text(`${i + 1}. ${line}`));

  heading("LƯU Ý");
  spec.notes.forEach((line) => text(`• ${line}`));

  heading("CHÚ GIẢI MÀU");
  const legend: [string, string][] = [
    [COLOR.input, "Ô nền vàng (trang Thiết lập): bạn gõ vào."],
    [COLOR.blue, "Cột tiêu đề nền xanh (trang Nhật ký thu chi): bạn gõ vào."],
    [COLOR.grey, "Cột tiêu đề nền xám và ô nền xám: file tự tính, không gõ vào."],
    [COLOR.alert, "Ô đỏ nhạt: dòng còn thiếu ngày, nhóm hoặc quỹ."],
    [COLOR.warn, "Ô cam (cột Tiền ra): chi từ 5.000.000 đồng trở lên bằng tiền mặt. Khoản này có thể không được tính vào chi phí và không được khấu trừ thuế GTGT."],
  ];
  for (const [argb, label] of legend) {
    ws.getCell(row, 2).fill = solid(argb);
    ws.mergeCells(row, 3, row, 5);
    ws.getCell(row, 3).value = label;
    row++;
  }

  heading("VÍ DỤ CÁCH GHI Ở TRANG NHẬT KÝ THU CHI (số giả định)");
  JOURNAL_HEADERS.slice(0, JOURNAL_INPUT_COLUMNS).forEach((label, i) => headerCell(ws.getCell(row, i + 2), label, COLOR.blue));
  ws.getRow(row).height = 32;
  row++;
  for (const example of spec.examples) {
    const values: ExcelJS.CellValue[] = [
      new Date(Date.UTC(year, example.month - 1, example.day)),
      example.doc,
      example.content,
      example.group,
      example.money_in,
      example.money_out,
      example.vat,
      example.fund,
      example.invoice,
      example.partner,
      example.note,
    ];
    values.forEach((value, i) => {
      const cell = ws.getCell(row, i + 2);
      cell.value = value === "" ? null : value;
      if (i === 0) cell.numFmt = DATE;
      if (i >= 4 && i <= 6) cell.numFmt = MONEY;
    });
    row++;
  }

  row++;
  text(`Nguồn: Sổ tay DN Siêu nhỏ. Cập nhật: ${spec.updated_at}. Thông tin mang tính tham khảo, không phải tư vấn kế toán hay thuế.`, { italic: true });
}

export function formLayout(form: FormSpec, rows: number) {
  const grouped = form.columns.some((column) => column.group);
  const header = 8;
  const subHeader = grouped ? header + 1 : header;
  const opening = form.balances ? subHeader + 1 : null;
  const first = (opening ?? subHeader) + 1;
  const last = first + rows - 1;
  const total = last + 1;
  const closing = form.balances ? total + 1 : null;
  return { header, subHeader, opening, first, last, total, closing, footer: (closing ?? total) + 2 };
}

function buildForm(ws: Sheet, spec: LedgerSpec, form: FormSpec, year: number) {
  const S = quoted(SHEETS.setup);
  const layout = formLayout(form, spec.form_rows);
  const count = form.columns.length;
  const describe = form.columns.findIndex((column) => column.label === "Diễn giải") + 1;
  setColumns(
    ws,
    form.columns.map((column) => (column.label === "Diễn giải" ? 34 : column.kind === "money" ? 15 : 13)),
  );
  form.columns.forEach((column, i) => {
    const col = ws.getColumn(i + 1);
    if (column.kind === "date") col.numFmt = DATE;
    if (column.kind === "money") col.numFmt = MONEY;
    if (column.kind === "text") col.numFmt = "@";
  });
  ws.getColumn(describe).alignment = { vertical: "top", wrapText: true };

  const half = Math.max(2, Math.floor(count / 2));
  ws.mergeCells(1, 1, 1, half);
  ws.getCell(1, 1).value = formula(`"Đơn vị: "&${S}!$B$4`, "Đơn vị: ");
  ws.mergeCells(2, 1, 2, half);
  ws.getCell(2, 1).value = formula(`"Mã số thuế: "&${S}!$B$5`, "Mã số thuế: ");
  ws.mergeCells(1, half + 1, 1, count);
  const code = ws.getCell(1, half + 1);
  code.value = `Mẫu số ${form.code}`;
  code.font = { ...FONT, bold: true };
  code.alignment = { horizontal: "center" };
  ws.mergeCells(2, half + 1, 2, count);
  const issue = ws.getCell(2, half + 1);
  issue.value = spec.form_issue_line;
  issue.font = { ...FONT, italic: true };
  issue.alignment = { horizontal: "center", wrapText: true };
  ws.getRow(2).height = 28;

  const centered = (row: number, value: ExcelJS.CellValue, font: Partial<ExcelJS.Font> = {}) => {
    ws.mergeCells(row, 1, row, count);
    const cell = ws.getCell(row, 1);
    cell.value = value;
    cell.font = { ...FONT, ...font };
    cell.alignment = { horizontal: "center", wrapText: true };
  };
  centered(4, form.title, { size: 12, bold: true });
  ws.getRow(4).height = 32;
  centered(5, formula(`"Năm "&${S}!$B$6`, `Năm ${year}`));
  if (form.subtitle) centered(6, form.subtitle);
  if (spec.status !== "published" && spec.sample_notice) {
    centered(7, `${spec.sample_notice}. Trang này để trống, bạn tự ghi. Chưa tự lấy số từ trang ${SHEETS.journal}.`, {
      bold: true,
      color: { argb: "FFC62828" },
    });
  }

  form.columns.forEach((column, i) => {
    const col = i + 1;
    if (column.group) {
      headerCell(ws.getCell(layout.header, col), column.group, COLOR.blue);
      headerCell(ws.getCell(layout.subHeader, col), column.label, COLOR.blue);
    } else {
      headerCell(ws.getCell(layout.header, col), column.label, COLOR.blue);
      if (layout.subHeader !== layout.header) ws.mergeCells(layout.header, col, layout.subHeader, col);
    }
  });
  for (let i = 0; i < count; ) {
    const group = form.columns[i].group;
    let j = i;
    while (group && j + 1 < count && form.columns[j + 1].group === group) j++;
    if (group && j > i) ws.mergeCells(layout.header, i + 1, layout.header, j + 1);
    i = j + 1;
  }
  ws.getRow(layout.header).height = 30;
  ws.getRow(layout.subHeader).height = 30;

  const labelRow = (row: number | null, text: string, bold = true) => {
    if (row === null) return;
    const cell = ws.getCell(row, describe);
    cell.value = text;
    cell.font = { ...FONT, bold };
  };
  labelRow(layout.opening, "Số dư đầu kỳ");
  for (let row = layout.first; row <= layout.last; row++) {
    for (let col = 1; col <= count; col++) ws.getCell(row, col).fill = solid(COLOR.input);
  }
  labelRow(layout.total, "Cộng số phát sinh trong kỳ");
  form.columns.forEach((column, i) => {
    if (column.kind !== "money" || !column.total) return;
    const letter = ws.getColumn(i + 1).letter;
    const cell = ws.getCell(layout.total, i + 1);
    cell.value = formula(`SUM(${letter}${layout.first}:${letter}${layout.last})`, 0);
    cell.fill = solid(COLOR.auto);
    cell.font = { ...FONT, bold: true };
  });
  labelRow(layout.closing, "Số dư cuối kỳ");

  let row = layout.footer;
  ws.getCell(row++, 1).value = "- Sổ này có … trang, đánh số từ trang 01 đến trang …";
  ws.getCell(row++, 1).value = "- Ngày mở sổ: …";
  row++;
  const signers: [string, string][] = [
    ["Người lập biểu", "(Ký, họ tên)"],
    ["Kế toán trưởng", "(Ký, họ tên)"],
    ["Người đại diện theo pháp luật", "(Ký, họ tên, đóng dấu)"],
  ];
  const span = Math.max(1, Math.floor(count / signers.length));
  signers.forEach(([role, hint], i) => {
    const from = i * span + 1;
    const to = i === signers.length - 1 ? count : from + span - 1;
    ws.mergeCells(row, from, row, to);
    ws.mergeCells(row + 1, from, row + 1, to);
    const roleCell = ws.getCell(row, from);
    roleCell.value = role;
    roleCell.font = { ...FONT, bold: true };
    roleCell.alignment = { horizontal: "center" };
    const hintCell = ws.getCell(row + 1, from);
    hintCell.value = hint;
    hintCell.font = { ...FONT, italic: true };
    hintCell.alignment = { horizontal: "center" };
  });

  ws.views = [{ state: "frozen", ySplit: layout.subHeader, xSplit: 0 }];
  ws.pageSetup = {
    orientation: "landscape",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    printTitlesRow: `${layout.header}:${layout.subHeader}`,
  };
}

export function citRateLayout(spec: LedgerSpec) {
  const header = 4 + spec.cit_rate_sheet.intro.length + 1;
  const first = header + 1;
  const last = first + spec.cit_rate_sheet.rates.length - 1;
  return { header, first, last, total: last + 1 };
}

function buildCitRates(ws: Sheet, spec: LedgerSpec, year: number) {
  const S = quoted(SHEETS.setup);
  const calc = spec.cit_rate_sheet;
  const layout = citRateLayout(spec);
  setColumns(ws, [62, 12, 20, 20]);
  ws.getColumn(1).alignment = { vertical: "top", wrapText: true };
  titleCell(ws, "A1", calc.title);
  ws.getCell("A2").value = formula(`"Năm "&${S}!$B$6`, `Năm ${year}`);
  if (spec.status !== "published" && spec.sample_notice) {
    const draft = ws.getCell("A3");
    draft.value = `${spec.sample_notice}. Chỉ để tham khảo, không thay tờ khai thuế.`;
    draft.font = { ...FONT, bold: true, color: { argb: "FFC62828" } };
  }
  calc.intro.forEach((line, i) => {
    const row = 4 + i;
    ws.mergeCells(row, 1, row, 4);
    const cell = ws.getCell(row, 1);
    cell.value = `• ${line}`;
    cell.alignment = { vertical: "top", wrapText: true };
    ws.getRow(row).height = Math.ceil(line.length / 110) * 14 + 2;
  });

  ["Nhóm ngành", "Tỷ lệ", "Doanh thu (đồng)", "Thuế TNDN (tự tính)"].forEach((text, i) => {
    headerCell(ws.getCell(layout.header, i + 1), text, i === 2 ? COLOR.blue : COLOR.grey);
  });
  ws.getRow(layout.header).height = 30;
  calc.rates.forEach(({ group, rate }, i) => {
    const row = layout.first + i;
    ws.getCell(row, 1).value = group;
    const rateCell = ws.getCell(row, 2);
    rateCell.value = rate;
    rateCell.numFmt = "0.0%";
    rateCell.fill = solid(COLOR.auto);
    const revenue = ws.getCell(row, 3);
    revenue.numFmt = MONEY;
    revenue.fill = solid(COLOR.input);
    const tax = ws.getCell(row, 4);
    tax.value = formula(`ROUND(B${row}*C${row},0)`, 0);
    tax.numFmt = MONEY_DASH;
    tax.fill = solid(COLOR.auto);
  });
  addValidation(ws, `C${layout.first}:C${layout.last}`, {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formulae: [0],
    allowBlank: true,
    showErrorMessage: true,
    errorTitle: "Doanh thu",
    error: "Chỉ gõ số, không gõ chữ.",
  });
  ws.getCell(layout.total, 1).value = "Cộng";
  for (const column of ["C", "D"]) {
    const cell = ws.getCell(`${column}${layout.total}`);
    cell.value = formula(`SUM(${column}${layout.first}:${column}${layout.last})`, 0);
    cell.numFmt = MONEY_DASH;
  }
  ws.getRow(layout.total).font = { ...FONT, bold: true };
  const source = ws.getCell(layout.total + 2, 1);
  source.value = calc.source;
  source.font = { ...FONT, italic: true };
}

export function buildLedgerWorkbook(spec: LedgerSpec, year: number): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Sổ tay DN Siêu nhỏ";
  workbook.calcProperties.fullCalcOnLoad = true;
  buildGuide(workbook.addWorksheet(SHEETS.guide), spec, year);
  buildSetup(workbook.addWorksheet(SHEETS.setup), spec, year);
  buildJournal(workbook.addWorksheet(SHEETS.journal), spec, year);
  buildSummary(workbook.addWorksheet(SHEETS.summary), spec, year);
  for (const form of spec.forms) buildForm(workbook.addWorksheet(form.sheet), spec, form, year);
  buildCitRates(workbook.addWorksheet(spec.cit_rate_sheet.sheet), spec, year);
  return workbook;
}
