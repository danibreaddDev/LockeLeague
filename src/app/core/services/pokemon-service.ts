import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;
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
  async getInfoPokemon(id: string, pokemonId: string) {
    console.log('id que recibe mi servicio', id);
    console.log('id del pokemon  que recibe mi servicio', pokemonId);
    const { data, error } = await this._clientSupabase
      .from('locke_pokemon_data')
      .select('*')
      .eq('locke_user_id', id)
      .eq('pokemon_id', pokemonId);
    return { data, error };
  }
}
