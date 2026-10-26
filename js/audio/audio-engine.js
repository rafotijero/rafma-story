/**
 * Motor de audio compartido.
 * Un único AudioContext para música y narración: una vez que el
 * usuario lo desbloquea con un gesto, todo el audio posterior
 * puede sonar sin pedir otro toque (importante en celulares).
 * También guarda en caché los archivos descargados y decodificados.
 */
export class AudioEngine {
  #context = null;
  #downloads = new Map(); // url -> Promise<ArrayBuffer>
  #buffers = new Map();   // url -> Promise<AudioBuffer>

  get context() {
    this.#context ??= new AudioContext();
    return this.#context;
  }

  /** Debe llamarse dentro de un gesto del usuario (clic, tecla). */
  unlock() {
    return this.context.resume();
  }

  /** Descarga un archivo por adelantado, sin decodificarlo. */
  prefetch(url) {
    if (!this.#downloads.has(url)) {
      const download = fetch(url).then((response) => {
        if (!response.ok) throw new Error(`No se pudo cargar ${url} (${response.status})`);
        return response.arrayBuffer();
      });
      download.catch(() => {}); // el error se reporta al usarlo
      this.#downloads.set(url, download);
    }
    return this.#downloads.get(url);
  }

  /** Devuelve el audio listo para reproducir. */
  getBuffer(url) {
    if (!this.#buffers.has(url)) {
      const buffer = this.prefetch(url)
        .then((data) => this.context.decodeAudioData(data.slice(0)));
      this.#buffers.set(url, buffer);
    }
    return this.#buffers.get(url);
  }

  /** Crea un nodo de volumen conectado a los parlantes. */
  createGain(initialValue = 1) {
    const gain = this.context.createGain();
    gain.gain.value = initialValue;
    gain.connect(this.context.destination);
    return gain;
  }

  /** Lleva un nodo de volumen a `target` de forma gradual. */
  fade(gainNode, target, ms) {
    const now = this.context.currentTime;
    const gain = gainNode.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(target, now + ms / 1000);
  }
}
