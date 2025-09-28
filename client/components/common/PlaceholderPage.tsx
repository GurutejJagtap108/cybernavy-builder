import { Button } from "@/components/ui/button";

export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 p-8 glass-card">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-foreground/70 mb-6 max-w-2xl">
        {description ??
          "This page is scaffolded. Continue prompting to generate full content and connect real backends."}
      </p>
      <a href="/app" className="inline-flex">
        <Button className="bg-gradient-to-tr from-cyan-500 to-teal-400 text-white">
          Go to Dashboard
        </Button>
      </a>
    </div>
  );
}
