import { createPhoto } from "./photo.js";

const DEFAULT_LAYOUT = "left";

/**
 * Construye una escena: <section id="slide-N"> con sus fotos
 * y su texto. Cada elemento de texto recibe un índice (--i)
 * para que aparezca en secuencia (ver css/motion.css).
 */
export function createSlide(data, index) {
  const slide = document.createElement("section");
  slide.id = `slide-${index + 1}`;
  slide.className = `slide slide--${data.layout || DEFAULT_LAYOUT}`;
  slide.dataset.mood = data.mood || "cream";
  slide.setAttribute("aria-hidden", "true");

  const inner = document.createElement("div");
  inner.className = "slide__inner";
  inner.append(createPhotos(data.photos || []), createText(data));

  slide.appendChild(inner);
  return slide;
}

function createPhotos(photos) {
  const group = document.createElement("div");
  group.className = "slide__photos";
  photos.forEach((photo, i) => group.appendChild(createPhoto(photo, i)));
  return group;
}

function createText({ kicker, title, narration = [] }) {
  const wrapper = document.createElement("div");
  wrapper.className = "slide__text";

  const parts = [];
  if (kicker) parts.push(element("p", "kicker", kicker));
  if (title) parts.push(element("h1", "title", title));
  narration.forEach((paragraph) => parts.push(element("p", "narration", paragraph)));

  parts.forEach((part, i) => {
    part.classList.add("reveal");
    part.style.setProperty("--i", i);
    wrapper.appendChild(part);
  });

  return wrapper;
}

/** El contenido viene de slides.js (propio), por eso admite HTML como <em>. */
function element(tag, className, html) {
  const el = document.createElement(tag);
  el.className = className;
  el.innerHTML = html;
  return el;
}
