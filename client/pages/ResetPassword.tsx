import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, password }),
    });
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } else {
      setError("Failed to reset password. The link may be invalid or expired.");
    }
  };

  if (!token || !email) {
    return <div className="p-8 text-center text-red-600">Invalid or missing reset link.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white/10 rounded-lg p-8 shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
        {success ? (
          <div className="text-green-600 text-center mb-4">Password reset! Redirecting...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="New password"
              className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="confirm"
              required
              minLength={6}
              placeholder="Confirm new password"
              className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-cyan-500 text-white">Reset Password</Button>
          </form>
        )}
      </div>
    </div>
  );
}
