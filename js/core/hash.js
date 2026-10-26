/**
 * Sincroniza la escena con la URL (#slide-N).
 * Permite recargar o compartir un enlace a una escena concreta,
 * útil para ensayar.
 */
const PREFIX = "#slide-";

export function readInitialIndex(total) {
  const n = Number.parseInt(location.hash.replace(PREFIX, ""), 10);
  return Number.isInteger(n) && n >= 1 && n <= total ? n - 1 : 0;
}

export function syncHash(presentation) {
  presentation.addEventListener("change", ({ detail }) => {
    history.replaceState(null, "", `${PREFIX}${detail.index + 1}`);
  });
}
