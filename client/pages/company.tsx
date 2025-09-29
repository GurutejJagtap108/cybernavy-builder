import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Card } from "@/components/common/Card";
import { useSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ShieldCheck, Eye, Zap } from "lucide-react";

export default function Company() {
  useSeo({
    title: "Company — CyberNavy",
    description: "About CyberNavy — mission, values, team, and contact information.",
    canonical: `${location.origin}/company`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "CyberNavy",
      url: location.origin,
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "support@cybernavy.com",
          contactType: "customer support",
        },
      ],
    },
  });

  return (
    <SiteShell>
      <div className="grid gap-8">
  <section className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold">CyberNavy </h1>
            <p className="text-foreground/70 mt-4 max-w-2xl">Developed by Omkar Jagtap and Gurutej Jagtap — focused on secure, modern web apps that ship fast.</p>
            <div className="mt-6 flex gap-3">
              <a href="/docs"><Button className="bg-gradient-to-tr from-cyan-500 to-teal-400 text-white">Read the docs</Button></a>
              <a href="https://github.com" target="_blank" rel="noreferrer"><Button variant="ghost">View on GitHub</Button></a>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <Card className="p-4 overflow-hidden rounded-md">
              <div className="flex items-center gap-3">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="Omkar" />
                  <AvatarFallback>O</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Omkar Jagtap</div>
                  <div className="text-sm text-foreground/70">Co-founder</div>
                </div>
              </div>
              <div className="mt-4 border-t border-white/5 pt-4 text-sm text-foreground/70">Creator, contributor, and maintainer of the CyberNavy starter.</div>
            </Card>
            <Card className="p-4 mt-4 overflow-hidden rounded-md">
              <div className="flex items-center gap-3">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="Gurutej" />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Gurutej Jagtap</div>
                  <div className="text-sm text-foreground/70">Co-founder</div>
                </div>
              </div>
              <div className="mt-4 border-t border-white/5 pt-4 text-sm text-foreground/70">Architect and lead on security & infrastructure.</div>
            </Card>
          </div>
        </section>

  <section className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 overflow-hidden rounded-md hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-cyan-600/10 rounded-md text-cyan-400"><ShieldCheck /></div>
              <div>
                <h4 className="font-semibold">Security</h4>
                <p className="text-foreground/70 mt-1">Protect users from online threats using robust defaults and secure patterns.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 overflow-hidden rounded-md hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-600/10 rounded-md text-teal-400"><Eye /></div>
              <div>
                <h4 className="font-semibold">Transparency</h4>
                <p className="text-foreground/70 mt-1">Clear, open, and ethical use of data in every integration and decision.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 overflow-hidden rounded-md hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-600/10 rounded-md text-amber-400"><Zap /></div>
              <div>
                <h4 className="font-semibold">Innovation</h4>
                <p className="text-foreground/70 mt-1">Using AI, ML, and Cloud to stay ahead of evolving threats.</p>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <Card className="p-6 overflow-hidden rounded-md">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-foreground/70 mt-2">Email: <a href="mailto:support@cybernavy.com" className="text-cyan-400">support@cybernavy.com</a></p>
            <div className="mt-4 flex gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer"><Button>GitHub</Button></a>
              <a href="#" className="inline-flex"><Button variant="ghost">LinkedIn</Button></a>
            </div>
          </Card>
        </section>
      </div>
    </SiteShell>
  );
}
