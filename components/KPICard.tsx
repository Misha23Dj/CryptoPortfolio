import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type Props = { label: string; value: string; tint?: "positive" | "negative" };

const KPICard: React.FC<Props> = ({ label, value, tint }) => {
  const theme = useTheme();
  const valueColor =
    tint === "positive"
      ? theme.positive
      : tint === "negative"
      ? theme.negative
      : theme.kpiValue;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.text,
        },
      ]}
      testID="kpi-card"
    >
      <View
        style={[
          styles.indicator,
          {
            backgroundColor:
              tint === "positive"
                ? theme.positive
                : tint === "negative"
                ? theme.negative
                : theme.border,
          },
        ]}
      />
      <Text style={[styles.label, { color: theme.kpiLabel }]}>{label}</Text>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 14,
    gap: 4,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  indicator: {
    height: 3,
    width: 24,
    borderRadius: 2,
    marginBottom: 6,
  },
  label: { fontSize: 12, letterSpacing: 0.2 },
  value: { fontSize: 22, fontWeight: "700" },
});

export default KPICard;
