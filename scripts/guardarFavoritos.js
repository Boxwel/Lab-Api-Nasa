import { getFavorites, saveFavorites } from "./favoritos.js";

export function guardarFavorito(data) {
  let favs = getFavorites();

console.log("ingrese", data)

  const exists = favs.some(f => f.date === data.date);

  if (!exists) {
    // Agregar
    favs.push(data);
    saveFavorites(favs);

    Swal.fire({
      icon: "success",
      title: "Agregado a favoritos",
      text: `${data.title}`,
      timer: 1500,
      showConfirmButton: false
    });

  } else {
    // Eliminar
    favs = favs.filter(f => f.date !== data.date);
    saveFavorites(favs);

    Swal.fire({
      icon: "info",
      title: "Eliminado de favoritos",
      text: `${data.title}`,
      timer: 1500,
      showConfirmButton: false
    });
  }
}