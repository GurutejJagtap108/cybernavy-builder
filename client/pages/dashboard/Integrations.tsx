
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/AppShell";

export default function Integrations() {
  return (
    <AppShell current="/app/integrations">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold mb-4">Integrations</h2>
        <div className="bg-white/80 dark:bg-[#181f2a] rounded-3xl shadow-lg py-10 px-4 md:px-10 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Metric Card - Connected Apps */}
            <Card className="bg-gradient-to-br from-white to-slate-100 dark:from-[#181f2a] dark:to-[#232b39] border border-slate-200 dark:border-[#232b39] rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[160px] relative overflow-hidden transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-semibold text-gray-900 dark:text-white/90">Connected Apps</div>
              <Button className="rounded-lg px-4 py-2 bg-cyan-700/80 hover:bg-cyan-600/90 text-white">Add Integration</Button>
            </div>
            <div className="text-4xl font-bold text-cyan-500 dark:text-cyan-400 drop-shadow">3</div>
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-cyan-200/60 to-transparent dark:from-cyan-500/60 rounded-t-2xl" />
            </Card>
            {/* Available Integrations Card */}
            <Card className="bg-gradient-to-br from-white to-slate-100 dark:from-[#181f2a] dark:to-[#232b39] border border-slate-200 dark:border-[#232b39] rounded-2xl shadow-lg p-6 flex flex-col min-h-[160px] relative overflow-hidden transition-colors">
            <div className="font-semibold mb-2 text-gray-900 dark:text-white/90">Available Integrations</div>
            <ul className="space-y-2">
              <li className="text-gray-700 dark:text-white/80">Slack</li>
              <li className="text-gray-700 dark:text-white/80">Microsoft Teams</li>
              <li className="text-gray-700 dark:text-white/80">Zapier</li>
            </ul>
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-cyan-200/60 to-transparent dark:from-cyan-500/60 rounded-t-2xl" />
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}