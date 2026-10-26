/**
 * Avance automático.
 * Cuando la narración de una escena termina sola, espera una
 * pausa breve y pasa a la siguiente, hasta llegar al final.
 * Si una escena no tiene narración, avanza tras `fallbackMs`.
 * La navegación manual sigue funcionando: el modo automático
 * continúa desde la escena a la que se haya ido.
 */
export function createAutoplay(presentation, narrator, { enabled = true, pauseMs = 1500, fallbackMs = 5000 } = {}) {
  let active = enabled;
  let timer = null;

  const isLast = () => presentation.current >= presentation.length - 1;

  function cancel() {
    clearTimeout(timer);
    timer = null;
  }

  function scheduleNext(ms) {
    cancel();
    if (!active || isLast()) return;
    timer = setTimeout(() => presentation.next(), ms);
  }

  narrator.addEventListener("end", ({ detail }) => {
    if (detail.completed) scheduleNext(pauseMs);
  });
  narrator.addEventListener("missing", () => scheduleNext(fallbackMs));

  // Un cambio de escena (manual o automático) anula lo pendiente.
  presentation.addEventListener("change", cancel);

  return {
    get active() {
      return active;
    },

    /** Pausa o reanuda. Al reanudar, si ya no hay voz, avanza tras la pausa. */
    toggle() {
      active = !active;
      if (!active) cancel();
      else if (!narrator.isSpeaking) scheduleNext(pauseMs);
      return active;
    }
  };
}
