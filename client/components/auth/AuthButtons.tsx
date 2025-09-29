
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AuthButtons() {
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState<"login" | "signup" | "forgot" | "reset" | "otp" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailForReset, setEmailForReset] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [searchParams] = useSearchParams();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setAuthed(!!data))
      .catch(() => setAuthed(false));
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    if (token && email) {
      setResetToken(token);
      setEmailForReset(email);
      setOpen("reset");
    }
  }, [searchParams]);

  const doForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setForgotSent(false);
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setForgotSent(true);
    } else {
      setError("Failed to send reset link");
    }
  };

  const doReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResetSuccess(false);
    const data = new FormData(e.currentTarget);
    const password = data.get("password");
    const confirm = data.get("confirm");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: resetToken,
        email: emailForReset,
        password,
      }),
    });
    if (res.ok) {
      setResetSuccess(true);
      setTimeout(() => setOpen("login"), 1500);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to reset password");
    }
  };

  const doLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    });
    if (res.ok) {
      setAuthed(true);
      setOpen(null);
      window.location.reload();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Invalid credentials");
    }
  };

  const doSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: data.get("username"),
        email,
        password: data.get("password"),
      }),
    });
    if (res.ok) {
      setAuthed(false);
      setSignupSuccess(true);
      setOtpEmail(email);
      setOpen("otp");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Registration failed");
    }
  };

  const doVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOtpError(null);
    setOtpSuccess(false);
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: otpEmail, otp }),
    });
    if (res.ok) {
      setOtpSuccess(true);
      setTimeout(() => {
        setOpen("login");
        setOtp("");
        setOtpSuccess(false);
      }, 1500);
    } else {
      const data = await res.json().catch(() => ({}));
      setOtpError(data.error || "Invalid OTP");
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
  };

  return (
    <div className="flex items-center gap-2">
      {!authed ? (
        <>
          {signupSuccess && (
            <div className="text-green-600 text-sm px-2 py-1 rounded bg-green-50 border border-green-200 mb-2">
              Account created! Now login to your account.
            </div>
          )}
          <Dialog
            open={open === "login"}
            onOpenChange={(o) => {
              setError(null);
              setOpen(o ? "login" : null);
            }}
          >
            <DialogTrigger asChild>
              <Button variant="ghost">Login</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
              </DialogHeader>
              <form onSubmit={doLogin} className="space-y-3">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
                />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-tr from-cyan-500 to-teal-400 text-white"
                >
                  Sign in
                </Button>
              </form>
              <div className="pt-2 text-right">
                <button
                  className="text-xs text-cyan-500 hover:underline"
                  type="button"
                  onClick={() => setOpen("forgot")}
                >
                  Forgot password?
                </button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog
            open={open === "signup"}
            onOpenChange={(o) => {
              setError(null);
              if (o) setSignupSuccess(false);
              setOpen(o ? "signup" : null);
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline">Sign up</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create your account</DialogTitle>
              </DialogHeader>
              <form onSubmit={doSignup} className="space-y-3">
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Work email"
                  className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
                />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-tr from-cyan-500 to-teal-400 text-white"
                >
                  Create account
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          {/* OTP Verification Dialog */}
          <Dialog open={open === "otp"} onOpenChange={(o) => setOpen(o ? "otp" : null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Verify your email</DialogTitle>
              </DialogHeader>
              <form onSubmit={doVerifyOtp} className="space-y-3">
                <input
                  name="otp"
                  type="text"
                  required
                  maxLength={6}
                  pattern="[0-9]{6}"
                  placeholder="Enter 6-digit OTP sent to your email"
                  className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3 tracking-widest text-center"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />
                {otpError && <div className="text-red-500 text-sm">{otpError}</div>}
                {otpSuccess && <div className="text-green-600 text-sm">Account verified! You can now log in.</div>}
                <Button type="submit" className="w-full bg-cyan-500 text-white">
                  Verify
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          {/* Forgot Password Dialog */}
          <Dialog open={open === "forgot"} onOpenChange={(o) => setOpen(o ? "forgot" : null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Forgot Password</DialogTitle>
              </DialogHeader>
              {forgotSent ? (
                <div className="text-green-600">If this email exists, a reset link has been sent. Please check your inbox and spam folder. The link will open a password reset dialog.</div>
              ) : (
                <form onSubmit={doForgot} className="space-y-3">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
                  />
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <Button type="submit" className="w-full bg-cyan-500 text-white">
                    Send reset link
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
          {/* Reset Password Dialog */}
          <Dialog open={open === "reset"} onOpenChange={(o) => setOpen(o ? "reset" : null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
              </DialogHeader>
              {resetSuccess ? (
                <div className="text-green-600">Password reset! You can now log in.</div>
              ) : (
                <form onSubmit={doReset} className="space-y-3">
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="New password"
                    className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
                  />
                  <input
                    name="confirm"
                    type="password"
                    required
                    placeholder="Confirm new password"
                    className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3"
                  />
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <Button type="submit" className="w-full bg-cyan-500 text-white">
                    Reset password
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
}
