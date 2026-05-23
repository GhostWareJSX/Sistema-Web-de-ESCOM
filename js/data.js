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

  const selectEstados = document.getElementById("entidad");

  estados.map(estado => {
    const option = document.createElement("option");
    option.value = estado;
    option.textContent = estado;
    return option;
  }).forEach(option => selectEstados.appendChild(option));