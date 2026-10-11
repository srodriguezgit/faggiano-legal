// MENÚ MÓVIL

const botonMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
const vistaMovil = window.matchMedia("(max-width: 760px)");

function cambiarMenu(abierto) {
  botonMenu.setAttribute("aria-expanded", String(abierto));
  botonMenu.textContent = abierto ? "Cerrar −" : "Menú +";
  menu.hidden = !abierto;
}

function adaptarMenu() {
  botonMenu.hidden = !vistaMovil.matches;
  cambiarMenu(!vistaMovil.matches);
}

botonMenu.addEventListener("click", () => {
  const abierto = botonMenu.getAttribute("aria-expanded") === "true";
  cambiarMenu(!abierto);
});

menu.addEventListener("click", (evento) => {
  const enlace = evento.target.closest("a");

  if (!enlace || !vistaMovil.matches) return;

  cambiarMenu(false);

  // Mueve también el foco al destino, útil al navegar con teclado.
  const destino = document.querySelector(enlace.getAttribute("href"));

  if (destino) {
    destino.setAttribute("tabindex", "-1");
    destino.focus({ preventScroll: true });

    destino.addEventListener(
      "blur",
      () => destino.removeAttribute("tabindex"),
      { once: true }
    );
  }
});

document.addEventListener("keydown", (evento) => {
  const abierto = botonMenu.getAttribute("aria-expanded") === "true";

  if (evento.key === "Escape" && vistaMovil.matches && abierto) {
    cambiarMenu(false);
    botonMenu.focus();
  }
});

vistaMovil.addEventListener("change", adaptarMenu);
adaptarMenu();


// ESPECIALIDADES

const especialidades = {
  contratos: {
    etiqueta: "ACUERDOS CON PERSPECTIVA",
    titulo: "Reglas claras para relaciones sólidas.",
    descripcion:
      "Acompañamiento en la preparación y revisión de acuerdos, " +
      "con foco en el funcionamiento de tu negocio.",
    alcance: [
      "Contratos de servicios y proveedores",
      "Acuerdos de confidencialidad",
      "Revisión de condiciones comerciales"
    ]
  },

  sociedades: {
    etiqueta: "UNA BASE PARA CRECER",
    titulo: "Una estructura alineada con tu proyecto.",
    descripcion:
      "Orientación para organizar un emprendimiento y definir " +
      "las relaciones entre quienes lo integran.",
    alcance: [
      "Organización inicial del proyecto",
      "Acuerdos entre socios",
      "Consultas sobre funcionamiento societario"
    ]
  },

  marcas: {
    etiqueta: "IDENTIDAD Y NEGOCIO",
    titulo: "Tu identidad también merece atención.",
    descripcion:
      "Un espacio para abordar preguntas sobre el nombre, " +
      "los signos y la identidad comercial de tu actividad.",
    alcance: [
      "Consultas iniciales sobre marcas",
      "Revisión del uso de identidad comercial",
      "Acuerdos vinculados al uso de marca"
    ]
  },

  laboral: {
    etiqueta: "PERSONAS Y ORGANIZACIONES",
    titulo: "Relaciones de trabajo con un marco claro.",
    descripcion:
      "Acompañamiento a empresas en consultas relacionadas " +
      "con sus equipos y la organización del trabajo.",
    alcance: [
      "Consultas laborales empresariales",
      "Revisión de documentación",
      "Organización de políticas internas"
    ]
  }
};

const botonesArea = document.querySelectorAll(".area");
const detalleArea = document.querySelector("#detalle-area");
const areaEtiqueta = document.querySelector("#area-etiqueta");
const areaTitulo = document.querySelector("#area-titulo");
const areaDescripcion = document.querySelector("#area-descripcion");
const areaLista = document.querySelector("#area-lista");

botonesArea.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (boton.getAttribute("aria-pressed") === "true") return;

    const especialidad = especialidades[boton.dataset.area];

    botonesArea.forEach((otroBoton) => {
      otroBoton.setAttribute(
        "aria-pressed",
        String(otroBoton === boton)
      );
    });

    areaEtiqueta.textContent = especialidad.etiqueta;
    areaTitulo.textContent = especialidad.titulo;
    areaDescripcion.textContent = especialidad.descripcion;

    const items = especialidad.alcance.map((texto) => {
      const item = document.createElement("li");
      item.textContent = texto;
      return item;
    });

    areaLista.replaceChildren(...items);

    // Reinicia la entrada suave cuando cambia el contenido.
    detalleArea.classList.remove("actualizando");
    void detalleArea.offsetWidth;
    detalleArea.classList.add("actualizando");
  });
});


// ORIENTADOR DE CONSULTAS

