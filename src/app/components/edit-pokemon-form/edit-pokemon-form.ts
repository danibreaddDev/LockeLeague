import { Component, computed, Inject, OnInit, signal } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { getFormatted } from '../../../utils/functions';
import { PokemonService } from '../../core/services/pokemon-service';
import { Loader } from '../../shared/components/loader/loader';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-edit-pokemon-form',
  imports: [Loader, ReactiveFormsModule],
  templateUrl: './edit-pokemon-form.html',
  styleUrl: './edit-pokemon-form.css',
})
export class EditPokemonForm implements OnInit {
  form!: FormGroup;
  isloading = signal<boolean>(true);
  count = signal(4);
  indices = computed(() => Array.from({ length: this.count() }, (_, i) => i));
  getformatedName = getFormatted;
  allPokemon = signal<any[]>([]);
  allItems = signal<any[]>([]);
  allMoves = signal<any[]>([]);
  typesPokemon = signal<any[]>([]);
  constructor(
    formBuilder: FormBuilder,
    @Inject(DIALOG_DATA) public data: { id: any },
    private pokemonService: PokemonService
  ) {
    this.form = formBuilder.group({
      pokemonId: [data.id, [Validators.required]],
      item: ['', [Validators.required]],
      moves: formBuilder.group({
        move1: ['', Validators.required],
        move2: ['', Validators.required],
        move3: ['', Validators.required],
        move4: ['', Validators.required],
      }),
      IVS: formBuilder.group({
        HP: [0, Validators.required],
        ATK: [0, Validators.required],
        DEF: [0, Validators.required],
        SPATK: [0, Validators.required],
        SPDEF: [0, Validators.required],
        VEL: [0, Validators.required],
      }),

      EVS: formBuilder.group({
        HP: [0, Validators.required],
        ATK: [0, Validators.required],
        DEF: [0, Validators.required],
        SPATK: [0, Validators.required],
        SPDEF: [0, Validators.required],
        VEL: [0, Validators.required],
      }),
    });
  }
  ngOnInit(): void {
    console.log(this.isloading());
    this.getAllInfo();
  }
  onSubmit() {
    if (!this.form.valid) {
      alert('formulario no crrecto');
      return;
    }
    console.log(this.form.value);
  }
  changeEditPokemon(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.data = { id: value };
    this.getTypes(this.data.id);
  }
  private getAllInfo() {
    this.pokemonService.getPokemon().subscribe({
      next: (pokemons: any) => {
        this.allPokemon.set(pokemons);
        this.isloading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isloading.set(true);
      },
    });
    this.pokemonService.getItems().subscribe({
      next: (items: any) => {
        this.allItems.set(items);
        this.isloading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isloading.set(true);
      },
    });
    this.pokemonService.getMoves().subscribe({
      next: (moves: any) => {
        this.allMoves.set(moves);
        console.log(this.allMoves());
        this.isloading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isloading.set(true);
      },
    });
    this.getTypes(this.data.id);
  }
  private getTypes(pokemonId: string) {
    this.pokemonService.getTypes(pokemonId).subscribe({
      next: (types) => this.typesPokemon.set(types),
      error: (err) => {
        console.error(err);
        this.isloading.set(true);
      },
    });
  }
}
