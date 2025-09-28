
import { sendEmail } from "../utils/email";



import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDb, pingDb } from "../db";
import { ObjectId } from "mongodb";
import crypto from "crypto";
// import { sendEmail } from "../utils/email"; // Uncomment if email utils exist

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

// Forgot password: send reset link
router.post("/forgot-password", async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });
  const db = await getDb();
  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(200).json({ message: "If this email exists, a reset link has been sent." });
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 min
  await db.collection("users").updateOne(
    { email },
    { $set: { resetToken: token, resetTokenExpires: expires } }
  );
  const resetUrl = `${process.env.PUBLIC_URL || "http://localhost:8080"}/?token=${token}&email=${encodeURIComponent(email)}`;
  try {
    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href=\"${resetUrl}\">here</a> to reset your password. This link expires in 30 minutes.</p>`
    });
  } catch (e) {
    return res.status(500).json({ error: "Failed to send email" });
  }
  res.json({ message: "If this email exists, a reset link has been sent." });
});


// Registration endpoint (Gmail only)
router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }
  if (!/^[^@]+@gmail\.com$/.test(email)) {
    return res.status(400).json({ error: "Only Gmail accounts are allowed" });
  }
  try {
    const db = await getDb();
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({
      username,
      email,
      password: hash,
      createdAt: new Date(),
      isAdmin: false,
    });
    res.json({ message: "Registration successful" });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || String(e) });
  }
});

// --- Middleware ---
function requireAuth(req: Request, res: Response, next: any) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

async function requireAdmin(req: Request, res: Response, next: any) {
  const db = await getDb();
  const userId = (req as any).user.id;
  const user = await db.collection("users").findOne({ _id: ObjectId.isValid(userId) ? new ObjectId(userId) : userId });
  if (user && user.isAdmin) return next();
  res.status(403).json({ error: "Admin only" });
}

// --- Endpoints ---

// Health check
router.get("/health", async (_req: Request, res: Response) => {
  const status = await pingDb();
  res.json(status);
});

// Profile update (username, password, bio, location, avatar)
router.post("/profile", requireAuth, async (req: Request, res: Response) => {
  const { username, password, bio, location, avatar } = req.body;
  const db = await getDb();
  const userId = (req as any).user.id;
  const update: any = {};
  if (username) update.username = username;
  if (bio) update.bio = bio;
  if (location) update.location = location;
  if (avatar) update.avatar = avatar;
  if (password) update.password = await bcrypt.hash(password, 10);
  if (!username && !password && !bio && !location && !avatar) return res.status(400).json({ error: "Nothing to update" });
  await db.collection("users").updateOne({ _id: ObjectId.isValid(userId) ? new ObjectId(userId) : userId }, { $set: update });
  res.json({ message: "Profile updated" });
});

// Admin: list all users
router.get("/admin/users", requireAuth, requireAdmin, async (_req: Request, res: Response) => {
  const db = await getDb();
  const users = await db.collection("users").find({}, { projection: { password: 0, resetToken: 0, resetTokenExpires: 0 } }).toArray();
  res.json({ users });
});

// Password reset (assume this is POST /reset-password)
router.post("/reset-password", async (req: Request, res: Response) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) return res.status(400).json({ error: "Token, email, and new password required" });
  const db = await getDb();
  const user = await db.collection("users").findOne({ email, resetToken: token });
  if (!user || !user.resetTokenExpires || new Date(user.resetTokenExpires) < new Date()) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }
  const hash = await bcrypt.hash(password, 10);
  await db.collection("users").updateOne(
    { email },
    { $set: { password: hash }, $unset: { resetToken: "", resetTokenExpires: "" } }
  );
  res.json({ message: "Password reset successful." });
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  try {
    const db = await getDb();
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: false, sameSite: "strict", path: "/", secure: false });
    res.json({ message: "Logged in" });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || String(e) });
  }
});

// Logout
router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Get current user
router.get("/me", async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const db = await getDb();
    const userId = payload.id;
    const user = await db.collection("users").findOne({ _id: ObjectId.isValid(userId) ? new ObjectId(userId) : userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      username: user.username,
      email: user.email,
      isAdmin: !!user.isAdmin,
      bio: user.bio || "",
      location: user.location || "",
      avatar: user.avatar || ""
    });
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
