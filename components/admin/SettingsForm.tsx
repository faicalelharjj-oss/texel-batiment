"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Realisation = { photo: string; tag: string; caption: string };

type SettingsData = {
  companyName: string;
  phoneDisplay: string;
  phoneIntl: string;
  whatsappNumber: string;
  email: string;
  defaultWaMessage: string;
  heroEyebrow: string;
  heroTagline: string;
  heroLead: string;
  heroExpertise: string[];
  heroPhoto: string;
  whyTitle: string;
  whyPhoto: string;
  whyList: string[];
  showcasePhoto: string;
  showcaseTitle: string;
  showcaseText: string;
  realisations: Realisation[];
};

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Envoi impossible");
  return data.url as string;
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="form-row">
      <label>{label}</label>
      {value && <img src={value} alt="" style={{ width: 180, aspectRatio: "4/3", objectFit: "cover", borderRadius: 4 }} />}
      <input
        type="file"
        accept="image/*"
        disabled={busy}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setBusy(true);
          try {
            onChange(await uploadFile(file));
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
      {busy && <span>Envoi en cours...</span>}
    </div>
  );
}

function ListField({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) {
  return (
    <div className="form-row">
      <label>{label}</label>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            value={item}
            onChange={(e) => onChange(items.map((it, idx) => (idx === i ? e.target.value : it)))}
          />
          <button type="button" className="admin-btn admin-btn-danger" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
            Retirer
          </button>
        </div>
      ))}
      <button type="button" className="admin-btn" onClick={() => onChange([...items, ""])}>
        + Ajouter une ligne
      </button>
    </div>
  );
}

export default function SettingsForm({ initial }: { initial: SettingsData }) {
  const router = useRouter();
  const [data, setData] = useState<SettingsData>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof SettingsData>(key: K, value: SettingsData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Enregistrement impossible");
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit} style={{ maxWidth: 720 }}>
      {error && <p className="admin-login-error">{error}</p>}
      {saved && !error && <p style={{ color: "var(--safety-deep)", fontWeight: 600 }}>Enregistré.</p>}

      <h2 style={{ fontSize: "1.05rem" }}>Coordonnées</h2>
      <div className="form-row">
        <label>Nom de l&rsquo;entreprise</label>
        <input value={data.companyName} onChange={(e) => set("companyName", e.target.value)} />
      </div>
      <div className="form-row">
        <label>Téléphone affiché</label>
        <input value={data.phoneDisplay} onChange={(e) => set("phoneDisplay", e.target.value)} />
      </div>
      <div className="form-row">
        <label>Téléphone (format international, ex: +33661837452)</label>
        <input value={data.phoneIntl} onChange={(e) => set("phoneIntl", e.target.value)} />
      </div>
      <div className="form-row">
        <label>Numéro WhatsApp (sans le +, ex: 33661837452)</label>
        <input value={data.whatsappNumber} onChange={(e) => set("whatsappNumber", e.target.value)} />
      </div>
      <div className="form-row">
        <label>Email</label>
        <input value={data.email} onChange={(e) => set("email", e.target.value)} />
      </div>
      <div className="form-row">
        <label>Message WhatsApp par défaut</label>
        <textarea rows={2} value={data.defaultWaMessage} onChange={(e) => set("defaultWaMessage", e.target.value)} />
      </div>

      <h2 style={{ fontSize: "1.05rem", marginTop: "1rem" }}>Section d&rsquo;accueil</h2>
      <div className="form-row">
        <label>Bandeau (eyebrow)</label>
        <input value={data.heroEyebrow} onChange={(e) => set("heroEyebrow", e.target.value)} />
      </div>
      <div className="form-row">
        <label>Accroche principale</label>
        <input value={data.heroTagline} onChange={(e) => set("heroTagline", e.target.value)} />
      </div>
      <div className="form-row">
        <label>Texte de présentation</label>
        <textarea rows={3} value={data.heroLead} onChange={(e) => set("heroLead", e.target.value)} />
      </div>
      <ListField label="Domaines d'expertise" items={data.heroExpertise} onChange={(v) => set("heroExpertise", v)} />
      <ImageField label="Photo de fond" value={data.heroPhoto} onChange={(v) => set("heroPhoto", v)} />

      <h2 style={{ fontSize: "1.05rem", marginTop: "1rem" }}>Section &laquo; Pourquoi nous &raquo;</h2>
      <div className="form-row">
        <label>Titre</label>
        <input value={data.whyTitle} onChange={(e) => set("whyTitle", e.target.value)} />
      </div>
      <ImageField label="Photo" value={data.whyPhoto} onChange={(v) => set("whyPhoto", v)} />
      <ListField label="Arguments" items={data.whyList} onChange={(v) => set("whyList", v)} />

      <h2 style={{ fontSize: "1.05rem", marginTop: "1rem" }}>Bandeau &laquo; Un projet en tête &raquo;</h2>
      <ImageField label="Photo" value={data.showcasePhoto} onChange={(v) => set("showcasePhoto", v)} />
      <div className="form-row">
        <label>Titre</label>
        <input value={data.showcaseTitle} onChange={(e) => set("showcaseTitle", e.target.value)} />
      </div>
      <div className="form-row">
        <label>Texte</label>
        <textarea rows={2} value={data.showcaseText} onChange={(e) => set("showcaseText", e.target.value)} />
      </div>

      <h2 style={{ fontSize: "1.05rem", marginTop: "1rem" }}>Réalisations mises en avant</h2>
      {data.realisations.map((r, i) => (
        <div className="admin-card" key={i}>
          <ImageField
            label="Photo"
            value={r.photo}
            onChange={(v) => set("realisations", data.realisations.map((it, idx) => (idx === i ? { ...it, photo: v } : it)))}
          />
          <div className="form-row">
            <label>Étiquette</label>
            <input
              value={r.tag}
              onChange={(e) => set("realisations", data.realisations.map((it, idx) => (idx === i ? { ...it, tag: e.target.value } : it)))}
            />
          </div>
          <div className="form-row">
            <label>Légende</label>
            <input
              value={r.caption}
              onChange={(e) =>
                set("realisations", data.realisations.map((it, idx) => (idx === i ? { ...it, caption: e.target.value } : it)))
              }
            />
          </div>
          <button
            type="button"
            className="admin-btn admin-btn-danger"
            onClick={() => set("realisations", data.realisations.filter((_, idx) => idx !== i))}
          >
            Retirer cette réalisation
          </button>
        </div>
      ))}
      <button
        type="button"
        className="admin-btn"
        onClick={() => set("realisations", [...data.realisations, { photo: "", tag: "", caption: "" }])}
      >
        + Ajouter une réalisation
      </button>

      <div className="admin-actions" style={{ marginTop: "1rem" }}>
        <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
