import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LotsTable from "@/components/admin/LotsTable";

export const dynamic = "force-dynamic";

export default async function AdminLotsPage() {
  const lots = await prisma.lot.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Services (lots)</h1>
          <p>Les huit lots affichés sur la page d&rsquo;accueil et leurs pages dédiées.</p>
        </div>
        <Link href="/admin/lots/new" className="admin-btn admin-btn-primary">
          + Nouveau lot
        </Link>
      </div>
      <div className="admin-card">
        <LotsTable lots={lots} />
      </div>
    </>
  );
}
