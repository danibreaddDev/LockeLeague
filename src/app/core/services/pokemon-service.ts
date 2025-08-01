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
  getPokemons(): Observable<any> {
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
  async getPokemon(id: string, pokemonId: string) {
    //get info about pokemon
    console.log('id que recibe mi servicio', id);
    console.log('id del pokemon  que recibe mi servicio', pokemonId);
    const { data, error } = await this._clientSupabase
      .from('locke_pokemon_data')
      .select('*')
      .eq('locke_user_id', id)
      .eq('pokemon_id', pokemonId);
    return { data, error };
  }
  async addPokemon(lockeuserId: string, pokemon: any) {
    const objectToAddPokemon = {
      locke_user_id: lockeuserId,
      pokemon_id: pokemon.pokemonId,
      item: pokemon.item,
      moves: Object.values(pokemon.moves),
      ivs: pokemon.IVS,
      evs: pokemon.EVS,
    };

    //add pokemon in team

    await this._clientSupabase
      .from('locke_pokemon_data')
      .insert(objectToAddPokemon);

    const { error } = await this._clientSupabase.rpc('append_to_team', {
      p_lockeuser_id: lockeuserId,
      p_pokemon_id: pokemon.pokemonId,
    });
    if (error) {
      console.error('Error al hacer RPC:', error);
    } else {
      console.log('Pokémon añadido al team con éxito');
    }
    return { error };
  }
  async editPokemon() {
    //edit pokemon
  }
}
