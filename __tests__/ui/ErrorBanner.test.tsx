import ErrorBanner from "@/components/ErrorBanner";
import ThemeProvider from "@/theme/ThemeProvider";
import { light as lightTheme } from "@/theme/colors";
import { render } from "@testing-library/react-native";
import React from "react";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

it("renders the message", () => {
  const { getByText } = renderWithTheme(<ErrorBanner message="Boom" />);
  expect(getByText("Boom")).toBeTruthy();
});

it("applies themed colors", () => {
  const { getByText, getByTestId } = renderWithTheme(
    <ErrorBanner message="Boom" />
  );
  expect(getByText("Boom")).toHaveStyle({ color: lightTheme.negative });
  expect(getByTestId("error-banner")).toHaveStyle({
    backgroundColor: `${lightTheme.negative}11`,
    borderColor: lightTheme.negative,
  });
});

it("matches snapshot", () => {
  const { toJSON } = renderWithTheme(
    <ErrorBanner message="Something went wrong" />
  );
  expect(toJSON()).toMatchSnapshot();
});
