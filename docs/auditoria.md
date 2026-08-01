# Auditoría inicial — Modern Interior

Fecha: 2026-07-31
Estado del proyecto antes de la reorganización.

---

## 1. Páginas HTML

| Archivo | `<title>` | `<h1>` | Propósito real | CSS que carga | JS que carga |
|---|---|---|---|---|---|
| `index.html` | `INTERIOR` | `Modern interior` | Portada / hero con foto y tarjeta de perfil | `styles.css`, `stylesburger.css` (**no existe**), `normalize.css` | jQuery CDN, `script.js` |
| `index2.html` | `Collection` | *(ninguno)* | Galería de proyectos, maquetada como perfil de Instagram | `styles2.css`, `normalize.css` | jQuery CDN, `script.js` |
| `index3.html` | `About` | `ABOUT US` | Texto sobre el estudio, layout a dos columnas | `styles3.css`, `normalize.css` | jQuery CDN, `JS/script.js` (**no existe**) |
| `index4.html` | `Contact` | `Contact Us` | Formulario de contacto + ubicación + redes | `styles4.css`, `normalize.css` | jQuery CDN, `script2.js` |

Ninguna página tiene `meta description`, Open Graph, canonical ni encabezado `h1` en la de colección.

---

## 2. CSS

| Archivo | Peso | Se carga en | Estado |
|---|---|---|---|
| `normalize.css` | 6,5 KB | Las 4 páginas | Normalize modificado + scrollbar + 2 `@font-face` rotos |
| `styles.css` | 4,5 KB | `index.html` | En uso |
| `styles2.css` | 4,0 KB | `index2.html` | En uso |
| `styles3.css` | 3,8 KB | `index3.html` | En uso |
| `styles4.css` | 3,5 KB | `index4.html` | En uso |
| `stylesburger.css` | — | `index.html` lo pide | **No existe. 404 en cada carga de la portada** |

---

## 3. JavaScript

| Archivo | Peso | Se carga en | Estado |
|---|---|---|---|
| `script.js` | 296 B | `index.html`, `index2.html` | jQuery. Abre y cierra el menú |
| `script2.js` | 507 B | `index4.html` | jQuery. Tres toggles de iconos decorativos |
| `JS/script.js` | — | `index3.html` lo pide | **No existe. La página About se queda sin menú móvil** |
| jQuery slim 3.0.0-beta1 | ~70 KB | Las 4 páginas | CDN. Versión *beta* de 2016. Se usa solo para `toggleClass` |

---

## 4. Imágenes

| Archivo | Dimensiones | Peso | Formato | Se usa en | Contenido real |
|---|---|---|---|---|---|
| `photo1.png` | 1474×1110 | 1.119 KB | PNG | `index.html` (hero **y favicon**) | Salón blanco, panel de arte amarillo, sofá con cojines naranjas |
| `photo2.png` | 200×200 | 82 KB | PNG | `index.html`, `index2.html` | Retrato de la diseñadora |
| `photo3.png` | 1024×1024 | 1.504 KB | PNG | `index2.html` | Vestidor de madera oscura |
| `photo4.png` | 1024×1024 | 1.458 KB | PNG | `index2.html` | Rincón de escritorio, lámpara de cobre |
| `photo5.png` | 1024×1024 | 1.477 KB | PNG | `index2.html` | Salón con panel verde azulado y sofá menta |
| `photo6.png` | 1024×1024 | 1.650 KB | PNG | `index2.html` | Terraza con mesa de madera y plantas |
| `photo7.png` | 1024×1024 | 1.562 KB | PNG | `index2.html` | Salón con estantería blanca y sofá gris |
| `photo8.png` | 1024×1024 | 1.618 KB | PNG | `index2.html` | Sofá beige bajo focos negros |
| `photo9.png` | 1024×1024 | 1.541 KB | PNG | **Huérfana** | Lámpara de sobremesa sobre consola blanca |
| `photo10.png` | 1024×1024 | 1.418 KB | PNG | **Huérfana** | Panel decorativo naranja y gris |
| `photo11.png` | 1024×1024 | 1.308 KB | PNG | **Huérfana** | Auriculares sobre fondo blanco — no es interiorismo |
| `photo12.png` | 1024×1024 | 1.555 KB | PNG | **Huérfana** | Escritorio ante mural botánico |
| `photo13.png` | 1024×1024 | 1.593 KB | PNG | `index2.html` | Comedor azul con cuatro sillas |
| `photo14.png` | 1024×1024 | 1.619 KB | PNG | `index2.html` | Banco azul bajo pared de discos |
| `photo15.png` | 1024×1024 | 1.485 KB | PNG | `index2.html` | Separador blanco y verde con lámparas geométricas |
| `photo16.png` | 1024×1024 | 1.974 KB | PNG | `index4.html` | Mapa ilegible con nombres de calle deformados |

