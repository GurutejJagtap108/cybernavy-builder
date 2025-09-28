import { cn } from "@/lib/utils";

export function SeverityBadge({
  severity,
}: {
  severity: "Critical" | "High" | "Medium" | "Low";
}) {
  const map: Record<string, string> = {
    Critical: "text-red-300 bg-red-500/10 border-red-400/30",
    High: "text-orange-300 bg-orange-500/10 border-orange-400/30",
    Medium: "text-amber-300 bg-amber-500/10 border-amber-400/30",
    Low: "text-emerald-300 bg-emerald-500/10 border-emerald-400/30",
  };
  return (
    <span
      className={cn("text-xs px-2 py-0.5 rounded-full border", map[severity])}
    >
      {severity}
    </span>
  );
}
