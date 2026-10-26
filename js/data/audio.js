/**
 * CONFIGURACIÓN DE AUDIO
 * --------------------------------------------------------
 * music: pista de fondo que suena durante todo el relato,
 *        en bucle y sin cortes entre slides.
 *   src        -> ruta del archivo
 *   volume     -> volumen normal, de 0 a 1
 *   duckLevel  -> proporción del volumen mientras habla la
 *                 narración (0.35 = baja al 35 %)
 *   fadeMs     -> fundido al iniciar
 *   duckFadeMs -> rapidez con que baja/sube durante la narración
 *
 * narration: voz de cada escena.
 *   path    -> ruta de cada archivo; {id} se reemplaza por slide-N
 *   volume  -> volumen de la voz, de 0 a 1
 *   delayMs -> pausa entre que aparece la escena y empieza la voz
 *
 * autoplay: avance automático al terminar cada narración.
 *   enabled    -> si arranca activado (la tecla P lo pausa/reanuda)
 *   pauseMs    -> silencio entre el fin de la voz y la siguiente escena
 *   fallbackMs -> cuánto esperar en una escena sin narración
 */
export const music = {
  src: "audio/music-box-romance.mp3",
  volume: 0.55,
  duckLevel: 0.35,
  fadeMs: 2500,
  duckFadeMs: 700
};

export const narration = {
  path: "audio/narracion/{id}.mp3",
  volume: 1,
  delayMs: 900
};

export const autoplay = {
  enabled: true,
  pauseMs: 1500,
  fallbackMs: 5000
};
