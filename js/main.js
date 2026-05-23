document.addEventListener("DOMContentLoaded", function () {

  // FORMULARIO ADMIN
  const formAdmin = document.getElementById("formAdmin");

  if (formAdmin) {
    formAdmin.addEventListener("submit", function (event) {
      event.preventDefault();

      const usuario = document.getElementById("usuarioAdmin");
      const password = document.getElementById("passwordAdmin");

      if (usuario.value.trim() === "") {
        usuario.classList.add("is-invalid");
      } else {
        usuario.classList.remove("is-invalid");
      }

      if (password.value.trim() === "") {
        password.classList.add("is-invalid");
      } else {
        password.classList.remove("is-invalid");
      }

      if (usuario.value.trim() !== "" && password.value.trim() !== "") {
        alert("Todo salió bien... Coming soon...");
      }
    });
  }


  // FORMULARIO CUENTA
  const formCuenta = document.getElementById("formCuenta");

  if (formCuenta) {
    formCuenta.addEventListener("submit", function (event) {
      event.preventDefault();

      const correo = document.getElementById("correoCuenta");
      const password = document.getElementById("passwordCuenta");

      if (correo.value.trim() === "") {
        correo.classList.add("is-invalid");
      } else {
        correo.classList.remove("is-invalid");
      }

      if (password.value.trim() === "") {
        password.classList.add("is-invalid");
      } else {
        password.classList.remove("is-invalid");
      }

      if (correo.value.trim() !== "" && password.value.trim() !== "") {
        alert("Todo salió bien... Coming soon...");
      }
    });
  }

});