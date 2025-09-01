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
  quantityText: string;
  purchaseUnitPriceAmountText: string;
  purchaseCostAmountText: string;
  currentPriceAmountText: string;
  currentValueAmountText: string;
  change24hPercentText: string;
  personalChangePercentText: string;
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

  const computed = holdings.map((h) => {
    const priceEntry = priceBySymbol.get(h.symbol);
    const hasPrice =
      typeof priceEntry?.price === "number" &&
      Number.isFinite(priceEntry.price as number);
    const price = hasPrice ? (priceEntry!.price as number) : 0;
    const change24h =
      hasPrice && typeof priceEntry?.chg24 === "number"
        ? (priceEntry!.chg24 as number)
        : 0;
    const qty = h.qty ?? 0;
    const purchaseCostTotal = h.cost ?? 0;
    const purchaseUnitPrice = qty > 0 ? purchaseCostTotal / qty : 0;
    const currentValue = price * qty;

    const derivedPL = h.cost != null ? currentValue - (h.cost as number) : 0;
    const profitLoss = typeof h.pl === "number" ? h.pl : derivedPL;
    const derivedPLPct = h.cost ? (h.cost > 0 ? profitLoss / h.cost : 0) : 0;
    const profitLossPercent =
      typeof h.plPct === "number" ? h.plPct : derivedPLPct;

    return {
      id: h.id,
      symbol: h.symbol,
      name: h.name,
      qty,
      purchaseCostTotal,
      purchaseUnitPrice,
      price,
      hasPrice,
      change24h,
      currentValue,
      profitLoss,
      profitLossPercent,
    };
  });

  const totalPurchaseCost = computed.reduce(
    (s, r) => s + r.purchaseCostTotal,
    0
  );
  const totalCurrentValue = computed.reduce(
    (s, r) => s + (r.hasPrice ? r.currentValue : 0),
    0
  );
  const totalProfitLoss = computed.reduce(
    (s, r) => s + (r.hasPrice ? r.profitLoss : 0),
    0
  );
  const weightedChangeNumerator = computed.reduce(
    (s, r) => s + (r.hasPrice ? r.currentValue * r.change24h : 0),
    0
  );
  const weightedChange =
    totalCurrentValue > 0 ? weightedChangeNumerator / totalCurrentValue : 0;

  const rows: HoldingRowView[] = computed.map((r) => ({
    id: r.id,
    symbol: r.symbol,
    name: r.name,
    quantityText: r.qty.toString(),
    purchaseUnitPriceAmountText: formatMoney(r.purchaseUnitPrice),
    purchaseCostAmountText: formatMoney(r.purchaseCostTotal),
    currentPriceAmountText: r.hasPrice
      ? formatMoney(r.price)
      : "Price unavailable",
    currentValueAmountText: r.hasPrice ? formatMoney(r.currentValue) : "—",
    change24hPercentText: r.hasPrice ? formatPercent(r.change24h) : "0.00%",
    personalChangePercentText: r.hasPrice
      ? formatPercent(r.profitLossPercent)
      : "—",
    profitLossSignedAmountText: r.hasPrice ? signedMoney(r.profitLoss) : "—",
    profitLossPercentText: r.hasPrice
      ? formatPercent(r.profitLossPercent)
      : "—",
    profitLossIsNegative: r.profitLoss < 0,
  }));

  return {
    rows,
    totals: {
      balanceAmountText: formatMoney(totalCurrentValue),
      totalCostAmountText: formatMoney(Math.max(0, totalPurchaseCost)),
      profitLossSignedAmountText: signedMoney(totalProfitLoss),
      profitLossPercentText:
        totalPurchaseCost > 0
          ? formatPercent(totalProfitLoss / totalPurchaseCost)
          : "0.00%",
      change24hPercentText: formatPercent(weightedChange),
      change24hIsPositive: weightedChange >= 0,
    },
    lastUpdatedText: "Just now",
  };
};
