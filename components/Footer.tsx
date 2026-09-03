import Image from "next/image";
import Link from "next/link";

type FooterLot = { slug: string; title: string };

export default function Footer({
  companyName,
  phoneDisplay,
  phoneIntl,
  email,
  lots,
}: {
  companyName: string;
  phoneDisplay: string;
  phoneIntl: string;
  email: string;
  lots: FooterLot[];
}) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image src="/images/logo.jpg" alt={`${companyName} — Génie civil & aménagement`} width={700} height={700} />
          <p>Construction de bâtiments et ouvrages d&rsquo;art.</p>
        </div>
        <nav className="footer-lots" aria-label="Nos services">
          {lots.map((lot) => (
            <Link key={lot.slug} href={`/${lot.slug}`}>{lot.title}</Link>
          ))}
        </nav>
        <div className="footer-contact">
          <a href={`tel:${phoneIntl}`}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
      <div className="footer-bottom">© 2026 {companyName} — Tous droits réservés.</div>
    </footer>
  );
}
