import ThemeToggle from "@/theme/ThemeToggle";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import MetricStat from "./MetricStat";

type Props = {
  balanceAmountText: string;
  profitLossSignedAmountText: string;
  profitLossPercentText: string;
  change24hPercentText: string;
  change24hIsPositive: boolean;
  timeframeLabel: string;
  lastUpdatedText: string;
};

const PortfolioHeader: React.FC<Props> = ({
  balanceAmountText,
  profitLossSignedAmountText,
  profitLossPercentText,
  change24hPercentText,
  change24hIsPositive,
  timeframeLabel,
  lastUpdatedText,
}) => {
  const theme = useTheme();

  const profitLossIsNegative = profitLossSignedAmountText.startsWith("-");
  const profitLossColor = profitLossIsNegative
    ? theme.negative
    : theme.positive;
  const changeColor = change24hIsPositive ? theme.positive : theme.negative;

  const profitLossUnsignedAmountText = profitLossSignedAmountText.replace(
    /^[-+]/,
    ""
  );
  const profitLossUnsignedPercentText = profitLossPercentText.replace(
    /^[-+]/,
    ""
  );
  const change24hUnsignedPercentText = change24hPercentText.replace(
    /^[-+]/,
    ""
  );

  return (
    <View
      style={[styles.wrap, { backgroundColor: theme.bg }]}
      testID="portfolio-header"
    >
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: theme.text }]}>Portfolio</Text>
        <ThemeToggle />
      </View>

      <View
        style={[
          styles.hero,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            shadowColor: theme.text,
          },
        ]}
      >
        <Text style={[styles.balanceLabel, { color: theme.muted }]}>
          Total Balance
        </Text>
        <Text
          style={[styles.balanceValue, { color: theme.text }]}
          testID="balance-amount-text"
        >
          {balanceAmountText}
        </Text>

        <View style={styles.statsRow}>
          <MetricStat
            iconName={profitLossIsNegative ? "arrow.down" : "arrow.up"}
            primaryText={profitLossUnsignedAmountText}
            secondaryText={profitLossUnsignedPercentText}
            primaryColor={profitLossColor}
            secondaryColor={profitLossColor}
            testID="metric-pl"
          />
          <MetricStat
            iconName={change24hIsPositive ? "arrow.up" : "arrow.down"}
            primaryText={change24hUnsignedPercentText}
            secondaryText={timeframeLabel}
            primaryColor={changeColor}
            secondaryColor={theme.muted}
            testID="metric-24h"
          />
        </View>

        <Text
          style={[styles.updatedCentered, { color: theme.muted }]}
          testID="last-updated-text"
        >
          {lastUpdatedText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { paddingTop: 16 },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: { fontSize: 22, fontWeight: "700", letterSpacing: 0.2 },
  hero: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
    alignItems: "center",
  },
  balanceLabel: { fontSize: 12 },
  balanceValue: {
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 0.2,
    marginTop: 4,
    textAlign: "center",
  },
  statsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
    alignSelf: "center",
  },
  updatedCentered: { fontSize: 12, textAlign: "center", marginTop: 12 },
});

export default PortfolioHeader;
