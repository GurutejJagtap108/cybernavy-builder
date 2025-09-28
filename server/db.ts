import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function getDb() {
  const url = process.env.MONGO_URL;
  if (!url) throw new Error("MONGO_URL not set");
  if (!client) {
    client = new MongoClient(url, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
  }
  return client.db();
}

export async function pingDb() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return { ok: true } as const;
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) } as const;
  }
}
