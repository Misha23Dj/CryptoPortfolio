export type SortMode = "value" | "change24h" | "pl";

const moneyNumber = (s?: string) => {
  if (typeof s !== "string") return 0;
  const n = Number(s.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const percentNumber = (s?: string) => {
  if (typeof s !== "string") return 0;
  const n = Number(s.replace("%", ""));
  return Number.isFinite(n) ? n : 0;
};

const rowValueMoney = (row: any) =>
  moneyNumber(
    row.currentValueAmountText ??
      row.positionValueAmountText ??
      row.valueAmountText
  );

const rowChangePct = (row: any) =>
  percentNumber(row.change24hPercentText ?? row.changePercentText);

const rowPLPct = (row: any) =>
  percentNumber(row.profitLossPercentText ?? row.plPercentText);

export const sortRows = (rows: any[], mode: SortMode) => {
  const arr = Array.isArray(rows) ? [...rows] : [];
  if (mode === "value")
    return arr.sort((a, b) => rowValueMoney(b) - rowValueMoney(a));
  if (mode === "change24h")
    return arr.sort((a, b) => rowChangePct(b) - rowChangePct(a));
  return arr.sort((a, b) => rowPLPct(b) - rowPLPct(a));
};
