"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger, reveal } from "../lib/motion";
import { shopBlends, type ShopBlend } from "../lib/data";
import { waLink } from "../lib/whatsapp";
import { Lightbox, type LightboxItem } from "./Lightbox";

/**
 * Shop — Venta de blends 50g.
 * Tratamiento diegético: los archivos de diseño del packaging se muestran
 * como "fichas" (no como fotos truchas). Cada ficha es un flip-card 3D:
 * frente → reverso con la información técnica del blend.
 */
export function Shop() {
  return (
    <section id="shop" className="relative py-32 lg:py-40 px-6 lg:px-10 bg-bone overflow-hidden">
      {/* Brillos orgánicos sutiles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-leaf/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-antique-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          {...reveal}
          variants={stagger}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20 lg:mb-24"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.4em] text-steel mb-6"
            >
              03 — Blends By Calu
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-semibold text-deep-teal text-5xl lg:text-6xl leading-[1.05] mb-8"
            >
              Llevá el ritual{" "}
              <span className="italic font-medium text-leaf">a tu casa</span>.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-steel text-lg font-normal">
              Nuestros blends de autor nacen de una cuidadosa selección de tés,
              hierbas, flores y frutas, combinados para crear infusiones únicas,
              delicadas y memorables.
            </motion.p>
          </div>
          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.3em] text-charcoal/70"
          >
            <li>Elaborado artesanalmente</li>
            <li className="text-charcoal/30">·</li>
            <li>Peso neto: 50 g</li>
            <li className="text-charcoal/30">·</li>
            <li>Origen: Tucumán, Argentina</li>
          </motion.ul>
        </motion.div>

        {/* Nota diegética */}
        <motion.div
          {...reveal}
          variants={fadeUp}
          className="mb-14 lg:mb-16 flex items-center gap-4"
        >
          <span className="inline-block w-10 h-px bg-antique-gold/60" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-charcoal/55">
            Adelanto del diseño · Edición 2026 · Pasá el cursor para ver el reverso
          </span>
        </motion.div>

        {/* Grid de productos */}
        <motion.div
          {...reveal}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20"
        >
          {shopBlends.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

type ProductCardProps = {
  product: ShopBlend;
  index: number;
};

function ProductCard({ product: p, index }: ProductCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const tone = p.tone ?? "dark";
  const cardBg = tone === "dark" ? "bg-deep-teal" : "bg-antique-gold/90";
  const cardRing = tone === "dark" ? "ring-antique-gold/25" : "ring-deep-teal/20";

  /* Caras con imagen real → alimentan el Lightbox */
  const modalItems: LightboxItem[] = [
    p.front && { src: p.front, alt: p.imageAlt ?? `Diseño frente ${p.name}` },
    p.back && { src: p.back, alt: `Diseño reverso ${p.name}` },
  ].filter(Boolean) as LightboxItem[];
  const canOpen = modalItems.length > 0;

  const handleClick = () => {
    if (canOpen) setModalOpen(true);
    else setFlipped((f) => !f); // sin imágenes aún → solo gira la ficha placeholder
  };

  return (
    <motion.article variants={fadeUp} className="group flex flex-col">
      {/* Etiqueta de edición */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[9px] uppercase tracking-[0.35em] text-charcoal/45">
          {String(index + 1).padStart(2, "0")} / {String(4).padStart(2, "0")}
        </span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-antique-gold/80">
          Diseño
        </span>
      </div>

      {/* Flip card — hover gira (preview), click abre el modal */}
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        aria-label={
          canOpen
            ? `Ampliar diseño del blend ${p.name}`
            : `Ver reverso del diseño ${p.name}`
        }
        className={`relative block w-full text-left [perspective:1400px] ${
          canOpen ? "cursor-zoom-in" : "cursor-pointer"
        }`}
      >
        <div
          className="relative w-full aspect-[3/5] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRENTE */}
          <CardFace
            src={p.front}
            alt={p.imageAlt ?? `Diseño frente ${p.name}`}
            tone={tone}
            cardBg={cardBg}
            cardRing={cardRing}
            label={p.name}
            fallbackLabel="Frente"
          />

          {/* REVERSO */}
          <CardFace
            src={p.back}
            alt={`Diseño reverso ${p.name}`}
            tone={tone}
            cardBg={cardBg}
            cardRing={cardRing}
            label={p.name}
            fallbackLabel="Reverso"
            back
          />
        </div>

        {/* Sombra de piso */}
        <div className="pointer-events-none mx-auto mt-2 h-4 w-3/4 rounded-[50%] bg-charcoal/15 blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Hint — visible en mobile */}
        <span className="sm:hidden absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-bone/90 backdrop-blur-sm border border-charcoal/10 rounded-full px-2 py-1 text-[9px] uppercase tracking-[0.25em] text-charcoal/70">
          {canOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
          )}
          {canOpen ? "Ampliar" : "Toca"}
        </span>
      </button>

      {/* Info */}
      <h3 className="font-serif font-semibold text-deep-teal text-2xl mt-6 mb-2 leading-tight">
        {p.name}
      </h3>
      <p className="text-steel text-sm font-normal leading-relaxed mb-5">
        {p.short}
      </p>

      <div className="mt-auto flex items-center justify-between pt-5 border-t border-charcoal/10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/60">
          50 g · Tucumán
        </span>
        <a
          href={waLink(
            `Hola Calu! Quiero comprar un paquete de 50g del blend ${p.name}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] uppercase tracking-[0.28em] text-deep-teal hover:text-leaf transition-colors duration-500 inline-flex items-center gap-2"
        >
          Comprar
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {/* Modal del diseño */}
      <AnimatePresence>
        {modalOpen && canOpen && (
          <Lightbox
            items={modalItems}
            caption={p.name}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */

type CardFaceProps = {
  src?: string;
  alt: string;
  tone: "dark" | "light";
  cardBg: string;
  cardRing: string;
  label: string;
  fallbackLabel: string;
  back?: boolean;
};

function CardFace({
  src,
  alt,
  tone,
  cardBg,
  cardRing,
  label,
  fallbackLabel,
  back = false,
}: CardFaceProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const isPlaceholder = false;

  return (
    <div
      className={`absolute inset-0 [backface-visibility:hidden] ${
        back ? "[transform:rotateY(180deg)]" : ""
      }`}
    >
      <div
        className={`relative w-full h-full overflow-hidden ${cardBg} shadow-[0_30px_60px_-30px_rgba(13,57,60,0.4)]`}
      >
        {/* Marco interior decorativo (matchea el marco del diseño) */}
        <div
          className={`pointer-events-none absolute inset-3 border ${
            tone === "dark" ? "" : ""
          }`}
        />

        {/* Imagen del diseño */}
        {!isPlaceholder && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`relative z-10 w-full h-full object-cover object-center transition-opacity duration-700 opacity-100`}
            draggable={false}
          />
        )}

        {/* Placeholder elegante mientras carga o si falta el archivo */}
        {(isPlaceholder || !loaded) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span
              className={`text-[9px] uppercase tracking-[0.4em] ${
                tone === "dark" ? "text-antique-gold/80" : "text-deep-teal/70"
              }`}
            >
              {fallbackLabel}
            </span>
            <span
              className={`font-serif text-2xl ${
                tone === "dark" ? "text-silk-cream" : "text-deep-teal"
              }`}
            >
              {label}
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.3em] ${
                tone === "dark" ? "text-silk-cream/50" : "text-deep-teal/50"
              }`}
            >
              Diseño próximamente
            </span>
          </div>
        )}

        {/* Reflejo sutil */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-black/15 mix-blend-overlay" />
      </div>
    </div>
  );
}
