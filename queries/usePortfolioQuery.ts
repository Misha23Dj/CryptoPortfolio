import { useQuery } from "@tanstack/react-query";
import { buildPortfolioView } from "../components/utils/buildPortfolioView";
import { getPortfolio, type Scenario } from "../components/utils/getPortfolio";

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
      };
    },
    staleTime: 0,
    retry: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
