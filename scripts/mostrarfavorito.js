import { getFavorites } from "./favoritos.js";

export function mostrarFavorites() {
  const cont = document.getElementById("favoritos");
  const favs = getFavorites();

  if (!favs?.length) {
    Swal.fire({
      icon: "info",
      title: "Sin favoritos",
      text: "No tienes elementos guardados."
    });
    return;
  }

  cont.innerHTML = "";

  favs?.forEach(apod => {
    const card = document.createElement("div");
    card.className = "card-favorito";

    const title = apod?.title || "Sin título";
    const date = apod?.date || "Sin fecha";
    const explanation = apod?.explanation || "";
    const media_type = apod?.media_type || "image";
    const url = apod?.url || apod?.hdurl || "";

    const info = document.createElement("div");
    info.innerHTML = `
      <h3>${title}</h3>
      <p>${date}</p>
      <p>${explanation.slice(0, 120)}...</p>
    `;
    card.appendChild(info);

    if (media_type === "image") {
      const img = document.createElement("img");
      img.src = url;
      img.alt = title;
      img.className = "img-fav";
      card.appendChild(img);
    } else {
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.className = "iframe-fav";
      iframe.allowFullscreen = true;
      iframe.frameBorder = "0";
      card.appendChild(iframe);
    }

    cont.appendChild(card);
  });
}
