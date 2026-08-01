# Registro de cambios

Reorganización completa del proyecto, 2026-07-31.
Estado de partida documentado en [`auditoria.md`](auditoria.md).

**No se ejecutó ningún comando de git.** Todos los cambios son locales.

---

## Fase 1 — Auditoría

- Inventariados los 35 archivos del proyecto: 4 HTML, 6 CSS, 2 JS, 16 PNG, 7 SVG, 1 fuente.
- Medidas dimensiones y peso de cada imagen, y verificado qué archivo referencia a cuál.
- Documentadas 8 referencias rotas, 4 imágenes huérfanas, ~60 líneas de CSS triplicado y 13 fragmentos de texto del template original.
- Resultado en `docs/auditoria.md`.
- Confirmado que no hay credenciales, tokens ni claves de API en ningún archivo.

## Fase 2 — Estructura

Páginas renombradas por su contenido, no por su número:

| Antes | Ahora |
|---|---|
| `index.html` | `index.html` |
| `index2.html` | `collection.html` |
| `index3.html` | `about.html` |
| `index4.html` | `contact.html` |
| — | `404.html` (nueva) |

- Todo el CSS, JS, imágenes y fuentes movidos bajo `assets/`.
- Actualizadas todas las rutas en HTML, CSS y JS. Verificado que no queda ninguna rota.
- **Desviaciones deliberadas de la estructura propuesta**, ambas para no crear carpetas vacías ni peticiones de más:
  - Sin `assets/css/pages/`. Ninguna página necesitaba CSS propio suficiente para justificar una cuarta petición; las tres hojas compartidas se cachean una vez y sirven a las cinco páginas.
  - Sin `assets/js/modules/`. El JS total son 90 líneas. Además, los módulos ES no funcionan sobre `file://` y la fase 13 exige que el sitio abra bien haciendo doble clic en `index.html`, así que `main.js` es un script clásico con `defer`.
  - Sin `assets/img/logo/`. El proyecto no tiene ningún archivo de logo; la marca es tipográfica.

## Fase 3 — Higiene

**Eliminados (34 archivos):**

| Archivo | Motivo |
|---|---|
| `index2.html`, `index3.html`, `index4.html` | Sustituidos por `collection/about/contact.html` |
| `styles.css` … `styles4.css`, `normalize.css` | Sustituidos por `base/layout/components.css` |
| `script.js`, `script2.js` | Sustituidos por `main.js` sin jQuery |
| `photo1.png` … `photo16.png` | Convertidas a WebP con nombres semánticos |
| `photo11.png` | Además, eran auriculares sobre fondo blanco: no es interiorismo |
| `photo16.png` | Mapa ilegible con nombres de calle deformados |
| `burger.svg`, `burger-open.svg` | Sustituidos por SVG inline con `currentColor` |
| `insta.svg`, `insta-alone.svg` | La sección de Instagram no apuntaba a ninguna cuenta real |
| `mail.svg`, `mail-open.svg`, `mail-forward.svg` | Sustituidos por SVG inline |
| `Lora-VariableFont_wght.ttf` | Convertida a WOFF2 (207 KB → 81 KB) |

Antes de borrar cada imagen se comprobó con `grep` que ningún archivo la referenciaba.

**Otros cambios:**
- Creado `.gitignore` real: `node_modules/`, `.env`, `.DS_Store`, `Thumbs.db`, `*.log`, `.vercel/`, `.netlify/`.
- Indentación unificada a 2 espacios, comillas dobles en HTML, punto y coma en JS, salto de línea al final de cada archivo. Verificado archivo por archivo.
- Eliminados los 17 `<br><br>` que se usaban como espaciado.
- No había credenciales que extraer.

## Fase 4 — Imágenes

- 16 PNG (**22,4 MB**) → 14 WebP (**373 KB**), un 98,3% menos.
- Redimensionadas: hero a 1200px de ancho, tarjetas a 784px, avatar a 200px. Ninguna supera su contenedor.
- Renombradas con nombres semánticos: `photo3.png` → `walnut-dressing-room.webp`, `photo13.png` → `dining-nook.webp`, etc.
- `width` y `height` en cada `<img>` para evitar layout shift.
- `loading="lazy"` en las 12 fotos de la galería. El hero lleva `fetchpriority="high"` y **no** lleva lazy.
- `alt` real y descriptivo en las 14 imágenes, escrito mirando cada foto una a una.
- Creado `og-cover.jpg` (1200×630) recortando el hero, para que las etiquetas Open Graph apunten a un archivo que existe de verdad.
- Creados `favicon.svg` (monograma de 300 bytes) y `apple-touch-icon.png`. Antes el favicon de las cuatro páginas era un PNG de **1,1 MB**.

