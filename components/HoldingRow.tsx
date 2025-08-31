import {
  directionSymbol,
  formatMoney,
  formatPercent,
  signedMoney,
} from "@/components/utils/format";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

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

type Props = { item: Item };

const HoldingRow: React.FC<Props> = ({ item }) => {
  const theme = useTheme();

  const hasPrice = item.price != null;
  const hasQty = item.qty != null;

  const change24hPercent = item.chg24 ?? 0;
  const profitLossAmount = item.pl ?? 0;
  const profitLossPercent = item.plPct ?? 0;

  const positionValueAmount =
    hasPrice && hasQty ? (item.qty as number) * (item.price as number) : 0;

  const currentPriceAmountText = hasPrice
    ? formatMoney(item.price as number)
    : "—";
  const change24hPercentText = formatPercent(change24hPercent);
  const change24hDirectionSymbol = directionSymbol(change24hPercent);
  const change24hDirectionColor =
    change24hPercent > 0
      ? theme.positive
      : change24hPercent < 0
      ? theme.negative
      : theme.muted;

  const positionValueAmountText =
    hasPrice && hasQty ? formatMoney(positionValueAmount) : "—";

  const profitLossSignedAmountText = signedMoney(profitLossAmount);
  const profitLossPercentText = formatPercent(profitLossPercent);
  const profitLossColor =
    profitLossAmount >= 0 ? theme.positive : theme.negative;

  return (
    <View style={[styles.row, { borderBottomColor: theme.border }]}>
      <View style={{ flex: 1.2 }}>
        <Text
          style={[styles.name, { color: theme.text }]}
          testID="assetNameText"
        >
          {item.name}
        </Text>
        <Text
          style={{ color: theme.muted, fontSize: 12 }}
          testID="assetSymbolText"
        >
          {item.symbol}
        </Text>
      </View>

      <View style={{ flex: 2, alignItems: "flex-end" }}>
        <Text
          style={{ color: theme.text, fontSize: 14, fontWeight: "500" }}
          testID="currentPriceAmountText"
        >
          {currentPriceAmountText}
        </Text>

        <View style={{ flexDirection: "row", marginTop: 2 }}>
          <Text
            style={{ color: theme.muted, marginRight: 4 }}
            testID="change24hDirectionSymbol"
          >
            {change24hDirectionSymbol}
          </Text>
          <Text
            style={{ color: change24hDirectionColor }}
            testID="change24hPercentText"
          >
            {change24hPercentText}
          </Text>
        </View>

        <Text
          style={{
            color: theme.text,
            fontSize: 16,
            fontWeight: "700",
            marginTop: 2,
          }}
          testID="positionValueAmountText"
        >
          {positionValueAmountText}
        </Text>

        <View style={{ flexDirection: "row", gap: 6, marginTop: 2 }}>
          <Text
            style={{ color: profitLossColor }}
            testID="profitLossSignedAmountText"
          >
            {profitLossSignedAmountText}
          </Text>
          <Text
            style={{ color: profitLossColor }}
            testID="profitLossPercentText"
          >
            {profitLossPercentText}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: { fontSize: 14, fontWeight: "600" },
});

export default HoldingRow;
