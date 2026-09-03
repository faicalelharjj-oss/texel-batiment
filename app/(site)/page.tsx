import Link from "next/link";
import Image from "next/image";
import { getSettings, getRealisations } from "@/lib/settings";
import { getLots } from "@/lib/lots";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, lots, realisations] = await Promise.all([getSettings(), getLots(), getRealisations()]);

  return (
    <>
      <section className="hero" id="hero">
        <Image className="hero-photo" src={settings.heroPhoto} alt="" fill priority sizes="100vw" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="blueprint-grid" aria-hidden="true" />
        <p className="corner corner-tl">Éch. 1&#8202;:&#8202;1</p>
        <p className="corner corner-tr">Fiche projet — FR</p>
        <div className="hero-inner">
          <p className="eyebrow">{settings.heroEyebrow}</p>
          <h1>
            TEXEL<span>BÂTIMENT</span>
          </h1>
          <svg className="dim-line" viewBox="0 0 600 20" preserveAspectRatio="none" aria-hidden="true">
            <line className="dim-track" x1="6" y1="10" x2="594" y2="10" />
            <line x1="6" y1="3" x2="6" y2="17" stroke="currentColor" strokeWidth="1.5" />
            <line x1="594" y1="3" x2="594" y2="17" stroke="currentColor" strokeWidth="1.5" />
            <line x1="300" y1="5" x2="300" y2="15" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <p className="hero-tagline">{settings.heroTagline}</p>
          <p className="hero-lead">{settings.heroLead}</p>
          <ul className="hero-expertise">
            {settings.heroExpertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <a className="btn btn-safety" href={`tel:${settings.phoneIntl}`}>
              Appeler — {settings.phoneDisplay}
            </a>
            <Link className="btn btn-outline" href="/devis">
              Demander un devis
            </Link>
          </div>
        </div>
        <p className="corner corner-bl">{settings.companyName}</p>
        <p className="corner corner-br">Gros œuvre / second œuvre</p>
      </section>

      <section className="services" id="services">
        <div className="section-head">
          <p className="eyebrow eyebrow-dark">Nos corps de métier</p>
          <h2>Huit lots, un seul chantier</h2>
          <p className="section-lead">
            Chaque projet est découpé en lots de travaux, tous suivis en interne pour garantir cohérence, qualité et délais.
          </p>
        </div>
        <div className="lots-grid">
          {lots.map((lot) => (
            <article className="lot-card has-photo reveal" key={lot.id}>
              <div className="lot-photo">
                <Image src={lot.heroPhoto} alt={lot.gallery[0]?.alt ?? lot.title} width={900} height={675} />
                <span className="photo-tag">Lot {String(lot.order).padStart(2, "0")}</span>
              </div>
              <div className="lot-body">
                <svg className="lot-icon" viewBox="0 0 40 40" aria-hidden="true" dangerouslySetInnerHTML={{ __html: lot.icon }} />
                <h3>{lot.title}</h3>
                <p>{lot.lead}</p>
                <Link className="card-link" href={`/${lot.slug}`}>
                  En savoir plus →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="realisations" id="realisations">
        <div className="section-head">
          <p className="eyebrow eyebrow-dark">Nos réalisations</p>
          <h2>Le travail parle de lui-même</h2>
          <p className="section-lead">
            Un aperçu de nos chantiers, du gros œuvre à la livraison finale. Détails de projets communiqués sur demande.
          </p>
        </div>
        <div className="realisations-grid">
          {realisations.map((item) => (
            <figure className="realisation-card reveal" key={item.id}>
              <Image src={item.photo} alt={item.caption} width={900} height={675} />
              <figcaption>
                <span className="lot-tag">{item.tag}</span>
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="why" id="apropos">
        <div className="why-inner">
          <div className="why-photo">
            <Image src={settings.whyPhoto} alt={`L'équipe ${settings.companyName} sur un chantier`} width={800} height={600} />
          </div>
          <div className="why-content">
            <h2>{settings.whyTitle}</h2>
            <ul className="why-list">
              {settings.whyList.map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="4,13 9,18 20,6" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="showcase">
        <Image className="showcase-photo" src={settings.showcasePhoto} alt={`Bâtiment résidentiel livré par ${settings.companyName}`} fill sizes="100vw" />
        <div className="showcase-inner">
          <div className="showcase-content">
            <p className="eyebrow">Un projet en tête ?</p>
            <h2>{settings.showcaseTitle}</h2>
            <p>{settings.showcaseText}</p>
            <a className="btn btn-safety" href={`tel:${settings.phoneIntl}`}>
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="cartouche">
          <p className="cartouche-title">Fiche contact</p>
          <div className="cartouche-grid">
            <div className="cell">
              <span className="label">Entreprise</span>
              <span className="value">{settings.companyName}</span>
            </div>
            <div className="cell">
              <span className="label">Activité</span>
              <span className="value">Bâtiments &amp; ouvrages d&rsquo;art</span>
            </div>
            <div className="cell">
              <span className="label">Téléphone</span>
              <a className="value" href={`tel:${settings.phoneIntl}`}>
                {settings.phoneDisplay}
              </a>
            </div>
            <div className="cell">
              <span className="label">Email</span>
              <a className="value" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            </div>
            <div className="cell">
              <span className="label">WhatsApp</span>
              <a
                className="value"
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.defaultWaMessage)}`}
                target="_blank"
                rel="noopener"
              >
                {settings.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="cartouche-actions">
            <a className="btn btn-safety" href={`tel:${settings.phoneIntl}`}>
              Appeler maintenant
            </a>
            <a
              className="btn btn-whatsapp"
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.defaultWaMessage)}`}
              target="_blank"
              rel="noopener"
            >
              Écrire sur WhatsApp
            </a>
            <a className="btn btn-outline-onink" href={`mailto:${settings.email}?subject=Demande%20de%20devis`}>
              Envoyer un email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
