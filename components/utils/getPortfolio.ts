import { rand, weightedPick } from "@/components/utils/randomizers";
import rawHoldings from "@/mockData/holdings.json";
import rawPrices from "@/mockData/prices_happy.json";
import type { HoldingInput, PriceInput } from "./buildPortfolioView";

export type Scenario =
  | "happy"
  | "partial"
  | "stale"
  | "server-error"
  | "network-error"
  | "random";
export type PortfolioPayload = {
  holdings: HoldingInput[];
  prices: PriceInput[];
  lastUpdatedISO: string;
};

type RawHolding = {
  id: string;
  symbol: string;
  name: string;
  purchaseDate?: string;
  purchasePrice: number | string;
  quantity: number | string;
};
type HoldingsFile = { holdings: RawHolding[] };

type PricesFile = { prices: Record<string, any> };

const resolveScenario = (s: Scenario): Exclude<Scenario, "random"> => {
  if (s !== "random") return s;
  const pick = weightedPick({
    happy: 0.45,
    partial: 0.2,
    stale: 0.2,
    "server-error": 0.1,
    "network-error": 0.05,
  });
  return pick as Exclude<Scenario, "random">;
};

const toNumber = (v: unknown) => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const cleaned = v.replace(/[^0-9.+-eE]/g, "");
    const n = Number.parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

const toFraction = (v: unknown) => {
  if (typeof v === "string" && v.trim().endsWith("%")) return toNumber(v) / 100;
  return toNumber(v);
};

const pickFirst = (obj: any, keys: string[]) => {
  for (const k of keys) {
    if (obj && obj[k] != null) return obj[k];
  }
  return undefined;
};

const shapeHoldings = (file: HoldingsFile): HoldingInput[] =>
  (file.holdings ?? []).map((h) => {
    const qty = toNumber(h.quantity);
    const unit = toNumber(h.purchasePrice);
    return {
      id: h.id,
      symbol: String(h.symbol).toUpperCase(),
      name: h.name,
      qty,
      cost: unit * qty,
    };
  });

const shapePricesFlexible = (
  file: PricesFile,
  holdings: HoldingInput[]
): PriceInput[] => {
  const entries = Object.entries(file.prices ?? {});
  const bySymbolFromHoldings = new Map(holdings.map((h) => [h.symbol, h]));

  const shaped = entries.map(([symbolRaw, entry]) => {
    const symbol = String(symbolRaw).toUpperCase();
    const priceCandidate =
      pickFirst(entry, [
        "price",
        "currentPrice",
        "last",
        "close",
        "value",
        "usd",
        "USD",
      ]) ?? 0;
    const chgCandidate =
      pickFirst(entry, [
        "chg24",
        "change24h",
        "change24",
        "percent24h",
        "pct24h",
        "pct",
      ]) ?? 0;

    let price = toNumber(priceCandidate);
    let chg24 = toFraction(chgCandidate);

    if (!price) {
      const h = bySymbolFromHoldings.get(symbol);
      if (h && (h.qty ?? 0) > 0 && (h.cost ?? 0) > 0) {
        price = (h.cost as number) / (h.qty as number);
      }
    }

    if (!price) {
      const baselines: Record<string, number> = {
        BTC: 60000,
        ETH: 3000,
        ADA: 0.4,
      };
      price = baselines[symbol] ?? 100;
    }

    return { symbol, price, chg24 };
  });

  for (const h of holdings) {
    if (!shaped.find((p) => p.symbol === h.symbol)) {
      const fallback =
        (h.cost ?? 0) > 0 && (h.qty ?? 0) > 0
          ? (h.cost as number) / (h.qty as number)
          : 100;
      shaped.push({ symbol: h.symbol, price: fallback, chg24: 0 });
    }
  }

  return shaped;
};

const moveMarket = (base: PriceInput[], intensity = 0.06): PriceInput[] =>
  base.map((p) => {
    const factor = 1 + rand(-intensity, intensity);
    const nextPrice = Math.max(0, toNumber(p.price) * factor);
    const nextChg24 = factor - 1;
    return { symbol: p.symbol, price: nextPrice, chg24: nextChg24 };
  });

export const getPortfolio = async (
  scenario: Scenario
): Promise<PortfolioPayload> => {
  const latency = Math.round(rand(200, 700));
  await new Promise((r) => setTimeout(r, latency));

  const resolved = resolveScenario(scenario);
  if (resolved === "network-error")
    throw new TypeError("Network request failed");
  if (resolved === "server-error")
    throw new Error("There was an error obtaining your portfolio. Try again");

  const holdings = shapeHoldings(rawHoldings as HoldingsFile);
  let pricesBase = shapePricesFlexible(rawPrices as PricesFile, holdings);

  if (resolved === "partial") {
    pricesBase = pricesBase.filter((p) => p.symbol !== "ADA");
  }

  const prices =
    resolved === "stale" ? pricesBase : moveMarket(pricesBase, 0.08);

  const lastUpdatedISO =
    resolved === "stale"
      ? new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      : new Date().toISOString();

  return { holdings, prices, lastUpdatedISO };
};
