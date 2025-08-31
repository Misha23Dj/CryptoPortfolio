export type Theme = {
  bg: string;
  text: string;
  muted: string;
  border: string;
  positive: string;
  negative: string;
  card: string;
  kpiLabel: string;
  kpiValue: string;
  barStyle: "light" | "dark";
  statusBarBg: string;
};

export const light: Theme = {
  bg: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e5e7eb",
  positive: "#16a34a",
  negative: "#dc2626",
  card: "#f8fafc",
  kpiLabel: "#64748b",
  kpiValue: "#0f172a",
  barStyle: "dark",
  statusBarBg: "#ffffff",
};

export const dark: Theme = {
  bg: "#0b1220",
  text: "#e5e7eb",
  muted: "#9aa4b2",
  border: "#1f2937",
  positive: "#22c55e",
  negative: "#f87171",
  card: "#111827",
  kpiLabel: "#9aa4b2",
  kpiValue: "#e5e7eb",
  barStyle: "light",
  statusBarBg: "#0b1220",
};
