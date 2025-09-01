import { useQuery } from "@tanstack/react-query";
import { buildPortfolioView } from "./buildPortfolioView";
import { getPortfolio, type Scenario } from "./getPortfolio";

const formatLastUpdated = (iso: string) => {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 60_000) return "Just now";
  const mins = Math.round(ms / 60_000);
  if (mins < 60) return `${mins} mins ago`;
  const hrs = Math.round(mins / 60);
  return `${hrs}h ago`;
};

export const usePortfolioQuery = (scenario: Scenario) =>
  useQuery({
    queryKey: ["portfolio", scenario],
    queryFn: async () => {
      const payload = await getPortfolio(scenario);
      const view = buildPortfolioView({
        holdings: payload.holdings,
        prices: payload.prices,
      });
      return {
        ...view,
        lastUpdatedText: formatLastUpdated(payload.lastUpdatedISO),
      };
    },
    staleTime: 0,
    retry: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
