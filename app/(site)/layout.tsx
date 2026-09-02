import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealInit from "@/components/RevealInit";
import { getSettings } from "@/lib/settings";
import { getLots } from "@/lib/lots";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, lots] = await Promise.all([getSettings(), getLots()]);

  return (
    <>
      <Header companyName={settings.companyName} phoneDisplay={settings.phoneDisplay} phoneIntl={settings.phoneIntl} />
      <main id="top">{children}</main>
      <Footer
        companyName={settings.companyName}
        phoneDisplay={settings.phoneDisplay}
        phoneIntl={settings.phoneIntl}
        email={settings.email}
        lots={lots.map((l) => ({ slug: l.slug, title: l.title }))}
      />
      <WhatsAppFloat waPhone={settings.whatsappNumber} waMessage={settings.defaultWaMessage} companyName={settings.companyName} />
      <RevealInit />
    </>
  );
}
