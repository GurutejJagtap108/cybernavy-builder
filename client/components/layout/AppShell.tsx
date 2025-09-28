import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { AppSidebar } from "./AppSidebar";

export function AppShell({
  children,
  current,
}: {
  children: ReactNode;
  current?: string;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-[1400px] px-4 py-6 flex">
        <AppSidebar current={current} />
        <section className="flex-1 min-w-0 md:pl-6">{children}</section>
      </div>
    </div>
  );
}
