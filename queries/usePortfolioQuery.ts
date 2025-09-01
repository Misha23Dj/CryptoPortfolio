import { buildPortfolioView } from "@/components/utils/buildPortfolioView";
import { getPortfolio, Scenario } from "@/components/utils/getPortfolio";
import { withTimeout } from "@/components/utils/withTimeout";
import { useQuery } from "@tanstack/react-query";

export const usePortfolioQuery = (scenario: Scenario) =>
  useQuery({
    queryKey: ["portfolio", scenario],
    queryFn: async () => {
      const payload = await withTimeout(getPortfolio(scenario), 5000);
      const view = buildPortfolioView({
        holdings: payload.holdings,
        prices: payload.prices,
      });
      return { ...view, pricesAsOfISO: payload.lastUpdatedISO };
    },
    staleTime: 0,
    retry: 1,
    retryDelay: 750,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
