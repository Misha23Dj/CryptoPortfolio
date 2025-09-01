import PortfolioHeader from "@/components/Header/PortfolioHeader";
import ThemeProvider from "@/theme/ThemeProvider";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import React from "react";
import { Platform } from "react-native";

jest.mock("expo-symbols", () => ({ SymbolView: () => null }));
jest.mock("@/theme/ThemeToggle", () => () => null);

const mockUsePortfolioQuery = jest.fn();
jest.mock("@/queries/usePortfolioQuery", () => ({
  usePortfolioQuery: (...args: any[]) => mockUsePortfolioQuery(...args),
}));

const wrap = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

const setPlatform = (os: "ios" | "android") => {
  Object.defineProperty(Platform, "OS", { get: () => os });
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-08-31T12:00:00Z"));
  mockUsePortfolioQuery.mockReset();
});
afterEach(() => {
  jest.useRealTimers();
});

it("renders error state and retries", async () => {
  const refetch = jest.fn();
  mockUsePortfolioQuery.mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: true,
    isSuccess: false,
    refetch,
    dataUpdatedAt: 0,
  });

  wrap(<PortfolioHeader scenario="happy" />);

  expect(screen.getByText("Couldn't load prices")).toBeTruthy();
  fireEvent.press(screen.getByTestId("retry-button"));
  expect(refetch).toHaveBeenCalled();
});

it("renders loading skeleton", () => {
  mockUsePortfolioQuery.mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
    isSuccess: false,
    refetch: jest.fn(),
    dataUpdatedAt: 0,
  });

  wrap(<PortfolioHeader scenario="happy" />);

  expect(screen.getByText("Total Balance")).toBeTruthy();
  expect(screen.queryByTestId("balance-amount-text")).toBeNull();
});

it("renders success metrics and total cost", async () => {
  setPlatform("ios");
  mockUsePortfolioQuery.mockReturnValue({
    data: {
      totals: {
        balanceAmountText: "$12,345.67",
        totalCostAmountText: "$10,000.00",
        profitLossSignedAmountText: "+$2,345.67",
        profitLossPercentText: "23.46%",
        change24hIsPositive: true,
        change24hPercentText: "1.23%",
      },
      rows: [],
    },
    isLoading: false,
    isError: false,
    isSuccess: true,
    refetch: jest.fn(),
    dataUpdatedAt: Date.now(),
  });

  wrap(<PortfolioHeader scenario="happy" />);

  expect(await screen.findByTestId("balance-amount-text")).toHaveTextContent(
    "$12,345.67"
  );
  expect(screen.getByTestId("total-cost-text")).toHaveTextContent(
    "Total Cost $10,000.00"
  );
  await waitFor(() =>
    expect(screen.getByTestId("last-updated-text")).toHaveTextContent(
      "Last refreshed: Just now"
    )
  );
});

it("hides iOS-only top bar on Android in success state", async () => {
  setPlatform("android");
  mockUsePortfolioQuery.mockReturnValue({
    data: {
      totals: {
        balanceAmountText: "$100.00",
        totalCostAmountText: "$80.00",
        profitLossSignedAmountText: "+$20.00",
        profitLossPercentText: "25.00%",
        change24hIsPositive: false,
        change24hPercentText: "-0.50%",
      },
      rows: [],
    },
    isLoading: false,
    isError: false,
    isSuccess: true,
    refetch: jest.fn(),
    dataUpdatedAt: Date.now(),
  });

  wrap(<PortfolioHeader scenario="happy" />);

  expect(screen.queryByText("Portfolio")).toBeNull();
  expect(await screen.findByTestId("balance-amount-text")).toHaveTextContent(
    "$100.00"
  );
});

it("keeps last-updated text progressing with timers", async () => {
  setPlatform("ios");
  mockUsePortfolioQuery.mockReturnValue({
    data: {
      totals: {
        balanceAmountText: "$1.00",
        totalCostAmountText: "$1.00",
        profitLossSignedAmountText: "$0.00",
        profitLossPercentText: "0.00%",
        change24hIsPositive: true,
        change24hPercentText: "0.00%",
      },
      rows: [],
    },
    isLoading: false,
    isError: false,
    isSuccess: true,
    refetch: jest.fn(),
    dataUpdatedAt: Date.now(),
  });

  wrap(<PortfolioHeader scenario="happy" />);

  expect(await screen.findByTestId("last-updated-text")).toHaveTextContent(
    "Last refreshed: Just now"
  );
  jest.advanceTimersByTime(61_000);
  await waitFor(() =>
    expect(screen.getByTestId("last-updated-text")).toHaveTextContent(
      "Last refreshed: 1 min ago"
    )
  );
});
