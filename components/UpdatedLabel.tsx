import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type Props = { text: string };

const UpdatedLabel: React.FC<Props> = ({ text }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
      testID="updated-chip"
    >
      <Text style={[styles.text, { color: theme.muted }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  text: { fontSize: 12 },
});

export default UpdatedLabel;
