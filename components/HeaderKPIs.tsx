import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

import KPICard from "./KPICard";
import UpdatedLabel from "./UpdatedLabel";

export default function HeaderKPIs() {
  const t = useTheme();
  //Maybe use object/array for KPICard rendering???
  return (
    <View style={[styles.wrap, { backgroundColor: t.bg }]}>
      <View style={styles.kpis}>
        <KPICard label="Total Value" value="$—" />
        <KPICard label="Total Cost" value="$—" />
        <KPICard label="Overall P/L" value="+$— (0.00%)" tint="positive" />
      </View>
      <UpdatedLabel text="Updated —" />

      <View style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 16 },
  kpis: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
