async function obtenerCotizacionDolar() {
  // Reemplaza 'YOUR_API_KEY' con la clave de la API que adquiriste
  const apiKey = 'IqhfiMwFkPq6IgbjifcIX4m1V7IJMfny';

  // Construye la URL de la nueva API para la conversión de moneda (USD a ARS, con una cantidad de 1 dólar)
  const newApiUrl = 'https://api.apilayer.com/currency_data/convert?to=ARS&from=USD&amount=1';

  // Configura las opciones de la solicitud, incluyendo el header de autorización
  const requestOptions = {
      method: 'GET',
      headers: {
          apikey: apiKey,
      },
  };

  // Realiza una solicitud GET utilizando Fetch y devuelve una promesa
  try {
      const response = await fetch(newApiUrl, requestOptions);
      if (!response.ok) {
          throw new Error('No se pudo obtener la conversión de moneda: ' + response.status);
      }
      const data = await response.json();
      // Procesa la respuesta de la nueva API y muestra la información en la consola (puedes personalizar esta parte según tus necesidades)
      console.log(data);
  } catch (error) {
      console.error('Error al obtener la conversión de moneda:', error);
  }
}

  // Seleccionar el botón por su nuevo ID
  const obtenerCotizacionButton = document.getElementById("cotizarDolarButton");

  // Agregar un controlador de eventos para el clic en el botón
  obtenerCotizacionButton.addEventListener("click", function () {
      obtenerCotizacionDolar();
  });



// Array de servicios
const servicios = [
  { nombre: "Desarrollos", descripcion: "Servicio de desarrollo de software" },
  { nombre: "Proyectos", descripcion: "Servicio de gestión de proyectos" },
  { nombre: "Procesos", descripcion: "Servicio de mejora de procesos" },
];

// Tarifas por hora para cada tipo de servicio
const tarifas = {
  Desarrollos: 50,
  Proyectos: 40,
  Procesos: 30,
};

function cotizarServicioDesdeFormulario(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  const tipoServicioSelect = document.getElementById("tipoServicio");
  const horasRequeridasInput = document.getElementById("horasRequeridas");
  const tipoServicio = tipoServicioSelect.value;
  const horasRequeridas = parseInt(horasRequeridasInput.value);
  const mensajeError = document.getElementById("mensajeError");

  if (tarifas[tipoServicio]) {
    const cotizacion = tarifas[tipoServicio] * horasRequeridas;
    cotizacionTotal += cotizacion;
    const resultadoElement = document.getElementById("resultado");
    const nuevoResultado = document.createElement("p");
    nuevoResultado.textContent = `La cotización para ${horasRequeridas} horas de Consultoría de ${tipoServicio} es de: $${cotizacion} dólares`;
    resultadoElement.appendChild(nuevoResultado);

    // Guardar la cotización en localStorage
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    cotizacionesGuardadas.push({ tipoServicio, horasRequeridas, cotizacion });
    localStorage.setItem("cotizaciones", JSON.stringify(cotizacionesGuardadas));
  } else {
    mensajeError.textContent = "Tipo de servicio no válido.";
  }

  // Limpiar los campos del formulario
  tipoServicioSelect.value = "";
  horasRequeridasInput.value = "";
}

// Función para mostrar las cotizaciones guardadas en localStorage
function mostrarCotizacionesGuardadas() {
  const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = ""; // Limpiar resultados actuales

  cotizacionesGuardadas.forEach((cotizacion) => {
    cotizacionTotal += cotizacion.cotizacion;
    const nuevoResultado = document.createElement("p");
    nuevoResultado.textContent = `La cotización para ${cotizacion.horasRequeridas} horas de Consultoría de ${cotizacion.tipoServicio} es de: $${cotizacion.cotizacion} dólares`;
    resultadoElement.appendChild(nuevoResultado);
  });
}

// Función para limpiar los resultados
function limpiarResultados() {
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = "";
}

let cotizacionTotal = 0;

document.addEventListener("DOMContentLoaded", () => {
  const cotizarForm = document.getElementById("cotizarForm");
  const limpiarBtn = document.getElementById("limpiarBtn");
  const buscarBtn = document.getElementById("buscarBtn");

  cotizarForm.addEventListener("submit", cotizarServicioDesdeFormulario);
  limpiarBtn.addEventListener("click", limpiarResultados);

  if (buscarBtn) {
    buscarBtn.addEventListener("click", mostrarCotizacionesGuardadas);
  }

  // Recuperar cotizaciones guardadas en localStorage
  const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
  cotizacionesGuardadas.forEach((cotizacion) => {
    cotizacionTotal += cotizacion.cotizacion;
    const resultadoElement = document.getElementById("resultado");
    const nuevoResultado = document.createElement("p");
    nuevoResultado.textContent = `La cotización para ${cotizacion.horasRequeridas} horas de Consultoría de ${cotizacion.tipoServicio} es de: $${cotizacion.cotizacion} dólares`;
    resultadoElement.appendChild(nuevoResultado);
  });
});
