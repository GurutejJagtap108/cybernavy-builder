import { useEffect } from "react";

export function useSeo(meta: {
  title: string;
  description?: string;
  canonical?: string;
  type?: string;
  jsonLd?: any;
}) {
  useEffect(() => {
    document.title = meta.title;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    if (meta.description) setMeta("description", meta.description);
    const og = (p: string, content: string) => {
      let el = document.querySelector(
        `meta[property="og:${p}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", `og:${p}`);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    og("title", meta.title);
    if (meta.description) og("description", meta.description);
    if (meta.canonical) {
      let link = document.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = meta.canonical;
    }
    // JSON-LD
    if (meta.jsonLd) {
      let script = document.getElementById("jsonld") as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = "jsonld";
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(meta.jsonLd);
    }
  }, [
    meta.title,
    meta.description,
    meta.canonical,
    meta.type,
    JSON.stringify(meta.jsonLd),
  ]);
}
