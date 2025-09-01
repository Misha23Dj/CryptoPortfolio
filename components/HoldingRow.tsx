import type { HoldingRowView } from "@/components/utils/buildPortfolioView";
import { useTheme } from "@/theme/ThemeProvider";
import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { item: HoldingRowView };

const HoldingRow: React.FC<Props> = ({ item }) => {
  const theme = useTheme();

  const changeIsNegative = item.change24hPercentText.startsWith("-");
  const changeColor = changeIsNegative ? theme.negative : theme.positive;
  const changeArrow = changeIsNegative ? "arrow.down" : "arrow.up";

  const plIsNegative = item.profitLossIsNegative;
  const plColor = plIsNegative ? theme.negative : theme.positive;
  const plArrow = plIsNegative ? "arrow.down" : "arrow.up";

  return (
    <View
      style={[
        styles.row,
        { borderColor: theme.border, backgroundColor: theme.bg },
      ]}
      testID="holding-row"
    >
      <View style={styles.stack}>
        <View style={styles.topLine}>
          <Text
            style={[styles.nameText, { color: theme.text }]}
            testID="assetNameText"
          >
            {item.name}
          </Text>
          <Text
            style={[styles.priceText, { color: theme.text }]}
            testID="currentPriceText"
          >
            {item.currentPriceAmountText}
          </Text>
          <View style={styles.inlineChange} testID="changeInline">
            <SymbolView
              name={changeArrow}
              size={12}
              tintColor={changeColor}
              style={styles.icon12}
            />
            <Text
              style={[styles.changeText, { color: changeColor }]}
              testID="change24hText"
            >
              {item.change24hPercentText}
            </Text>
          </View>
        </View>

        <Text
          style={[styles.symbolText, { color: theme.muted }]}
          testID="assetSymbolText"
        >
          {item.symbol}
        </Text>

        <View style={styles.metricsGrid}>
          <View style={styles.metricCell}>
            <Text style={[styles.metricLabel, { color: theme.muted }]}>
              Qty
            </Text>
            <Text
              style={[styles.metricValue, { color: theme.text }]}
              testID="quantityText"
            >
              {item.quantityText}
            </Text>
          </View>

          <View style={styles.metricCell}>
            <Text style={[styles.metricLabel, { color: theme.muted }]}>
              Buy Price
            </Text>
            <Text
              style={[styles.metricValue, { color: theme.text }]}
              testID="purchaseUnitPriceText"
            >
              {item.purchaseUnitPriceAmountText}
            </Text>
          </View>

          <View style={styles.metricCell}>
            <Text style={[styles.metricLabel, { color: theme.muted }]}>
              Current Value
            </Text>
            <Text
              style={[styles.metricValue, { color: theme.text }]}
              testID="currentValueText"
            >
              {item.currentValueAmountText}
            </Text>
          </View>

          <View style={styles.metricCell}>
            <Text style={[styles.metricLabel, { color: theme.muted }]}>
              Purchase Cost
            </Text>
            <Text
              style={[styles.metricValue, { color: theme.text }]}
              testID="purchaseCostText"
            >
              {item.purchaseCostAmountText}
            </Text>
          </View>

          <View style={styles.metricCell}>
            <Text style={[styles.metricLabel, { color: theme.muted }]}>
              P/L
            </Text>
            <View style={styles.inlineValue}>
              <SymbolView
                name={plArrow}
                size={12}
                tintColor={plColor}
                style={styles.icon12}
              />
              <Text
                style={[styles.metricValue, { color: plColor }]}
                testID="plAmountText"
              >
                {item.profitLossSignedAmountText}
              </Text>
            </View>
          </View>

          <View style={styles.metricCell}>
            <Text style={[styles.metricLabel, { color: theme.muted }]}>
              % Change
            </Text>
            <View style={styles.inlineValue}>
              <SymbolView
                name={plArrow}
                size={12}
                tintColor={plColor}
                style={styles.icon12}
              />
              <Text
                style={[styles.metricValue, { color: plColor }]}
                testID="personalChangePercentText"
              >
                {item.personalChangePercentText}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  stack: { alignItems: "flex-start", gap: 8 },
  topLine: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
    flexWrap: "wrap",
  },
  nameText: { fontSize: 16, fontWeight: "800" },
  priceText: { fontSize: 16, fontWeight: "800" },
  inlineChange: { flexDirection: "row", alignItems: "center", gap: 6 },
  changeText: { fontSize: 12, fontWeight: "800" },
  icon12: { width: 12, height: 12 },
  symbolText: { fontSize: 12, fontWeight: "700", letterSpacing: 0.3 },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    width: "100%",
  },
  metricCell: { width: "48%" },
  metricLabel: { fontSize: 11, fontWeight: "600" },
  metricValue: { fontSize: 13, fontWeight: "800" },
  inlineValue: { flexDirection: "row", alignItems: "center", gap: 6 },
});

export default HoldingRow;
