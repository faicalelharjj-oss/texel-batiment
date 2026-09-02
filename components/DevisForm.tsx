"use client";

import { useId, useState } from "react";

export default function DevisForm({ lot, waPhone }: { lot: string; waPhone: string }) {
  const id = useId();
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = [`Bonjour, je m'appelle ${nom} (tél. ${telephone}).`, `Demande de devis : ${lot}.`];
    if (message.trim()) lines.push(message.trim());
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${waPhone}?text=${text}`, "_blank", "noopener");

    fetch("/api/devis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lot, nom, telephone, message }),
    }).catch((err) => console.warn("Enregistrement du devis impossible :", err));
  }

  return (
    <form className="devis-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor={`nom-${id}`}>Nom</label>
        <input
          type="text"
          id={`nom-${id}`}
          required
          placeholder="Votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor={`tel-${id}`}>Téléphone</label>
        <input
          type="tel"
          id={`tel-${id}`}
          required
          placeholder="06 12 34 56 78"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor={`msg-${id}`}>Votre projet</label>
        <textarea
          id={`msg-${id}`}
          rows={3}
          placeholder="Décrivez votre projet en quelques mots"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-whatsapp">
        Envoyer sur WhatsApp
      </button>
    </form>
  );
}
