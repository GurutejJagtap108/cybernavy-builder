import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("glass-card p-4 md:p-6", className)}>{children}</div>
  );
}

export function MetricTile({
  label,
  value,
  delta,
  severity = "info",
}: {
  label: string;
  value: string | number;
  delta?: { value: number; trend: "up" | "down" | "flat" };
  severity?: "critical" | "high" | "medium" | "low" | "info";
}) {
  const colors: Record<string, string> = {
    critical: "from-red-500 to-red-400",
    high: "from-orange-500 to-orange-400",
    medium: "from-amber-500 to-amber-400",
    low: "from-emerald-500 to-emerald-400",
    info: "from-cyan-500 to-teal-400",
  };
  const bar = colors[severity] ?? colors.info;
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-white/5 to-white/0">
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b",
          bar,
        )}
      />
      <div className="p-4 md:p-5 pl-6">
        <div className="text-xs uppercase tracking-wide text-foreground/60">
          {label}
        </div>
        <div className="mt-1 flex items-baseline gap-3">
          <div className="text-2xl md:text-3xl font-semibold">{value}</div>
          {delta && (
            <div
              className={cn(
                "text-xs px-2 py-0.5 rounded-full border",
                delta.trend === "up"
                  ? "text-emerald-300 border-emerald-400/30 bg-emerald-500/10"
                  : delta.trend === "down"
                    ? "text-red-300 border-red-400/30 bg-red-500/10"
                    : "text-foreground/60 border-white/10 bg-white/5",
              )}
            >
              {delta.trend === "up" ? "▲" : delta.trend === "down" ? "▼" : "→"}{" "}
              {Math.abs(delta.value)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
