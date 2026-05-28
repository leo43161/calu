import { waLink } from "../lib/whatsapp";
import { brand } from "../lib/data";

/**
 * Footer — Sección final con contacto y datos de marca.
 */
export function Footer() {
  return (
    <footer className="bg-paper border-t border-charcoal/10 px-6 lg:px-10 pt-24 pb-7">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-16">
        {/* Bloque tagline */}
        <div className="lg:col-span-6 space-y-6">
          <p className="font-serif font-semibold text-deep-teal text-5xl lg:text-6xl leading-[1.05]">
            {brand.name},{" "}
            <span className="italic font-medium text-leaf">
              {brand.tagline}.
            </span>
          </p>
          <p className="text-steel font-normal max-w-md">
            Buscamos generar {brand.values} en cada mesa.
          </p>
        </div>

        {/* Contacto */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-charcoal/60">
            Contacto
          </p>
          <ul className="space-y-2 text-sm text-charcoal/90 font-normal">
            <li>
              <a
                href={waLink("Hola Calu! Me gustaría hacer una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-deep-teal transition-colors"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-deep-teal transition-colors"
              >
                {brand.instagram}
              </a>
            </li>
            <li>{brand.website}</li>
          </ul>
        </div>

        {/* Origen */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-charcoal/60">
            Origen
          </p>
          <ul className="space-y-2 text-sm text-charcoal/90 font-normal">
            <li>Tucumán</li>
            <li>Argentina</li>
          </ul>
        </div>
      </div>

      {/* Pie inferior */}
      <div className="mx-auto max-w-7xl mt-20 pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-steel">
          © {new Date().getFullYear()} {brand.name} — Todos los derechos reservados.
        </p>
        <p className="text-[11px] uppercase tracking-[0.3em] text-steel/70">
          Mesa de té · Eventos · Blends de autor
        </p>
      </div>

      {/* Banner desarrollador */}
      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-sm font-medium text-charcoal/80">
            ¿Querés una página como esta para tu negocio?
          </p>
          <p className="text-xs text-steel/80">
            Diseño web profesional a medida — escribime y lo hacemos realidad.
          </p>
        </div>
        <a
          href="https://wa.me/543816162181?text=Hola%2C%20vi%20la%20p%C3%A1gina%20de%20Calu%20y%20me%20gustar%C3%ADa%20tener%20una%20igual%20para%20mi%20negocio."
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 bg-deep-teal text-silk-cream text-xs font-medium uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-leaf transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.563 4.14 1.547 5.876L.057 23.882a.5.5 0 0 0 .61.61l6.006-1.49A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.077-1.381l-.364-.217-3.766.934.952-3.668-.237-.378A9.951 9.951 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Contactar por WhatsApp
        </a>
      </div>
    </footer>
  );
}
