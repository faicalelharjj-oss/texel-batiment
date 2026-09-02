"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DevisRow = {
  id: string;
  createdAt: string;
  nom: string;
  telephone: string;
  lot: string;
  message: string | null;
};

export default function DevisTable({ requests }: { requests: DevisRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette demande ?")) return;
    setBusyId(id);
    try {
      await fetch(`/api/admin/devis/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  if (requests.length === 0) {
    return <p style={{ color: "var(--muted)" }}>Aucune demande de devis pour l&rsquo;instant.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Lot</th>
            <th>Message</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{new Date(r.createdAt).toLocaleString("fr-FR")}</td>
              <td>{r.nom}</td>
              <td>
                <a href={`tel:${r.telephone}`}>{r.telephone}</a>
              </td>
              <td>{r.lot}</td>
              <td>{r.message || "—"}</td>
              <td>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  disabled={busyId === r.id}
                  onClick={() => handleDelete(r.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
