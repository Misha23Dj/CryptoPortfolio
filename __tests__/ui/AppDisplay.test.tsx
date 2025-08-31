import AppDisplay from "@/components/AppDisplay";
import ThemeProvider from "@/theme/ThemeProvider";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const renderScreen = () =>
  render(
    <SafeAreaProvider>
      <ThemeProvider>
        <AppDisplay />
      </ThemeProvider>
    </SafeAreaProvider>
  );

describe("AppDisplay", () => {
  //TODO: FIX
  xit("renders the holdings list", () => {
    renderScreen();
    expect(screen.getByTestId("app-display")).toBeTruthy();
  });
});
