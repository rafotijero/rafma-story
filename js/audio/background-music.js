/**
 * Música de fondo continua.
 * Se reproduce desde un buffer en bucle exacto, sin el pequeño
 * silencio que suelen dejar los MP3 al repetirse.
 * Puede bajar su volumen (duck) mientras suena la narración.
 */
export class BackgroundMusic {
  #engine;
  #src;
  #volume;
  #duckLevel;
  #fadeMs;
  #duckFadeMs;
  #gain = null;
  #source = null;
  #muted = false;
  #ducked = false;

  constructor(engine, { src, volume = 0.5, duckLevel = 0.35, fadeMs = 2000, duckFadeMs = 700 }) {
    this.#engine = engine;
    this.#src = src;
    this.#volume = volume;
    this.#duckLevel = duckLevel;
    this.#fadeMs = fadeMs;
    this.#duckFadeMs = duckFadeMs;
  }

  get isPlaying() {
    return this.#source !== null;
  }

  preload() {
    return this.#engine.prefetch(this.#src);
  }

  /** Inicia la música en bucle con un fundido de entrada. */
  async start() {
    if (this.isPlaying) return;

    const buffer = await this.#engine.getBuffer(this.#src);
    this.#gain ??= this.#engine.createGain(0);

    const source = this.#engine.context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(this.#gain);
    source.start();
    this.#source = source;

    this.#applyVolume(this.#fadeMs);
  }

  /** Baja (true) o restaura (false) la música, p. ej. durante la narración. */
  duck(active) {
    this.#ducked = active;
    this.#applyVolume(this.#duckFadeMs);
  }

  toggleMute() {
    this.#muted = !this.#muted;
    this.#applyVolume(600);
  }

  #applyVolume(ms) {
    if (!this.#gain) return;
    const target = this.#muted ? 0 : this.#volume * (this.#ducked ? this.#duckLevel : 1);
    this.#engine.fade(this.#gain, target, ms);
  }
}
