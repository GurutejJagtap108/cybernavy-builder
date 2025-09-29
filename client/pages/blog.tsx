import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Placeholder blog data
const posts = [
  {
    title: "How AI is Transforming Cybersecurity",
    excerpt:
      "Explore the latest trends in AI-driven security, from threat detection to compliance automation. Learn how modern businesses are leveraging machine learning to stay ahead of cyber threats.",
    date: "2025-09-15",
    author: "CyberNavy Team",
    tag: "AI & Security",
  },
  {
    title: "Zero Trust: The New Standard for Secure Collaboration",
    excerpt:
      "Understand the principles of zero trust architecture and how it enables secure, auditable file sharing for distributed teams.",
    date: "2025-08-30",
    author: "CyberNavy Team",
    tag: "Best Practices",
  },
  {
    title: "Compliance Automation: From Burden to Advantage",
    excerpt:
      "See how automated compliance checks for GDPR, HIPAA, and SOC2 can reduce risk and free up your team for innovation.",
    date: "2025-08-10",
    author: "CyberNavy Team",
    tag: "Compliance",
  },
];

export default function Blog() {
  return (
    <SiteShell>
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Insights & Resources
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-slate-300 max-w-2xl mx-auto">
            Stay up to date with the latest in AI, security, compliance, and digital trust. Thought leadership, best practices, and product updates from the CyberNavy team.
          </p>
        </div>
        <div className="bg-white/80 dark:bg-[#181f2a] rounded-3xl shadow-lg max-w-5xl mx-auto py-12 px-4 md:px-12 flex flex-col gap-12">
          <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card
              key={post.title}
              className="relative group bg-gradient-to-br from-white to-slate-100 dark:from-[#181f2a] dark:to-[#232b39] border border-slate-200 dark:border-[#232b39] shadow-lg rounded-2xl p-6 flex flex-col justify-between min-h-[320px] hover:scale-[1.025] hover:shadow-2xl hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-200"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-cyan-200/60 to-transparent dark:from-cyan-500/60 rounded-t-2xl transition-colors" />
              <div>
                <div className="text-xs uppercase text-cyan-500 dark:text-cyan-400 font-semibold mb-2">{post.tag}</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h2>
                <p className="text-gray-700 dark:text-slate-300 mb-4 text-sm">{post.excerpt}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mt-2">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <Button
                className="mt-4 w-full bg-gradient-to-tr from-cyan-400 to-teal-400 dark:from-cyan-500 dark:to-teal-400 text-white font-semibold shadow-lg rounded-lg py-2 group-hover:scale-105 group-hover:shadow-xl transition-transform"
              >
                Read More
              </Button>
            </Card>
          ))}
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <h3 className="text-xl text-white font-bold mb-2">Want to contribute or suggest a topic?</h3>
          <p className="text-slate-400 mb-4">
            We welcome guest posts and topic suggestions from the community. Reach out to our team to get featured!
          </p>
          <Button size="lg" className="bg-gradient-to-tr from-cyan-500 to-teal-400 text-white font-bold px-8 py-3 text-lg">
            Contact Us
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
