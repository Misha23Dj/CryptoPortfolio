import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme, useThemeMode } from "./ThemeProvider";

const MODES = ["light", "dark", "system"] as const;
type Mode = (typeof MODES)[number];

const ThemeToggle: React.FC = () => {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();

  return (
    <View
      style={[
        styles.wrap,
        { borderColor: theme.border, backgroundColor: theme.card },
      ]}
    >
      {MODES.map((m) => {
        const selected = mode === m;
        return (
          <Pressable
            key={m}
            onPress={() => setMode(m as Mode)}
            style={[
              styles.chip,
              {
                backgroundColor: selected ? theme.text : "transparent",
                borderColor: theme.border,
              },
            ]}
          >
            <Text
              style={{
                color: selected ? theme.bg : theme.text,
                fontWeight: "600",
              }}
            >
              {m[0].toUpperCase() + m.slice(1)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 8,
    padding: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});

export default ThemeToggle;
