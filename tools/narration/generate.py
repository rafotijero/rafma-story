"""
Genera la narración de cada escena con voces neuronales de Microsoft
(edge-tts) y la guarda en audio/narracion/slide-N.mp3.

Requisitos (una sola vez):
    py -m pip install edge-tts

Uso, desde la raíz del proyecto:
    py tools/narration/generate.py              # todas las escenas
    py tools/narration/generate.py 3 9          # solo las escenas 3 y 9
"""

import asyncio
import json
import subprocess
import sys
from pathlib import Path

import edge_tts

# --- Configuración de la voz -------------------------------------------
VOICE = "es-PE-CamilaNeural"   # otras: es-PE-AlexNeural, es-MX-DaliaNeural…
RATE = "-12%"                  # más negativo = más pausado
PITCH = "-2Hz"                 # más negativo = voz más grave y cálida
# -----------------------------------------------------------------------

ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = ROOT / "audio" / "narracion"


def load_script():
    result = subprocess.run(
        ["node", str(ROOT / "tools" / "narration" / "script.mjs")],
        capture_output=True, text=True, encoding="utf-8", check=True,
    )
    return json.loads(result.stdout)


async def synthesize(scene):
    output = OUTPUT_DIR / f"{scene['id']}.mp3"
    communicate = edge_tts.Communicate(scene["text"], VOICE, rate=RATE, pitch=PITCH)
    await communicate.save(str(output))
    print(f"✓ {output.relative_to(ROOT)}")


async def main(selected):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    script = load_script()

    if selected:
        script = [s for s in script if s["id"].removeprefix("slide-") in selected]

    for scene in script:
        await synthesize(scene)


if __name__ == "__main__":
    asyncio.run(main(set(sys.argv[1:])))
