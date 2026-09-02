import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLotBySlug } from "@/lib/lots";
import { getSettings } from "@/lib/settings";
import DevisForm from "@/components/DevisForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lot = await getLotBySlug(slug);
  if (!lot) return {};
  return {
    title: `${lot.title} — Texel Bâtiment`,
    description: lot.metaDescription,
  };
}

export default async function LotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [lot, settings] = await Promise.all([getLotBySlug(slug), getSettings()]);

  if (!lot) notFound();

  return (
    <>
      <section className="hero lot-hero" id="hero">
        <Image className="hero-photo" src={lot.heroPhoto} alt="" fill priority sizes="100vw" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="hero-inner">
          <a className="breadcrumb" href="/#services">
            ← Retour aux services
          </a>
          <p className="eyebrow">Lot {String(lot.order).padStart(2, "0")} — Nos services</p>
          <h1>{lot.title}</h1>
          <p className="hero-lead">{lot.lead}</p>
          <div className="hero-actions">
            <a className="btn btn-safety" href={`tel:${settings.phoneIntl}`}>
              Appeler — {settings.phoneDisplay}
            </a>
            <a
              className="btn btn-whatsapp"
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Bonjour, je souhaite un devis pour : ${lot.title}`
              )}`}
              target="_blank"
              rel="noopener"
            >
              Devis WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="lot-gallery">
        {lot.gallery.map((photo) => (
          <Image key={photo.id} src={photo.src} alt={photo.alt} width={900} height={675} />
        ))}
      </section>

      <section className="lot-cta" id="devis">
        <div className="lot-cta-inner">
          <p className="eyebrow eyebrow-dark">Un projet en {lot.title.toLowerCase()} ?</p>
          <h2>Demandez votre devis gratuit</h2>
          <p>Remplissez le formulaire : votre message part directement sur WhatsApp.</p>
          <DevisForm lot={lot.title} waPhone={settings.whatsappNumber} />
          <div className="lot-cta-alt">
            <a className="btn btn-outline-onink" href={`tel:${settings.phoneIntl}`}>
              Appeler — {settings.phoneDisplay}
            </a>
            <a className="btn btn-outline-onink" href={`mailto:${settings.email}?subject=${encodeURIComponent(`Demande de devis - ${lot.title}`)}`}>
              Envoyer un email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
