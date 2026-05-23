
// ── 1. DATOS ────────────────────────────────────────────────

const estados = [
  "Aguascalientes", "Baja California", "Baja California Sur",
  "Campeche", "Chiapas", "Chihuahua", "Ciudad de México",
  "Coahuila", "Colima", "Durango", "Estado de México",
  "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán",
  "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
  "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz",
  "Yucatán", "Zacatecas"
];

const escuelas = [
  "CECyT 1 - Gonzalo Vázquez Vela",
  "CECyT 2 - Miguel Bernard",
  "CECyT 3 - Estanislao Ramírez Ruiz",
  "CECyT 4 - Lázaro Cárdenas",
  "CECyT 5 - Benjamín Franklin",
  "CECyT 6 - Miguel Othón de Mendizábal",
  "CECyT 7 - Cuauhtémoc",
  "CECyT 8 - Narciso Bassols",
  "CECyT 9 - Juan de Dios Bátiz",
  "CECyT 10 - Carlos Vallejo Márquez",
  "CECyT 11 - Wilfrido Massieu",
  "CECyT 12 - José María Morelos y Pavón",
  "CECyT 13 - Ricardo Flores Magón",
  "CECyT 14 - Luis Enrique Erro",
  "CECyT 15 - Diódoro Antúnez Echegaray",
  "CECyT 16 - Hidalgo",
  "CECyT 17 - León",
  "CECyT 18 - Tlaxcala",
  "CECyT 19 - Tamaulipas",
  "CET 1 - Walter Cross Buchanan",
  "Otro"
];


// ── 2. REFERENCIAS DOM ──────────────────────────────────────

// Sección 1 - Datos personales
const campoBoleta    = document.getElementById("boleta");
const campoNombre    = document.getElementById("nombre");
const campoFecha     = document.getElementById("fechaNac");
const campoGenero    = document.getElementById("genero");
const campoCurp      = document.getElementById("curp");
const campoEntidad   = document.getElementById("entidad");
const campoTelefono  = document.getElementById("telefono");

// Sección 2 - Datos de procedencia
const campoEscuela       = document.getElementById("escuela");
const campoNombreEscuela = document.getElementById("nombreEscuela");
const campoPromedio      = document.getElementById("promedio");

// Sección 3 - Datos de cuenta
const campoCorreo     = document.getElementById("correo");
const campoContrasena = document.getElementById("contrasena");
const errCorreo       = document.getElementById("err-correo");
const errContrasena   = document.getElementById("err-contrasena");


// ── 3. EXPRESIONES REGULARES ────────────────────────────────

const reglas = {
  boleta:     /^(\d{10}|P[EP]\d{8})$/,
  nombre:     /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
  curp:       /^[A-Z]{4}\d{6}[A-Z]{6}[A-Z0-9]{2}$/,
  telefono:   /^\d{10}$/,
  correo:     /^[a-zA-Z0-9._%+-]+@alumno\.ipn\.mx$/,
  contrasena: /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
};


// ── 4. FUNCIONES ────────────────────────────────────────────

// Valida un input con regex, aplica clases Bootstrap
function validarCampo(campo, regex) {
  const esValido = regex.test(campo.value.trim());
  campo.classList.toggle("is-valid",   esValido);
  campo.classList.toggle("is-invalid", !esValido);
  return esValido;
}

// Valida que un select tenga opción seleccionada
function validarSelect(select) {
  const esValido = select.value !== "";
  select.classList.toggle("is-valid",   esValido);
  select.classList.toggle("is-invalid", !esValido);
  return esValido;
}

// Valida que un campo de texto no esté vacío
function validarRequerido(campo) {
  const esValido = campo.value.trim() !== "";
  campo.classList.toggle("is-valid",   esValido);
  campo.classList.toggle("is-invalid", !esValido);
  return esValido;
}

