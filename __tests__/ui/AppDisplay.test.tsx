import AppDisplay from "@/components/AppDisplay";
import ThemeProvider from "@/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react-native";
import React from "react";

const renderScreen = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <AppDisplay />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("AppDisplay", () => {
  it("renders the holdings list", () => {
    renderScreen();
    expect(screen.getByTestId("app-display")).toBeTruthy();
  });
});
