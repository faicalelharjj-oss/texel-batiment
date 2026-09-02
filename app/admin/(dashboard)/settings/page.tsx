import { getSettings, getRealisations } from "@/lib/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [settings, realisations] = await Promise.all([getSettings(), getRealisations()]);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Accueil &amp; coordonnées</h1>
          <p>Textes, photos et coordonnées affichés sur la page d&rsquo;accueil.</p>
        </div>
      </div>
      <div className="admin-card">
        <SettingsForm
          initial={{
            companyName: settings.companyName,
            phoneDisplay: settings.phoneDisplay,
            phoneIntl: settings.phoneIntl,
            whatsappNumber: settings.whatsappNumber,
            email: settings.email,
            defaultWaMessage: settings.defaultWaMessage,
            heroEyebrow: settings.heroEyebrow,
            heroTagline: settings.heroTagline,
            heroLead: settings.heroLead,
            heroExpertise: settings.heroExpertise,
            heroPhoto: settings.heroPhoto,
            whyTitle: settings.whyTitle,
            whyPhoto: settings.whyPhoto,
            whyList: settings.whyList,
            showcasePhoto: settings.showcasePhoto,
            showcaseTitle: settings.showcaseTitle,
            showcaseText: settings.showcaseText,
            realisations: realisations.map((r) => ({ photo: r.photo, tag: r.tag, caption: r.caption })),
          }}
        />
      </div>
    </>
  );
}