// Genera las opciones de un select a partir de un arreglo
function cargarOpciones(select, arreglo) {
  arreglo.map(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    return option;
  }).forEach(option => select.appendChild(option));
}

// Valida la contraseña y muestra mensajes específicos de lo que falta
function validarContrasena() {
  const valor    = campoContrasena.value;
  const esValido = reglas.contrasena.test(valor);

  campoContrasena.classList.toggle("is-valid",   esValido);
  campoContrasena.classList.toggle("is-invalid", !esValido);

  if (!esValido) {
    const mensajes = [];
    if (valor.length < 6)            mensajes.push("mínimo 6 caracteres");
    if (!/[A-Z]/.test(valor))        mensajes.push("al menos una mayúscula");
    if (!/\d/.test(valor))           mensajes.push("al menos un dígito");
    if (!/[^a-zA-Z0-9]/.test(valor)) mensajes.push("al menos un carácter especial");
    errContrasena.textContent = "Falta: " + mensajes.join(", ") + ".";
  } else {
    errContrasena.textContent = "";
  }

  return esValido;
}

// Valida todos los campos del formulario antes de enviar
function validarFormulario() {
  const fechaValida = campoFecha.value !== "";
  campoFecha.classList.toggle("is-valid",   fechaValida);
  campoFecha.classList.toggle("is-invalid", !fechaValida);

  const correoValido = reglas.correo.test(campoCorreo.value.trim());
  campoCorreo.classList.toggle("is-valid",   correoValido);
  campoCorreo.classList.toggle("is-invalid", !correoValido);
  errCorreo.textContent = correoValido ? "" : "El correo debe tener el formato usuario@alumno.ipn.mx";

  const nombreEscuelaValido = campoNombreEscuela.disabled
    ? true
    : validarRequerido(campoNombreEscuela);

  const promedioValido = (() => {
    const v = parseFloat(campoPromedio.value);
    const ok = !isNaN(v) && v >= 6.0 && v <= 10.0;
    campoPromedio.classList.toggle("is-valid",   ok);
    campoPromedio.classList.toggle("is-invalid", !ok);
    return ok;
  })();

  return [
    validarCampo(campoBoleta,   reglas.boleta),
    validarCampo(campoNombre,   reglas.nombre),
    fechaValida,
    validarSelect(campoGenero),
    validarCampo(campoCurp,     reglas.curp),
    validarSelect(campoEntidad),
    validarCampo(campoTelefono, reglas.telefono),
    validarSelect(campoEscuela),
    nombreEscuelaValido,
    promedioValido,
    correoValido,
    validarContrasena(),
  ].every(Boolean);
}

// Limpia el formulario completo
function limpiarFormulario() {
  document.getElementById("formRegistro").reset();

  document.querySelectorAll(".is-valid, .is-invalid").forEach(campo => {
    campo.classList.remove("is-valid", "is-invalid");
  });

  campoNombreEscuela.disabled = true;
  campoNombreEscuela.required = false;
  errCorreo.textContent       = "";
  errContrasena.textContent   = "";
}


// ── 5. INICIALIZACIÓN ───────────────────────────────────────

cargarOpciones(campoEntidad, estados);
cargarOpciones(campoEscuela, escuelas);


// ── 6. EVENTOS ──────────────────────────────────────────────

// Sección 1
campoBoleta.addEventListener("blur",   () => validarCampo(campoBoleta,   reglas.boleta));
campoNombre.addEventListener("blur",   () => validarCampo(campoNombre,   reglas.nombre));
campoCurp.addEventListener("blur",     () => validarCampo(campoCurp,     reglas.curp));
campoTelefono.addEventListener("blur", () => validarCampo(campoTelefono, reglas.telefono));
campoGenero.addEventListener("change", () => validarSelect(campoGenero));
campoEntidad.addEventListener("change",() => validarSelect(campoEntidad));

campoFecha.addEventListener("blur", () => {
  const v = campoFecha.value !== "";
  campoFecha.classList.toggle("is-valid",   v);
  campoFecha.classList.toggle("is-invalid", !v);
});

