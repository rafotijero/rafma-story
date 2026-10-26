"""
Genera img/share.jpg (1200x630): la imagen que muestran WhatsApp,
Facebook, Telegram, etc. al compartir el enlace de la página.

Usa la foto de la portada (img/slide-1.webp) en una polaroid y las
mismas tipografías de la presentación (se descargan la primera vez).

Requisitos (una sola vez):
    py -m pip install pillow

Uso, desde la raíz del proyecto:
    py tools/share-card/generate.py
"""

import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FONTS_DIR = Path(__file__).parent / ".fonts"
COVER = ROOT / "img" / "slide-1.webp"
OUTPUT = ROOT / "img" / "share.jpg"

WIDTH, HEIGHT = 1200, 630

# Paleta del ambiente "cream" (css/moods.css)
BG = (247, 236, 220)
GLOW_1 = (243, 201, 166)
GLOW_2 = (246, 226, 192)
INK = (58, 42, 34)
INK_SOFT = (111, 85, 71)
ACCENT = (196, 85, 58)
PAPER = (255, 253, 248)
TAPE = (250, 236, 200, 185)

FONTS = {
    "fraunces": "ofl/fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf",
    "fraunces-italic": "ofl/fraunces/Fraunces-Italic[SOFT,WONK,opsz,wght].ttf",
    "caveat": "ofl/caveat/Caveat[wght].ttf",
}
FONTS_BASE_URL = "https://raw.githubusercontent.com/google/fonts/main/"


def font_path(name):
    """Descarga la fuente desde el repositorio oficial de Google Fonts si falta."""
    FONTS_DIR.mkdir(exist_ok=True)
    path = FONTS_DIR / f"{name}.ttf"
    if not path.exists():
        url = FONTS_BASE_URL + urllib.parse.quote(FONTS[name])
        urllib.request.urlretrieve(url, path)
    return path


def load_font(name, size, axes=None):
    font = ImageFont.truetype(str(font_path(name)), size)
    if axes:
        values = []
        for axis in font.get_variation_axes():
            name = axis["name"]
            name = name.decode() if isinstance(name, bytes) else name
            values.append(axes.get(name, axis["default"]))
        font.set_variation_by_axes(values)
    return font


def background():
    canvas = Image.new("RGB", (WIDTH, HEIGHT), BG)
    glows = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(glows)
    draw.ellipse((-260, -300, 520, 420), fill=GLOW_1)
    draw.ellipse((780, 330, 1500, 950), fill=GLOW_2)
    return Image.blend(canvas, glows.filter(ImageFilter.GaussianBlur(140)), 0.9)


def polaroid(photo_path, width, tilt):
    photo = Image.open(photo_path).convert("RGB")
    photo_w = width - 36
    photo = photo.resize((photo_w, round(photo_w * photo.height / photo.width)), Image.LANCZOS)

    card = Image.new("RGBA", (width, photo.height + 18 + 70), PAPER)
    card.paste(photo, (18, 18))

    # Sombra
    pad = 60
    shadow = Image.new("RGBA", (card.width + pad * 2, card.height + pad * 2), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rectangle(
        (pad, pad + 14, pad + card.width, pad + card.height + 14), fill=(60, 40, 30, 90)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    shadow.alpha_composite(card, (pad, pad))

    # Cinta adhesiva
    tape = Image.new("RGBA", (130, 34), TAPE).rotate(4, expand=True, resample=Image.BICUBIC)
    shadow.alpha_composite(tape, (pad + (card.width - tape.width) // 2, pad - 18))

    return shadow.rotate(tilt, expand=True, resample=Image.BICUBIC)


def main():
    canvas = background().convert("RGBA")

    card = polaroid(COVER, 440, tilt=3)
    canvas.alpha_composite(card, (40, (HEIGHT - card.height) // 2))

    draw = ImageDraw.Draw(canvas)
    x = 560

    kicker = load_font("caveat", 54, {"Weight": 700})
    title = load_font("fraunces", 96, {"Weight": 560, "Optical Size": 144, "Softness": 100, "Wonky": 1})
    title_em = load_font("fraunces-italic", 96, {"Weight": 450, "Optical Size": 144, "Softness": 100, "Wonky": 1})
    subtitle = load_font("fraunces", 34, {"Weight": 380, "Optical Size": 36, "Softness": 60})

    draw.text((x, 150), "Había una vez…", font=kicker, fill=ACCENT)

    draw.text((x, 215), "Una ", font=title, fill=INK)
    rafma_x = x + draw.textlength("Una ", font=title)
    draw.text((rafma_x, 215), "RAFMA", font=title_em, fill=ACCENT)
    draw.text((x, 315), "historia", font=title, fill=INK)

    draw.text((x + 4, 450), "La historia de Maqui y Rafo,", font=subtitle, fill=INK_SOFT)
    draw.text((x + 4, 494), "contada como un cuento.", font=subtitle, fill=INK_SOFT)

    canvas.convert("RGB").save(OUTPUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"✓ {OUTPUT.relative_to(ROOT)} ({OUTPUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
