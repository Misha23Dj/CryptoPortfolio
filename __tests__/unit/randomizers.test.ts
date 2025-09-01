import { rand, setRandom, weightedPick } from "@/components/utils/randomizers";

afterEach(() => setRandom(() => Math.random()));

it("weightedPick respects weights", () => {
  setRandom(() => 0.0);
  expect(weightedPick({ a: 1, b: 1 })).toBe("a");
  setRandom(() => 0.75);
  expect(weightedPick({ a: 1, b: 3 })).toBe("b");
});

it("rand uses customRandom when provided", () => {
  setRandom(() => 0.5);
  expect(rand(0, 10)).toBe(5);
});
