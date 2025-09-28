import { useCallback } from "react";

type EventName = "page_view" | "cta_click" | "export_report";

type EventPayload = Record<string, unknown> & { ts?: number };

export function useAnalytics() {
  const track = useCallback((name: EventName, payload: EventPayload = {}) => {
    const evt = { name, ts: Date.now(), ...payload };
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("analytics", { detail: evt }));
    }
    if (import.meta.env.DEV) console.debug("analytics", evt);
  }, []);

  return { track };
}
