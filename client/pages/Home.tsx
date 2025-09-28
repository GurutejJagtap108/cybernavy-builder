import { SiteShell } from "@/components/layout/SiteShell";
import CookieConsent from "@/components/common/CookieConsent";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Gauge, Zap, Lock, FileText } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useSeo } from "@/lib/seo";

export default function Home() {
  const { track } = useAnalytics();
  useSeo({
    title: "CyberNavy – Modern Cybersecurity Operations",
    description:
      "Enterprise‑grade SOC platform: threat detection, incident response, compliance, and reporting.",
    canonical: typeof window !== "undefined" ? window.location.href : undefined,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "CyberNavy",
      url: "https://cybernavy.example.com",
      sameAs: [],
      logo: "",
    },
  });
  return (
    <SiteShell>
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
            <Sparkles className="size-3" /> Enterprise-grade SOC Platform
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            CyberNavy — Modern Cybersecurity Operations
          </h1>
          <p className="mt-4 text-foreground/80 max-w-prose">
            Unify threat detection, incident response, and compliance in one
            sleek, blazing-fast platform. Built for real-time visibility, secure
            automation, and global teams.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="/app" className="inline-flex">
              <Button
                onClick={() => track("cta_click", { cta: "get_started" })}
                className="h-11 px-6 bg-gradient-to-tr from-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-900/30"
              >
                Launch Dashboard
              </Button>
            </a>
            <a href="/docs" className="inline-flex">
              <Button
                variant="outline"
                className="h-11 px-6 border-white/20 hover:bg-white/5"
              >
                Read the Docs
              </Button>
            </a>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="glass-card p-4 rounded-lg">
              <div className="text-2xl font-semibold">2.5s</div>
              <div className="text-foreground/60">LCP target met</div>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <div className="text-2xl font-semibold">AA</div>
              <div className="text-foreground/60">WCAG contrast</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-500/20 to-teal-400/10 blur-2xl rounded-3xl" />
          <div className="relative rounded-2xl p-1 bg-gradient-to-tr from-cyan-600/50 to-teal-500/50">
            <div className="rounded-2xl p-5 bg-background/80 backdrop-blur-xl border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-sm text-foreground/70">
                    Security Score
                  </div>
                  <div className="text-3xl font-bold">86</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-sm text-foreground/70">
                    Active Threats
                  </div>
                  <div className="text-3xl font-bold">12</div>
                </div>
                <div className="col-span-2 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-sm text-foreground/70 mb-2">
                    Live Events
                  </div>
                  <div className="h-28 rounded-md bg-gradient-to-b from-white/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 md:mt-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              icon: Shield,
              title: "SOC & Detection",
              desc: "ATT&CK-mapped detections, triage workflows, and IOC enrichment.",
            },
            {
              icon: Gauge,
              title: "Performance",
              desc: "Core Web Vitals optimized, lazy loaded assets, and CDN-ready.",
            },
            {
              icon: Lock,
              title: "Compliance",
              desc: "ISO 27001, SOC2, and GDPR templates with status widgets.",
            },
            {
              icon: FileText,
              title: "Reports",
              desc: "Templated exports with charts in PDF and CSV formats.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="glass-card p-5 rounded-xl hover:translate-y-[-2px] transition-transform"
            >
              <f.icon className="size-5 text-cyan-300" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="text-sm text-foreground/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 md:mt-24 rounded-2xl border border-white/10 p-8 glass-card">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              Built for teams that never sleep
            </h2>
            <p className="text-foreground/80 mt-2 max-w-prose">
              From detection to post‑mortem, CyberNavy streamlines your
              end‑to‑end operations with role‑based access controls and audit
              trails.
            </p>
          </div>
          <a href="/pricing" className="inline-flex">
            <Button className="bg-gradient-to-tr from-cyan-500 to-teal-400 text-white">
              See Pricing
            </Button>
          </a>
        </div>
      </section>

      <CookieConsent />
    </SiteShell>
  );
}
