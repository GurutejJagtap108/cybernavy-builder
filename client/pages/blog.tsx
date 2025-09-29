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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Insights & Resources
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Stay up to date with the latest in AI, security, compliance, and digital trust. Thought leadership, best practices, and product updates from the CyberNavy team.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {posts.map((post) => (
            <Card key={post.title} className="bg-slate-950/80 border border-slate-800 shadow-xl rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.025] transition-transform">
              <div>
                <div className="text-xs uppercase text-cyan-400 font-semibold mb-2">{post.tag}</div>
                <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-slate-300 mb-4 text-sm">{post.excerpt}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <Button variant="outline" className="mt-4 w-full border-cyan-700 text-cyan-300 hover:bg-cyan-900/10">
                Read More
              </Button>
            </Card>
          ))}
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
