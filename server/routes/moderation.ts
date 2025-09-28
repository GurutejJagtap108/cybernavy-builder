import type { RequestHandler } from "express";

export const ingest: RequestHandler = (req, res) => {
  const { items } = req.body ?? {};
  if (!Array.isArray(items))
    return res.status(400).json({ error: "items array required" });
  // In production, validate and persist. Here we echo back.
  res.json({ accepted: items.length, items });
};
