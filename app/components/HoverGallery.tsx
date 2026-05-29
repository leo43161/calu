"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  HoverGallery — Galería interactiva con 3 modos:                    */
/*    1. Hover: la posición horizontal del mouse define qué imagen     */
/*       se ve (izquierda → 1ra, centro → 2da, derecha → 3ra, etc.)    */
/*    2. Auto-rotación: cuando el mouse no está encima, las imágenes   */
/*       cambian solas cada `autoplayMs` milisegundos.                 */
/*    3. Click: abre un modal con la imagen ampliada y navegación.     */
/*                                                                     */
/*  Indicadores (dots) abajo muestran cuál está activa.                */
/*  Si no hay imágenes cargadas, se ven los placeholders pero el       */
/*  modal queda deshabilitado.                                         */
/* ------------------------------------------------------------------ */

export type GalleryItem = {
  /** Path a la imagen (ej: "/images/servicios/basico-1.jpg"). Vacío → placeholder. */
  src?: string;
  alt: string;
};

type Variant = "light" | "dark";

type Props = {
  items: GalleryItem[];
  /** Clase de aspect ratio (ej: "aspect-[4/3]") */
  aspect: string;
  /** Texto del placeholder cuando no hay imagen */
  label?: string;
  variant?: Variant;
  /** Milisegundos entre cambios automáticos (default 3500) */
  autoplayMs?: number;
  /** Sizes hint para next/image */
  sizes?: string;
  className?: string;
};

export function HoverGallery({
  items,
  aspect,
  label,
  variant = "light",
  autoplayMs = 3500,
  sizes = "(max-width: 1024px) 100vw, 33vw",
  className = "",
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* --- Auto-rotación cuando no hay hover --- */
  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [isHovered, items.length, autoplayMs]);

  /* --- Cambio por posición del mouse --- */
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el || items.length <= 1) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const segment = rect.width / items.length;
      const next = Math.min(items.length - 1, Math.floor(x / segment));
      setActiveIndex((prev) => (prev === next ? prev : next));
    },
    [items.length]
  );

  /* --- Configuración visual según variante --- */
  const placeholderBg =
    variant === "dark"
      ? "bg-silk-cream/10 border border-silk-cream/20"
      : "bg-stone-200/70 border border-stone-300/80";
  const placeholderText =
    variant === "dark" ? "text-silk-cream/40" : "text-stone-400";

  /* --- Items con imagen para el modal --- */
  const itemsWithSrc = items.filter(
    (i): i is { src: string; alt: string } => !!i.src
  );
  const activeItem = items[activeIndex];
  const canExpand = !!activeItem?.src;

  const openModal = () => {
    if (canExpand) setModalOpen(true);
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={onMouseMove}
        onClick={openModal}
        role={canExpand ? "button" : undefined}
        aria-label={canExpand ? `Ampliar imagen: ${activeItem.alt}` : undefined}
        tabIndex={canExpand ? 0 : undefined}
        onKeyDown={(e) => {
          if (canExpand && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            openModal();
          }
        }}
        className={`group relative ${aspect} w-full overflow-hidden rounded-xs ${placeholderBg} ${
          canExpand ? "cursor-zoom-in" : "cursor-default"
        } ${className}`}
      >
        {/* Crossfade entre imágenes / placeholders */}
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {activeItem?.src ? (
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                sizes={sizes}
                className="object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.02] h-full w-full"
              />
            ) : (
              <div
                className={`absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.3em] ${placeholderText}`}
              >
                {label ?? activeItem?.alt} · {activeIndex + 1}/{items.length}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* linear sutil para dar legibilidad a los indicadores */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-deep-teal/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icono "ampliar" visible solo al hover */}
        {canExpand && (
          <div className="pointer-events-none absolute top-4 right-4 w-9 h-9 rounded-full bg-deep-teal/60 backdrop-blur-sm border border-silk-cream/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-90">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-silk-cream"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        )}

        {/* Indicadores */}
        {items.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                }}
                aria-label={`Ver imagen ${i + 1} de ${items.length}`}
                aria-current={i === activeIndex}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-6 bg-silk-cream"
                    : "w-1.5 bg-silk-cream/50 hover:bg-silk-cream/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && canExpand && (
          <ImageModal
            items={itemsWithSrc}
            initialIndex={Math.max(
              0,
              itemsWithSrc.findIndex((i) => i.src === activeItem.src)
            )}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ImageModal — Vista ampliada con navegación                         */
/* ------------------------------------------------------------------ */

type ModalProps = {
  items: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
};

function ImageModal({ items, initialIndex, onClose }: ModalProps) {
  const [index, setIndex] = useState(initialIndex);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );

  /* Bloquear scroll del body + teclas de navegación */
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

  const current = items[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-100 bg-deep-teal/95 backdrop-blur-md flex items-center justify-center p-6 sm:p-12"
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
        className="absolute top-6 right-6 w-12 h-12 rounded-full border border-silk-cream/30 text-silk-cream hover:bg-silk-cream/10 hover:border-silk-cream/60 transition-all duration-300 flex items-center justify-center z-10"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Imagen */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl aspect-4/3"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Flechas */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Imagen anterior"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-silk-cream/30 text-silk-cream hover:bg-silk-cream/10 hover:border-silk-cream/60 transition-all duration-300 flex items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Imagen siguiente"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-silk-cream/30 text-silk-cream hover:bg-silk-cream/10 hover:border-silk-cream/60 transition-all duration-300 flex items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      {/* Contador */}
      {items.length > 1 && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.35em] text-silk-cream/80"
          onClick={(e) => e.stopPropagation()}
        >
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </div>
      )}
    </motion.div>
  );
}
