import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpclient: HttpClient) {}
  getPokemon(): Observable<any> {
    return this.httpclient.get('assets/pokedex.json');
  }
  getItems(): Observable<any> {
    return this.httpclient.get('assets/items.json');
  }
  getMoves(): Observable<any> {
    return this.httpclient.get('assets/moves.json');
  }
  getTypes(pokemonId: string) {
    console.log(pokemonId);

    return this.httpclient.get('assets/pokedex.json').pipe(
      map((pokemons: any) => {
        console.log(pokemons);

        const pokemon = pokemons.find((p: any) => p.id === Number(pokemonId));
        console.log(pokemon);

        return pokemon ? pokemon.type : null;
      })
    );
  }
}
