import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorBanner: React.FC<{ message: string }> = ({ message }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: theme.negative + "11", borderColor: theme.negative },
      ]}
    >
      <Text style={[styles.text, { color: theme.negative }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  text: { fontWeight: "600" },
});

export default ErrorBanner;
