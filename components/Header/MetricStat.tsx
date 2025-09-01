import { SymbolView, type SFSymbol } from "expo-symbols";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

type Props = {
  iconName: SFSymbol;
  primaryText: string;
  secondaryText: string;
  primaryColor: string;
  secondaryColor?: string;
  testID?: string;
};

const MetricStat: React.FC<Props> = ({
  iconName,
  primaryText,
  secondaryText,
  primaryColor,
  secondaryColor,
  testID,
}) => {
  const theme = useTheme();
  const isDark = theme.barStyle === "light";
  const tileBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";

  return (
    <View style={[styles.cell, { backgroundColor: tileBg }]} testID={testID}>
      <View style={styles.inlineRow}>
        <SymbolView
          name={iconName}
          size={18}
          tintColor={primaryColor}
          style={{ width: 18, height: 18, marginRight: 2 }}
        />
        <Text
          style={[styles.primary, { color: primaryColor }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
        >
          {primaryText}
        </Text>
      </View>
      <Text
        style={[styles.secondary, { color: secondaryColor ?? theme.muted }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >
        {secondaryText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: "48%",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: "100%",
  },
  primary: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    flexShrink: 1,
  },
  secondary: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 2,
    flexShrink: 1,
  },
});

export default MetricStat;
