import React from "react";

// Minimal wrapper for pages where animations should be disabled.
export function NoPageFade({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--background))" }}>
      {children}
    </div>
  );
}

export default NoPageFade;
