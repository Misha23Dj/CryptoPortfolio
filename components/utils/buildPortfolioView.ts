import { formatMoney, formatPercent, signedMoney } from "./format";

export type HoldingInput = {
  id: string;
  symbol: string;
  name: string;
  qty?: number;
  cost?: number;
  pl?: number;
  plPct?: number;
};

export type PriceInput = {
  symbol: string;
  price?: number;
  chg24?: number;
};

export type HoldingRowView = {
  id: string;
  symbol: string;
  name: string;
  currentPriceAmountText: string;
  change24hPercentText: string;
  positionValueAmountText: string;
  profitLossSignedAmountText: string;
  profitLossPercentText: string;
  profitLossIsNegative: boolean;
};

export const buildPortfolioView = ({
  holdings,
  prices,
}: {
  holdings: HoldingInput[];
  prices: PriceInput[];
}) => {
  const priceBySymbol = new Map(prices.map((p) => [p.symbol, p]));

  const computedHoldings = holdings.map((h) => {
    const priceEntry = priceBySymbol.get(h.symbol);
    const hasLivePrice = typeof priceEntry?.price === "number";
    const price = hasLivePrice ? (priceEntry!.price as number) : 0;
    const change24h =
      hasLivePrice && typeof priceEntry?.chg24 === "number"
        ? (priceEntry!.chg24 as number)
        : 0;
    const quantity = h.qty ?? 0;
    const positionValue = price * quantity;
    const profitLoss =
      h.pl ?? (h.cost != null ? positionValue - (h.cost as number) : 0);
    const profitLossPercent =
      h.plPct ?? (h.cost ? (h.cost > 0 ? profitLoss / h.cost : 0) : 0);
    return {
      id: h.id,
      symbol: h.symbol,
      name: h.name,
      price,
      change24h,
      quantity,
      positionValue,
      profitLoss,
      profitLossPercent,
    };
  });

  const rows: HoldingRowView[] = computedHoldings.map((c) => ({
    id: c.id,
    symbol: c.symbol,
    name: c.name,
    currentPriceAmountText: formatMoney(c.price),
    change24hPercentText: formatPercent(c.change24h),
    positionValueAmountText: formatMoney(c.positionValue),
    profitLossSignedAmountText: signedMoney(c.profitLoss),
    profitLossPercentText: formatPercent(c.profitLossPercent),
    profitLossIsNegative: c.profitLoss < 0,
  }));

  const totalValue = computedHoldings.reduce((s, r) => s + r.positionValue, 0);
  const totalProfitLoss = computedHoldings.reduce(
    (s, r) => s + r.profitLoss,
    0
  );
  const totalCost = totalValue - totalProfitLoss;
  const weightedChangeNumerator = computedHoldings.reduce(
    (s, r) => s + r.positionValue * r.change24h,
    0
  );
  const weightedChange =
    totalValue > 0 ? weightedChangeNumerator / totalValue : 0;

  return {
    rows,
    totals: {
      balanceAmountText: formatMoney(totalValue),
      totalCostAmountText: formatMoney(Math.max(0, totalCost)),
      profitLossSignedAmountText: signedMoney(totalProfitLoss),
      profitLossPercentText:
        totalCost > 0 ? formatPercent(totalProfitLoss / totalCost) : "0.00%",
      change24hPercentText: formatPercent(weightedChange),
      change24hIsPositive: weightedChange >= 0,
    },
    lastUpdatedText: "Just now",
  };
};
