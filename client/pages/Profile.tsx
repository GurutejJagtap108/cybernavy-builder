import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: "",
    bio: "",
    location: "",
    avatar: "",
    password: "",
    confirm: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data);
        setForm(f => ({
          ...f,
          username: data?.username || "",
          bio: data?.bio || "",
          location: data?.location || "",
          avatar: data?.avatar || ""
        }));
      })
      .catch(() => setUser(null));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (form.password && form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    const res = await fetch("/api/auth/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: form.username,
        bio: form.bio,
        location: form.location,
        avatar: form.avatar,
        password: form.password
      }),
    });
    if (res.ok) {
      setSuccess("Profile updated");
      setEditing(false);
      setForm(f => ({ ...f, password: "", confirm: "" }));
      // Refresh user info
      fetch("/api/auth/me", { credentials: "include" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => setUser(data));
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to update profile");
    }
  };

  if (!user) return <div className="p-8 text-center">Not logged in.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg bg-white/10">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-white">
                {user.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
          <div className="text-foreground/70 mb-2">{user.email}</div>
          {user.bio && <div className="mb-2 text-foreground/80 italic">{user.bio}</div>}
          {user.location && <div className="mb-2 text-foreground/80 flex items-center gap-1"><span className="material-icons text-cyan-400">location_on</span>{user.location}</div>}
          {!editing && (
            <Button className="mt-2" onClick={() => setEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </div>
      {editing && (
        <form onSubmit={handleUpdate} className="mt-8 bg-white/5 rounded-xl p-6 shadow space-y-5">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="w-full h-10 rounded-md bg-white/10 border border-white/20 px-3"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Avatar URL</label>
              <input
                type="url"
                value={form.avatar}
                onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))}
                className="w-full h-10 rounded-md bg-white/10 border border-white/20 px-3"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Bio</label>
              <textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                className="w-full rounded-md bg-white/10 border border-white/20 px-3 min-h-[60px]"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className="w-full h-10 rounded-md bg-white/10 border border-white/20 px-3"
                placeholder="City, Country"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">New Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full h-10 rounded-md bg-white/10 border border-white/20 px-3"
                placeholder="Leave blank to keep current"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Confirm New Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                className="w-full h-10 rounded-md bg-white/10 border border-white/20 px-3"
                placeholder="Leave blank to keep current"
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <div className="flex gap-4 mt-4">
            <Button type="submit" className="bg-cyan-500 text-white flex-1">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditing(false)} className="flex-1">Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
