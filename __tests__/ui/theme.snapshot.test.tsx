import ThemeProvider, { useTheme } from "@/theme/ThemeProvider";
import ThemeToggle from "@/theme/ThemeToggle";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";

const Demo = () => {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.bg, padding: 8 }}>
      <Text style={{ color: theme.text }}>Demo</Text>
      <ThemeToggle />
    </View>
  );
};

it("switches theme and updates snapshot", () => {
  const { getByTestId, toJSON } = render(
    <ThemeProvider>
      <Demo />
    </ThemeProvider>
  );
  expect(toJSON()).toMatchSnapshot();
  fireEvent.press(getByTestId("theme-toggle"));
  expect(toJSON()).toMatchSnapshot();
});
