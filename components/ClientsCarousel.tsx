"use client";

import { useEffect, useState } from "react";

type ClientItem = { id: string; name: string; logo: string };

const PER_PAGE = 5;
const INTERVAL_MS = 4000;

export default function ClientsCarousel({ clients }: { clients: ClientItem[] }) {
  const pages: ClientItem[][] = [];
  for (let i = 0; i < clients.length; i += PER_PAGE) {
    pages.push(clients.slice(i, i + PER_PAGE));
  }

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (pages.length <= 1) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % pages.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [pages.length]);

  if (clients.length === 0) return null;

  return (
    <div className="clients-carousel">
      <div className="clients-track">
        {pages[active].map((c) => (
          <div className="clients-logo" key={c.id}>
            <img src={c.logo} alt={c.name} title={c.name} />
          </div>
        ))}
      </div>
      {pages.length > 1 && (
        <div className="clients-dots">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === active ? "active" : ""}
              aria-label={`Voir le groupe de clients ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
