import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { BlendsMenu } from "./components/BlendsMenu";
import { Shop } from "./components/Shop";
import { Footer } from "./components/Footer";

/**
 * Landing — Calu, el arte de servir té.
 *
 * Estructura:
 *   /app
 *     /components   → una sección por archivo (Hero, Services, BlendsMenu, Shop, Footer, Nav, MediaSlot)
 *     /lib
 *       data.ts     → toda la copy + paths de imágenes (editá acá para cambiar contenido)
 *       motion.ts   → variantes de animación (fadeUp, stagger, reveal)
 *       whatsapp.ts → número de WhatsApp y helper de links
 *
 * Para aplicar imágenes:
 *   1. Subí los archivos a /public/images/...
 *   2. Editá `app/lib/data.ts` y completá los campos `image`.
 *   3. Listo — MediaSlot se ocupa de cambiar de placeholder a imagen real.
 */
export default function Home() {
  return (
    <main className="flex-1 bg-bone text-charcoal font-sans selection:bg-deep-teal selection:text-silk-cream">
      <Nav />
      <Hero />
      <Services />
      <BlendsMenu />
      <Shop />
      <Footer />
    </main>
  );
}
