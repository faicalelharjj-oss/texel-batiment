import type { Metadata } from "next";
import "../css/style.css";

export const metadata: Metadata = {
  title: "Texel Bâtiment — Construction & génie civil",
  description:
    "Texel Bâtiment — entreprise de construction, génie civil et travaux tous corps d'état : gros œuvre, aménagement, étanchéité, électricité, climatisation, peinture, bâtiment modulaire.",
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
