/**
 * Foto estilo polaroid.
 * Muestra el marcador de inmediato y, si la imagen real
 * existe en `src`, la reemplaza en cuanto termina de cargar.
 */
export function createPhoto({ label, src, caption, tilt = 0, shape }, order = 0) {
  const figure = document.createElement("figure");
  figure.className = "photo" + (shape ? ` photo--${shape}` : "");
  figure.style.setProperty("--tilt", `${tilt}deg`);
  figure.style.setProperty("--i", order);

  const frame = document.createElement("div");
  frame.className = "photo__frame";

  const placeholder = document.createElement("span");
  placeholder.className = "photo__label";
  placeholder.textContent = label;
  frame.appendChild(placeholder);

  figure.appendChild(frame);

  if (caption) {
    const figcaption = document.createElement("figcaption");
    figcaption.className = "photo__caption";
    figcaption.textContent = caption;
    figure.appendChild(figcaption);
  }

  if (src) loadImage(figure, frame, src, caption || label);

  return figure;
}

/**
 * Al cargar la imagen, la polaroid adopta su proporción real
 * (--photo-ratio), de modo que la foto nunca se recorta.
 */
function loadImage(figure, frame, src, alt) {
  const img = new Image();
  img.alt = alt;
  img.decoding = "async";
  img.onload = () => {
    figure.style.setProperty("--photo-ratio", img.naturalWidth / img.naturalHeight);
    frame.replaceChildren(img);
  };
  img.src = src;
}
