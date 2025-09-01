import { formatRelativeTime } from "@/components/utils/formatRelativeTime";

const NOW = 1_700_000_000_000;
const ms = (n: number) => n;
const min = (n: number) => n * 60_000;

describe("formatRelativeTime", () => {
  it("returns em dash for missing inputs", () => {
    expect(formatRelativeTime(undefined, undefined)).toBe("—");
    expect(formatRelativeTime(NOW, undefined)).toBe("—");
    expect(formatRelativeTime(undefined, NOW)).toBe("—");
  });

  it("returns Just now for < 60s", () => {
    expect(formatRelativeTime(NOW - ms(1), NOW)).toBe("Just now");
    expect(formatRelativeTime(NOW - ms(59_999), NOW)).toBe("Just now");
  });

  it("handles the 1-minute boundary", () => {
    expect(formatRelativeTime(NOW - min(1), NOW)).toBe("1 min ago");
    expect(formatRelativeTime(NOW - min(2), NOW)).toBe("2 mins ago");
  });

  it("formats minutes up to 59 mins", () => {
    expect(formatRelativeTime(NOW - min(59), NOW)).toBe("59 mins ago");
  });

  it("rolls to hours at 60 mins and floors thereafter", () => {
    expect(formatRelativeTime(NOW - min(60), NOW)).toBe("1h ago");
    expect(formatRelativeTime(NOW - min(119), NOW)).toBe("1h ago");
    expect(formatRelativeTime(NOW - min(120), NOW)).toBe("2h ago");
    expect(formatRelativeTime(NOW - min(240), NOW)).toBe("4h ago");
  });

  it("clamps negative diffs to Just now", () => {
    expect(formatRelativeTime(NOW + ms(10_000), NOW)).toBe("Just now");
  });
});
