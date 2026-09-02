import { prisma } from "@/lib/prisma";
import DevisTable from "@/components/admin/DevisTable";

export const dynamic = "force-dynamic";

export default async function AdminDevisPage() {
  const requests = await prisma.devisRequest.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Demandes de devis</h1>
          <p>Chaque soumission de formulaire, sur toutes les pages de service.</p>
        </div>
      </div>
      <div className="admin-card">
        <DevisTable requests={requests.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))} />
      </div>
    </>
  );
}
