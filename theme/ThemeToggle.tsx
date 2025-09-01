import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, useColorScheme } from "react-native";
import { useTheme, useThemeMode } from "../theme/ThemeProvider";

const ThemeToggle: React.FC = () => {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();
  const system = useColorScheme();
  const effective = mode === "system" ? system ?? "light" : mode;
  const isDark = effective === "dark";
  const size = 24;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => setMode(isDark ? "light" : "dark")}
      style={({ pressed }) => [
        {
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? theme.card : "transparent",
        },
      ]}
      hitSlop={8}
      testID="theme-toggle"
    >
      <SymbolView
        name={isDark ? "sun.max.fill" : "moon.fill"}
        size={size}
        tintColor={theme.text}
        style={{ width: size, height: size }}
      />
    </Pressable>
  );
};

export default ThemeToggle;
