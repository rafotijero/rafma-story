/**
 * Puerta de inicio.
 * Los navegadores no permiten reproducir sonido hasta que la
 * persona interactúa. El primer clic, toque o tecla se usa solo
 * para "empezar" (iniciar la música) y no avanza de slide;
 * a partir del segundo, la navegación funciona normal.
 */
const EVENTS = ["click", "keydown"];
const STARTED_CLASS = "has-started";

export function onFirstGesture(callback) {
  function handle(event) {
    // Teclas modificadoras solas (Shift, Ctrl…) no cuentan como inicio.
    if (event.type === "keydown" && event.key.length > 1 && !isActionKey(event.key)) return;

    event.stopImmediatePropagation();
    event.preventDefault();
    EVENTS.forEach((type) => document.removeEventListener(type, handle, true));

    document.body.classList.add(STARTED_CLASS);
    callback();
  }

  EVENTS.forEach((type) => document.addEventListener(type, handle, true));
}

function isActionKey(key) {
  return ["ArrowRight", "ArrowLeft", "PageDown", "PageUp", "Enter"].includes(key);
}
