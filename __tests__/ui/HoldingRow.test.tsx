import HoldingRow from "@/components/HoldingRow";
import { light as lightTheme } from "@/theme/colors";
import ThemeProvider from "@/theme/ThemeProvider";
import { render, screen } from "@testing-library/react-native";
import React from "react";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

describe("HoldingRow", () => {
  test("renders positive change with correct values and colors", async () => {
    const item = {
      id: "btc",
      symbol: "BTC",
      name: "Bitcoin",
      price: 63321.12,
      chg24: 0.025,
      qty: 0.5,
      pl: 19500,
      plPct: 1.8571,
    };

    renderWithTheme(<HoldingRow item={item} />);

    expect(await screen.findByTestId("assetNameText")).toHaveTextContent(
      "Bitcoin"
    );
    expect(screen.getByTestId("assetSymbolText")).toHaveTextContent("BTC");

    expect(screen.getByTestId("currentPriceAmountText")).toHaveTextContent(
      "$63,321.12"
    );

    expect(screen.getByTestId("change24hDirectionSymbol")).toHaveTextContent(
      "▲"
    );
    const posPct = screen.getByTestId("change24hPercentText");
    expect(posPct).toHaveTextContent("2.50%");
    expect(posPct).toHaveStyle({ color: lightTheme.positive });

    expect(screen.getByTestId("positionValueAmountText")).toHaveTextContent(
      "$31,660.56"
    );

    const plAmt = screen.getByTestId("profitLossSignedAmountText");
    const plPct = screen.getByTestId("profitLossPercentText");
    expect(plAmt).toHaveTextContent("+$19,500.00");
    expect(plPct).toHaveTextContent("185.71%");
    expect(plAmt).toHaveStyle({ color: lightTheme.positive });
    expect(plPct).toHaveStyle({ color: lightTheme.positive });
  });

  test("renders negative change styles", () => {
    const item = {
      id: "eth",
      symbol: "ETH",
      name: "Ethereum",
      price: 100,
      chg24: -0.1,
      qty: 1,
      pl: -5,
      plPct: -0.05,
    };

    renderWithTheme(<HoldingRow item={item} />);

    expect(screen.getByTestId("change24hDirectionSymbol")).toHaveTextContent(
      "▼"
    );
    const negPct = screen.getByTestId("change24hPercentText");
    expect(negPct).toHaveTextContent("-10.00%");
    expect(negPct).toHaveStyle({ color: lightTheme.negative });

    expect(screen.getByTestId("profitLossSignedAmountText")).toHaveTextContent(
      "-$5.00"
    );
    expect(screen.getByTestId("profitLossPercentText")).toHaveTextContent(
      "-5.00%"
    );
    expect(screen.getByTestId("profitLossSignedAmountText")).toHaveStyle({
      color: lightTheme.negative,
    });
    expect(screen.getByTestId("profitLossPercentText")).toHaveStyle({
      color: lightTheme.negative,
    });
  });

  test("handles missing price/qty gracefully", () => {
    const item = { id: "ada", symbol: "ADA", name: "Cardano" };

    renderWithTheme(<HoldingRow item={item} />);

    const zeroPct = screen.getByTestId("change24hPercentText");
    expect(zeroPct).toHaveTextContent("0.00%");
    expect(zeroPct).toHaveStyle({ color: lightTheme.muted });

    expect(screen.getByTestId("change24hDirectionSymbol")).toHaveTextContent(
      "•"
    );

    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });
});
