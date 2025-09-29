import React, { useMemo, useState, useEffect } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Card } from "@/components/common/Card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import * as Recharts from "recharts";

// simple count-up hook
function useCountUp(to: number, duration = 1000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = performance.now();
    let raf = 0 as any;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return val;
}

const metrics = [
  { label: "Deployments", value: 1283 },
  { label: "Active Projects", value: 47 },
  { label: "Integrations", value: 12 },
];

const mockUsage = Array.from({ length: 30 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  usage: Math.round(200 + Math.sin(i / 4) * 80 + i * 6),
}));

export default function Docs() {
  useSeo({
    title: "Docs — CyberNavy",
    description:
      "Documentation, guides, and examples for CyberNavy — secure, production-ready starter apps and deployment patterns.",
    canonical: `${location.origin}/docs`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "CyberNavy Documentation",
      description:
        "Guides, API references, and tutorials for CyberNavy starter app and platform usage.",
      mainEntityOfPage: { "@type": "WebPage", "@id": `${location.origin}/docs` },
      publisher: {
        "@type": "Organization",
        name: "CyberNavy",
        url: location.origin,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: location.origin },
          { "@type": "ListItem", position: 2, name: "Docs", item: `${location.origin}/docs` },
        ],
      },
    },
  });

  const counts = metrics.map((m) => useCountUp(m.value, 1400));

  const areaData = useMemo(() => mockUsage, []);

  return (
    <SiteShell>
      <div className="grid gap-8">
        <section className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">What is CyberNavy?</h1>
            <p className="text-gray-700 dark:text-gray-300 mt-2 max-w-2xl">
              CyberNavy is a cybersecurity project focused on real-time detection, monitoring, and analysis of digital threats. 
               It is designed to help users identify unsafe or malicious content such as harmful images,
               videos, and URLs using AI-powered classification models and APIs..
            </p>

            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">The platform provides</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 mt-2">
              <li>Threat detection: scans files, images, and URLs to find inappropriate or harmful content.</li>
              <li>Real-time monitoring: continuously analyzes incoming data for potential risks.</li>
              <li>User-friendly dashboard: a clean and interactive interface for managing detections and reports.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              CyberNavy's mission is to make the digital space safer by providing developers, organizations, and
              individuals with tools to analyze and respond to online threats effectively.
            </p>

            <div className="mt-6 flex gap-3">
              <a href="#get-started">
                <Button className="bg-gradient-to-tr from-cyan-500 to-teal-400 text-white">Get started</Button>
              </a>
              <a href="#guides">
                <Button variant="ghost">Browse guides</Button>
              </a>
            </div>

            <div className="mt-8 flex gap-6">
              {metrics.map((m, i) => (
                <div key={m.label} className="text-center">
                  <div className="text-3xl font-semibold text-gray-900 dark:text-white">{counts[i].toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card className="p-4 overflow-hidden rounded-md">
              <div className="h-64 w-full">
                <ChartContainer id="docs-usage" config={{ usage: { color: "#06b6d4" } }}>
                  <Recharts.ResponsiveContainer width="100%" height="100%">
                    <Recharts.AreaChart data={areaData} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <Recharts.XAxis dataKey="day" hide />
                      <Recharts.YAxis hide />
                      <Recharts.CartesianGrid strokeDasharray="3 3" strokeOpacity={0.03} />
                      <Recharts.Area type="monotone" dataKey="usage" stroke="#06b6d4" fill="url(#areaGradient)" />
                      <Recharts.Tooltip content={<ChartTooltipContent />} />
                      <Recharts.Legend content={<ChartLegendContent />} />
                    </Recharts.AreaChart>
                  </Recharts.ResponsiveContainer>
                </ChartContainer>
              </div>
            </Card>
          </div>
        </section>

        <section id="guides" className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Quickstart</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Run locally, explore routes, and customize the starter.</p>
            <ol className="mt-3 list-decimal pl-5 text-gray-700 dark:text-gray-300">
              <li>Install dependencies: <code>pnpm install</code></li>
              <li>Start dev server: <code>pnpm dev</code></li>
              <li>Open the app: <code>/</code> and docs: <code>/docs</code></li>
            </ol>
            <a href="#" className="mt-4 inline-flex"><Button variant="ghost">Open quickstart</Button></a>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Key Features</h3>
            <ul className="mt-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li>Vite + React SPA with TypeScript</li>
              <li>Integrated Express API for full-stack prototyping</li>
              <li>Shared types and path aliases for consistent dev DX</li>
              <li>Prebuilt UI components (Tailwind + Radix)</li>
            </ul>
            <a href="#" className="mt-4 inline-flex"><Button variant="ghost">Read architecture</Button></a>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">How to use</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Practical steps to extend the starter:</p>
            <ul className="mt-3 text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li>Hook up your SSO provider in `server/routes/auth.ts`</li>
              <li>Add API routes under `server/routes` and types in `shared/`</li>
              <li>Use `client/components/ui` to build consistent UIs</li>
            </ul>
            <a href="#" className="mt-4 inline-flex"><Button variant="ghost">View API</Button></a>
          </Card>
        </section>

        <section id="get-started" className="grid gap-6 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Guides & Tutorials</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Step-by-step walkthroughs for common workflows like auth, moderation, and production builds.</p>
            <ul className="mt-4 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>Authentication & SSO</li>
              <li>File moderation pipeline</li>
              <li>Building and deploying</li>
            </ul>
          </div>
          <div>
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white">Download Starter</h4>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Download a zip with example configs and CI templates.</p>
              <div className="mt-4">
                <a href="/" className="inline-flex"><Button>Download</Button></a>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Community Projects</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Showcase of projects built with CyberNavy.</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <img src="/placeholder.svg" alt="project" className="w-full h-40 object-cover rounded-md" />
              <img src="/placeholder.svg" alt="project" className="w-full h-40 object-cover rounded-md" />
              <img src="/placeholder.svg" alt="project" className="w-full h-40 object-cover rounded-md" />
            </div>
          </Card>
        </section>
      </div>
    </SiteShell>
  );
}
