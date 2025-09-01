import {
  formatMoney,
  formatPercent,
  signedMoney,
} from "@/components/utils/format";

it("formatMoney formats to USD with 2 decimals", () => {
  expect(formatMoney(0)).toBe("$0.00");
  expect(formatMoney(1234.5)).toBe("$1,234.50");
  expect(formatMoney(1234.567)).toBe("$1,234.57");
});

it("formatPercent formats as XX.XX%", () => {
  expect(formatPercent(0)).toBe("0.00%");
  expect(formatPercent(0.1234)).toBe("12.34%");
  expect(formatPercent(-0.1)).toBe("-10.00%");
});

it("signedMoney includes sign and currency", () => {
  expect(signedMoney(0)).toBe("$0.00");
  expect(signedMoney(100)).toBe("+$100.00");
  expect(signedMoney(-42.1)).toBe("-$42.10");
});
