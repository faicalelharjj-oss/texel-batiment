"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LotRow = { id: string; slug: string; title: string; order: number };

export default function LotsTable({ lots }: { lots: LotRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Supprimer le lot "${title}" ? Cette action est définitive.`)) return;
    setBusyId(id);
    try {
      await fetch(`/api/admin/lots/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ordre</th>
            <th>Titre</th>
            <th>URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lots.map((lot) => (
            <tr key={lot.id}>
              <td>{lot.order}</td>
              <td>{lot.title}</td>
              <td>/{lot.slug}</td>
              <td>
                <div className="admin-actions">
                  <Link className="admin-btn" href={`/admin/lots/${lot.id}/edit`}>
                    Modifier
                  </Link>
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger"
                    disabled={busyId === lot.id}
                    onClick={() => handleDelete(lot.id, lot.title)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
