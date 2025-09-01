export let customRandom: (() => number) | null = null;
export const setRandom = (fn: () => number) => {
  customRandom = fn;
};
export const rand = (min = 0, max = 1) =>
  min + (customRandom ? customRandom() : Math.random()) * (max - min);
export const weightedPick = (weights: Record<string, number>) => {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let r = rand(0, total);
  for (const [k, w] of Object.entries(weights)) {
    r -= w;
    if (r <= 0) return k;
  }
  return Object.keys(weights)[0];
};
