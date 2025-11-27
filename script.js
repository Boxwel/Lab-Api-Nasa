const API_KEY = "8zAXV7Tg9kZe2zftzemX6hRBwRhd5MhXn7b7av1G";


async function buscarAPOD() {
    let fecha = document.getElementById("fechaInput").value;

    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    if (fecha) {
        url += `&date=${fecha}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    mostrarResultado(data);
}

// ======== MOSTRAR LA TARJETA CON LOS DATOS ========
function mostrarResultado(data) {
    let cont = document.getElementById("resultado");

    if (!data || data.error) {
        cont.innerHTML = `
            <div class="alert alert-danger">
                ❌ Hubo un problema al consumir la API de la NASA. Intenta nuevamente más tarde.
            </div>
        `;
        return; 
    }

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

// ======== AUTO-CARGAR APOD DE HOY ========
buscarAPOD();
