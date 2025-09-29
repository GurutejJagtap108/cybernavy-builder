type RequestConfig = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  retry?: number;
  signal?: AbortSignal;
};

type Interceptor<T> = (arg: T) => Promise<T> | T;

export class ApiClient {
  baseURL: string;
  requestInterceptors: Interceptor<Request>[] = [];
  responseInterceptors: Interceptor<Response>[] = [];

  constructor(baseURL = import.meta.env.VITE_API_BASE_URL || "") {
    this.baseURL = baseURL;
  }

  addRequestInterceptor(fn: Interceptor<Request>) {
    this.requestInterceptors.push(fn);
  }
  addResponseInterceptor(fn: Interceptor<Response>) {
    this.responseInterceptors.push(fn);
  }

  private async applyRequestInterceptors(req: Request) {
    let r = req;
    for (const i of this.requestInterceptors) r = await i(r);
    return r;
  }
  private async applyResponseInterceptors(res: Response) {
    let r = res;
    for (const i of this.responseInterceptors) r = await i(r);
    return r;
  }

  async request<T = unknown>(
    path: string,
    config: RequestConfig = {},
  ): Promise<T> {
    const fallbackOrigin =
      (typeof window !== "undefined" && window.location && window.location.origin) ||
      "http://localhost";
    const url = new URL(path, this.baseURL || fallbackOrigin).toString();
    const init: RequestInit = {
      method: config.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(config.headers || {}),
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
      signal: config.signal,
    };
    let req = new Request(url, init);
    req = await this.applyRequestInterceptors(req);

    const maxRetry = config.retry ?? 2;
    let attempt = 0;
    let lastErr: any;
    while (attempt <= maxRetry) {
      try {
        const res = await fetch(req);
        const processed = await this.applyResponseInterceptors(res);
        if (!processed.ok) throw new Error(`HTTP ${processed.status}`);
        const ct = processed.headers.get("content-type");
        if (ct && ct.includes("application/json"))
          return (await processed.json()) as T;
  return (await processed.text()) as T;
      } catch (e) {
        lastErr = e;
        if (attempt === maxRetry) break;
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 300));
        attempt++;
      }
    }
    throw lastErr;
  }
}

export const api = new ApiClient();

// Default interceptors example
api.addRequestInterceptor((req) => {
  return new Request(req, {
    headers: {
      ...Object.fromEntries(req.headers),
      "X-Requested-With": "CyberNavy",
    },
  });
});
api.addResponseInterceptor((res) => res);
