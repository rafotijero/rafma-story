/**
 * Entradas del presentador.
 * - Teclado: flechas, espacio y AvPág/RePág (lo que envían los
 *   presentadores inalámbricos).
 * - Clic o toque: avanzar.
 * - Deslizar en pantallas táctiles: izquierda avanza, derecha retrocede.
 */
const KEY_ACTIONS = {
  ArrowRight: "next",
  ArrowLeft: "prev",
  " ": "next",
  PageDown: "next",
  PageUp: "prev"
};

const SWIPE_MIN_DISTANCE = 50; // px

export function bindControls(presentation) {
  bindKeyboard(presentation);
  bindPointer(presentation);
  bindSwipe(presentation);
}

function bindKeyboard(presentation) {
  document.addEventListener("keydown", (event) => {
    const action = KEY_ACTIONS[event.key];
    if (!action) return;
    event.preventDefault();
    presentation[action]();
  });
}

function bindPointer(presentation) {
  document.addEventListener("click", () => presentation.next());
}

function bindSwipe(presentation) {
  let startX = 0;
  let startY = 0;

  document.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    // Solo gestos claramente horizontales (no interfiere con el scroll vertical).
    if (Math.abs(dx) < SWIPE_MIN_DISTANCE || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) presentation.next();
    else presentation.prev();
  }, { passive: true });
}
