import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";

type Props = { children: React.ReactNode };

const ScreenContainer: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: theme.bg }}
    >
      <StatusBar style={theme.barStyle} backgroundColor={theme.statusBarBg} />
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;
