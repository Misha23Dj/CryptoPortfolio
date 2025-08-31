import { render, screen } from "@testing-library/react-native";
import React from "react";
import AppDisplay from "../components/AppDisplay";

describe("App Renders", () => {
  it("renders Hello World", async () => {
    render(<AppDisplay />);
    expect(await screen.findByText(/hello world/i)).toBeTruthy();
  });
});
