"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, reveal } from "../lib/motion";
import { services } from "../lib/data";
import { ServiceCard } from "./ServiceCard";

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
          className="grid lg:grid-cols-3 gap-10 lg:gap-8 items-start"
        >
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} raised={i === 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
