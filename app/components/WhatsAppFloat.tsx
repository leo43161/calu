"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink } from "../lib/whatsapp";

const DEFAULT_MESSAGE = "Hola Calu! Me gustaría hacer una consulta.";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="wa-float"
          href={waLink(DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribinos por WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 bg-deep-teal text-silk-cream pl-4 pr-5 py-3 rounded-full shadow-[0_18px_40px_-12px_rgba(13,57,60,0.55)] hover:bg-leaf transition-colors duration-500"
        >
          {/* Halo */}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-antique-gold/30 group-hover:ring-antique-gold/60 transition-all" />
          <span className="pointer-events-none absolute -inset-1 rounded-full bg-leaf/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-antique-gold text-deep-teal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.563 4.14 1.547 5.876L.057 23.882a.5.5 0 0 0 .61.61l6.006-1.49A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.077-1.381l-.364-.217-3.766.934.952-3.668-.237-.378A9.951 9.951 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
          </span>

          <span className="relative hidden sm:flex flex-col leading-tight">
            <span className="text-[9px] uppercase tracking-[0.3em] text-antique-gold">
              Calu
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium">
              Escribinos
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
