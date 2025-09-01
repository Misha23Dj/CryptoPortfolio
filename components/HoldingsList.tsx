import { LegendList } from "@legendapp/list";
import React, { useMemo } from "react";
import { useTheme } from "../theme/ThemeProvider";
import HoldingRow from "./HoldingRow";
import PortfolioHeader from "./PortfolioHeader";
import { formatMoney, formatPercent, signedMoney } from "./utils/format";

type Item = {
  id: string;
  symbol: string;
  name: string;
  price?: number;
  chg24?: number;
  qty?: number;
  pl?: number;
  plPct?: number;
};

type Props = { data: Item[]; testID?: string };

const HoldingsList: React.FC<Props> = ({ data, testID }) => {
  const theme = useTheme();

  const {
    balanceAmountText,
    profitLossSignedAmountText,
    profitLossPercentText,
    change24hPercentText,
    change24hIsPositive,
  } = useMemo(() => {
    const positionValues = data.map((d) => (d.price ?? 0) * (d.qty ?? 0));
    const totalValue = positionValues.reduce((a, b) => a + b, 0);
    const totalPL = data.reduce((a, d) => a + (d.pl ?? 0), 0);
    const totalCost = totalValue - totalPL;

    const weightedChangeNumerator = data.reduce(
      (acc, d, i) => acc + positionValues[i] * (d.chg24 ?? 0),
      0
    );
    const weightedChange =
      totalValue > 0 ? weightedChangeNumerator / totalValue : 0;

    return {
      balanceAmountText: formatMoney(totalValue),
      profitLossSignedAmountText: signedMoney(totalPL),
      profitLossPercentText:
        totalCost > 0 ? formatPercent(totalPL / totalCost) : "0.00%",
      change24hPercentText: formatPercent(weightedChange),
      change24hIsPositive: weightedChange >= 0,
    };
  }, [data]);

  const headerElement = (
    <PortfolioHeader
      balanceAmountText={balanceAmountText}
      profitLossSignedAmountText={profitLossSignedAmountText}
      profitLossPercentText={profitLossPercentText}
      change24hPercentText={change24hPercentText}
      change24hIsPositive={change24hIsPositive}
      timeframeLabel="24h"
      lastUpdatedText="Just now"
    />
  );

  return (
    <LegendList
      data={data}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => <HoldingRow item={item} />}
      ListHeaderComponent={headerElement}
      contentContainerStyle={{ paddingBottom: 24, backgroundColor: theme.bg }}
    />
  );
};

export default HoldingsList;