// CURP siempre en mayúsculas
campoCurp.addEventListener("input", () => {
  campoCurp.value = campoCurp.value.toUpperCase();
});

// Sección 2
campoEscuela.addEventListener("change", () => {
  const esOtro = campoEscuela.value === "Otro";
  campoNombreEscuela.disabled = !esOtro;
  campoNombreEscuela.required = esOtro;

  if (!esOtro) {
    campoNombreEscuela.value = "";
    campoNombreEscuela.classList.remove("is-valid", "is-invalid");
  }

  validarSelect(campoEscuela);
});

campoNombreEscuela.addEventListener("blur", () => {
  if (!campoNombreEscuela.disabled) validarRequerido(campoNombreEscuela);
});

campoPromedio.addEventListener("blur", () => {
  const v  = parseFloat(campoPromedio.value);
  const ok = !isNaN(v) && v >= 6.0 && v <= 10.0;
  campoPromedio.classList.toggle("is-valid",   ok);
  campoPromedio.classList.toggle("is-invalid", !ok);
});

// Sección 3
campoCorreo.addEventListener("blur", () => {
  const ok = reglas.correo.test(campoCorreo.value.trim());
  campoCorreo.classList.toggle("is-valid",   ok);
  campoCorreo.classList.toggle("is-invalid", !ok);
  errCorreo.textContent = ok ? "" : "El correo debe tener el formato usuario@alumno.ipn.mx";
});

campoContrasena.addEventListener("blur", validarContrasena);

document.getElementById("btnVerPass").addEventListener("click", () => {
  const tipo = campoContrasena.type === "password" ? "text" : "password";
  campoContrasena.type = tipo;
  const icono = document.querySelector("#btnVerPass i");
  icono.classList.toggle("bi-eye-fill",       tipo === "password");
  icono.classList.toggle("bi-eye-slash-fill", tipo === "text");
});

// Botones
document.getElementById("btnLimpiar").addEventListener("click", limpiarFormulario);

document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault();
  if (validarFormulario()) {
    mostrarConfirmacion()
  }
});

// Confirmación 

function mostrarConfirmacion() {
  const confirmacion = document.getElementById("confirmacionRegistro");
  const mensaje = document.getElementById("mensajeConfirmacion");
  const datos = document.getElementById("datosConfirmacion");

  mensaje.textContent = `Hola ${campoNombre.value}, verifica que los datos que ingresaste sean correctos:`;

  const generoTexto = campoGenero.options[campoGenero.selectedIndex].text;
  const entidadTexto = campoEntidad.options[campoEntidad.selectedIndex].text;
  const escuelaTexto = campoEscuela.options[campoEscuela.selectedIndex].text;

  datos.innerHTML = `
    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>No. de boleta:</strong>
        <p>${campoBoleta.value}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Nombre completo:</strong>
        <p>${campoNombre.value}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Fecha de nacimiento:</strong>
        <p>${formatearFecha(campoFecha.value)}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Género:</strong>
        <p>${generoTexto}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>CURP:</strong>
        <p>${campoCurp.value}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Entidad de procedencia:</strong>
        <p>${entidadTexto}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Teléfono:</strong>
        <p>${campoTelefono.value}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Escuela de procedencia:</strong>
        <p>${escuelaTexto}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Nombre de la escuela:</strong>
        <p>${campoNombreEscuela.value || "No aplica"}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Promedio:</strong>
        <p>${campoPromedio.value}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Correo institucional:</strong>
        <p>${campoCorreo.value}</p>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="dato-confirmacion">
        <strong>Contraseña:</strong>
        <p>${campoContrasena.value}</p>
      </div>
    </div>
  `;

  confirmacion.classList.remove("d-none");
  confirmacion.scrollIntoView({ behavior: "smooth" });
}


//fecha
function formatearFecha(fecha) {
  const partes = fecha.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}