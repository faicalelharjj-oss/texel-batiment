import { prisma } from "@/lib/prisma";
import ClientsManager from "@/components/admin/ClientsManager";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Nos clients</h1>
          <p>
            Logos affichés dans la section &laquo;&nbsp;Ils nous font confiance&nbsp;&raquo; de l&rsquo;accueil.
            N&rsquo;ajoutez que des clients ayant donné leur accord pour l&rsquo;usage de leur logo.
          </p>
        </div>
      </div>
      <div className="admin-card">
        <ClientsManager clients={clients} />
      </div>
    </>
  );
}