**Peso total en disco: 22,4 MB.** La página de colección sola descarga **13,7 MB**.
El favicon de las cuatro páginas es `photo1.png`: 1,1 MB por un icono de 16×16.

### SVG

| Archivo | Peso | Se usa en |
|---|---|---|
| `burger.svg` | 243 B | `index`, `index2`, `index3` |
| `burger-open.svg` | 226 B | `index`, `index2`, `index3` |
| `mail.svg` | 299 B | `index4` (dos veces) |
| `mail-open.svg` | 327 B | `index4` |
| `mail-forward.svg` | 346 B | `index4` |
| `insta.svg` | 623 B | `index4` |
| `insta-alone.svg` | 563 B | `index4` |

---

## 5. Dependencias externas

| Dependencia | Origen | Uso real |
|---|---|---|
| jQuery slim 3.0.0-beta1 | `cdnjs.cloudflare.com` | Solo `toggleClass` y `click`. Sustituible por 15 líneas de JS |
| `Lora-VariableFont_wght.ttf` | Local, 212 KB | **Nunca se carga.** Ningún `@font-face` la referencia |
| 'Crimson Pro' | — | Declarada en CSS, **nunca cargada** desde ningún sitio |
| Montserrat | — | `@font-face` apunta a ruta inexistente |

---

## 6. Referencias rotas

| Dónde | Referencia | Problema |
|---|---|---|
| `index.html:7` | `stylesburger.css` | El archivo no existe |
| `index3.html:10` | `JS/script.js` | No existe la carpeta `JS/`. About se queda sin JavaScript |
| `normalize.css:361` | `Lora/Lora-Regular.ttf` | No existe la carpeta `Lora/` |
| `normalize.css:366` | `Montserrat/Montserrat-Regular.ttf;` | No existe, y además hay un `;` dentro de `url()` |
| `index2.html:45` | `href="thisinterior.sugr.sh"` | Ruta relativa, no URL. Resuelve a `/thisinterior.sugr.sh` → 404 |
| `index4.html:54` | `href="instagram.com"` | Ruta relativa. Resuelve a `/instagram.com` → 404 |
| `index.html:45` | `http://404notfounderror.surge.sh/` | Despliegue externo ajeno al repositorio. Es el único CTA de la portada |
| `index.html:9` y las otras 3 | `favicon = photo1.png` | Existe, pero pesa 1,1 MB |

No hay archivos `.bak`, `node_modules`, `.DS_Store` ni `Thumbs.db`.

---

## 7. CSS duplicado y muerto

| Problema | Detalle |
|---|---|
| Bloque del menú hamburguesa triplicado | ~60 líneas idénticas en `styles.css`, `styles2.css` y `styles3.css` |
| `@media(max-width:1278px)` duplicado | Mismo bloque en `styles2.css` y `styles3.css` |
| `.Caja` | `styles2.css:208` — caja azul de pruebas, sin HTML que la use |
| `.gallery-item-type` | `styles2.css:193` — sin HTML que la use |
| `.header`, `.header-contain-1`, `.header-contain-2` | `styles3.css:179-203` — sin HTML que las use |
| `li`, `span` | `styles2.css:7-12` — no hay ni un `<li>` ni un `<span>` en la página |
| `.Contenido-3 input[type="name"]` | `styles4.css:94` — el HTML escribe `type="Name"`, que no es un tipo válido |
| `display: flex` repetido | `.Caja-1` y `.Caja-2` lo declaran dos veces cada una |

## 8. HTML duplicado entre páginas

