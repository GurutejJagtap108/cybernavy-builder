<<<<<<< HEAD
# CyberNavy – Modern SOC Platform (Prototype)

This project is a production‑grade React + Vite + Tailwind app with an Express API. It implements a marketing site and a protected /app dashboard prototype for the CyberNavy security operations platform.

## Structure

- client/ – React SPA
  - pages/ – routes (Home at /, /app dashboard)
  - components/ – UI and layouts (header, sidebar, cards)
  - lib/ – api client (retry/backoff), websocket client (with polling fallback), SEO helpers, mocks
  - i18n/ – simple English dictionary and provider
- server/ – Express API stubs
  - routes/security.ts – /api/events (live feed), /api/threats
- shared/ – types for Threat, Alert, Incident, URLRule, User, Role, Report, AuditLog

## Env variables (Vite)

- VITE_API_BASE_URL – optional; defaults to current origin
- VITE_WS_URL – optional; websocket endpoint; if missing, client falls back to polling /api/events

Set env vars via the platform settings; do not commit secrets.

## Swapping mocks for real APIs

- Replace server route stubs with real endpoints or proxy to your backend
- Replace client/lib/mocks.ts factories with real data
- Api client lives at client/lib/apiClient.ts (add auth headers in interceptors)
- WebSocket client at client/lib/ws.ts

## Development

- pnpm dev – run app
- pnpm build – build client + server
- pnpm test – run tests

## Notes

- Accessible, WCAG AA‑minded colors and focus states
- Core Web Vitals: defer non‑critical assets, lazy UI where applicable
- SEO per‑page via useSeo helper; add JSON‑LD for Organization, Product, BlogPosting as needed

"INSERT BACKEND HERE": Wire integrations, SSO, and real data sources when ready.
