/**
 * Configuración del CTA de WhatsApp.
 * Reemplazá WHATSAPP_NUMBER por el número real de Calu (sin + ni espacios).
 * Formato: código de país + área + número. Ej: "5493815 56-2959"
 */
export const WHATSAPP_NUMBER = "5493815562959";

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
