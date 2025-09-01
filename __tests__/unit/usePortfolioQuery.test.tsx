import { usePortfolioQuery } from "@/queries/usePortfolioQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

jest.mock("@/components/utils/getPortfolio", () => ({
  getPortfolio: jest.fn().mockResolvedValue({
    holdings: [],
    prices: [],
    lastUpdatedISO: new Date().toISOString(),
  }),
}));

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

it("loads data", async () => {
  const { result } = renderHook(() => usePortfolioQuery("happy"), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
