import { guardarFavorito } from "./scripts/guardarFavoritos.js";
import { mostrarFavorites } from "./scripts/mostrarfavorito.js";

const API_KEY = "8zAXV7Tg9kZe2zftzemX6hRBwRhd5MhXn7b7av1G";

let data = null;

// ================= BUSCAR APOD =================
async function buscarAPOD() {
    let cont = document.getElementById("resultado");
    let fecha = document.getElementById("fechaInput").value;

    try {
        if (!API_KEY) throw new Error("API_KEY_NOT_DEFINED");

        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fecha}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("API_REQUEST_FAILED");

        data = await res.json();

        // ERROR 1 → API devolvió error
        if (!data || data.error) {
            mostrarErrorAPI(cont);
            return;
        }

        // ERROR 2 → No hay APOD para esa fecha
        if (!data.url || !data.title || !data.date) {
            mostrarErrorFecha(cont);
            return;
        }

        // SI TODO OK → mostrar APOD
        mostrarResultado(data);

    } catch (error) {

        if (error.message === "API_KEY_NOT_DEFINED") {
            cont.innerHTML = `
            <div class="alert alert-danger mt-3">
                ❌ API_KEY no está definida.
            </div>`;
            return;
        }

        if (error.message === "API_REQUEST_FAILED") {
            cont.innerHTML = `
            <div class="alert alert-danger mt-3">
                ❌ No se pudo conectar con la API de la NASA.
            </div>`;
            return;
        }

        cont.innerHTML = `
        <div class="alert alert-danger mt-3">
            ❌ Error inesperado: ${error.message}
        </div>`;
    }
}


// ========== ERRORES SEPARADOS EN FUNCIONES ==========

function mostrarErrorAPI(cont) {
    document.body.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";

    cont.innerHTML = `
        <div class="alert alert-danger mt-3">
            ❌ Hubo un problema al consumir la API.
        </div>`;
}

function mostrarErrorFecha(cont) {
    document.body.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";

    cont.innerHTML = `
        <div class="alert alert-warning mt-3">
            ⚠️ No existe APOD para esa fecha. Revisa la fecha ingresada.
        </div>`;
}


// ========== MOSTRAR RESULTADO ==========

function mostrarResultado(data) {
    
    let cont = document.getElementById("resultado");

    if (data.media_type === "image") {
        document.body.style.backgroundImage =
            `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${data.url}')`;

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    }

    cont.innerHTML = `
        <h3>${data.title}</h3>
        <p><strong>Fecha:</strong> ${data.date}</p>
        <img src="${data.url}" class="img-fluid rounded shadow-sm mb-3" />
        <p class="text-start" style="font-size: 0.9rem;">${data.explanation}</p>
    `;
}


// ========== EVENTOS (ahora sí funcionan en módulos) ==========

document.getElementById("btn-buscar").addEventListener("click", buscarAPOD);

document.getElementById("btn-favorito").addEventListener("click", () => {
    if (data) guardarFavorito(data);
});

document.getElementById("btn-mostrar-favoritos").addEventListener("click", () => {
    mostrarFavorites();
});

// CARGAR APOD AL INICIAR
buscarAPOD();
