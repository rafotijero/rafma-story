/**
 * CONTENIDO DEL CUENTO
 * --------------------------------------------------------
 * Para editar, agregar o reordenar escenas, modifica solo
 * este arreglo. El id de cada slide (slide-1 … slide-N)
 * se asigna según su posición.
 *
 * Campos:
 *   layout    "cover" | "duo" | "left" | "right"
 *   mood      ambiente de color (ver css/moods.css)
 *   kicker    nota escrita a mano sobre el texto
 *   title     título grande (admite <em>)
 *   narration párrafos del cuento (admiten <em>)
 *   photos    [{ label, src, caption?, tilt?, shape? }]
 *             label -> texto del marcador mientras no haya foto
 *             src   -> ruta de la imagen real; si existe, reemplaza
 *                      automáticamente al marcador
 *             tilt  -> inclinación en grados
 *             shape -> "square" para el QR
 *   speakKicker false -> la narración en audio no lee el kicker
 *                        (útil si el texto ya lo repite)
 *
 * La narración en audio se genera a partir de estos textos
 * con tools/narration/generate.py (ver tools/narration/README.md).
 */
export const slides = [
  {
    layout: "cover",
    mood: "cream",
    kicker: "Había una vez…",
    title: "Una <em>RAFMA</em> historia",
    photos: [
      { label: "(Aquí va imagen 1)", src: "img/slide-1.webp", tilt: -2 }
    ]
  },
  {
    layout: "duo",
    mood: "blush",
    kicker: "Starring",
    title: "Bubu <em>como</em> Maqui<br>Dudu <em>como</em> Rafo",
    photos: [
      { label: "(Aquí va imagen 2a)", caption: "Bubu", src: "img/slide-2a.webp", tilt: -4 },
      { label: "(Aquí va imagen 2b)", caption: "Dudu", src: "img/slide-2b.webp", tilt: 3 }
    ]
  },
  {
    layout: "left",
    mood: "rain",
    kicker: "Un concierto, 2014",
    narration: [
      "Todo empezó bajo la lluvia. Mar de Copas sonaba, el cielo se caía a pedazos y casi todos corrieron a buscar techo.",
      "Pero dos ositos se quedaron en el campo, empapados, <em>todavía sin saber que algún día estarían juntos.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 3)", src: "img/slide-3.webp", tilt: -3 }
    ]
  },
  {
    layout: "right",
    mood: "festival",
    kicker: "Fiestas del Cusco, 2015",
    narration: [
      "Hizo falta un año más, y una amiga en común —Violeta—, para que por fin se conocieran.",
      "Después vino un cumpleaños, una colación… <em>y unas miradas que ya lo decían todo.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 4)", src: "img/slide-4.webp", tilt: 3 }
    ]
  },
  {
    layout: "left",
    mood: "cream",
    kicker: "Febrero, 2016",
    narration: [
      "Ella dio el primer paso: una solicitud de amistad en Facebook.",
      "Pero fue él quien juntó valor <em>y le escribió primero.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 5)", src: "img/slide-5.webp", tilt: -2 }
    ]
  },
  {
    layout: "right",
    mood: "sunset",
    kicker: "La primera cita",
    narration: [
      "Fueron a la piscina. Él golpeó sin querer a un desconocido, y ella no podía parar de reírse.",
      "La tarde terminó en una pizzería, con ella pidiendo lasagna: <em>su favorita.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 6)", src: "img/slide-6.webp", tilt: 2 }
    ]
  },
  {
    layout: "left",
    mood: "blush",
    kicker: "9 de marzo, 2016",
    narration: [
      "Y entonces él se declaró, con el regalo más informático que se le pudo ocurrir:",
      "<em>un USB con forma de osito.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 7)", src: "img/slide-7.webp", tilt: -4 }
    ]
  },
  {
    layout: "right",
    mood: "gold",
    kicker: "Mochila al hombro",
    narration: [
      "Desde ahí, el mapa se les hizo pequeño: Valle Sagrado, Arequipa, Puno… <em>¡e incluso otros países!</em>",
      "Bueno, casi todo el mapa. De Tarapoto, ella juró: «a la selva, nunca más»."
    ],
    photos: [
      { label: "(Aquí va imagen 8)", src: "img/slide-8.webp", tilt: 3 }
    ]
  },
  {
    layout: "left",
    mood: "dusk",
    kicker: "Los años difíciles",
    narration: [
      "A fines de 2019 él se fue a Lima. El cuarto aniversario lo celebraron a la distancia y, como si fuera poco, llegó la pandemia. Fueron meses de extrañarse y de contar los días.",
      "<em>Pero nada de eso logró separarlos.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 9)", src: "img/slide-9.webp", tilt: -2 }
    ]
  },
  {
    layout: "right",
    mood: "festival",
    kicker: "Cusco, enero de 2021",
    narration: [
      "Fueron a un show de magia, pero el mago canceló a última hora. En su lugar llegó un payaso mago…",
      "y en su último truco, <em>sacó un anillo.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 10)", src: "img/slide-10.webp", tilt: 3 }
    ]
  },
  {
    layout: "left",
    mood: "sage",
    kicker: "Depa 903",
    narration: [
      "Ese mismo mes empacaron todo y se mudaron juntos a Lima. En 2022 llegó un depa propio: el 903.",
      "Tardaron dos años en darse cuenta de que el número era su fecha: <em>09/03.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 11)", src: "img/slide-11.webp", tilt: -3 }
    ]
  },
  {
    layout: "right",
    mood: "blush",
    kicker: "Dos veces sí",
    narration: [
      "Y se casaron, no una sino dos veces: por civil el 8 de octubre de 2022, y por la iglesia el 6 de mayo de 2023, en Cusco.",
      "Ahí él le cantó «No Necesito Nada»… <em>y era verdad.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 12)", src: "img/slide-12.webp", tilt: 2 }
    ]
  },
  {
    layout: "left",
    mood: "cream",
    kicker: "Hoy",
    speakKicker: false,
    narration: [
      "Hoy son dos ositos felices que no se pierden un concierto y que ya juntan <em>41 juegos de mesa</em>… y contando.",
      "Anfitriones un poco tímidos… <em>pero de corazón.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 13)", src: "img/slide-13.webp", tilt: -2 }
    ]
  },
  {
    layout: "right",
    mood: "gold",
    kicker: "Lo que viene",
    narration: [
      "Nadie sabe qué páginas vienen, pero ellos tienen una lista larga de sueños por cumplir… y las ganas de luchar por cada uno, siempre juntos.",
      "Y en el camino, la suerte de cruzarse con las personas correctas… <em>como ustedes.</em>"
    ],
    photos: [
      { label: "(Aquí va imagen 14)", src: "img/slide-14.webp", tilt: 3 }
    ]
  },
  {
    layout: "cover",
    mood: "sunset",
    kicker: "Ahora les toca a ustedes",
    title: "¿Estuvieron <em>atentos?</em>",
    photos: [
      { label: "(Aquí va el QR de Kahoot)", src: "img/kahoot-qr.webp", tilt: -1, shape: "square" }
    ]
  }
];
