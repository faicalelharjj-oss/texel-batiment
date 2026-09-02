import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LotForm from "@/components/admin/LotForm";

export const dynamic = "force-dynamic";

export default async function EditLotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lot = await prisma.lot.findUnique({ where: { id }, include: { gallery: { orderBy: { order: "asc" } } } });
  if (!lot) notFound();

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>{lot.title}</h1>
          <p>/{lot.slug}</p>
        </div>
      </div>
      <div className="admin-card">
        <LotForm
          mode="edit"
          initial={{
            id: lot.id,
            title: lot.title,
            lead: lot.lead,
            metaDescription: lot.metaDescription,
            heroPhoto: lot.heroPhoto,
            gallery: lot.gallery.map((g) => ({ src: g.src, alt: g.alt })),
          }}
        />
      </div>
    </>
  );
}
