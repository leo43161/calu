"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, reveal } from "../lib/motion";
import { services } from "../lib/data";
import { waLink } from "../lib/whatsapp";
import { HoverGallery } from "./HoverGallery";

/**
 * Services — Tres servicios en cards.
 * Para cambiar imágenes: editá `services[i].image` en lib/data.ts.
 */
export function Services() {
  return (
    <section
      id="servicios"
      className="relative py-32 lg:py-40 px-6 lg:px-10 bg-paper"
    >
      <div className="mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          {...reveal}
          variants={stagger}
          className="max-w-3xl mb-20 lg:mb-28"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.4em] text-steel mb-6"
          >
            01 — Servicios
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-semibold text-deep-teal text-5xl lg:text-6xl leading-[1.05] mb-8"
          >
            Tres formas de vivir{" "}
            <span className="italic font-medium text-leaf">la mesa</span>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-steel text-lg font-normal max-w-2xl"
          >
            Cada propuesta está pensada como una pieza única: desde una merienda
            íntima hasta una experiencia guiada de aromas y maridajes.
          </motion.p>
        </motion.div>

        {/* Grid de servicios */}
        <motion.div
          {...reveal}
          variants={stagger}
          className="grid lg:grid-cols-3 gap-10 lg:gap-8"
        >
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              variants={fadeUp}
              className={`group relative flex flex-col bg-bone border border-charcoal/10 rounded-[2px] p-10 lg:p-12 transition-all duration-700 hover:border-deep-teal/30 hover:shadow-[0_30px_60px_-30px_rgba(13,57,60,0.2)] ${
                i === 1 ? "lg:-translate-y-6" : ""
              }`}
            >
              {/* Galería interactiva del servicio (3 imágenes) */}
              <div className="mb-8">
                <HoverGallery
                  items={s.gallery}
                  aspect="aspect-[4/3]"
                  label={s.title}
                  variant="light"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <span className="text-[10px] uppercase tracking-[0.4em] text-leaf mb-4">
                {s.num}
              </span>
              <h3 className="font-serif font-semibold text-3xl lg:text-4xl text-deep-teal mb-5 leading-tight">
                {s.title}
              </h3>
              <p className="text-steel font-normal leading-relaxed mb-8">
                {s.description}
              </p>

              {/* Incluye */}
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.35em] text-charcoal/60 mb-4">
                  Incluye
                </p>
                <ul className="space-y-3">
                  {s.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-charcoal/90 font-medium"
                    >
                      <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-leaf flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer card */}
              <div className="mt-auto pt-8 border-t border-charcoal/10 space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-charcoal/60 mb-2">
                    Inversión
                  </p>
                  <p className="font-serif font-semibold text-2xl text-deep-teal">
                    {s.price}
                  </p>
                </div>
                <a
                  href={waLink(
                    `Hola Calu! Me encantaría consultar la disponibilidad para contratar el ${s.title}...`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-deep-teal text-silk-cream px-6 py-4 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-leaf transition-all duration-500"
                >
                  Consultar Disponibilidad
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
