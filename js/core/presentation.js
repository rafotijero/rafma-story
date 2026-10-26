const ACTIVE_CLASS = "is-active";

/**
 * Controla qué escena está activa.
 * Emite el evento "change" con { index, slide } en cada cambio:
 * ahí se engancharán el audio, la música, etc.
 */
export class Presentation extends EventTarget {
  #slides;
  #current = -1;

  constructor(slideElements) {
    super();
    this.#slides = slideElements;
  }

  get current() {
    return this.#current;
  }

  get length() {
    return this.#slides.length;
  }

  goTo(index) {
    if (index < 0 || index >= this.length || index === this.#current) return;

    const previous = this.#slides[this.#current];
    if (previous) {
      previous.classList.remove(ACTIVE_CLASS);
      previous.setAttribute("aria-hidden", "true");
    }

    this.#current = index;
    const slide = this.#slides[index];
    slide.classList.add(ACTIVE_CLASS);
    slide.removeAttribute("aria-hidden");

    this.dispatchEvent(new CustomEvent("change", { detail: { index, slide } }));
  }

  next() {
    this.goTo(this.#current + 1);
  }

  prev() {
    this.goTo(this.#current - 1);
  }
}
