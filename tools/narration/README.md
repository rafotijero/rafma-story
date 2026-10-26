# Narración por voz

Genera `audio/narracion/slide-N.mp3` a partir de los textos de `js/data/slides.js`.

## Requisitos (una sola vez)

- Python (`py`) y Node.js (`node`)
- `py -m pip install edge-tts`

## Uso (desde la raíz del proyecto)

```bash
py tools/narration/generate.py          # todas las escenas
py tools/narration/generate.py 3 9      # solo las escenas 3 y 9
node tools/narration/script.mjs         # ver el guion sin generar audio
```

Si cambias un texto en `slides.js`, regenera solo esa escena.

## Archivos

| Archivo | Para qué |
|---|---|
| `generate.py` | Voz, velocidad y tono (arriba del archivo). |
| `script.mjs` | Arma el guion: kicker + título + narración, sin HTML. |
| `pronunciations.mjs` | Cómo leer palabras especiales (`903` → "nueve cero tres"). Solo afecta al audio. |

En `slides.js`, `speakKicker: false` evita que la voz lea la nota a mano de esa escena.

Esta carpeta no necesita subirse al sitio.
