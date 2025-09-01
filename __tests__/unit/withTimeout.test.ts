import { withTimeout } from "@/components/utils/withTimeout";

it("resolves before timeout", async () => {
  const p = withTimeout(Promise.resolve(42), 100);
  await expect(p).resolves.toBe(42);
});

it("rejects on timeout", async () => {
  const slow = new Promise<number>(() => {});
  await expect(withTimeout(slow, 10)).rejects.toThrow("Request timed out");
});
