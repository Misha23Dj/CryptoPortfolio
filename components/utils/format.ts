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

export const signedMoney = (n: number) => {
  const isZeroish =
    !Number.isFinite(n) || Math.abs(n) < 1e-9 || Object.is(n, -0);
  if (isZeroish) return currency.format(0);
  return (n > 0 ? "+" : "") + currency.format(n);
};
