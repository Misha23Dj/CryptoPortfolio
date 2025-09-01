import {
  buildPortfolioView,
  type HoldingInput,
  type PriceInput,
} from "@/components/utils/buildPortfolioView";

describe("buildPortfolioView", () => {
  it("computes rows and totals for a simple happy path", () => {
    const holdings: HoldingInput[] = [
      { id: "btc", symbol: "BTC", name: "Bitcoin", qty: 0.5, cost: 15000 },
    ];
    const prices: PriceInput[] = [
      { symbol: "BTC", price: 63321.12, chg24: 0.02 },
    ];

    const view = buildPortfolioView({ holdings, prices });

    expect(view.rows).toHaveLength(1);
    expect(view.rows[0].name).toBe("Bitcoin");
    expect(view.rows[0].currentPriceAmountText).toBe("$63,321.12");
    expect(view.rows[0].change24hPercentText).toBe("2.00%");
    expect(view.rows[0].positionValueAmountText).toBe("$31,660.56");
    expect(view.rows[0].profitLossSignedAmountText.startsWith("+$")).toBe(true);
    expect(view.rows[0].profitLossPercentText).toBe("111.07%");
    expect(view.rows[0].profitLossIsNegative).toBe(false);

    expect(view.totals.balanceAmountText).toBe("$31,660.56");
    expect(view.totals.change24hPercentText).toBe("2.00%");
    expect(view.totals.change24hIsPositive).toBe(true);
    expect(view.lastUpdatedText).toBe("Just now");
  });

  it("treats missing prices as zero for 24h change and sets totals accordingly", () => {
    const holdings: HoldingInput[] = [
      { id: "btc", symbol: "BTC", name: "Bitcoin", qty: 1, cost: 1000 },
    ];
    const prices: PriceInput[] = [];

    const view = buildPortfolioView({ holdings, prices });

    expect(view.totals.balanceAmountText).toBe("$0.00");
    expect(view.totals.profitLossSignedAmountText).toBe("-$1,000.00");
    expect(view.totals.profitLossPercentText).toBe("-100.00%");
    expect(view.totals.change24hPercentText).toBe("0.00%");
    expect(view.totals.change24hIsPositive).toBe(true);
  });
});
