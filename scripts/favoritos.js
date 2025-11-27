export function getFavorites() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

export function saveFavorites(favs) {
  localStorage.setItem("favoritos", JSON.stringify(favs));
}