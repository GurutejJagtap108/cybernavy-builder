import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/admin/users", { credentials: "include" })
      .then(res => res.ok ? res.json() : res.json().then(d => Promise.reject(d.error)))
      .then(data => setUsers(data.users))
      .catch(e => setError(e || "Not authorized"));
  }, []);
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full text-sm bg-white/5 rounded-lg">
        <thead>
          <tr>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t border-white/10">
              <td className="p-2 font-mono">{u.email}</td>
              <td className="p-2">{u.username}</td>
              <td className="p-2">{u.isAdmin ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
