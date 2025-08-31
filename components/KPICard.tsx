import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const KPICard = ({
  label,
  value,
  tint,
}: {
  label: string;
  value: string;
  tint?: "positive" | "negative";
}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.card,
        { borderColor: theme.border, backgroundColor: theme.card },
      ]}
    >
      <Text style={[styles.label, { color: theme.kpiLabel }]}>{label}</Text>
      <Text
        style={[
          styles.value,
          {
            color:
              tint === "positive"
                ? theme.positive
                : tint === "negative"
                ? theme.negative
                : theme.kpiValue,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 12,
  },
  label: { fontSize: 12, marginBottom: 4 },
  value: { fontSize: 20, fontWeight: "700" },
});

export default KPICard;
