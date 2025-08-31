import {
  directionSymbol,
  formatMoney,
  formatPercent,
  signedMoney,
} from "@/components/utils/format";

describe("format helpers", () => {
  test("formatMoney", () => {
    expect(formatMoney(0)).toBe("$0.00");
    expect(formatMoney(1234.5)).toBe("$1,234.50");
  });

  test("formatPercent (ratio in, percent out)", () => {
    expect(formatPercent(0)).toBe("0.00%");
    expect(formatPercent(0.025)).toBe("2.50%");
    expect(formatPercent(-0.1)).toBe("-10.00%");
  });

  test("signedMoney", () => {
    expect(signedMoney(12)).toBe("+$12.00");
    expect(signedMoney(-3)).toBe("-$3.00");
    expect(signedMoney(0)).toBe("+$0.00");
  });

  test("directionSymbol", () => {
    expect(directionSymbol(0.1)).toBe("▲");
    expect(directionSymbol(-0.1)).toBe("▼");
    expect(directionSymbol(0)).toBe("•");
  });
});
