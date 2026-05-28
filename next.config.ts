import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Permite acceder al dev server desde la IP local de la red.
   * Necesario porque Next.js 16 bloquea por defecto los assets (CSS, fuentes)
   * cuando se accede desde un origen distinto a localhost.
   * Solo afecta a `next dev`, no al build de producción.
   */
  allowedDevOrigins: ["10.20.20.5"],
};

export default nextConfig;