**Hallazgo durante esta fase:** las 12 fotos de la galería llevaban incrustada una **marca de agua del generador de imágenes** —una barra de cinco cuadros de colores saturados— pegada a la esquina inferior derecha. Se ven en el sitio original. Recortadas 16px por abajo (784×784) y verificada su desaparición imagen por imagen. El hero y el retrato no la tenían.

## Fase 5 — HTML, SEO y accesibilidad

- Estructura semántica en las 5 páginas: `header`, `nav`, `main`, `section`, `figure`, `aside`, `footer`. Un solo `h1` por página, sin saltos de jerarquía.
- Arreglado `<main>` anidado dentro de `<header>` en la página de colección.
- `<head>` completo: title único (50–60 caracteres), description única (150–158), canonical, Open Graph y `og:image` real.
- `lang="en"` correcto en todas. Antes la portada declaraba `lang="es"` con el contenido en inglés.
- El `<div href="#">` que hacía de botón de menú es ahora un `<button>` real con `aria-expanded` y `aria-controls`.
- Añadidos skip link, `aria-current="page"`, `aria-label` en el botón de menú y `aria-hidden` en los SVG decorativos.
- Contraste corregido: los enlaces pasaban de `dimgray` sobre `#181719` (**2,6:1**, no cumple) a `#9c9c9c` (**6,5:1**). El acento ámbar da **8,6:1**.
- Foco visible en todo elemento interactivo (contorno ámbar de 2px). Antes no había ninguno.
- Creados `robots.txt` y `sitemap.xml` con las 4 URLs reales.

**Texto de relleno eliminado:**
- "XYZ Interior Design" (×4) y la diseñadora "Jane" del texto de About: el estudio es *This Interior* y la diseñadora es Eliza Webber.
- "founded in 1985", que contradecía el "Designed in 2020" de la portada. Unificado a 2020.
- "won numerous awards" y "clients across the country and around the world": afirmaciones no verificables.
- Erratas: "Abaut" → About, "servie" → service, "Aliza" → Eliza.
- Español suelto en un sitio en inglés: "Inicio", "Seguir", "Enviar Mensaje", "Ingresa tu inquietud", "UBICACIÓN".

## Fase 6 — CSS y sistema de diseño

- Los 6 archivos CSS pasan a 3: `base.css` (tokens, `@font-face`, reset, elementos base), `layout.css` (contenedores, header, nav, rejillas, footer) y `components.css` (botones, tarjetas, menú, utilidades).
- Variables en `:root` para color, espaciado, tipografía, radios, sombra y transición.
- **Paleta derivada del sitio, no inventada.** Se conservan `#181719` y `#f9f9f9`. El acento ámbar `#dcac59` está muestreado del propio hero con ImageMagick, así que sale de la fotografía del proyecto.
- Escala de espaciado 4/8/16/24/32/48/64/96. Ningún valor suelto.
- Escala tipográfica con `clamp()`. Dos familias: Lora (títulos) y la pila del sistema (cuerpo). Eliminada 'Crimson Pro', que se declaraba en CSS pero no se cargaba de ningún sitio.
- Arreglados los dos `@font-face` rotos de `normalize.css`, que apuntaban a `Lora/Lora-Regular.ttf` y `Montserrat/Montserrat-Regular.ttf;` (con un `;` dentro del `url()`); ninguna de las dos rutas existía. **La fuente Lora estaba en el repositorio pero no se cargaba nunca.**
- Eliminado el CSS muerto: `.Caja`, `.gallery-item-type`, `.header`, `.header-contain-1`, `.header-contain-2`, las reglas de `li` y `span` sin HTML que las use, y el `input[type="name"]` que nunca podía coincidir.
- Eliminado el bloque del menú hamburguesa triplicado (~60 líneas × 3).
- El único `!important` que queda está dentro de `prefers-reduced-motion`, donde tiene que ganar a las transiciones de autor.
- Orden dentro de cada archivo: variables → reset → base → layout → componentes → utilidades → media queries.

## Fase 7 — Responsive

