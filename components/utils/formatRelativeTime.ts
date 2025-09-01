export const formatRelativeTime = (fromMs?: number, nowMs?: number) => {
  if (!fromMs || !nowMs) return "—";
  const diff = Math.max(0, nowMs - fromMs);
  if (diff < 60_000) return "Just now";
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
};
