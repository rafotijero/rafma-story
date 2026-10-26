/**
 * Narración por escena.
 * Al entrar a una escena reproduce su archivo de voz (si existe),
 * tras una breve pausa para que la escena aparezca primero.
 * Al cambiar de escena, la narración anterior se detiene.
 *
 * Eventos:
 *   "start"   -> empezó a hablar
 *   "end"     -> dejó de hablar; detail.completed indica si terminó
 *                sola (true) o fue interrumpida al cambiar de escena
 *   "missing" -> la escena no tiene archivo de narración
 */
export class Narrator extends EventTarget {
  #engine;
  #pathFor;
  #delayMs;
  #gain = null;
  #source = null;
  #timer = null;
  #request = 0;
  #pending = false; // esperando la pausa inicial o la descarga

  constructor(engine, { path, volume = 1, delayMs = 900 }) {
    super();
    this.#engine = engine;
    this.#pathFor = (id) => path.replace("{id}", id);
    this.#delayMs = delayMs;
    this.volume = volume;
  }

  /** true mientras habla o está por empezar a hablar. */
  get isSpeaking() {
    return this.#pending || this.#source !== null;
  }

  /** Descarga por adelantado la narración de estas escenas. */
  preload(ids) {
    ids.forEach((id) => this.#engine.prefetch(this.#pathFor(id)));
  }

  play(id) {
    this.stop();
    const request = ++this.#request;
    this.#pending = true;

    this.#timer = setTimeout(async () => {
      let buffer;
      try {
        buffer = await this.#engine.getBuffer(this.#pathFor(id));
      } catch {
        if (request !== this.#request) return;
        this.#pending = false;
        this.dispatchEvent(new Event("missing"));
        return;
      }
      if (request !== this.#request) return; // ya se cambió de escena
      this.#pending = false;

      this.#gain ??= this.#engine.createGain(this.volume);
      const source = this.#engine.context.createBufferSource();
      source.buffer = buffer;
      source.connect(this.#gain);
      source.onended = () => {
        if (this.#source !== source) return;
        this.#source = null;
        this.#emitEnd(true);
      };
      source.start();
      this.#source = source;
      this.dispatchEvent(new Event("start"));
    }, this.#delayMs);
  }

  stop() {
    clearTimeout(this.#timer);
    this.#pending = false;
    if (!this.#source) return;

    const source = this.#source;
    this.#source = null;
    source.stop();
    this.#emitEnd(false);
  }

  #emitEnd(completed) {
    this.dispatchEvent(new CustomEvent("end", { detail: { completed } }));
  }
}
