"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, reveal } from "../lib/motion";
import { shopBlends } from "../lib/data";
import { waLink } from "../lib/whatsapp";
import { MediaSlot } from "./MediaSlot";

/**
 * Shop — Venta de blends en packaging 50g.
 * Para cambiar imágenes: editá `shopBlends[i].image` en lib/data.ts.
 */
export function Shop() {
  return (
    <section id="shop" className="relative py-32 lg:py-40 px-6 lg:px-10 bg-bone">
      <div className="mx-auto max-w-7xl">
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

        {/* Grid de productos */}
        <motion.div
          {...reveal}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {shopBlends.map((p) => (
            <motion.article
              key={p.id}
              variants={fadeUp}
              className="group flex flex-col"
            >
              {/* Packaging vertical 3:4 */}
              <div className="relative mb-6 transition-all duration-700 group-hover:shadow-[0_25px_50px_-25px_rgba(13,57,60,0.3)]">
                <MediaSlot
                  src={p.image}
                  alt={p.imageAlt ?? p.name}
                  aspect="aspect-[3/4]"
                  label="Packaging 50g"
                  variant="light"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Etiqueta decorativa interior — visible solo cuando no hay imagen */}
                {!p.image && (
                  <div className="absolute inset-x-4 bottom-4 top-1/2 border border-silk-cream/40 flex items-end p-3 pointer-events-none">
                    <span className="font-serif text-stone-400 text-lg leading-tight">
                      {p.name}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-serif font-semibold text-deep-teal text-2xl mb-2 leading-tight">
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
                    `Hola Calu! Quiero comprar un paquete de 50g del blend ${p.name}...`
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
