import { guardarFavorito } from "./scripts/guardarFavoritos.js";
import { mostrarFavorites } from "./scripts/mostrarfavorito.js";


const API_KEY = "8zAXV7Tg9kZe2zftzemX6hRBwRhd5MhXn7b7av1G";

let data
async function buscarAPOD() {
    let fecha = document.getElementById("fechaInput").value;

    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    if (fecha) {
        url += `&date=${fecha}`;
    }

    const res = await fetch(url);
    data = await res.json();

    mostrarResultado(data);
}

// ======== MOSTRAR LA TARJETA CON LOS DATOS ========
function mostrarResultado(data) {
    let cont = document.getElementById("resultado");

    if (data.media_type !== "image") {
        cont.innerHTML = `
            <h3>${data.title}</h3>
            <p><strong>Fecha:</strong> ${data.date}</p>
            <p>El APOD de esta fecha es un video, no una imagen.</p>
            <a href="${data.url}" target="_blank" class="btn btn-primary">Ver video</a>
        `;
        return;
    }

    cont.innerHTML = `
        <h3>${data.title}</h3>
        <p><strong>Fecha:</strong> ${data.date}</p>
        <img src="${data.url}" class="img-fluid rounded shadow-sm mb-3" />
        <p class="text-start" style="font-size: 0.9rem;">${data.explanation}</p>
    `;
}

// ======== AUTO-CARGAR APOD DE HOY ========
buscarAPOD();

document.addEventListener("DOMContentLoaded", () => {
    const btnFav = document.getElementById("btn-favorito");
console.log("ingrese al click", btnFav )
    if (btnFav) {
        btnFav.addEventListener("click", () => {
            if (!data) return;
            guardarFavorito(data);
        });
    }
    const btnMostrar = document.getElementById("btn-mostrar-favoritos");

  btnMostrar.addEventListener("click", () => {
    mostrarFavorites(); 
  });
});
