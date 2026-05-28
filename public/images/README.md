# Imágenes de la landing Calu

Subí cada imagen acá y después completá su path en **`app/lib/data.ts`** (en el campo `image` correspondiente).

## Estructura sugerida

```
/public/images/
├── hero/
│   ├── main.jpg          ← Imagen principal del hero (4:5 vertical, ej. 1200×1500px)
│   └── detail.jpg        ← Detalle decorativo (1:1 cuadrado, ej. 600×600px)
│
├── servicios/
│   ├── basico-1.jpg      ← Servicio Básico, galería (4:3, ej. 1200×900px)
│   ├── basico-2.jpg      ← (3 imágenes por servicio)
│   ├── basico-3.jpg
│   ├── estacion-1.jpg
│   ├── estacion-2.jpg
│   ├── estacion-3.jpg
│   ├── experiencia-1.jpg
│   ├── experiencia-2.jpg
│   └── experiencia-3.jpg
│
├── blends/
│   ├── ritual-verde.jpg      ← Foto del blend o maridaje (4:3)
│   ├── suspiro-en-flor.jpg
│   ├── ritual-dorado.jpg
│   ├── jardin-secreto.jpg
│   └── ingredientes/
│       ├── gunpowder.jpg     ← Círculos pequeños (1:1, ej. 200×200px)
│       ├── durazno.jpg
│       ├── manzanilla.jpg
│       └── ... (uno por ingrediente)
│
└── shop/
    ├── ritual-verde.jpg      ← Packaging 50g (3:4 vertical, ej. 900×1200px)
    ├── suspiro-en-flor.jpg
    ├── ritual-dorado.jpg
    └── jardin-secreto.jpg
```

## Cómo aplicar una imagen

1. Subí el archivo a la carpeta correspondiente (ej. `public/images/hero/main.jpg`).
2. Abrí `app/lib/data.ts`.
3. Buscá el item y completá su campo `image` o `src`:

   **Imagen única (hero, blends, shop):**
   ```ts
   export const hero = {
     mainImage: "/images/hero/main.jpg",   // ← acá
     mainAlt: "Mesa de té Calu",
     ...
   };
   ```

   **Galería de servicios (3 imágenes — izquierda / centro / derecha):**
   ```ts
   {
     id: "basico",
     // ...
     gallery: [
       { src: "/images/servicios/basico-1.jpg", alt: "Mesa servida" },
       { src: "/images/servicios/basico-2.jpg", alt: "Vajilla detalle" },
       { src: "/images/servicios/basico-3.jpg", alt: "Bocados y té" },
     ],
   }
   ```
4. Guardá. La página recarga automáticamente.

## Comportamiento de la galería de Servicios

- **Hover**: el mouse en la izquierda del card muestra la imagen 1, en el centro la 2, en la derecha la 3.
- **Auto-rotación**: cuando no hay hover, las imágenes rotan cada 3.5s.
- **Click**: abre un modal con la imagen ampliada (navegación con flechas / teclas ← →, cerrar con Esc).

## Formatos recomendados

- **`.jpg`** para fotos.
- **`.webp`** o **`.avif`** para mejor performance (Next.js los optimiza igual).
- **No uses PNG salvo que necesites transparencia.**

## Tamaños mínimos

- Hero / Servicios / Blends → mínimo 1200px de lado largo.
- Ingredientes (círculos) → 200×200px alcanza.
- Shop packaging → mínimo 900×1200px.

Next.js los redimensiona y sirve en el tamaño óptimo automáticamente.
