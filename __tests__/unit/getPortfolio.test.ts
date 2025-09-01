import { jest } from "@jest/globals";

jest.mock(
  "@/mockData/holdings.json",
  () => ({
    holdings: [
      {
        id: "btc",
        symbol: "BTC",
        name: "Bitcoin",
        purchasePrice: 21000,
        quantity: 0.5,
      },
      {
        id: "eth",
        symbol: "ETH",
        name: "Ethereum",
        purchasePrice: 1300,
        quantity: 3,
      },
      {
        id: "ada",
        symbol: "ADA",
        name: "Cardano",
        purchasePrice: 0.32,
        quantity: 1000,
      },
    ],
  }),
  { virtual: true }
);

jest.mock(
  "@/mockData/prices_happy.json",
  () => ({
    prices: {
      BTC: { price: 63000, chg24: 0.02 },
      ETH: { price: 3000, chg24: -0.05 },
      ADA: { price: 0.42, chg24: 0.01 },
    },
  }),
  { virtual: true }
);

jest.mock("@/components/utils/randomizers", () => {
  let next = 0.5;
  return {
    setRandom: (fn: any) => {
      next = typeof fn === "function" ? fn() : 0.5;
    },
    rand: (min = 0, max = 1) => min + next * (max - min),
    weightedPick: (weights: Record<string, number>) => Object.keys(weights)[0],
  };
});

import { getPortfolio } from "@/components/utils/getPortfolio";

it("happy returns shaped numeric data", async () => {
  const { holdings, prices, lastUpdatedISO } = await getPortfolio("happy");
  expect(holdings.length).toBeGreaterThan(0);
  expect(prices.length).toBeGreaterThan(0);
  expect(typeof lastUpdatedISO).toBe("string");
  prices.forEach((p) => {
    expect(typeof p.symbol).toBe("string");
    expect(typeof p.price).toBe("number");
    expect(typeof p.chg24).toBe("number");
  });
});

it("partial omits ADA price", async () => {
  const { prices } = await getPortfolio("partial");
  expect(prices.find((p) => p.symbol === "ADA")).toBeUndefined();
});

it("stale returns older timestamp", async () => {
  const { lastUpdatedISO } = await getPortfolio("stale");
  const ageMs = Date.now() - Date.parse(lastUpdatedISO);
  expect(ageMs).toBeGreaterThan(3 * 60 * 60 * 1000);
});

it("network-error throws TypeError", async () => {
  await expect(getPortfolio("network-error")).rejects.toBeInstanceOf(TypeError);
});

it("server-error throws Error", async () => {
  await expect(getPortfolio("server-error")).rejects.toBeInstanceOf(Error);
});
