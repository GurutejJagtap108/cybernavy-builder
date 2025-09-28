import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-background to-background/60">
      <SiteHeader />
      <main id="content" className="mx-auto max-w-[1400px] px-4 py-8 md:py-12">
        {children}
      </main>
      <footer className="border-t border-white/10 mt-16">
        <div className="mx-auto max-w-[1400px] px-4 py-8 text-sm text-foreground/60 flex flex-col md:flex-row gap-3 items-center justify-between">
          <p>© {new Date().getFullYear()} CyberNavy. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <a className="hover:text-foreground" href="/legal">
              Legal
            </a>
            <a className="hover:text-foreground" href="/privacy">
              Privacy
            </a>
            <a className="hover:text-foreground" href="/security">
              Security
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
