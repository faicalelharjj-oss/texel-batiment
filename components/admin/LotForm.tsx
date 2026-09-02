"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type GalleryItem = { src: string; alt: string };

type LotData = {
  id?: string;
  title: string;
  lead: string;
  metaDescription: string;
  heroPhoto: string;
  gallery: GalleryItem[];
};

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Envoi impossible");
  return data.url as string;
}

export default function LotForm({ mode, initial }: { mode: "new" | "edit"; initial?: LotData }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [lead, setLead] = useState(initial?.lead ?? "");
  const [metaDescription, setMetaDescription] = useState(initial?.metaDescription ?? "");
  const [heroPhoto, setHeroPhoto] = useState(initial?.heroPhoto ?? "");
  const [gallery, setGallery] = useState<GalleryItem[]>(initial?.gallery ?? []);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHero(true);
    setError(null);
    try {
      const url = await uploadFile(file);
      setHeroPhoto(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Envoi impossible");
    } finally {
      setUploadingHero(false);
      e.target.value = "";
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingGallery(true);
    setError(null);
    try {
      const url = await uploadFile(file);
      setGallery((g) => [...g, { src: url, alt: "" }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Envoi impossible");
    } finally {
      setUploadingGallery(false);
      e.target.value = "";
    }
  }

  function updateGalleryAlt(index: number, alt: string) {
    setGallery((g) => g.map((item, i) => (i === index ? { ...item, alt } : item)));
  }

  function removeGalleryItem(index: number) {
    setGallery((g) => g.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { title, lead, metaDescription, heroPhoto, gallery };

    try {
      const res = await fetch(mode === "new" ? "/api/admin/lots" : `/api/admin/lots/${initial?.id}`, {
        method: mode === "new" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Enregistrement impossible");
      router.push("/admin/lots");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <p className="admin-login-error">{error}</p>}

      <div className="form-row">
        <label htmlFor="title">Nom du service</label>
        <input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="lead">Texte d&rsquo;introduction</label>
        <textarea id="lead" rows={3} value={lead} onChange={(e) => setLead(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="metaDescription">Description pour Google (SEO)</label>
        <textarea id="metaDescription" rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Photo principale</label>
        {heroPhoto && (
          <img src={heroPhoto} alt="" style={{ width: 200, aspectRatio: "4/3", objectFit: "cover", borderRadius: 4 }} />
        )}
        <input type="file" accept="image/*" onChange={handleHeroUpload} disabled={uploadingHero} />
        {uploadingHero && <span>Envoi en cours...</span>}
      </div>

      <div className="form-row">
        <label>Galerie de photos</label>
        <div className="admin-gallery-grid">
          {gallery.map((item, i) => (
            <div className="admin-gallery-item" key={item.src + i}>
              <img src={item.src} alt="" />
              <div className="admin-gallery-item-body">
                <input
                  type="text"
                  placeholder="Description de la photo"
                  value={item.alt}
                  onChange={(e) => updateGalleryAlt(i, e.target.value)}
                />
                <button type="button" className="admin-btn admin-btn-danger" onClick={() => removeGalleryItem(i)}>
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
        <input type="file" accept="image/*" onChange={handleGalleryUpload} disabled={uploadingGallery} style={{ marginTop: "0.75rem" }} />
        {uploadingGallery && <span>Envoi en cours...</span>}
      </div>

      <div className="admin-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
