"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Lightbox — Modal modular para ver imágenes ampliadas.              */
/*                                                                     */
/*  Sizing responsive (clave): la imagen usa max-h/max-w + w/h auto,   */
/*  de modo que:                                                       */
/*    • Imagen vertical   → toma TODO el alto disponible.              */
/*    • Imagen horizontal → toma TODO el ancho disponible.             */
/*  Sin recortes (object-contain) y sin "letterbox" feo en mobile.    */
/*                                                                     */
/*  Soporta: teclado (Esc / ← / →), swipe táctil, navegación, caption.*/
/* ------------------------------------------------------------------ */

export type LightboxItem = {
  src: string;
  alt: string;
};

type Props = {
  items: LightboxItem[];
  initialIndex?: number;
  onClose: () => void;
  /** Texto opcional mostrado bajo la imagen (ej: nombre del blend). */
  caption?: string;
};

export function Lightbox({ items, initialIndex = 0, onClose, caption }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );

  /* Teclado + bloqueo de scroll del body */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [next, prev, onClose]);

  /* Swipe táctil */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || items.length <= 1) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const current = items[index];
  const multi = items.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-deep-teal/95 backdrop-blur-md flex flex-col"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada: ${current.alt}`}
    >
      {/* Cerrar */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-silk-cream/30 bg-deep-teal/40 backdrop-blur-sm text-silk-cream hover:bg-silk-cream/10 hover:border-silk-cream/60 transition-all duration-300 flex items-center justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Área de imagen (flex-1 + min-h-0 → permite que max-h-full funcione) */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-3 sm:px-20 pt-16 pb-4 sm:py-16"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <motion.img
          key={index}
          src={current.src}
          alt={current.alt}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
          /* vertical → full height · horizontal → full width */
          className="max-h-full max-w-full w-auto h-auto object-contain rounded-xs shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] select-none"
        />

        {/* Flechas */}
        {multi && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Anterior"
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-silk-cream/30 bg-deep-teal/40 backdrop-blur-sm text-silk-cream hover:bg-silk-cream/10 hover:border-silk-cream/60 transition-all duration-300 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Siguiente"
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-silk-cream/30 bg-deep-teal/40 backdrop-blur-sm text-silk-cream hover:bg-silk-cream/10 hover:border-silk-cream/60 transition-all duration-300 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Pie: caption + contador */}
      <div
        className="relative z-10 shrink-0 flex flex-col items-center gap-2 px-6 pb-6 sm:pb-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {caption && (
          <p className="font-serif italic text-silk-cream text-xl sm:text-2xl leading-tight">
            {caption}
          </p>
        )}
        {multi && (
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.35em] text-silk-cream/70">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
