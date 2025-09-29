import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { handleDemo } from "./routes/demo";
import { listEvents, listThreats } from "./routes/security";
import { ingest } from "./routes/moderation";
import authRouter from "./routes/auth";
import { initializeDatabase } from "./init-db";
export function createServer() {
  const app = express();
  
  // Initialize database indexes
  initializeDatabase().catch(console.error);

  // CORS: allow credentials and frontend origin
  app.use(cors({
    origin: (origin, callback) => {
      // Allow localhost:5173 (Vite default) and same-origin
      if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Health
  // app.get("/api/health/db", healthDb); // removed, handled in auth router

  // CyberNavy API stubs
  app.get("/api/events", listEvents);
  app.get("/api/threats", listThreats);
  app.post("/api/moderation/ingest", ingest);

  // Auth API
  app.use("/api/auth", authRouter);

  // Simple sitemap
  app.get("/sitemap.xml", (_req, res) => {
    const base = process.env.PUBLIC_URL || "";
    const urls = [
      "/",
      "/solutions",
      "/pricing",
      "/docs",
      "/blog",
      "/company",
      "/legal",
      "/app",
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${base}${u}</loc></url>`).join("")}</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  });

  // Serve React SPA for all other routes (except API and static)
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api/") || req.path.startsWith("/sitemap.xml")) return next();
      const indexFile = path.join(distPath, "index.html");
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send("index.html not found. Please run 'pnpm build' to generate it.");
      }
    });
  }
  return app;
}
