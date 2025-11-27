import { guardarFavorito } from "./scripts/guardarFavoritos.js";
import { mostrarFavorites } from "./scripts/mostrarfavorito.js";

const API_KEY = "8zAXV7Tg9kZe2zftzemX6hRBwRhd5MhXn7b7av1G";
let data = null;

// ================= FUNCIONES =================
async function buscarAPOD() {
  let cont = document.getElementById("resultado");
  let fecha = document.getElementById("fechaInput").value;

  console.log("🔍 Buscando APOD...");

  try {
    const url = fecha
      ? `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fecha}`
      : `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`);
    }
    
    data = await res.json();

    // Verificar si la respuesta es válida y contiene datos
    if (!data || data.error || !data.title) {
      mostrarNoEncontrado(cont, fecha);
      return;
    }

    mostrarResultado(data);
  } catch (error) {
    console.error("Error:", error);
    mostrarError(cont, error.message);
  }
}

function mostrarResultado(data) {
  let cont = document.getElementById("resultado");
  
  // Restablecer fondo por defecto
  document.body.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";
  
  if (data.media_type === "image" && data.url) {
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${data.url}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  }

  cont.innerHTML = `
    <div class="card p-3 mt-3">
      <h3 class="text-primary">${data.title || 'Sin título'}</h3>
      <p><strong>Fecha:</strong> ${data.date || 'No disponible'}</p>
      ${data.url ? `<img src="${data.url}" class="img-fluid rounded shadow-sm mb-3" alt="${data.title}">` : ''}
      <p class="text-start">${data.explanation || 'No hay descripción disponible.'}</p>
      ${data.copyright ? `<p><small><strong>Créditos:</strong> ${data.copyright}</small></p>` : ''}
    </div>
  `;
}

function mostrarNoEncontrado(cont, fecha) {
  document.body.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";
  
  const mensaje = fecha 
    ? `No se encontró información para la fecha: ${fecha}`
    : 'No se pudo cargar la información del día de hoy.';
  
  cont.innerHTML = `
    <div class="alert alert-warning mt-3">
      <i class="bi bi-exclamation-triangle"></i>
      <strong>Información no encontrada</strong><br>
      ${mensaje}
      <br><small>Intenta con otra fecha o verifica tu conexión.</small>
    </div>
  `;
}

function mostrarError(cont, mensajeError) {
  document.body.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";
  
  cont.innerHTML = `
    <div class="alert alert-danger mt-3">
      <i class="bi bi-x-circle"></i>
      <strong>Error al cargar los datos</strong><br>
      ${mensajeError}
      <br><small>Por favor, intenta nuevamente.</small>
    </div>
  `;
}

// ================= INICIALIZACIÓN =================
document.addEventListener('DOMContentLoaded', function() {


  // Agregar event listeners
  document.getElementById("btn-buscar").addEventListener("click", buscarAPOD);
  
  document.getElementById("btn-favorito").addEventListener("click", () => {
    if (data) {
      guardarFavorito(data);
    } else {
      alert("No hay datos para guardar como favorito.");
    }
  });

  // Cargar datos iniciales
  buscarAPOD();
  mostrarFavorites();
});