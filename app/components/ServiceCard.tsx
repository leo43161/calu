"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../lib/motion";
import type { Service } from "../lib/data";
import { waLink } from "../lib/whatsapp";
import { HoverGallery } from "./HoverGallery";

const MIN_GUESTS = 10;

type Props = {
  service: Service;
  raised?: boolean;
};

export function ServiceCard({ service: s, raised = false }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(MIN_GUESTS);

  const dec = () => setGuests((g) => Math.max(MIN_GUESTS, g - 1));
  const inc = () => setGuests((g) => g + 1);

  const niceDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const message = `Hola Calu! Me encantaría consultar la disponibilidad para contratar el ${s.title}.
Fecha tentativa: ${niceDate || "a coordinar"}
Cantidad de invitados: ${guests}`;

  return (
    <motion.article
      variants={fadeUp}
      className={`group relative flex flex-col bg-bone border border-charcoal/10 rounded-xs p-10 lg:p-12 transition-all duration-700 hover:border-deep-teal/30 hover:shadow-[0_30px_60px_-30px_rgba(13,57,60,0.2)] ${
        raised ? "lg:-translate-y-6" : ""
      }`}
    >
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
      <p className="text-steel font-normal leading-relaxed mb-6">
        {s.description}
      </p>

      {/* Min invitados */}
      <div className="mb-8 inline-flex items-center gap-2 self-start bg-deep-teal/5 border border-deep-teal/15 rounded-full px-4 py-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-antique-gold" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-deep-teal font-medium">
          Mín. {MIN_GUESTS} invitados
        </span>
      </div>

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
              <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-leaf shrink-0" />
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

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center justify-center gap-2 w-full bg-deep-teal text-silk-cream px-6 py-4 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-leaf transition-all duration-500"
        >
          {open ? "Cerrar consulta" : "Consultar Disponibilidad"}
          <span
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden
          >
            ↓
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="form"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-5">
                {/* Fecha */}
                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-charcoal/60 mb-2">
                    Fecha tentativa
                  </span>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-paper border border-charcoal/15 rounded-full px-5 py-3 text-sm text-deep-teal font-medium focus:outline-none focus:border-deep-teal/50 transition-colors"
                  />
                </label>

                {/* Cantidad de invitados */}
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-charcoal/60 mb-2">
                    Cantidad de invitados
                  </span>
                  <div className="flex items-center justify-between bg-paper border border-charcoal/15 rounded-full px-2 py-2">
                    <button
                      type="button"
                      onClick={dec}
                      disabled={guests <= MIN_GUESTS}
                      aria-label="Disminuir invitados"
                      className="w-10 h-10 rounded-full bg-deep-teal text-silk-cream flex items-center justify-center text-lg hover:bg-leaf transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-deep-teal"
                    >
                      −
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="font-serif font-semibold text-2xl text-deep-teal leading-none">
                        {guests}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.25em] text-charcoal/50 mt-1">
                        personas
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={inc}
                      aria-label="Aumentar invitados"
                      className="w-10 h-10 rounded-full bg-deep-teal text-silk-cream flex items-center justify-center text-lg hover:bg-leaf transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {guests === MIN_GUESTS && (
                    <p className="mt-2 text-[10px] text-charcoal/50 italic text-center">
                      Reserva mínima: {MIN_GUESTS} personas.
                    </p>
                  )}
                </div>

                {/* CTA WhatsApp */}
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-antique-gold text-deep-teal px-6 py-4 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-silk-cream transition-all duration-500 font-medium"
                >
                  Consultar Disponibilidad
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
