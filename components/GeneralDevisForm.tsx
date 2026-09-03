"use client";

import { useState } from "react";

type LotOption = { slug: string; title: string };

export default function GeneralDevisForm({ lots, waPhone }: { lots: LotOption[]; waPhone: string }) {
  const [lot, setLot] = useState("Non précisé");
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
        <label htmlFor="devis-lot">Quel service ?</label>
        <select id="devis-lot" value={lot} onChange={(e) => setLot(e.target.value)}>
          <option value="Non précisé">Non précisé / Autre</option>
          {lots.map((l) => (
            <option key={l.slug} value={l.title}>
              {l.title}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="devis-nom">Nom</label>
        <input type="text" id="devis-nom" required placeholder="Votre nom" value={nom} onChange={(e) => setNom(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="devis-tel">Téléphone</label>
        <input
          type="tel"
          id="devis-tel"
          required
          placeholder="06 12 34 56 78"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="devis-msg">Votre projet</label>
        <textarea
          id="devis-msg"
          rows={4}
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
