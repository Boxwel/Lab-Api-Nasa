import { guardarFavorito } from "./scripts/guardarFavoritos.js";
import { mostrarFavorites } from "./scripts/mostrarfavorito.js";

const API_KEY = "8zAXV7Tg9kZe2zftzemX6hRBwRhd5MhXn7b7av1G";
let data = null;

async function buscarAPOD() {
  let cont = document.getElementById("resultado");
  let fecha = document.getElementById("fechaInput").value;

  console.log("🔍 Buscando APOD...");

  try {
    const url = fecha
      ? `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fecha}`
      : `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

    const res = await fetch(url);

    // Verificar si la respuesta indica "no encontrado"
    if (res.status === 404 || res.status === 400) {
      mostrarMensaje("no-encontrado", fecha);
      return;
    }

    if (!res.ok) {
      throw new Error(`Error en la API: ${res.status} - ${res.statusText}`);
    }

    data = await res.json();

    // Verificar si los datos son válidos
    if (!data || data.error || !data.title || data.msg === "not found") {
      mostrarMensaje("no-encontrado", fecha);
      return;
    }

    // Si todo está bien, mostrar resultado
    mostrarResultado(data);
  } catch (error) {
    console.error("Error:", error);

    // Determinar el tipo de error
    if (
      error.message.includes("404") ||
      error.message.includes("Not Found") ||
      error.message.includes("400")
    ) {
      mostrarMensaje("no-encontrado", fecha);
    } else if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("Network")
    ) {
      mostrarMensaje("conexion");
    } else {
      mostrarMensaje("error-api", error.message);
    }
  }
}

function mostrarMensaje(tipo, infoAdicional = "") {
  let cont = document.getElementById("resultado");

  // Restablecer fondo por defecto
  document.body.style.backgroundImage =
    "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";

  const mensajes = {
    "no-encontrado": `
      <div class="alert alert-warning mt-3 text-center">
        <i class="bi bi-binoculars-fill display-4"></i>
        <h4>¡Astronomía no encontrada! 🌌</h4>
        <p><strong>No hay datos disponibles</strong> para la fecha: <code>${infoAdicional}</code></p>
        <small class="text-muted">Intenta con una fecha entre Junio 16, 1995 y hoy.</small>
      </div>
    `,
    conexion: `
      <div class="alert alert-danger mt-3 text-center">
        <i class="bi bi-wifi-off display-4"></i>
        <h4>Problema de conexión 🛰️</h4>
        <p><strong>No se pudo conectar con la NASA</strong></p>
        <small class="text-muted">Verifica tu conexión a internet e intenta nuevamente.</small>
      </div>
    `,
    "error-api": `
      <div class="alert alert-danger mt-3 text-center">
        <i class="bi bi-bug-fill display-4"></i>
        <h4>Error en la API 🚨</h4>
        <p><strong>Problema técnico:</strong> ${infoAdicional}</p>
        <small class="text-muted">Intenta más tarde o contacta al soporte.</small>
      </div>
    `,
  };

  cont.innerHTML = mensajes[tipo] || mensajes["error-api"];
}

function mostrarResultado(data) {
  let cont = document.getElementById("resultado");

  // Restablecer fondo por defecto
  document.body.style.backgroundImage =
    "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";

  if (data.media_type === "image" && data.url) {
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${data.url}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  }

  cont.innerHTML = `
    <div class="card p-3 mt-3">
      <h3 class="text-primary">${data.title || "Sin título"}</h3>
      <p><strong>Fecha:</strong> ${data.date || "No disponible"}</p>
      ${
        data.url
          ? `<img src="${data.url}" class="img-fluid rounded shadow-sm mb-3" alt="${data.title}">`
          : ""
      }
      <p class="text-start">${
        data.explanation || "No hay descripción disponible."
      }</p>
      ${
        data.copyright
          ? `<p><small><strong>Créditos:</strong> ${data.copyright}</small></p>`
          : ""
      }
    </div>
  `;
}

// ================= INICIALIZACIÓN =================
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-buscar").addEventListener("click", buscarAPOD);

  document.getElementById("btn-favorito").addEventListener("click", () => {
    if (data) {
      guardarFavorito(data);
    } else {
      alert("No hay datos para guardar como favorito.");
    }
  });

  document
    .getElementById("btn-mostrar-favoritos")
    .addEventListener("click", mostrarFavorites());
  buscarAPOD();
});
