"use client";

import { useEffect, useState } from "react";
import { waLink } from "../lib/whatsapp";
import { brand } from "../lib/data";

/**
 * Nav — Barra de navegación fija.
 * Modo oscuro sobre el hero (teal), claro al scrollear a secciones crema.
 * El cambio se dispara al pasar el 75% del primer viewport.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md transition-colors duration-500 ${
        dark
          ? "bg-deep-teal/80 border-b border-silk-cream/10"
          : "bg-bone/90 border-b border-charcoal/8"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span
            className={`font-serif font-semibold text-2xl tracking-[0.04em] transition-colors duration-500 ${
              dark ? "text-silk-cream" : "text-deep-teal"
            }`}
          >
            {brand.name}
          </span>
          <span
            className={`hidden md:inline text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${
              dark ? "text-silk-cream/60" : "text-steel"
            }`}
          >
            {brand.tagline}
          </span>
        </a>

        <ul
          className={`hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.28em] transition-colors duration-500 ${
            dark ? "text-silk-cream/80" : "text-charcoal/80"
          }`}
        >
          {[
            { href: "#servicios", label: "Servicios" },
            { href: "#blends", label: "Blends" },
            { href: "#shop", label: "Tienda" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`transition-colors ${
                  dark ? "hover:text-silk-cream" : "hover:text-deep-teal"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={waLink("Hola Calu! Me gustaría conocer más sobre sus servicios.")}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] px-5 py-2.5 rounded-full transition-all duration-500 ${
            dark
              ? "border border-silk-cream/40 text-silk-cream hover:bg-silk-cream hover:text-deep-teal"
              : "border border-deep-teal/30 text-deep-teal hover:bg-deep-teal hover:text-silk-cream"
          }`}
        >
          Reservar
        </a>
      </nav>
    </header>
  );
}
