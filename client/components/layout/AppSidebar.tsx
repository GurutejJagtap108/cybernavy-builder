import {
  Activity,
  AlertTriangle,
  BadgePercent,
  Blocks,
  BookOpen,
  Box,
  Cable,
  CheckCircle2,
  Cog,
  FileText,
  Gauge,
  Layers,
  ListChecks,
  Lock,
  Network,
  Shield,
  Siren,
  Table2,
  Users,
  Webhook,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", href: "/app", icon: Gauge },
  { label: "Threats", href: "/app/threats", icon: Shield, badge: 8 },
  { label: "Detection", href: "/app/detection", icon: Siren },
  { label: "Moderation", href: "/app/moderation", icon: ListChecks },
  { label: "URL Manager", href: "/app/url-manager", icon: Lock },
  { label: "Alerts", href: "/app/alerts", icon: AlertTriangle, badge: 3 },
  { label: "Incidents", href: "/app/incidents", icon: Activity },
  { label: "Network", href: "/app/network", icon: Network },
  { label: "Reports", href: "/app/reports", icon: FileText },
  { label: "Admin & RBAC", href: "/app/admin", icon: Users },
  { label: "Settings", href: "/app/settings", icon: Cog },
  { label: "Integrations", href: "/app/integrations", icon: Webhook },
];

export function AppSidebar({ current }: { current?: string }) {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-2 border-r border-sidebar-border bg-sidebar p-3">
      <div className="text-xs uppercase tracking-wide text-sidebar-foreground/60 px-2">
        Modules
      </div>
      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = current?.startsWith(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                active
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60",
              )}
            >
              <Icon className="size-4 opacity-90" />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="text-xs rounded-full px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {item.badge}
                </span>
              ) : null}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
