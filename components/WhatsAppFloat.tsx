export default function WhatsAppFloat({
  waPhone,
  waMessage,
  companyName,
}: {
  waPhone: string;
  waMessage: string;
  companyName: string;
}) {
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`}
      target="_blank"
      rel="noopener"
      aria-label={`Discuter avec ${companyName} sur WhatsApp`}
      title="WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h4l1.5 4-2 2a12 12 0 0 0 6.5 6.5l2-2 4 1.5v4a2 2 0 0 1-2 2C10.3 22 2 13.7 2 6a2 2 0 0 1 2-2z" />
      </svg>
    </a>
  );
}
