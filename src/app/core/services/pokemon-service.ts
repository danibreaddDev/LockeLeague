import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
