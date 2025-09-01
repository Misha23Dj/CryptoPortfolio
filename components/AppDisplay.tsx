import React from "react";
import { StyleSheet, View } from "react-native";

import ThemeFade from "@/theme/ThemeFade";
import { useTheme } from "@/theme/ThemeProvider";
import HoldingsList from "./HoldingsList";

const AppDisplay = () => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.bg }]}
      testID="app-display"
    >
      <HoldingsList />
      <ThemeFade />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },
});

export default AppDisplay;
