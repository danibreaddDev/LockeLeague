export function getFormatted(pokemon: string) {
  if (pokemon.length === 1) {
    return '00' + pokemon;
  }
  if (pokemon.length === 2) {
    return '0' + pokemon;
  } else {
    return pokemon;
  }
}
