"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header({
  companyName,
  phoneDisplay,
  phoneIntl,
}: {
  companyName: string;
  phoneDisplay: string;
  phoneIntl: string;
}) {
  const [open, setOpen] = useState(false);

  function closeNav() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="logo" href="/" aria-label={`${companyName} — accueil`} onClick={closeNav}>
          <Image className="logo-mark" src="/images/logo-mark.png" alt="" width={640} height={486} />
          TEXEL <span>BÂTIMENT</span>
        </Link>
        <nav className={`nav${open ? " open" : ""}`} id="nav">
          <Link href="/#services" onClick={closeNav}>Services</Link>
          <Link href="/#realisations" onClick={closeNav}>Réalisations</Link>
          <Link href="/#apropos" onClick={closeNav}>À propos</Link>
          <Link href="/#contact" onClick={closeNav}>Contact</Link>
        </nav>
        <div className="header-actions">
          <a className="phone-chip" href={`tel:${phoneIntl}`}>{phoneDisplay}</a>
          <Link className="btn btn-safety" href="/devis" onClick={closeNav}>Demander un devis</Link>
          <button
            className="nav-toggle"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
