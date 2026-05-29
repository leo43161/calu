/* ------------------------------------------------------------------ */
/*  DATA — Toda la copy y los precios extraídos del Documento de Leo.  */
/*  Para aplicar imágenes: completá los campos `image` de cada item.   */
/*  Las rutas son relativas a /public (ej: "/images/servicios/x.jpg"). */
/* ------------------------------------------------------------------ */

/* ===================== HERO ===================== */
export const hero = {
  /** Imagen principal del hero (aspect 4:5 vertical) */
  mainImage: "/img/svg/vert-calu.svg" as string, // ej: "/images/hero/main.jpg"
  mainAlt: "Mesa de té Calu",

  /** Imagen decorativa secundaria (aspect 1:1 cuadrada) */
  detailImage: "/img/svg/square-calu.svg" as string, // ej: "/images/hero/detail.jpg"
  detailAlt: "Detalle de vajilla Calu",
};

/* ===================== SERVICIOS ===================== */
export type GalleryImage = {
  /** Path relativo a /public (ej: "/images/servicios/basico-1.jpg"). Vacío → placeholder. */
  src?: string;
  alt: string;
};

export type Service = {
  id: string;
  num: string;
  title: string;
  description: string;
  includes: string[];
  price: string;
  /**
   * Galería de 3 imágenes (aspect 4:3 horizontal).
   * Se muestran según la posición del mouse: izq → 1ra, centro → 2da, der → 3ra.
   * Cuando no hay hover, rotan automáticamente.
   */
  gallery: GalleryImage[];
};

export const services: Service[] = [
  {
    id: "basico",
    num: "01",
    title: "Servicio Básico",
    description:
      "Una propuesta cálida y delicada para compartir una merienda especial, cuidando cada detalle de la experiencia.",
    includes: [
      "Mantelería y vajilla completa",
      "Arreglos florales",
      "Caja de variedades de té en sobres",
      "2 bocados dulces",
      "2 bocados salados",
      "Aguas naturales saborizadas",
    ],
    price: "$20.000 por persona",
    gallery: [
      { src: "/img/servicios/basico/1.jpg", alt: "Servicio Básico — Mesa servida" },
      { src: "/img/servicios/basico/2.jpg", alt: "Servicio Básico — Detalle de vajilla" },
      { src: "/img/servicios/basico/3.jpg", alt: "Servicio Básico — Bocados y té" },
    ],
  },
  {
    id: "estacion",
    num: "02",
    title: "Estación de Té",
    description:
      "Una estación pensada para recibir a los invitados con blends de autor y una selección de bocados cuidadosamente elegidos. Ideal para eventos sociales y encuentros especiales.",
    includes: [
      "Mantelería y vajilla completa",
      "Arreglos florales",
      "2 blends de autor Calu",
      "2 bocados dulces",
      "2 bocados salados",
      "Aguas naturales saborizadas",
    ],
    price: "$15.000 por persona",
    gallery: [
      { src: "/img/servicios/estacion/1.jpg", alt: "Estación de Té — Vista general" },
      { src: "/img/servicios/estacion/2.jpg", alt: "Estación de Té — Blends de autor" },
      { src: "/img/servicios/estacion/3.jpg", alt: "Estación de Té — Bocados servidos" },
    ],
  },
  {
    id: "experiencia",
    num: "03",
    title: "Experiencia Calu",
    description:
      "Una experiencia de té guiada en salón, diseñada para disfrutar cada aroma, sabor y maridaje en un recorrido sensorial único.",
    includes: [
      "Mantelería y vajilla completa",
      "Arreglos florales",
      "2 blends de autor Calu",
      "3 bocados dulces",
      "3 bocados salados",
      "Bocado de transición",
      "Aguas naturales saborizadas",
      "Cierre con licor de autor",
    ],
    price: "$30.000 por persona",
    gallery: [
      { src: "/img/servicios/experiencia/1.jpg", alt: "Experiencia Calu — Recorrido sensorial" },
      { src: "/img/servicios/experiencia/2.jpg", alt: "Experiencia Calu — Maridajes" },
      { src: "/img/servicios/experiencia/4.jpg", alt: "Experiencia Calu — Cierre con licor" },
    ],
  },
];

/* ===================== BLENDS & MARIDAJES ===================== */
export type Ingredient = {
  name: string;
  /** Imagen circular del ingrediente (aspect 1:1) */
  image?: string;
};

export type Blend = {
  id: string;
  num: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  pairings: string[];
  /** Foto del blend o del maridaje (aspect 4:3) */
  image?: string;
  imageAlt?: string;
};

