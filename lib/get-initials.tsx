export function getInitials(name: string) {
  const words = name.trim().split(/\s+/); // split berdasarkan spasi
  const initials = words.slice(0, 2).map((word) => word[0]); // ambil 2 kata pertama
  return initials.join("").toUpperCase();
}