- **Eliminado `body { overflow: hidden }`**, que impedía hacer scroll en la portada por encima de 1210px.
- Reescrito a mobile-first con `min-width`. Los once breakpoints arbitrarios (1278, 1210, 1050, 880, 760, 676, 648, 547, 530, 450, 414) pasan a cuatro: 480, 768, 1024, 1440.
- Eliminados los `font-size: 3px` y `font-size: 2px` que hacían ilegible la tarjeta de perfil por debajo de 676px.
- La tarjeta del hero ya no usa desplazamientos fijos (`left: 150px; bottom: 100px; margin-right: 220px`): se apila debajo de la foto en móvil y se superpone dentro de los límites de la imagen a partir de 768px.
- La página About se apila en una columna en móvil; antes era `flex-flow: row nowrap` sin alternativa y se aplastaba.
- **Verificado sin scroll horizontal en 360, 768, 1024 y 1440px** en las cinco páginas, comparando `document.documentElement.scrollWidth` con `window.innerWidth`.
- Áreas táctiles verificadas: botón de menú 44×44px, enlaces del menú 161×49px.
- Menú móvil funcional en las dos direcciones, con bloqueo de scroll de fondo, cierre con Escape y cierre al pulsar un enlace.

## Fase 8 — UX / UI

- Un CTA principal por pantalla con destino real. El de la portada apuntaba a `http://404notfounderror.surge.sh/`, un despliegue externo ajeno al repositorio; ahora lleva a la colección.
- Estados completos en cada elemento interactivo: default, hover, focus, active. Transiciones de 200ms.
- Añadido footer con navegación, presente en las cinco páginas.
- Ancho de línea medido: **68 caracteres** en el cuerpo de About, dentro del objetivo de 60–75.
- Sin gradientes, sin sombras exageradas, sin animaciones gratuitas. Eliminados los tres toggles decorativos de iconos de la página de contacto, que solo intercambiaban imágenes al hacer clic.

**Secciones eliminadas por no tener contenido real detrás:**

| Sección | Motivo |
|---|---|
| Formulario de contacto | No estaba conectado a ningún servicio. Sustituido por enlaces reales, según la regla 8.6 |
| Dirección postal "010 NY-24, Bethpage, Nueva York" + mapa | Dirección inventada, y el mapa era una imagen ilegible con calles deformadas |
| Correo `thisintirior@gmail.com` | Inventado, y con errata en el propio dominio del estudio |
| Enlace a Instagram | `href="instagram.com"` era una ruta relativa; resolvía a `/instagram.com` → 404. No hay cuenta real |
| Cabecera tipo Instagram de la colección | 9 posts / 188 followers / 205 following: métricas inventadas |
| Contadores de likes y comentarios (×9) | Inventados |
| Botones "Seguir" / "Enviar Mensaje" | No hacían nada |
| Enlace `thisinterior.sugr.sh` | Ruta relativa rota, y el dominio no existe |

La página de contacto **no se ha borrado**: se ha reescrito para decir la verdad —que el estudio es ficticio— y ofrecer un destino real, con datos estructurados `Person` + `sameAs` para vincular los perfiles del autor.

## Fase 9 — JavaScript

- **jQuery eliminado.** Se cargaba en las cuatro páginas (jQuery slim 3.0.0-beta1, una beta de 2016, desde cdnjs) solo para `toggleClass` y `click`.
- Un solo punto de entrada, `assets/js/main.js`, dentro de una IIFE con `"use strict"`. Sin variables globales, sin `var`.
- Comprobación de existencia antes de operar: si no hay botón o panel, la función sale sin hacer nada.
- Delegación de eventos: un solo listener cubre todos los enlaces del panel.
- Arreglado `index3.html`, que pedía `JS/script.js` — una carpeta que no existía. **La página About no tenía JavaScript en absoluto: su menú móvil no abría.**
- Cero errores y cero warnings en consola en las cinco páginas.

**Dos fallos de accesibilidad encontrados probando con el navegador, no leyendo el código:**
1. Al abrir el menú, el foco no entraba en el panel. `focus()` no hace nada sobre un elemento con `visibility: hidden`, y el cambio de atributo aún no se había pintado. Resuelto moviendo el foco dentro de `requestAnimationFrame`.
2. Con el menú abierto, el tabulador se escapaba a los enlaces de la página que quedaba **detrás** del overlay. Añadida trampa de foco que cicla entre los enlaces del panel y el propio botón de cierre.

