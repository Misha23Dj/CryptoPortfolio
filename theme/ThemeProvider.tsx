import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { dark, light, type Theme } from "./colors";

type ThemeMode = "light" | "dark" | "system";

const ThemeCtx = createContext<Theme>(light);
const ThemeModeContext = createContext<{
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
}>({
  mode: "system",
  setMode: () => {},
});

export const useTheme = () => useContext(ThemeCtx);
export const useThemeMode = () => useContext(ThemeModeContext);

type Props = { children: React.ReactNode };

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("system");
  const scheme = useColorScheme();

  const effective = mode === "system" ? scheme ?? "light" : mode;
  const theme = useMemo(
    () => (effective === "dark" ? dark : light),
    [effective]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeProvider;
