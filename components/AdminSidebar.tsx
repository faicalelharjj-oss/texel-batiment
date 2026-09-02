"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/lots", label: "Services (lots)" },
  { href: "/admin/settings", label: "Accueil & coordonnées" },
  { href: "/admin/devis", label: "Demandes de devis" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">TEXEL BÂTIMENT</div>
      <nav className="admin-nav">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="admin-sidebar-footer">
        <Link href="/" target="_blank">
          Voir le site ↗
        </Link>
        <br />
        <button type="button" className="admin-btn" style={{ marginTop: "0.75rem" }} onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
