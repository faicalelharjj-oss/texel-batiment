"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Connexion impossible");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h1>Administration</h1>
        <p className="admin-login-sub">Texel Bâtiment</p>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
        </div>
        <div className="form-row">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="admin-login-error">{error}</p>}
        <button type="submit" className="btn btn-safety" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
