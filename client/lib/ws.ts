type Callback = (data: unknown) => void;

export class LiveClient {
  ws?: WebSocket;
  url: string;
  onMessage?: Callback;
  pollInterval?: number;
  pollTimer?: number;

  constructor(url = import.meta.env.VITE_WS_URL || "") {
    this.url = url;
  }

  connect(fallbackPollPath = "/api/events", onMessage?: Callback) {
    this.onMessage = onMessage;
    if (this.url) {
      try {
        this.ws = new WebSocket(this.url);
        this.ws.onmessage = (evt) => this.onMessage?.(JSON.parse(evt.data));
        this.ws.onerror = () => this.startPolling(fallbackPollPath);
        this.ws.onclose = () => this.startPolling(fallbackPollPath);
        return;
      } catch (_) {}
    }
    this.startPolling(fallbackPollPath);
  }

  startPolling(path: string) {
    this.stop();
    this.pollInterval = 3000; // start at 3s
    let consecutiveFails = 0;

    const getUrl = (p: string) => {
      try {
        if (/^https?:\/\//.test(p)) return p;
        const base =
          import.meta.env.VITE_API_BASE_URL ||
          (typeof window !== "undefined" ? window.location.origin : "");
        return new URL(p, base).toString();
      } catch (_) {
        return p;
      }
    };

    const tick = async () => {
      try {
        const url = getUrl(path);
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          consecutiveFails++;
          console.debug("live poll non-ok response", res.status, url);
        } else {
          let data: any = null;
          const ct = res.headers.get("content-type") || "";
          if (ct.includes("application/json")) data = await res.json();
          else data = await res.text();
          this.onMessage?.(data);
          consecutiveFails = 0;
        }
      } catch (err) {
        consecutiveFails++;
        // don't spam console in prod, but helpful in dev
        if (import.meta.env.DEV) console.debug("live poll error", err);
      }

      // exponential backoff up to 30s
      const interval = Math.min(
        30000,
        this.pollInterval! * Math.pow(1.5, Math.max(0, consecutiveFails - 1)),
      );
      // @ts-ignore
      this.pollTimer = setTimeout(tick, interval);
    };
    // first tick quickly
    // @ts-ignore
    this.pollTimer = setTimeout(tick, 10);
  }

  stop() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.close();
    if (this.pollTimer) clearTimeout(this.pollTimer);
  }
}

export const live = new LiveClient();
