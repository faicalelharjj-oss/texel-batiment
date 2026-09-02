import LotForm from "@/components/admin/LotForm";

export default function NewLotPage() {
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Nouveau service</h1>
          <p>Il apparaîtra à la fin de la liste sur la page d&rsquo;accueil.</p>
        </div>
      </div>
      <div className="admin-card">
        <LotForm mode="new" initial={{ title: "", lead: "", metaDescription: "", heroPhoto: "", gallery: [] }} />
      </div>
    </>
  );
}
