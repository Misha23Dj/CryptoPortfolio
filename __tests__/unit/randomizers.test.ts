import { rand, setRandom, weightedPick } from "@/components/utils/randomizers";

afterEach(() => setRandom(null as any));

it("rand uses customRandom when provided", () => {
  setRandom(() => 0.5);
  expect(rand(0, 10)).toBe(5);
  setRandom(() => 0);
  expect(rand(10, 20)).toBe(10);
  setRandom(() => 1);
  expect(rand(10, 20)).toBe(20);
});

it("weightedPick respects weights", () => {
  setRandom(() => 0.0);
  expect(weightedPick({ a: 1, b: 1 })).toBe("a");
  setRandom(() => 0.99);
  expect(weightedPick({ a: 1, b: 99 })).toBe("b");
});
