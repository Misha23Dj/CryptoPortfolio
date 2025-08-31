import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Text } from "react-native";

const UpdatedLabel = ({ text }: { text: string }) => {
  const theme = useTheme();
  return (
    <Text
      style={{
        color: theme.muted,
        fontSize: 12,
        marginHorizontal: 16,
        marginBottom: 8,
      }}
    >
      {text}
    </Text>
  );
};
export default UpdatedLabel;
