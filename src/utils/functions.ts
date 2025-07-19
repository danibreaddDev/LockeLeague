export function getFormatted(pokemoniD: string | number) {
  // Rellenamos con ceros a la izquierda hasta que tenga longitud 3
  const str = pokemoniD.toString();
  const padded = str.padStart(3, '0');

  return padded;
}
