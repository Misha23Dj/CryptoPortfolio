import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Text, View } from "react-native";
const Empty = () => {
  const theme = useTheme();
  return (
    <View style={{ alignItems: "center", padding: 24 }}>
      <Text style={{ color: theme.muted, fontWeight: "700" }}>
        No holdings to display
      </Text>
    </View>
  );
};
export default Empty;
