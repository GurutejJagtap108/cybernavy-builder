import { Request, Response } from "express";
import { getDb } from "../db";

export async function checkUsername(req: Request, res: Response) {
  const username = (req.query.username || "").toString().trim();
  if (!username) return res.status(400).json({ available: false, error: "Username required" });
  const db = await getDb();
  const exists = await db.collection("users").findOne({ name: username });
  res.json({ available: !exists });
}
