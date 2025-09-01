import { sortRows, type SortMode } from "@/components/utils/sortRows";

const rows = [
  {
    id: "a",
    currentValueAmountText: "$2,000.00",
    change24hPercentText: "1.00%",
    profitLossPercentText: "5.00%",
  },
  {
    id: "b",
    currentValueAmountText: "$500.00",
    change24hPercentText: "10.00%",
    profitLossPercentText: "-2.00%",
  },
  {
    id: "c",
    currentValueAmountText: "$1,500.00",
    change24hPercentText: "-3.00%",
    profitLossPercentText: "12.00%",
  },
];

it.each<SortMode>(["value", "change24h", "pl"])(
  "sortRows sorts by %s",
  (mode) => {
    const sorted = sortRows(rows, mode).map((r) => r.id);
    if (mode === "value") expect(sorted).toEqual(["a", "c", "b"]);
    if (mode === "change24h") expect(sorted).toEqual(["b", "a", "c"]);
    if (mode === "pl") expect(sorted).toEqual(["c", "a", "b"]);
  }
);

it("is defensive against missing fields", () => {
  const mixed = [
    { id: "x" },
    { id: "y", positionValueAmountText: "$100.00" },
    { id: "z", currentValueAmountText: "$50.00" },
  ];
  const sorted = sortRows(mixed, "value").map((r) => r.id);
  expect(sorted).toEqual(["y", "z", "x"]);
});
