import {
  buildPortfolioView,
  type HoldingInput,
  type PriceInput,
} from "@/components/utils/buildPortfolioView";

const holdings: HoldingInput[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", qty: 0.5, cost: 21000 * 0.5 },
  { id: "eth", symbol: "ETH", name: "Ethereum", qty: 3, cost: 1300 * 3 },
];

const prices: PriceInput[] = [
  { symbol: "BTC", price: 63000, chg24: 0.02 },
  { symbol: "ETH", price: 3000, chg24: -0.05 },
];

it("computes row texts and totals correctly", () => {
  const view = buildPortfolioView({ holdings, prices });

  const btc = view.rows.find((r) => r.symbol === "BTC")!;
  expect(btc.quantityText).toBe("0.5");
  expect(btc.purchaseUnitPriceAmountText).toBe("$21,000.00");
  expect(btc.currentPriceAmountText).toBe("$63,000.00");
  expect(btc.currentValueAmountText).toBe("$31,500.00");
  expect(btc.profitLossSignedAmountText).toBe("+$21,000.00");
  expect(btc.personalChangePercentText).toBe("200.00%");
  expect(btc.profitLossPercentText).toBe("200.00%");

  const totals = view.totals;
  expect(totals.balanceAmountText).toBe("$40,500.00");
  expect(totals.totalCostAmountText).toBe("$14,400.00");
  expect(totals.profitLossSignedAmountText).toBe("+$26,100.00");
  expect(totals.profitLossPercentText).toBe("181.25%");
  expect(totals.change24hPercentText).toBe("0.44%");
});

it("handles missing prices as zero without NaN", () => {
  const partial: PriceInput[] = [{ symbol: "BTC", price: 63000, chg24: 0.02 }];
  const view = buildPortfolioView({ holdings, prices: partial });
  const eth = view.rows.find((r) => r.symbol === "ETH")!;
  expect(eth.currentPriceAmountText).toBe("$0.00");
  expect(eth.currentValueAmountText).toBe("$0.00");
  expect(eth.profitLossSignedAmountText).toBe("-$3,900.00");
  expect(eth.profitLossPercentText).toBe("-100.00%");
});
