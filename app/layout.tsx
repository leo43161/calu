import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calu — El arte de servir té",
  description:
    "Calu es una experiencia sensorial de té de autor. Servicios de mesa, blends artesanales y rituales únicos pensados para eventos memorables.",
  metadataBase: new URL("https://calu.com.ar"),
  openGraph: {
    title: "Calu — El arte de servir té",
    description:
      "Experiencias de té de autor, blends artesanales de Tucumán y servicios de mesa con detalle de lujo.",
    url: "https://calu.com.ar",
    siteName: "Calu",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-charcoal">
        {children}
      </body>
    </html>
  );
}