## Fase 10 — Rendimiento

- Tres hojas de estilo compartidas por las cinco páginas: tras la primera carga, CSS, JS y fuente salen de caché. Suman 19 KB sin comprimir, así que son el CSS crítico; separar un bloque en línea habría duplicado código sin ganancia medible.
- Script con `defer`.
- Fuente con `font-display: swap` y `<link rel="preload">`. **No hace falta `preconnect`: el sitio no hace ni una sola petición a un tercero.** Antes cargaba jQuery desde cdnjs en las cuatro páginas.
- Peticiones reducidas: de 6 hojas de estilo a 3, y los 7 SVG sueltos pasan a estar en línea.

| Página | Primera carga, sin comprimir |
|---|---|
| Compartido (CSS + JS + fuente + favicon) | 103 KB |
| Portada | 161 KB |
| Colección (las 12 fotos) | 564 KB |
| About / Contacto | 109 KB |

Objetivo de menos de 1 MB cumplido en todas. El repositorio entero ocupa ahora 796 KB, frente a los más de 22 MB de antes.

## Fase 11 — QA

Verificado con Chrome headless sobre el protocolo DevTools, en las cinco páginas y en los cuatro anchos:

| Comprobación | Resultado |
|---|---|
| Enlaces de menú y footer llevan a páginas que existen | Correcto |
| Cada ruta de imagen corresponde a un archivo en disco | Correcto, 14/14 |
| Cada `<link>` y `<script>` apunta a un archivo que existe | Correcto |
| Errores en consola | 0 en las 5 páginas |
| Peticiones fallidas | 0 en las 5 páginas |
| Scroll horizontal en 360 / 768 / 1024 / 1440 | Ninguno |
| Menú móvil abre y cierra | Correcto: clic, Escape y clic en enlace |
| Bloqueo de scroll de fondo con el menú abierto | Correcto |
| Trampa de foco con el menú abierto | Correcto |
| Foco vuelve al botón al cerrar | Correcto |
| Restos de "Lorem ipsum", "TODO" o texto del template | Ninguno |
| Imágenes rotas | Ninguna |
| Title y description únicos por página | Correcto, 50–60 y 150–158 caracteres |
| `404.html` con enlace de vuelta al inicio | Correcto |
| Credenciales en el código | Ninguna |
| Estilos inline | 0 |
| Salto de línea final en cada archivo | Correcto |

## Fase 12 — Documentación

- `README.md` reescrito. El anterior describía la estructura antigua y listaba como "known issues" fallos que ahora están corregidos.
- Este `docs/cambios.md`.
- Añadido el bloque "Hire me" al final del README, con las URLs limpias (las del documento de origen venían envueltas en redirecciones de Google).

## Fase 13 — Deploy

- Verificado con servidor local (`python -m http.server`) y abriendo `index.html` directamente desde disco.
- **Sobre `file://` funciona todo** —CSS, JS, imágenes y menú— **salvo la fuente**: Chrome bloquea las peticiones `@font-face` desde origen `file://` por su política CORS, y los títulos caen al serif de respaldo. Es una restricción del navegador, no del sitio; sobre HTTP la fuente carga sin incidencias. Documentado en el README.
- Sin rutas absolutas de máquina. Verificado con `grep`.
- Todas las rutas internas relativas y en minúsculas. Única excepción justificada: `404.html` usa rutas con `/` inicial, porque el servidor la sirve desde cualquier profundidad de URL y con rutas relativas se le romperían el CSS y el JS.
- **No se ha desplegado nada.** No se ha creado configuración de hosting porque no se indicó destino.

---

## Pendiente para el autor

1. **Enlace de contacto.** La página de contacto apunta a `wib.digital` porque el estudio es ficticio y no hay buzón real. Si prefieres un `mailto:` directo, dime qué dirección usar y lo cambio.
2. **Dominio.** Los canonical, el sitemap y las etiquetas Open Graph apuntan a `https://moderninterior.wib.digital`, que es lo que declaraba el README anterior. Si el dominio cambia, hay que actualizar los cuatro HTML, `sitemap.xml` y `robots.txt`.
3. **Fotografía.** Las doce fotos de la galería son imágenes generadas y llevaban marca de agua del generador. Ya está recortada, pero si algún día consigues fotografía real de interiorismo, sustituirlas subiría bastante el nivel del proyecto.
