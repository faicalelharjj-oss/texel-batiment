"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ClientRow = { id: string; name: string; logo: string; order: number };

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Envoi impossible");
  return data.url as string;
}

export default function ClientsManager({ clients }: { clients: ClientRow[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      setLogo(await uploadFile(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Envoi impossible");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !logo) {
      setError("Nom et logo requis");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, logo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Enregistrement impossible");
      setName("");
      setLogo("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, clientName: string) {
    if (!confirm(`Retirer "${clientName}" des clients affichés ?`)) return;
    setBusyId(id);
    try {
      await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <div className="admin-gallery-grid" style={{ marginBottom: "1.5rem" }}>
        {clients.map((c) => (
          <div className="admin-gallery-item" key={c.id}>
            <img src={c.logo} alt={c.name} style={{ objectFit: "contain", background: "#fff" }} />
            <div className="admin-gallery-item-body">
              <span style={{ fontWeight: 600 }}>{c.name}</span>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                disabled={busyId === c.id}
                onClick={() => handleDelete(c.id, c.name)}
              >
                Retirer
              </button>
            </div>
          </div>
        ))}
        {clients.length === 0 && <p style={{ color: "var(--muted)" }}>Aucun client ajouté pour l&rsquo;instant.</p>}
      </div>

      <form className="admin-form" onSubmit={handleAdd}>
        {error && <p className="admin-login-error">{error}</p>}
        <div className="form-row">
          <label htmlFor="client-name">Nom du client</label>
          <input id="client-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: OCP" />
        </div>
        <div className="form-row">
          <label>Logo</label>
          {logo && <img src={logo} alt="" style={{ width: 160, background: "#fff", objectFit: "contain", borderRadius: 4 }} />}
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
          {uploading && <span>Envoi en cours...</span>}
        </div>
        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || uploading}>
            {saving ? "Ajout..." : "+ Ajouter ce client"}
          </button>
        </div>
      </form>
    </>
  );
}
