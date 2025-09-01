import { useTheme } from "@/theme/ThemeProvider";
import ThemeToggle from "@/theme/ThemeToggle";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Scenario } from "../utils/getPortfolio";
import MetricStat from "./MetricStat";

import { usePortfolioQuery } from "../../queries/usePortfolioQuery";
import { formatRelativeTime } from "../utils/formatRelativeTime";

type Props = { scenario: Scenario };

const PortfolioHeader: React.FC<Props> = ({ scenario }) => {
  const theme = useTheme();
  const { data, isLoading, isSuccess } = usePortfolioQuery(scenario);
  const [lastUpdatedTimestampMs, setLastUpdatedTimestampMs] = useState<
    number | undefined
  >(undefined);
  const [nowTimestampMs, setNowTimestampMs] = useState<number>(() =>
    Date.now()
  );

  useEffect(() => {
    if (isSuccess) setLastUpdatedTimestampMs(Date.now());
  }, [isSuccess]);

  useEffect(() => {
    if (!lastUpdatedTimestampMs) return;
    const id = setInterval(() => setNowTimestampMs(Date.now()), 30_000);
    return () => clearInterval(id);
  }, [lastUpdatedTimestampMs]);
  if (!data || isLoading) {
    const tileBg =
      theme.barStyle === "light"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.06)";
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
          <View
            style={{
              width: 180,
              height: 32,
              borderRadius: 8,
              backgroundColor: tileBg,
              marginTop: 6,
            }}
          />
          <View style={styles.statsRow}>
            <View
              style={{
                width: "48%",
                height: 56,
                borderRadius: 12,
                backgroundColor: tileBg,
              }}
            />
            <View
              style={{
                width: "48%",
                height: 56,
                borderRadius: 12,
                backgroundColor: tileBg,
              }}
            />
          </View>
          <View
            style={{
              width: 100,
              height: 12,
              borderRadius: 6,
              backgroundColor: tileBg,
              marginTop: 12,
            }}
          />
        </View>
      </View>
    );
  }

  const {
    balanceAmountText,
    profitLossSignedAmountText,
    profitLossPercentText,
    change24hIsPositive,
    change24hPercentText,
  } = data.totals;
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
  const lastUpdatedText = formatRelativeTime(
    lastUpdatedTimestampMs,
    nowTimestampMs
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
            secondaryText="24h"
            primaryColor={changeColor}
            secondaryColor={theme.muted}
            testID="metric-24h"
          />
        </View>

        <Text
          style={[styles.updatedCentered, { color: theme.muted }]}
          testID="last-updated-text"
        >
          Last Updated: {lastUpdatedText}
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
