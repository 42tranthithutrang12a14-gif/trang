import type {
  Schedule,
  ObligationInstance,
  ShiftRule,
} from "./types";

/** Get today's date in Asia/Ho_Chi_Minh timezone as YYYY-MM-DD */
export function getTodayInVN(now?: Date): string {
  return (now ?? new Date()).toLocaleDateString("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
}

/** Number of days between two YYYY-MM-DD strings (a - b in days) */
function daysDiff(a: string, b: string): number {
  const da = new Date(a + "T00:00:00Z");
  const db = new Date(b + "T00:00:00Z");
  return Math.round((da.getTime() - db.getTime()) / 86400000);
}

function addDaysToDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Last day of a month as YYYY-MM-DD */
function lastDayOfMonth(year: number, month: number): string {
  const d = new Date(Date.UTC(year, month, 0)); // day 0 of next month = last day of this
  return d.toISOString().slice(0, 10);
}

/** Get YYYY-MM-DD for day N of a given year/month. Clamps to last day if N > days in month */
function clampedDate(year: number, month: number, day: number | "last"): string {
  if (day === "last") return lastDayOfMonth(year, month);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const clampedDay = Math.min(day, lastDay);
  return `${year}-${String(month).padStart(2, "0")}-${String(clampedDay).padStart(2, "0")}`;
}

/** Weekday of a YYYY-MM-DD (0=Sun, 6=Sat) */
function weekday(dateStr: string): number {
  return new Date(dateStr + "T00:00:00Z").getUTCDay();
}

/** Apply shift rule. Returns possibly-shifted date and original if shifted */
export function applyShift(
  dateStr: string,
  shiftRule: ShiftRule,
  holidays: string[]
): { dueDate: string; shiftedFrom?: string } {
  if (shiftRule === "none") return { dueDate: dateStr };

  let d = dateStr;
  let shifted = false;

  while (weekday(d) === 0 || weekday(d) === 6 || holidays.includes(d)) {
    d = addDaysToDate(d, 1);
    shifted = true;
  }

  return shifted ? { dueDate: d, shiftedFrom: dateStr } : { dueDate: d };
}

/** Quarter number (1-4) from month (1-12) */
function quarterOf(month: number): number {
  return Math.ceil(month / 3);
}

/** Last month of a quarter (1-12) */
function lastMonthOfQuarter(quarter: number): number {
  return quarter * 3;
}

/** Add N months to year/month, returns [year, month] */
function addMonths(year: number, month: number, n: number): [number, number] {
  const total = month - 1 + n;
  return [year + Math.floor(total / 12), (total % 12) + 1];
}

type Period = {
  label: string;
  periodStart: string;
  periodEnd: string;
  rawDueDate: string;
};

function generateMonthlyPeriods(
  foundingDate: string,
  offsetMonths: number,
  dueDay: number | "last",
  firstPeriod: "containing_founding" | "after_founding",
  windowStart: string,
  windowEnd: string
): Period[] {
  const [fy, fm] = foundingDate.slice(0, 7).split("-").map(Number);

  // Determine first period month
  let startYear = fy;
  let startMonth = fm;
  if (firstPeriod === "after_founding") {
    [startYear, startMonth] = addMonths(fy, fm, 1);
  }

  const periods: Period[] = [];
  let y = startYear;
  let m = startMonth;

  // Generate up to 3 years worth of periods to ensure we cover the window
  for (let i = 0; i < 36 * 2; i++) {
    const periodStart = `${y}-${String(m).padStart(2, "0")}-01`;
    const periodEnd = lastDayOfMonth(y, m);

    const [dy, dm] = addMonths(y, m, offsetMonths);
    const rawDueDate = clampedDate(dy, dm, dueDay);

    if (rawDueDate > windowEnd) break;

    if (rawDueDate >= windowStart) {
      periods.push({
        label: `Tháng ${m}/${y}`,
        periodStart,
        periodEnd,
        rawDueDate,
      });
    }

    [y, m] = addMonths(y, m, 1);
  }

  return periods;
}

function generateQuarterlyPeriods(
  foundingDate: string,
  offsetMonths: number,
  dueDay: number | "last",
  firstPeriod: "containing_founding" | "after_founding",
  windowStart: string,
  windowEnd: string
): Period[] {
  const [fy, fm] = foundingDate.slice(0, 7).split("-").map(Number);
  const foundingQuarter = quarterOf(fm);

  let startYear = fy;
  let startQuarter = foundingQuarter;

  if (firstPeriod === "after_founding") {
    startQuarter++;
    if (startQuarter > 4) {
      startQuarter = 1;
      startYear++;
    }
  }

  const periods: Period[] = [];
  let y = startYear;
  let q = startQuarter;

  for (let i = 0; i < 20; i++) {
    const qStartMonth = (q - 1) * 3 + 1;
    const qEndMonth = lastMonthOfQuarter(q);
    const periodStart = `${y}-${String(qStartMonth).padStart(2, "0")}-01`;
    const periodEnd = lastDayOfMonth(y, qEndMonth);

    const [dy, dm] = addMonths(y, qEndMonth, offsetMonths);
    const rawDueDate = clampedDate(dy, dm, dueDay);

    if (rawDueDate > windowEnd) break;

    if (rawDueDate >= windowStart) {
      periods.push({
        label: `Quý ${q}/${y}`,
        periodStart,
        periodEnd,
        rawDueDate,
      });
    }

    q++;
    if (q > 4) {
      q = 1;
      y++;
    }
  }

  return periods;
}

function generateYearlyPeriods(
  foundingDate: string,
  offsetMonths: number,
  dueDay: number | "last",
  fiscalYearEnd: string,
  windowStart: string,
  windowEnd: string
): Period[] {
  // fiscal_year_end is typically "12-31" meaning Dec 31
  const [fyEndMonth, fyEndDay] = fiscalYearEnd.split("-").map(Number);
  const [fy] = foundingDate.slice(0, 4).split("-").map(Number);

  const periods: Period[] = [];

  for (let year = fy - 1; year <= fy + 10; year++) {
    const lastDay =
      fyEndDay === 0
        ? lastDayOfMonth(year, fyEndMonth)
        : clampedDate(year, fyEndMonth, fyEndDay);
    const periodStart = `${year - 1 < fy ? foundingDate : `${year - 1}-${String(fyEndMonth).padStart(2, "0")}-${String(fyEndDay + 1).padStart(2, "0")}`}`;
    const periodEnd = lastDay;

    const [dy, dm] = addMonths(year, fyEndMonth, offsetMonths);
    const rawDueDate = clampedDate(dy, dm, dueDay);

    if (rawDueDate > windowEnd) break;
    if (rawDueDate >= windowStart) {
      periods.push({
        label: `Năm ${year}`,
        periodStart: `${year}-01-01`,
        periodEnd: lastDay,
        rawDueDate,
      });
    }
  }

  return periods;
}

/**
 * Generate obligation instances for a rule within the window [today-90d, today+365d].
 * Dates in YYYY-MM-DD, timezone-agnostic (already adjusted to VN timezone before calling).
 */
export function generateInstances(
  ruleCode: string,
  ruleVersion: number,
  schedule: Schedule,
  answers: Record<string, string>,
  today: string,
  holidays: string[]
): ObligationInstance[] {
  const windowStart = addDaysToDate(today, -90);
  const windowEnd = addDaysToDate(today, 365);

  const foundingDate = answers["founding_date"] ?? today;

  let rawPeriods: Period[] = [];

  switch (schedule.type) {
    case "monthly":
      rawPeriods = generateMonthlyPeriods(
        foundingDate,
        schedule.offset_months,
        schedule.due_day,
        schedule.first_period,
        windowStart,
        windowEnd
      );
      break;

    case "quarterly":
      rawPeriods = generateQuarterlyPeriods(
        foundingDate,
        schedule.offset_months,
        schedule.due_day,
        schedule.first_period,
        windowStart,
        windowEnd
      );
      break;

    case "yearly":
      rawPeriods = generateYearlyPeriods(
        foundingDate,
        schedule.offset_months,
        schedule.due_day,
        "12-31",
        windowStart,
        windowEnd
      );
      break;

    case "once_after_event": {
      const eventDate = answers[schedule.event_field];
      if (!eventDate) break;
      const rawDueDate = addDaysToDate(eventDate, schedule.days);
      if (rawDueDate >= windowStart && rawDueDate <= windowEnd) {
        rawPeriods = [
          {
            label: "Một lần",
            periodStart: eventDate,
            periodEnd: eventDate,
            rawDueDate,
          },
        ];
      }
      break;
    }

    case "once_fixed":
      if (schedule.date >= windowStart && schedule.date <= windowEnd) {
        rawPeriods = [
          {
            label: "Một lần",
            periodStart: schedule.date,
            periodEnd: schedule.date,
            rawDueDate: schedule.date,
          },
        ];
      }
      break;
  }

  return rawPeriods.map((p) => {
    const shifted = applyShift(p.rawDueDate, "schedule" in schedule ? (schedule as { shift_rule?: ShiftRule }).shift_rule ?? "none" : "none", holidays);
    return {
      ruleCode,
      ruleVersion,
      periodLabel: p.label,
      periodStart: p.periodStart,
      periodEnd: p.periodEnd,
      dueDate: shifted.dueDate,
      shiftedFrom: shifted.shiftedFrom,
    };
  });
}

/** Select the correct rule version for a given period end date */
export function selectRuleVersion<T extends { version: number; effective_from: string; effective_to: string | null }>(
  rules: T[],
  periodEndDate: string
): T | undefined {
  // Find all versions effective on the period end date
  const eligible = rules.filter(
    (r) =>
      r.effective_from <= periodEndDate &&
      (r.effective_to === null || r.effective_to >= periodEndDate)
  );
  if (eligible.length === 0) return undefined;
  // Pick highest version
  return eligible.reduce((a, b) => (a.version > b.version ? a : b));
}
