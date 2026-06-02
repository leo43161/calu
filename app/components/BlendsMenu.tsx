"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, reveal } from "../lib/motion";
import { blends } from "../lib/data";
import { MediaSlot } from "./MediaSlot";

/**
 * BlendsMenu — Carta de blends sobre fondo deep-teal.
 * Para cambiar imágenes: editá `blends[i].image` y `blends[i].ingredients[j].image` en lib/data.ts.
 */
export function BlendsMenu() {
  return (
    <section
      id="blends"
      className="relative py-32 lg:py-40 px-6 lg:px-10 bg-deep-teal text-silk-cream"
    >
      <div className="mx-auto max-w-6xl">
        {/* Encabezado */}
        <motion.div
          {...reveal}
          variants={stagger}
          className="max-w-3xl mb-20 lg:mb-28"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.4em] text-antique-gold/80 mb-6"
          >
            02 — Blends &amp; Maridajes
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-semibold text-5xl lg:text-6xl leading-[1.05] mb-8"
          >
            Una carta pensada como un{" "}
            <span className="italic font-medium text-antique-gold">
              ritual sensorial
            </span>
            .
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-silk-cream/85 text-lg font-normal max-w-2xl"
          >
            Cuatro blends de autor con maridajes diseñados para acompañar cada
            nota, cada aroma y cada pausa.
          </motion.p>
        </motion.div>

        {/* Listado de blends */}
        <motion.div
          {...reveal}
          variants={stagger}
          className="space-y-20 lg:space-y-24"
        >
          {blends.map((b) => (
            <motion.article
              key={b.id}
              variants={fadeUp}
              className="grid lg:grid-cols-12 gap-10 lg:gap-16 pb-20 lg:pb-15 border-b border-silk-cream/10 last:border-b-0 last:pb-0"
            >
              {/* Columna izquierda: nombre + descripción + ingredientes */}
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-baseline gap-6">
                  <span className="font-serif font-semibold text-antique-gold text-2xl">
                    {b.num}
                  </span>
                  <h3 className="font-serif font-semibold text-4xl lg:text-5xl leading-tight">
                    {b.name}
                  </h3>
                </div>

                <p className="text-silk-cream/90 font-normal text-lg leading-relaxed max-w-2xl">
                  {b.description}
                </p>

                {/* Ingredientes con círculos */}
                <div className="pt-2">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-antique-gold/70 mb-6">
                    Ingredientes
                  </p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
                    {b.ingredients.map((ing) => (
                      <li
                        key={ing.name}
                        className="flex md:items-center md:flex-row flex-col items-center gap-1 text-sm text-silk-cream font-medium"
                      >
                        <div className="size-25 shrink-0">
                          <MediaSlot
                            src={ing.image}
                            alt={ing.name}
                            aspect="aspect-square"
                            label="·"
                            variant="dark"
                            rounded="full"
                            sizes="48px"
                            bgPlaceholder={false}
                          />
                        </div>
                        <span>{ing.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Columna derecha: maridaje + foto del blend */}
              <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-silk-cream/15 flex flex-col justify-between gap-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-antique-gold/70 mb-6">
                    Maridaje
                  </p>
                  <ul className="space-y-5">
                    {b.pairings.map((p) => (
                      <li
                        key={p}
                        className="font-serif font-medium italic text-2xl lg:text-[1.7rem] leading-snug text-silk-cream"
                      >
                        — {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <MediaSlot
                  src={b.image}
                  alt={b.imageAlt ?? b.name}
                  aspect="aspect-[4/3]"
                  label={`Foto ${b.name}`}
                  variant="dark"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                /> */}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
