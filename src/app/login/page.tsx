"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = "/admin";
      return;
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-yellow-400 hover:underline mb-6 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </main>
  );
}
