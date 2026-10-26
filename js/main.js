import { slides } from "./data/slides.js";
import {
  music as musicConfig,
  narration as narrationConfig,
  autoplay as autoplayConfig
} from "./data/audio.js";
import { createSlide } from "./render/slide.js";
import { Presentation } from "./core/presentation.js";
import { bindControls } from "./core/controls.js";
import { readInitialIndex, syncHash } from "./core/hash.js";
import { onFirstGesture } from "./core/start-gate.js";
import { createAutoplay } from "./core/autoplay.js";
import { AudioEngine } from "./audio/audio-engine.js";
import { BackgroundMusic } from "./audio/background-music.js";
import { Narrator } from "./audio/narrator.js";

// --- Escenas ---
const container = document.getElementById("presentation");
const slideElements = slides.map(createSlide);
container.append(...slideElements);

const presentation = new Presentation(slideElements);

// El fondo adopta el ambiente de la escena activa.
presentation.addEventListener("change", ({ detail }) => {
  document.body.dataset.mood = detail.slide.dataset.mood;
});

// --- Audio ---
const engine = new AudioEngine();
const music = new BackgroundMusic(engine, musicConfig);
const narrator = new Narrator(engine, narrationConfig);
let audioStarted = false;

music.preload();

// La música baja mientras habla la narración.
narrator.addEventListener("start", () => music.duck(true));
narrator.addEventListener("end", () => music.duck(false));

// Cada escena reproduce su narración (una vez iniciado el audio).
presentation.addEventListener("change", ({ detail }) => {
  if (audioStarted) narrator.play(detail.slide.id);
});

// El primer gesto desbloquea el audio y arranca música + narración,
// sin avanzar de slide.
onFirstGesture(() => {
  audioStarted = true;
  engine.unlock();
  music.start().catch(console.error);
  narrator.play(slideElements[presentation.current].id);
  narrator.preload(slideElements.map((slide) => slide.id));
});

// Al terminar cada narración, pasa sola a la siguiente escena.
const autoplay = createAutoplay(presentation, narrator, autoplayConfig);

// Teclas M (silenciar música) y P (pausar/reanudar avance automático).
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "m") music.toggleMute();
  if (key === "p") autoplay.toggle();
});

// --- Navegación ---
syncHash(presentation);
bindControls(presentation);
presentation.goTo(readInitialIndex(slideElements.length));
