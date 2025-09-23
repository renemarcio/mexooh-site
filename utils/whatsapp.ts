// utils/whatsapp.ts
export function buildWhatsAppLink(opts?: {
  phone?: string;        // E.164, ex: 5511972301116
  text?: string;
  utmSource?: string;
  utmCampaign?: string;
  extraUrl?: string;     // url da página/item
}) {
  const {
    phone = process.env.NEXT_PUBLIC_WHATS_MAIN || "5511972301116",
    text = "Olá! Vim pelo site e gostaria de saber mais 😊",
    utmSource = "site",
    utmCampaign = "cta_whatsapp",
    extraUrl,
  } = opts || {};

  const base = `https://wa.me/${phone}`;
  const msg = `${text}${extraUrl ? `\n\nLink: ${extraUrl}` : ""}\n\nutm_source=${utmSource}&utm_campaign=${utmCampaign}`;
  return `${base}?text=${encodeURIComponent(msg)}`;
}
