import { Component, computed, Inject, OnInit, signal } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { getFormatted } from '../../../utils/functions';
import { PokemonService } from '../../core/services/pokemon-service';
import { Loader } from '../../shared/components/loader/loader';
@Component({
  selector: 'app-edit-pokemon-form',
  imports: [Loader],
  templateUrl: './edit-pokemon-form.html',
  styleUrl: './edit-pokemon-form.css',
})
export class EditPokemonForm implements OnInit {
  isloading = true;
  count = signal(4);
  indices = computed(() => Array.from({ length: this.count() }, (_, i) => i));
  getformatedName = getFormatted;
  allPokemon = signal<any[]>([]);
  allItems = signal<any[]>([]);
  allMoves = signal<any[]>([]);
  constructor(
    @Inject(DIALOG_DATA) public data: { id: any },
    private pokemonService: PokemonService
  ) {}
  ngOnInit(): void {
    console.log(this.isloading);
    this.getAllInfo();
  }
  changeEditPokemon(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.data = { id: value };
  }
  private getAllInfo() {
    this.pokemonService.getPokemon().subscribe({
      next: (pokemons: any) => {
        this.allPokemon.set(pokemons);
      },
      error: (err) => console.error(err),
    });
    this.pokemonService.getItems().subscribe({
      next: (items: any) => {
        this.allItems.set(items);
      },
      error: (err) => console.error(err),
    });
    this.pokemonService.getMoves().subscribe({
      next: (moves: any) => {
        this.allMoves.set(moves);
        console.log(this.allMoves());
      },
      error: (err) => console.error(err),
    });
  }
}
