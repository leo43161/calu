import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://calu.com.ar";
const SITE_NAME = "Calu — El arte de servir té";
const SITE_DESCRIPTION =
  "Experiencias de té guiadas y personalizadas en Tucumán. Servicios de mesa, blends de autor y rituales sensoriales para eventos sociales, corporativos y encuentros entre amigas.";
const OG_IMAGE = "/img/png/vert-calu.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s · Calu",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Calu",
  authors: [{ name: "Calu", url: SITE_URL }],
  creator: "Calu",
  publisher: "Calu",
  generator: "Next.js",
  keywords: [
    "Calu",
    "Calu mesa de té",
    "té de autor",
    "blends artesanales",
    "servicio de té",
    "mesa de té Tucumán",
    "tea blends",
    "eventos corporativos Tucumán",
    "merienda Tucumán",
    "tea party Argentina",
    "té gourmet",
    "experiencia sensorial té",
    "ritual de té",
    "blends de autor Argentina",
  ],
  category: "Food & Drink",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Calu",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Calu — Mesa de té y blends de autor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@calu.mesadete",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon.ico", color: "#0D393C" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Calu",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4ECDD" },
    { media: "(prefers-color-scheme: dark)", color: "#0D393C" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Calu",
  alternateName: "Calu — Mesa de té",
  url: SITE_URL,
  logo: `${SITE_URL}/img/png/logocalu.png`,
  image: `${SITE_URL}${OG_IMAGE}`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Miguel de Tucumán",
    addressRegion: "Tucumán",
    addressCountry: "AR",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Tucumán, Argentina",
  },
  sameAs: ["https://instagram.com/calu.mesadete"],
  telephone: "+54 9 381 556-2959",
  priceRange: "$$",
  servesCuisine: "Té de autor, mesa de té, merienda",
  makesOffer: [
    {
      "@type": "Offer",
      name: "Servicio Básico",
      description:
        "Mesa de té con vajilla, arreglos florales, té en sobres y bocados dulces/salados.",
    },
    {
      "@type": "Offer",
      name: "Estación de Té",
      description:
        "Estación con blends de autor Calu y selección de bocados para eventos sociales.",
    },
    {
      "@type": "Offer",
      name: "Experiencia Calu",
      description:
        "Experiencia de té guiada en salón con maridajes, recorrido sensorial y cierre con licor de autor.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-charcoal">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
