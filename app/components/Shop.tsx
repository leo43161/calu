"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, reveal } from "../lib/motion";
import { shopBlends, type ShopBlend } from "../lib/data";
import { waLink } from "../lib/whatsapp";
import { HoverGallery } from "./HoverGallery";

/**
 * Shop — Venta de blends 50g.
 * Cada ficha muestra una galería interactiva (foto real → frente → reverso)
 * con la misma interacción que la sección Servicios, pero con proporción
 * vertical 3:5 acorde al packaging.
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
            Edición 2026 · Pasá el cursor por las imágenes
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
  return (
    <motion.article variants={fadeUp} className="group flex flex-col">
      {/* Etiqueta de edición */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[9px] uppercase tracking-[0.35em] text-charcoal/45">
          {String(index + 1).padStart(2, "0")} / {String(shopBlends.length).padStart(2, "0")}
        </span>
      </div>

      {/* Galería vertical: foto real → frente → reverso.
          autoplayMs=0 → solo cambia al pasar el cursor (o tocando los dots). */}
      <HoverGallery
        items={p.gallery}
        aspect="aspect-[3/5]"
        label={p.name}
        variant="light"
        autoplayMs={0}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

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
    </motion.article>
  );
}
