import Image from "next/image";

/**
 * MediaSlot — Componente unificado para imágenes y placeholders.
 *
 * Si `src` está vacío, muestra un placeholder con el label.
 * Si `src` tiene un path, renderiza la imagen con next/image.
 *
 * USO:
 *   <MediaSlot src="/images/hero/main.jpg" alt="Mesa Calu" aspect="aspect-[4/5]" />
 *   <MediaSlot src="" alt="Mesa Calu" aspect="aspect-[4/5]" label="Imagen principal · 4:5" />
 */

type Variant = "light" | "dark";
type Rounded = "sm" | "full";

type Props = {
  /** Ruta relativa a /public (ej: "/images/hero/main.jpg"). Vacío => placeholder. */
  src?: string;
  /** Texto alternativo (obligatorio cuando hay imagen) */
  alt: string;
  /** Clase de aspect ratio (ej: "aspect-[4/5]", "aspect-square", "aspect-video") */
  aspect: string;
  /** Texto que se muestra en el placeholder cuando no hay imagen */
  label?: string;
  /** Tono del placeholder: claro (crema) u oscuro (sobre teal) */
  variant?: Variant;
  /** Esquinas: rectángulo sutil ("sm") o círculo ("full") */
  rounded?: Rounded;
  /** Mostrar un marco interior decorativo sutil */
  frame?: boolean;
  /** Clases extra para el contenedor */
  className?: string;
  /** Prioridad de carga (true para imágenes above-the-fold) */
  priority?: boolean;
  /** Sizes hint para responsive (ver next/image) */
  sizes?: string;
  /** Si es false, el placeholder sin imagen tendrá fondo neutro sin textura. */
  bgPlaceholder?: boolean;
};

export function MediaSlot({
  src,
  alt,
  aspect,
  label,
  variant = "light",
  rounded = "sm",
  frame = false,
  className = "",
  priority = false,
  sizes,
  bgPlaceholder = true,
}: Props) {
  const radius = rounded === "full" ? "rounded-full" : "rounded-[2px]";

  const placeholderBg =
    variant === "dark"
      ? "bg-silk-cream/10 border border-silk-cream/20"
      : "bg-stone-200/70 border border-stone-300/80";

  const placeholderText =
    variant === "dark" ? "text-silk-cream/40" : "text-stone-400";

  const frameBorder =
    variant === "dark" ? "border-silk-cream/15" : "border-silk-cream/50";

  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden ${radius} ${ bgPlaceholder && placeholderBg} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.3em] ${placeholderText}`}
        >
          {label ?? alt}
        </div>
      )}
      {frame && <div className={`absolute inset-4 border ${frameBorder}`} />}
    </div>
  );
}