El `<head>`, el bloque `.menu-link` y el `.menu-overlay` están copiados a mano en 3-4 páginas, y **no coinciden entre sí**: el menú de `index2.html` no incluye *Collection* y el de `index3.html` no incluye *About*. Cualquier cambio de navegación hay que hacerlo cuatro veces.

---

## 9. Contenido de relleno heredado del template

| Dónde | Texto | Problema |
|---|---|---|
| `index3.html:39` | "XYZ Interior Design" ×4 | Nombre del template. El estudio se llama *This Interior* |
| `index3.html:39` | "Jane hired a team…", "Jane's attention to detail" | Otra diseñadora. La del sitio es Eliza Webber |
| `index3.html:39` | "founded in 1985" | Contradice el "Designed in 2020" de la portada |
| `index3.html:39` | "won numerous awards", "clients across the country and around the world" | Afirmaciones no verificables |
| `index.html:44` | "A full servie residential" | Falta la `c` de *service* |
| `index.html:60` | "Designed in 2020 by Aliza Webber" | *Aliza* vs *Eliza* en la misma página |
| Nav de las 4 páginas | "Abaut" | *About* mal escrito |
| `index2.html:37-38` | "188 followers", "205 following" | Métricas sociales inventadas |
| `index2.html:56-121` | "🤍 12 💬 2" ×9 | Contadores de likes y comentarios inventados |
| `index2.html:32-33` | Botones "Seguir" / "Enviar Mensaje" | No hacen nada |
| `index4.html:44` | "010 NY-24, Bethpage, Nueva York" | Dirección postal inventada |
| `index4.html:63` | "thisintirior@gmail.com" | Correo inventado y mal escrito (*intirior*) |
| Todas | "Inicio", "Ingresa tu inquietud", "UBICACIÓN", "Seguir" | Español suelto en un sitio en inglés |
| `index3.html:56` | `<h2></h2>` | Encabezado vacío |

---

## 10. Accesibilidad

| Problema | Dónde |
|---|---|
| `<div href="#">` como botón de menú | Las 3 páginas con hamburguesa. No es focusable ni operable con teclado |
| `alt=""` en imágenes con contenido | 13 de las 16 imágenes |
| Formulario sin ningún `<label>` | `index4.html:31-36` |
| `type="Name"` no es un tipo de input válido | `index4.html:32` |
| `<h4>` usado como cuerpo de texto | `index3.html:39` — 4 párrafos dentro de un solo `h4` |
| `<h2>` usado como párrafo | `index.html:44` |
| `index2.html` no tiene `<h1>` | Toda la página |
| `lang="es"` con contenido en inglés | `index.html:2` |
| Contraste 2,6:1 | `dimgray` (#696969) sobre #181719 — enlaces del nav y CTA de la portada |
| Sin estilo de `:focus` en ningún elemento | Los 4 CSS |
| `<main>` anidado dentro de `<header>` | `index2.html:49` |

---

## 11. Responsive

| Problema | Dónde |
|---|---|
| `body { overflow: hidden }` | `styles.css:4` — la portada **no se puede scrollear** por encima de 1210px |
| `font-size: 3px` y `2px` | `styles.css:262-266` — texto ilegible por debajo de 676px |
| `.profile` con `left:150px; bottom:100px; margin-right:100px` | `styles.css:184-188` — desborda en pantallas estrechas |
| `flex-flow: row nowrap` sin apilado móvil | `styles3.css:82` — la página About se aplasta en móvil |
| `margin-left: 100px` fijo | `styles3.css:223` |
| Once breakpoints arbitrarios | 1278, 1210, 1050, 880, 760, 676, 648, 547, 530, 450, 414 |
| Todo `max-width` | Desktop-first en las cuatro hojas |
| `.nav-menu { visibility: hidden }` sin alternativa | `styles3.css:258` — a 530px About pierde su navegación de escritorio y su JS no carga |

---

## 12. Otros

- No hay `404.html`, `robots.txt`, `sitemap.xml` ni `.gitignore`.
- Indentación mezclada: tabuladores en HTML y en `styles.css`/`styles3.css`/`styles4.css`, espacios en `styles2.css` y `normalize.css`.
- `<br><br>` usado como espaciado en las cuatro páginas (17 apariciones).
- **No hay credenciales, tokens ni claves de API en ningún archivo del proyecto.**
