import { getFavorites, saveFavorites } from "./favoritos.js";

export function guardarFavorito(data) {
    console.log("loq ue llega a guardar",data)
  if (!data || !data?.date) {
    console.error("Favorito inválido:", data);
    return;
  }

  let favs = getFavorites();

  const exists = favs.some(f => f?.date === data?.date);

  if (!exists) {
    favs.push(data);
    saveFavorites(favs);

    Swal.fire({
      icon: "success",
      title: "Agregado a favoritos",
      text: data.title || "Sin título",
      timer: 1500,
      showConfirmButton: false
    });

  } else {
    favs = favs.filter(f => f?.date !== data?.date);
    saveFavorites(favs);

    Swal.fire({
      icon: "info",
      title: "Eliminado de favoritos",
      text: data.title || "Sin título",
      timer: 1500,
      showConfirmButton: false
    });
  }
}