export const blends: Blend[] = [
  {
    id: "ritual-verde",
    num: "01",
    name: "Ritual Verde",
    description:
      "Blend fresco y armonioso, con delicadas notas frutales y herbales. El té verde Gunpowder se fusiona con durazno, manzanilla y melisa, dando lugar a una infusión suave, revitalizante y equilibrada.",
    ingredients: [
      { name: "Té verde Gunpowder", image: "/img/ingredientes/ritual-verde/te-verde.png" },
      { name: "Durazno", image: "/img/ingredientes/ritual-verde/durazno.png" },
      { name: "Manzanilla", image: "/img/ingredientes/ritual-verde/manzanilla.png" },
      { name: "Melisa", image: "/img/ingredientes/ritual-verde/melisa.png" },
    ],
    pairings: [
      "Mini tostada artesanal con queso crema suave y lámina de durazno fresco",
      "Scon de tomillo con manteca batida",
    ],
    image: "",
    imageAlt: "Blend Ritual Verde",
  },
  {
    id: "suspiro-en-flor",
    num: "02",
    name: "Suspiro en Flor",
    description:
      "Blend sutil y floral, elaborado sobre una delicada base de té blanco Pai Mu Tan. Las notas de manzana, naranja y pétalos de rosa crean una infusión elegante, aromática y envolvente.",
    ingredients: [
      { name: "Té blanco Pai Mu Tan", image: "/img/ingredientes/suspiro/te-blanco.png" },
      { name: "Manzana", image: "/img/ingredientes/suspiro/manzana.png" },
      { name: "Naranja", image: "/img/ingredientes/suspiro/naranja.png" },
      { name: "Pétalos de rosa", image: "/img/ingredientes/suspiro/rosa.png" },
    ],
    pairings: [
      "Macarons de frambuesa y rosas",
      "Mini cheesecake de frutos rojos",
    ],
    image: "",
    imageAlt: "Blend Suspiro en Flor",
  },
  {
    id: "ritual-dorado",
    num: "03",
    name: "Ritual Dorado",
    description:
      "Blend cálido y especiado, con matices cítricos y vibrantes. La intensidad del Pu Erh se combina con jengibre, cardamomo, limón y bayas de goji, logrando una infusión profunda, reconfortante y aromática.",
    ingredients: [
      { name: "Pu Erh", image: "/img/ingredientes/dorado/puerh.png" },
      { name: "Jengibre", image: "/img/ingredientes/dorado/gengibre.png" },
      { name: "Cardamomo", image: "/img/ingredientes/dorado/cardamomo.png" },
      { name: "Limón", image: "/img/ingredientes/dorado/limon.png" },
      { name: "Bayas de goji", image: "/img/ingredientes/dorado/goji.png" },
    ],
    pairings: [
      "Trufa de queso azul",
      "Alfajor de nuez y dulce de leche",
    ],
    image: "",
    imageAlt: "Blend Ritual Dorado",
  },
  {
    id: "jardin-secreto",
    num: "04",
    name: "Jardín Secreto",
    description:
      "Blend herbal delicado y equilibrado, con notas florales, frutales y refrescantes. Una armoniosa combinación de oolong, sauco, pera, hinojo y menta que invita a una experiencia suave y sensorial.",
    ingredients: [
      { name: "Oolong", image: "/img/ingredientes/jardin/oolong.png" },
      { name: "Sauco", image: "/img/ingredientes/jardin/sauco.png" },
      { name: "Pera", image: "/img/ingredientes/jardin/pera.png" },
      { name: "Hinojo", image: "/img/ingredientes/jardin/hinojo.png" },
      { name: "Menta", image: "/img/ingredientes/jardin/menta.png" },
    ],
    pairings: [
      "Focaccia de hinojo",
      "Pavlova con corazón de frutos rojos y baño de chocolate blanco",
    ],
    image: "",
    imageAlt: "Blend Jardín Secreto",
  },
];

/* ===================== SHOP (venta de blends 50g) ===================== */
export type ShopBlend = {
  id: string;
  name: string;
  short: string;
  /** Foto del packaging vertical 3:4 */
  image?: string;
  imageAlt?: string;
};

export const shopBlends: ShopBlend[] = blends.map((b) => ({
  id: b.id,
  name: b.name,
  short: b.description.split(".").slice(0, 1).join(".") + ".",
  image: "", // ej: "/images/shop/ritual-verde.jpg"
  imageAlt: `Packaging 50g ${b.name}`,
}));

/* ===================== METADATOS DE MARCA ===================== */
export const brand = {
  name: "Calu",
  tagline: "el arte de servir té",
  instagram: "@calu.mesadete",
  instagramUrl: "https://instagram.com/calu.mesadete",
  website: "calu.com.ar",
  location: "Tucumán, Argentina",
  values: "calidez, calma, felicidad, nostalgia y sofisticación",
};
