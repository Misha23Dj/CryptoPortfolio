import HoldingRow from "@/components/HoldingRow";
import {
  buildPortfolioView,
  type HoldingInput,
  type PriceInput,
} from "@/components/utils/buildPortfolioView";
import ThemeProvider from "@/theme/ThemeProvider";
import { light as lightTheme } from "@/theme/colors";
import { render, screen } from "@testing-library/react-native";
import React from "react";

jest.mock("expo-symbols", () => ({
  SymbolView: () => null,
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

const makeRow = (
  holdings: HoldingInput[],
  prices: PriceInput[],
  symbol: string
) => {
  const view = buildPortfolioView({ holdings, prices });
  const row = view.rows.find((r) => r.symbol === symbol);
  if (!row) throw new Error(`Row not found for ${symbol}`);
  return row;
};

describe("HoldingRow", () => {
  it("renders positive change values and colors", () => {
    const holdings: HoldingInput[] = [
      {
        id: "btc",
        symbol: "BTC",
        name: "Bitcoin",
        qty: 0.5,
        cost: 21000 * 0.5,
      },
    ];
    const prices: PriceInput[] = [
      { symbol: "BTC", price: 63321.12, chg24: 0.025 },
    ];
    const row = makeRow(holdings, prices, "BTC");

    renderWithTheme(<HoldingRow item={row} />);

    expect(screen.getByTestId("assetNameText")).toHaveTextContent("Bitcoin");
    expect(screen.getByTestId("assetSymbolText")).toHaveTextContent("BTC");
    expect(screen.getByTestId("currentPriceText")).toHaveTextContent(
      row.currentPriceAmountText
    );
    expect(screen.getByTestId("change24hText")).toHaveTextContent(
      row.change24hPercentText
    );
    expect(screen.getByTestId("change24hText")).toHaveStyle({
      color: lightTheme.positive,
    });
    expect(screen.getByTestId("quantityText")).toHaveTextContent(
      row.quantityText
    );
    expect(screen.getByTestId("purchaseUnitPriceText")).toHaveTextContent(
      row.purchaseUnitPriceAmountText
    );
    expect(screen.getByTestId("currentValueText")).toHaveTextContent(
      row.currentValueAmountText
    );
    expect(screen.getByTestId("purchaseCostText")).toHaveTextContent(
      row.purchaseCostAmountText
    );
    expect(screen.getByTestId("plAmountText")).toHaveTextContent(
      row.profitLossSignedAmountText
    );
    expect(screen.getByTestId("personalChangePercentText")).toHaveTextContent(
      row.personalChangePercentText
    );
    expect(screen.getByTestId("plAmountText")).toHaveStyle({
      color: lightTheme.positive,
    });
    expect(screen.getByTestId("personalChangePercentText")).toHaveStyle({
      color: lightTheme.positive,
    });
  });

  it("renders negative change values and colors", () => {
    const holdings: HoldingInput[] = [
      { id: "eth", symbol: "ETH", name: "Ethereum", qty: 1, cost: 105 },
    ];
    const prices: PriceInput[] = [{ symbol: "ETH", price: 100, chg24: -0.1 }];
    const row = makeRow(holdings, prices, "ETH");

    renderWithTheme(<HoldingRow item={row} />);

    expect(screen.getByTestId("change24hText")).toHaveTextContent(
      row.change24hPercentText
    );
    expect(screen.getByTestId("change24hText")).toHaveStyle({
      color: lightTheme.negative,
    });
    expect(screen.getByTestId("plAmountText")).toHaveTextContent(
      row.profitLossSignedAmountText
    );
    expect(screen.getByTestId("personalChangePercentText")).toHaveTextContent(
      row.personalChangePercentText
    );
    expect(screen.getByTestId("plAmountText")).toHaveStyle({
      color: lightTheme.negative,
    });
    expect(screen.getByTestId("personalChangePercentText")).toHaveStyle({
      color: lightTheme.negative,
    });
  });

  it("handles missing price gracefully", () => {
    const holdings: HoldingInput[] = [
      {
        id: "ada",
        symbol: "ADA",
        name: "Cardano",
        qty: 1000,
        cost: 0.32 * 1000,
      },
    ];
    const prices: PriceInput[] = [];
    const row = makeRow(holdings, prices, "ADA");

    renderWithTheme(<HoldingRow item={row} />);

    expect(screen.getByTestId("currentPriceText")).toHaveTextContent("$0.00");
    expect(screen.getByTestId("currentValueText")).toHaveTextContent("$0.00");
    expect(screen.getByTestId("plAmountText")).toHaveTextContent("-$320.00");
    expect(screen.getByTestId("personalChangePercentText")).toHaveTextContent(
      "-100.00%"
    );
  });
});
