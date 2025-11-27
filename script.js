const API_KEY = "8zAXV7Tg9kZe2zftzemX6hRBwRhd5MhXn7b7av1G";

async function buscarAPOD() {
    let cont = document.getElementById("resultado");
    let fecha = document.getElementById("fechaInput").value;

    try {

 
        if (typeof API_KEY === "undefined") {
            throw new Error("API_KEY_NOT_DEFINED");
        }

        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fecha}`;
        const res = await fetch(url);

        // Error de conexión o servidor
        if (!res.ok) {
            throw new Error("API_REQUEST_FAILED");
        }

        const data = await res.json();

        // VALIDACIÓN 1 → Error real de API
        if (!data || data.error) {
            document.body.style.backgroundImage =
                "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";

            cont.innerHTML = `
                <div class="alert alert-danger mt-3">
                    ❌ Hubo un problema al consumir la API de la NASA.<br>
                    Intenta nuevamente más tarde.
                </div>
            `;
            return;
        }

        // VALIDACIÓN 2 → Fecha sin APOD (undefined)
        if (!data.url || !data.title || !data.date) {
            document.body.style.backgroundImage =
                "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";

            cont.innerHTML = `
                <div class="alert alert-warning mt-3">
                    ⚠️ No se encontró una imagen para la fecha seleccionada.<br>
                    Verifica la fecha ingresada.
                </div>
            `;
            return;
        }

        // SI TODO OK → Mostrar APOD
        mostrarResultado(data);

    } catch (error) {

        // ERROR por API KEY no definida
        if (error.message === "API_KEY_NOT_DEFINED") {
            cont.innerHTML = `
                <div class="alert alert-danger mt-3">
                    ❌ No se encontró API_KEY.<br>
                    Asegúrate de declararla al inicio del script.
                </div>
            `;
            return;
        }

        // ERROR de red o fetch fallido
        if (error.message === "API_REQUEST_FAILED") {
            cont.innerHTML = `
                <div class="alert alert-danger mt-3">
                    ❌ No se pudo conectar con la API de la NASA.<br>
                    Verifica tu conexión o intenta de nuevo.
                </div>
            `;
            return;
        }

        // Cualquier otro error inesperado
        cont.innerHTML = `
            <div class="alert alert-danger mt-3">
                ❌ Error interno inesperado.<br>
                Detalles: ${error.message}
            </div>
        `;
    }
}


// ======== MOSTRAR LA TARJETA CON LOS DATOS ========
function mostrarResultado(data) {
  let cont = document.getElementById("resultado");


  if (!data.url || !data.date || !data.title) {
    document.body.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/galaxy.jpg')";

    cont.innerHTML = `
        <div class="alert alert-warning mt-3">
            ⚠️ No se encontró una imagen para la fecha seleccionada.<br>
            Es posible que APOD no tenga registro de ese día.<br>
            Verifica la fecha ingresada.
        </div>
    `;
    return;
  }

  if (data.media_type === "image") {
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${data.url}')`;

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
