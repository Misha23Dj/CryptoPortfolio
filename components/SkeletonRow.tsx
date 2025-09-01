import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { StyleSheet, View } from "react-native";

const SkeletonRow: React.FC = () => {
  const theme = useTheme();
  const bg =
    theme.barStyle === "light" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  return (
    <View style={[styles.row, { borderColor: theme.border }]}>
      <View style={styles.left}>
        <View
          style={[styles.line, { backgroundColor: bg, width: 120, height: 16 }]}
        />
        <View
          style={[
            styles.line,
            { backgroundColor: bg, width: 60, height: 12, marginTop: 6 },
          ]}
        />
      </View>
      <View style={styles.right}>
        <View
          style={[styles.line, { backgroundColor: bg, width: 80, height: 14 }]}
        />
        <View
          style={[
            styles.line,
            { backgroundColor: bg, width: 60, height: 12, marginTop: 6 },
          ]}
        />
        <View
          style={[
            styles.line,
            { backgroundColor: bg, width: 90, height: 12, marginTop: 8 },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: { paddingRight: 12 },
  right: { alignItems: "flex-end" },
  line: { borderRadius: 6 },
});

export default SkeletonRow;
