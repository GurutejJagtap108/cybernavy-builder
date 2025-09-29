import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteShell } from "@/components/layout/SiteShell";

// TODO: Replace with real solution data
const solutions = [
  {
    title: "AI-Powered Moderation",
    description:
      "Automate content review and compliance with advanced AI models. Instantly detect threats, sensitive data, and policy violations across text, images, and files.",
    icon: "shield",
    features: [
      "Real-time content scanning",
      "Customizable risk policies",
      "Seamless API integration",
    ],
    cta: "Learn More",
  },
  {
    title: "Secure File Exchange",
    description:
      "Enable encrypted, auditable file sharing for your team and clients. Protect IP, contracts, and sensitive documents with zero-trust architecture.",
    icon: "lock",
    features: [
      "End-to-end encryption",
      "Granular access controls",
      "Full audit trails",
    ],
    cta: "See How It Works",
  },
  {
    title: "Automated Compliance",
    description:
      "Stay ahead of regulations with automated compliance checks for GDPR, HIPAA, SOC2, and more. Generate reports and alerts with a click.",
    icon: "check-circle",
    features: [
      "Multi-standard support",
      "Instant compliance reports",
      "Continuous monitoring",
    ],
    cta: "Request Demo",
  },
];

export default function Solutions() {
  return (
    <SiteShell>
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Solutions for Modern Security & Compliance
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-slate-300 max-w-2xl mx-auto">
            Empower your business with AI-driven security, seamless compliance, and secure collaboration. Built for regulated industries, trusted by innovators.
          </p>
        </div>
        <div className="bg-white/80 dark:bg-[#181f2a] rounded-3xl shadow-lg max-w-6xl mx-auto py-12 px-4 md:px-12 flex flex-col gap-12">
          <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((sol) => (
            <Card
              key={sol.title}
              className="relative group bg-gradient-to-br from-white to-slate-100 dark:from-[#181f2a] dark:to-[#232b39] border border-slate-200 dark:border-[#232b39] shadow-lg rounded-2xl p-8 flex flex-col items-center text-center min-h-[380px] transition-all duration-200 hover:scale-[1.025] hover:shadow-2xl hover:border-cyan-400 dark:hover:border-cyan-500"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-cyan-200/60 to-transparent dark:from-cyan-500/60 rounded-t-2xl transition-colors" />
              {/* Icon */}
              <div className="mb-4 text-cyan-400">
                <span className="w-12 h-12 bg-cyan-100/60 dark:bg-cyan-900/30 rounded-full flex items-center justify-center shadow-sm">
                  <i className={`lucide lucide-${sol.icon} text-3xl`} />
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{sol.title}</h2>
              <p className="text-gray-700 dark:text-slate-300 mb-4">{sol.description}</p>
              <ul className="text-left text-gray-600 dark:text-slate-400 mb-6 space-y-1 w-full max-w-xs mx-auto">
                {sol.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-cyan-500 dark:text-cyan-400">•</span> {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-gradient-to-tr from-cyan-400 to-teal-400 dark:from-cyan-500 dark:to-teal-400 text-white font-semibold shadow-lg rounded-lg py-2 mt-auto group-hover:scale-105 group-hover:shadow-xl transition-transform"
              >
                {sol.cta}
              </Button>
            </Card>
          ))}
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <h3 className="text-2xl text-white font-bold mb-2">Not sure what fits your needs?</h3>
          <p className="text-slate-400 mb-4">
            Our experts can help you design a secure, compliant workflow tailored to your business. Book a free consultation today.
          </p>
          <Button size="lg" className="bg-gradient-to-tr from-cyan-500 to-teal-400 text-white font-bold px-8 py-3 text-lg">
            Book Consultation
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
