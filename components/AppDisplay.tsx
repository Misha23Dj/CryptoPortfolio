import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";
import ThemeToggle from "@/theme/ThemeToggle";
import HoldingsList from "./HoldingsList";

const data = [
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    price: 63321.12,
    chg24: 0.02,
    qty: 0.5,
    pl: 19500,
    plPct: 1.8571,
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    price: 3265.44,
    chg24: 0.01,
    qty: 3,
    pl: 585,
    plPct: 0.0599,
  },
  {
    id: "ada",
    symbol: "ADA",
    name: "Cardano",
    price: 0.41,
    chg24: 0.03,
    qty: 1000,
    pl: 90,
    plPct: 0.119,
  },
];

const AppDisplay = () => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.bg }]}
      testID="app-display"
    >
      <HoldingsList data={data} />
      <ThemeToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },
});

export default AppDisplay;
