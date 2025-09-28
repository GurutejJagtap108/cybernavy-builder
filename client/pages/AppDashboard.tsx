import { AppShell } from "@/components/layout/AppShell";
import { MetricTile, Card } from "@/components/common/Card";
import { useEffect, useMemo, useState } from "react";
import { live } from "@/lib/ws";
import { factories } from "@/lib/mocks";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import type { SecurityEvent } from "@shared/api";
import UploadModerationCard from "@/components/moderation/UploadModerationCard";

export default function AppDashboard() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  useEffect(() => {
    const onMsg = (data: any) => {
      if (Array.isArray(data?.items))
        setEvents((prev) => [...data.items, ...prev].slice(0, 20));
      else if (Array.isArray(data))
        setEvents((prev) => [...data, ...prev].slice(0, 20));
      else if (data?.id)
        setEvents((prev) => [data as SecurityEvent, ...prev].slice(0, 20));
      else setEvents((prev) => [factories.event(), ...prev].slice(0, 20));
    };
    live.connect("/api/events", onMsg);
    const seed = Array.from({ length: 6 }, () => factories.event());
    setEvents(seed);
    return () => live.stop();
  }, []);

  const kpis = useMemo(
    () => [
      {
        label: "Active Threats",
        value: 12,
        delta: { value: 8, trend: "down" as const },
        severity: "high" as const,
      },
      {
        label: "Critical Alerts",
        value: 3,
        delta: { value: 12, trend: "up" as const },
        severity: "critical" as const,
      },
      {
        label: "System Health",
        value: "99.9%",
        delta: { value: 0.2, trend: "up" as const },
        severity: "low" as const,
      },
      {
        label: "Security Score",
        value: 86,
        delta: { value: 3, trend: "up" as const },
        severity: "info" as const,
      },
    ],
    [],
  );

  return (
    <AppShell current="/app">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Security Overview</h1>
        <a href="/reports" className="text-sm text-cyan-300 hover:underline">
          View Reports
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((k) => (
          <MetricTile
            key={k.label}
            label={k.label}
            value={k.value as any}
            delta={k.delta}
            severity={k.severity as any}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mt-6">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Recent Security Events</h2>
            <div className="text-xs text-foreground/60">Live feed</div>
          </div>
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card/80 backdrop-blur">
                <tr className="text-left text-foreground/60">
                  <th className="py-2 px-2">Time</th>
                  <th className="py-2 px-2">Severity</th>
                  <th className="py-2 px-2">Message</th>
                  <th className="py-2 px-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr
                    key={e.id}
                    className="border-t border-white/5 hover:bg-white/5"
                  >
                    <td className="py-2 px-2 whitespace-nowrap text-foreground/70">
                      {new Date(e.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="py-2 px-2">
                      <SeverityBadge severity={e.severity} />
                    </td>
                    <td className="py-2 px-2">{e.message}</td>
                    <td className="py-2 px-2 mono text-foreground/80">
                      {e.sourceIp ?? e.hash ?? e.url ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold mb-2">Severity Triage</h2>
          <ul className="space-y-2 text-sm">
            {[
              {
                label: "Critical",
                count: events.filter((e) => e.severity === "Critical").length,
              },
              {
                label: "High",
                count: events.filter((e) => e.severity === "High").length,
              },
              {
                label: "Medium",
                count: events.filter((e) => e.severity === "Medium").length,
              },
              {
                label: "Low",
                count: events.filter((e) => e.severity === "Low").length,
              },
            ].map((r) => (
              <li
                key={r.label}
                className="flex items-center justify-between border-b border-white/5 pb-2 last:border-none"
              >
                <span>{r.label}</span>
                <span className="text-foreground/70">{r.count}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xs text-foreground/60">
            ATT&CK tags, IOC enrichment, and correlation notes are prepared for
            future integration.
          </div>
        </Card>

        <UploadModerationCard />
      </div>
    </AppShell>
  );
}
