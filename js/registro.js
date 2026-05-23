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

// ── Cargar estados ──────────────────────────────────────────
const selectEstados = document.getElementById("entidad");

estados.map(estado => {
  const option = document.createElement("option");
  option.value = estado;
  option.textContent = estado;
  return option;
}).forEach(option => selectEstados.appendChild(option));


// ── Expresiones regulares ───────────────────────────────────
const reglas = {
  boleta:   /^(\d{10}|P[EP]\d{8})$/,
  nombre:   /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
  curp:     /^[A-Z]{4}\d{6}[A-Z]{6}[A-Z0-9]{2}$/,
  telefono: /^\d{10}$/,
};


// ── Función genérica de validación por campo ────────────────
function validarCampo(campo, regex) {
  const valor = campo.value.trim();
  const esValido = regex.test(valor);

  if (esValido) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
  } else {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
  }

  return esValido;
}

function validarSelect(select) {
  const esValido = select.value !== "";

  if (esValido) {
    select.classList.remove("is-invalid");
    select.classList.add("is-valid");
  } else {
    select.classList.remove("is-valid");
    select.classList.add("is-invalid");
  }

  return esValido;
}


// ── Referencias a los campos ────────────────────────────────
const campoBoleta   = document.getElementById("boleta");
const campoNombre   = document.getElementById("nombre");
const campoFecha    = document.getElementById("fechaNac");
const campoGenero   = document.getElementById("genero");
const campoCurp     = document.getElementById("curp");
const campoEntidad  = document.getElementById("entidad");
const campoTelefono = document.getElementById("telefono");


// ── CURP siempre en mayúsculas mientras escribe ─────────────
campoCurp.addEventListener("input", () => {
  campoCurp.value = campoCurp.value.toUpperCase();
});


// ── Validación en tiempo real (al salir de cada campo) ──────
campoBoleta.addEventListener("blur", () =>
  validarCampo(campoBoleta, reglas.boleta));

campoNombre.addEventListener("blur", () =>
  validarCampo(campoNombre, reglas.nombre));

campoFecha.addEventListener("blur", () => {
  const esValido = campoFecha.value !== "";
  campoFecha.classList.toggle("is-valid",   esValido);
  campoFecha.classList.toggle("is-invalid", !esValido);
});

campoGenero.addEventListener("change", () =>
  validarSelect(campoGenero));

campoCurp.addEventListener("blur", () =>
  validarCampo(campoCurp, reglas.curp));

campoEntidad.addEventListener("change", () =>
  validarSelect(campoEntidad));

campoTelefono.addEventListener("blur", () =>
  validarCampo(campoTelefono, reglas.telefono));


// ── Validación completa al dar clic en Registrar ────────────
document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault();

  const todo_valido = [
    validarCampo(campoBoleta,   reglas.boleta),
    validarCampo(campoNombre,   reglas.nombre),
    (() => {
      const v = campoFecha.value !== "";
      campoFecha.classList.toggle("is-valid",   v);
      campoFecha.classList.toggle("is-invalid", !v);
      return v;
    })(),
    validarSelect(campoGenero),
    validarCampo(campoCurp,     reglas.curp),
    validarSelect(campoEntidad),
    validarCampo(campoTelefono, reglas.telefono),
  ].every(Boolean);

  if (todo_valido) {
    // aquí después tu compañero conecta con las secciones 2 y 3
    console.log("Sección 1 válida ✓");
  }
});