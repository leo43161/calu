"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import { hero } from "../lib/data";
import { MediaSlot } from "./MediaSlot";

/**
 * Hero — Placa principal sobre fondo deep-teal (#0D393C).
 * Para cambiar las imágenes: editá `hero.mainImage` y `hero.detailImage` en lib/data.ts.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen pt-32 pb-24 px-6 lg:px-10 overflow-hidden bg-deep-teal"
    >
      {/* Brillos orgánicos en las esquinas */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-60 -right-60 w-[50rem] h-[50rem] rounded-full bg-leaf/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[35rem] h-[35rem] rounded-full bg-sage/10 blur-3xl" />
      </div>

      {/* Línea decorativa horizontal */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-silk-cream/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        {/* COPY */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-10"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.4em] text-antique-gold/80"
          >
            Tucumán · Argentina
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif font-semibold text-silk-cream leading-[0.95] tracking-tight"
          >
            <span className="block text-6xl sm:text-7xl lg:text-[7.5rem]">
              Calu,
            </span>
            <span className="block italic font-medium text-5xl sm:text-6xl lg:text-[5.5rem] text-antique-gold">
              el arte de servir té
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-lg leading-relaxed text-silk-cream/85 font-normal"
          >
            Una mesa de té pensada como un ritual. Blends de autor, vajilla
            cuidada y un servicio que transforma cualquier encuentro en una
            experiencia sensorial y memorable.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5">
            <a
              href="#servicios"
              className="group inline-flex items-center gap-3 bg-antique-gold text-deep-teal font-medium px-8 py-4 text-[11px] uppercase tracking-[0.32em] rounded-full hover:bg-silk-cream transition-all duration-500"
            >
              Ver servicios
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#blends"
              className="text-[11px] uppercase tracking-[0.32em] text-silk-cream/70 hover:text-silk-cream underline underline-offset-8 decoration-1 decoration-silk-cream/30 hover:decoration-silk-cream transition-all"
            >
              Conocer los blends
            </a>
          </motion.div>
        </motion.div>

        {/* IMÁGENES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="lg:col-span-6 relative"
        >
          <div className="w-5/7 mx-auto">
            <img src={hero.mainImage} alt={hero.mainAlt} />
          </div>
          {/* <MediaSlot
            src={hero.mainImage}
            alt={hero.mainAlt}
            aspect="aspect-[4/6]"
            label="Imagen principal · 4 : 6"
            variant="dark"
            frame
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] h-full w-auto"
          /> */}

          {/* Detalle secundario superpuesto */}
          {/* <div className="hidden md:block absolute -bottom-10 -left-10 w-44">
            <MediaSlot
              src={hero.detailImage}
              alt={hero.detailAlt}
              aspect="aspect-square"
              label="Detalle"
              variant="dark"
            />
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
