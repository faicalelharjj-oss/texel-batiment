import type { Metadata } from "next";
import Image from "next/image";
import { getLots } from "@/lib/lots";
import { getSettings } from "@/lib/settings";
import GeneralDevisForm from "@/components/GeneralDevisForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Demander un devis — Texel Bâtiment",
  description:
    "Demandez un devis gratuit à Texel Bâtiment pour vos travaux de construction, génie civil, aménagement, étanchéité, électricité, climatisation, peinture ou bâtiment modulaire.",
};

export default async function DevisPage() {
  const [lots, settings] = await Promise.all([getLots(), getSettings()]);

  return (
    <>
      <section className="hero lot-hero" id="hero">
        <Image className="hero-photo" src={settings.heroPhoto} alt="" fill priority sizes="100vw" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="hero-inner">
          <p className="eyebrow">Devis gratuit</p>
          <h1>Demander un devis</h1>
          <p className="hero-lead">
            Décrivez votre projet en quelques mots, nous vous répondons rapidement — par téléphone, WhatsApp ou email.
          </p>
          <div className="hero-actions">
            <a className="btn btn-safety" href={`tel:${settings.phoneIntl}`}>
              Appeler — {settings.phoneDisplay}
            </a>
            <a
              className="btn btn-whatsapp"
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.defaultWaMessage)}`}
              target="_blank"
              rel="noopener"
            >
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="lot-cta" id="devis-form">
        <div className="lot-cta-inner">
          <p className="eyebrow eyebrow-dark">Votre demande</p>
          <h2>Parlons de votre projet</h2>
          <p>Remplissez le formulaire : votre message part directement sur WhatsApp.</p>
          <GeneralDevisForm
            lots={lots.map((l) => ({ slug: l.slug, title: l.title }))}
            waPhone={settings.whatsappNumber}
          />
          <div className="lot-cta-alt">
            <a className="btn btn-outline-onink" href={`mailto:${settings.email}?subject=Demande%20de%20devis`}>
              Envoyer un email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
