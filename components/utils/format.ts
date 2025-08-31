const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const percentFmt = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatMoney = (n: number) => currency.format(n);
export const formatPercent = (ratio: number) => percentFmt.format(ratio);
export const signedMoney = (n: number) => (n >= 0 ? "+" : "") + formatMoney(n);
export const directionSymbol = (ratio: number) =>
  //DO NOT FORGET TO SWAP FOR EXPO SYMBOLS!!!!! -> https://docs.expo.dev/versions/latest/sdk/symbols/
  ratio > 0 ? "▲" : ratio < 0 ? "▼" : "•";
