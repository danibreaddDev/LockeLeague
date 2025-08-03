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
  async editPokemon(idUser: string, idPokemonToEdit: string, pokemon: any) {
    //edit pokemon
    console.log('user id', idUser);
    console.log('id de pokemon a editar', idPokemonToEdit);
    console.log('id para actulaizar', pokemon.pokemonId);

    const objectPokemon = {
      locke_user_id: idUser,
      pokemon_id: pokemon.pokemonId,
      item: pokemon.item,
      moves: Object.values(pokemon.moves),
      ivs: pokemon.IVS,
      evs: pokemon.EVS,
    };
    let errorUpdateTeam = null;
    await this._clientSupabase
      .from('locke_pokemon_data')
      .update(objectPokemon)
      .eq('locke_user_id', idUser)
      .eq('pokemon_id', idPokemonToEdit);

    //si el pokemon es diferente vamos a editar tambien el pokemon en la tabla locke_users donde esta el team.

    if (idPokemonToEdit !== pokemon.pokemonId) {
      errorUpdateTeam = await this._clientSupabase.rpc(
        'update_pokemon_in_team',
        {
          p_lockeuser_id: idUser,
          p_old_pokemon_id: idPokemonToEdit,
          p_new_pokemon_id: pokemon.pokemonId,
        }
      );
      if (errorUpdateTeam) {
        console.error('Error al hacer RPC:', errorUpdateTeam);
      } else {
        console.log('Pokémon añadido al team con éxito');
      }
    }
    return { errorUpdateTeam };
  }
}
