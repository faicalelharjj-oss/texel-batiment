import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [lotCount, devisCount, recentDevis] = await Promise.all([
    prisma.lot.count(),
    prisma.devisRequest.count(),
    prisma.devisRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Tableau de bord</h1>
          <p>Vue d&rsquo;ensemble du site Texel Bâtiment.</p>
        </div>
      </div>

      <div className="admin-stats" style={{ marginBottom: "1.75rem" }}>
        <div className="admin-stat">
          <div className="num">{lotCount}</div>
          <div className="label">Services publiés</div>
        </div>
        <div className="admin-stat">
          <div className="num">{devisCount}</div>
          <div className="label">Demandes de devis reçues</div>
        </div>
      </div>

      <div className="admin-card">
        <h2 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Dernières demandes de devis</h2>
        {recentDevis.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Aucune demande pour l&rsquo;instant.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Téléphone</th>
                  <th>Lot</th>
                </tr>
              </thead>
              <tbody>
                {recentDevis.map((d) => (
                  <tr key={d.id}>
                    <td>{new Date(d.createdAt).toLocaleDateString("fr-FR")}</td>
                    <td>{d.nom}</td>
                    <td>{d.telephone}</td>
                    <td>{d.lot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p style={{ marginTop: "1rem" }}>
          <Link href="/admin/devis" className="admin-btn">
            Voir toutes les demandes →
          </Link>
        </p>
      </div>
    </>
  );
}
