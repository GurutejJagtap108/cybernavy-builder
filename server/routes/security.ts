import type { RequestHandler } from "express";

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: ReadonlyArray<T>): T => arr[rand(0, arr.length - 1)];

const severities = ["Critical", "High", "Medium", "Low"] as const;

export const listEvents: RequestHandler = (_req, res) => {
  const items = Array.from({ length: rand(1, 4) }, () => ({
    id: crypto.randomUUID(),
    severity: pick(severities),
    message: pick([
      "Port scan detected",
      "Suspicious login",
      "Malware signature match",
      "DLP policy violation",
    ]),
    sourceIp: `${rand(1, 255)}.${rand(0, 255)}.${rand(0, 255)}.${rand(0, 255)}`,
    createdAt: new Date().toISOString(),
  }));
  res.json({ items });
};

export const listThreats: RequestHandler = (_req, res) => {
  const items = Array.from({ length: 6 }, () => ({
    id: crypto.randomUUID(),
    title: `Threat ${rand(1000, 9999)}`,
    severity: pick(severities),
    score: rand(10, 99),
    ioc: {
      ip: `${rand(1, 255)}.${rand(0, 255)}.${rand(0, 255)}.${rand(0, 255)}`,
    },
    createdAt: new Date().toISOString(),
  }));
  res.json({ items, total: items.length, page: 1, pageSize: items.length });
};
