# Una RAFMA historia

La historia de Maqui y Rafo contada como un cuento: escenas con fotos tipo polaroid, narración por voz y música de fondo en bucle. Pensada para proyectarse en un televisor y para verse desde el celular.

## Cómo se usa

1. Abre la página y haz **clic** (o toca) en la portada: empieza la música y la narración.
2. La historia avanza sola al terminar la narración de cada escena.

| Tecla | Acción |
|---|---|
| Clic · → · Espacio · AvPág | Siguiente escena |
| ← · RePág | Escena anterior |
| Deslizar (celular) | Siguiente / anterior |
| **P** | Pausar / reanudar el avance automático |
| **M** | Silenciar / reactivar la música |

La URL guarda la escena actual (`#slide-9`), útil para ensayar.

## Estructura

```
index.html
css/            estilos (tokens, ambientes de color, layouts, componentes)
js/
  data/         ← contenido: slides.js (textos y fotos) y audio.js (volúmenes, tiempos)
  render/       construcción de cada escena
  core/         navegación, controles, avance automático
  audio/        música de fondo y narración (Web Audio)
img/            fotos: slide-N.webp, kahoot-qr.webp, share.jpg (vista previa al compartir)
audio/          música y narración (audio/narracion/slide-N.mp3)
tools/          generadores de la narración y de la imagen para compartir (no los usa la página)
```

- **Cambiar un texto:** `js/data/slides.js`, y luego regenerar su voz (ver `tools/narration/README.md`).
- **Cambiar colores o fuentes:** `css/tokens.css` y `css/moods.css`.
- **Volúmenes y tiempos:** `js/data/audio.js`.

## Ver en local

Usa módulos ES, así que necesita servirse por HTTP (no funciona con doble clic):

```bash
py -m http.server 5518
```

y abre http://localhost:5518.

## Publicación

Sitio estático sin paso de compilación: se publica tal cual en Cloudflare Pages.
