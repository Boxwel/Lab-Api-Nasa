import { getFavorites, saveFavorites } from "./favoritos.js";

export function mostrarFavorites() {

  const cont = document.getElementById("favoritos");
  const favs = getFavorites();
    console.log("..", favs)

  if (favs.length === 0) {
    cont.innerHTML = "<p>No hay favoritos guardados.</p>";
    return;
  }

 
  cont.innerHTML = "";

 
  favs.forEach(apod => {
    const card = document.createElement("div");
    card.className = "card-favorito";

    card.innerHTML = `
      <h3>${apod.title}</h3>
      <p>${apod.date}</p>
      <p>${apod.explanation.slice(0, 150)}...</p>
    `;


    if (apod.media_type === "image") {
      const img = document.createElement("img");
      img.src = apod.url;
      img.alt = apod.title;
      img.className = "img-fav";
      card.appendChild(img);
    } else {
      const iframe = document.createElement("iframe");
      iframe.src = apod.url;
      iframe.frameBorder = "0";
      iframe.allowFullscreen = true;
      iframe.className = "iframe-fav";
      card.appendChild(iframe);
    }

 const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-danger btn-sm mt-2";
    btnEliminar.textContent = "Eliminar de favoritos";

    btnEliminar.addEventListener("click", () => {
      removeFavorite(apod.date);
      card.remove(); 
    });

    card.appendChild(btnEliminar);
    cont.appendChild(card);
  });
}


export function removeFavorite(date) {
  let favs = getFavorites();
  favs = favs.filter(f => f.date !== date);
   Swal.fire({
      icon: "info",
      title: "Eliminado de favoritos",
      text: `${favs.title}`,
      timer: 1500,
      showConfirmButton: false
    });
  saveFavorites(favs);
}