const orientaciones = {
  emprender: {
    titulo: "Sociedades y emprendimientos",
    texto:
      "El área societaria sería un punto de partida para conversar " +
      "sobre la organización de tu proyecto y la relación entre sus integrantes.",
    mensaje:
      "Hola, quisiera coordinar una consulta inicial. Estoy por emprender " +
      "y me interesa conocer el alcance del acompañamiento."
  },

  empresa: {
    titulo: "Una primera mirada integral",
    texto:
      "Una conversación inicial permitiría identificar si tu consulta " +
      "corresponde a contratos, sociedades o relaciones laborales.",
    mensaje:
      "Hola, tengo una empresa y quisiera conversar sobre sus necesidades " +
      "legales y las modalidades de acompañamiento."
  },

  contrato: {
    titulo: "Contratos comerciales",
    texto:
      "El área de contratos sería la indicada para conocer qué tipo " +
      "de acuerdo necesitás revisar y definir el alcance del trabajo.",
    mensaje:
      "Hola, quisiera consultar por la revisión de un contrato " +
      "y conocer cómo se define el presupuesto."
  },

  marca: {
    titulo: "Marcas e identidad",
    texto:
      "El área de marcas sería un punto de partida para conversar " +
      "sobre tu identidad comercial y el motivo de tu consulta.",
    mensaje:
      "Hola, quisiera coordinar una consulta sobre la marca " +
      "de mi negocio y conocer los próximos pasos."
  },

  laboral: {
    titulo: "Relaciones laborales",
    texto:
      "El área laboral empresarial sería la indicada para conocer " +
      "el contexto de tu organización y delimitar la consulta.",
    mensaje:
      "Hola, tengo una consulta laboral vinculada a mi empresa " +
      "y quisiera conocer la modalidad de atención."
  }
};

const formulario = document.querySelector("#form-consulta");
const resultado = document.querySelector("#resultado");
const resultadoTitulo = document.querySelector("#resultado-titulo");
const resultadoTexto = document.querySelector("#resultado-texto");
const resultadoMensaje = document.querySelector("#resultado-mensaje");
const botonVolver = document.querySelector("#volver");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  const motivo = datos.get("motivo");
  const orientacion = orientaciones[motivo];

  if (!orientacion) return;

  resultadoTitulo.textContent = orientacion.titulo;
  resultadoTexto.textContent = orientacion.texto;
  resultadoMensaje.textContent = orientacion.mensaje;

  formulario.hidden = true;
  resultado.hidden = false;
  resultadoTitulo.focus();
});

botonVolver.addEventListener("click", () => {
  resultado.hidden = true;
  formulario.hidden = false;

  const seleccionado = formulario.querySelector("input:checked");
  seleccionado?.focus();
});

// CONECTAR LA ESPECIALIDAD CON EL ORIENTADOR

const motivoPorArea = {
  contratos: "contrato",
  sociedades: "emprender",
  marcas: "marca",
  laboral: "laboral"
};

const enlaceDesdeArea = document.querySelector(
  '#detalle-area a[href="#consulta"]'
);

enlaceDesdeArea.addEventListener("click", () => {
  const areaActiva = document.querySelector(
    '.area[aria-pressed="true"]'
  );

  const motivo = motivoPorArea[areaActiva.dataset.area];
  const opcion = formulario.querySelector(
    `input[name="motivo"][value="${motivo}"]`
  );

  // Vuelve al formulario si se había mostrado un resultado.
  resultado.hidden = true;
  formulario.hidden = false;

  opcion.checked = true;

  // Lleva el foco a la opción sin interferir con el desplazamiento.
  opcion.focus({ preventScroll: true });
});

// OCULTAR EL ENCABEZADO AL BAJAR Y MOSTRARLO AL SUBIR

const encabezado = document.querySelector(".encabezado");

let scrollAnterior = Math.max(0, window.scrollY);
let desplazamientoAcumulado = 0;

function mostrarEncabezado() {
  encabezado.classList.remove("encabezado-oculto");
  desplazamientoAcumulado = 0;
}

window.addEventListener("scroll", () => {
  const scrollActual = Math.max(0, window.scrollY);
  const diferencia = scrollActual - scrollAnterior;

  scrollAnterior = scrollActual;

  const menuMovilAbierto =
    vistaMovil.matches &&
    botonMenu.getAttribute("aria-expanded") === "true";

  const focoEnEncabezado =
    encabezado.contains(document.activeElement);

  // Siempre visible cerca del inicio, con el menú abierto
  // o mientras alguien utiliza sus controles con el teclado.
  if (
    scrollActual <= encabezado.offsetHeight ||
    menuMovilAbierto ||
    focoEnEncabezado
  ) {
    mostrarEncabezado();
    return;
  }

  if (diferencia === 0) return;

  // Al cambiar de dirección, empieza a contar nuevamente.
  if (
    Math.sign(diferencia) !==
    Math.sign(desplazamientoAcumulado)
  ) {
    desplazamientoAcumulado = 0;
  }

  desplazamientoAcumulado += diferencia;

  if (desplazamientoAcumulado > 24) {
    encabezado.classList.add("encabezado-oculto");
    desplazamientoAcumulado = 0;
  } else if (desplazamientoAcumulado < -12) {
    mostrarEncabezado();
  }
}, { passive: true });

encabezado.addEventListener("focusin", mostrarEncabezado);

botonMenu.addEventListener("click", mostrarEncabezado);

window.addEventListener("resize", () => {
  scrollAnterior = Math.max(0, window.scrollY);
  mostrarEncabezado();
});

// CONTACTO POR WHATSAPP DESDE LA DEMO

const enlaceWhatsApp = document.querySelector("#enviar-whatsapp");

// Reemplazá este texto por tu número con código de país,
// sin espacios, signos ni guiones.
const numeroWhatsApp = "5491176004462";

formulario.addEventListener("submit", () => {
  const motivo = new FormData(formulario).get("motivo");
  const orientacion = orientaciones[motivo];

  if (!orientacion) return;

  const mensaje = [
    "Hola Santiago, estoy probando tu demo de Faggiano Legal.",
    "",
    "Este es el mensaje de ejemplo que generó el orientador:",
    orientacion.mensaje,
    "",
    "Me interesa conversar sobre una web con esta funcionalidad."
  ].join("\n");

  enlaceWhatsApp.href =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
});