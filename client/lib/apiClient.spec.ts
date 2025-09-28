import { describe, it, expect, vi } from "vitest";
import { ApiClient } from "./apiClient";

describe("ApiClient", () => {
  it("retries failed requests", async () => {
    const client = new ApiClient("");
    const fetchSpy = vi.spyOn(globalThis, "fetch" as any);
    fetchSpy
      // first two fail
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(new Response(null, { status: 502 }))
      // last succeeds
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" } as any,
        }),
      );

    const res = await client.request<{ ok: boolean }>("/api/test", {
      retry: 2,
    });
    expect(res.ok).toBe(true);
    expect(fetchSpy).toHaveBeenCalledTimes(3);
    fetchSpy.mockRestore();
  });
});
