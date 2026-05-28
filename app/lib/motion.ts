import type { Variants } from "framer-motion";

/* Aparición vertical sutil y elegante */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Aparición en cascada para hijos */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* Spread props para activar animaciones al hacer scroll */
export const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.1 },
} as const;
