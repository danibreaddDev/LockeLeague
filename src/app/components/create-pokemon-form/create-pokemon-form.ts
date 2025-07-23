import { Component, computed, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getFormatted } from '../../../utils/functions';
import { PokemonService } from '../../core/services/pokemon-service';
import { Loader } from '../../shared/components/loader/loader';

@Component({
  selector: 'app-create-pokemon-form',
  imports: [ReactiveFormsModule, Loader],
  templateUrl: './create-pokemon-form.html',
  styleUrl: './create-pokemon-form.css',
})
export class CreatePokemonForm {
  form!: FormGroup;
  imagePokemon: string = '';
  isloading = signal<boolean>(true);
  isChargingForm = signal<boolean>(true);
  infoPokemon = signal<any>(null);
  count = signal(4);
  indices = computed(() => Array.from({ length: this.count() }, (_, i) => i));
  getformatedName = getFormatted;
  allPokemon = signal<any[]>([]);
  allItems = signal<any[]>([]);
  allMoves = signal<any[]>([]);
  typesPokemon = signal<any[]>([]);
  constructor(
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService
  ) {}
  ngOnInit(): void {
    this.getAllInfo();
    this.initForm();
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
    this.imagePokemon = value;
    this.getTypes(value);
  }
  private getAllInfo() {
    this.pokemonService.getPokemons().subscribe({
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
  private initForm() {
    this.form = this.formBuilder.group({
      pokemonId: ['', [Validators.required]],
      item: [null, [Validators.required]],
      moves: this.formBuilder.group({
        move1: [null, Validators.required],
        move2: [null, Validators.required],
        move3: [null, Validators.required],
        move4: [null, Validators.required],
      }),
      IVS: this.formBuilder.group({
        HP: [0, Validators.required],
        ATK: [0, Validators.required],
        DEF: [0, Validators.required],
        SPATK: [0, Validators.required],
        SPDEF: [0, Validators.required],
        VEL: [0, Validators.required],
      }),

      EVS: this.formBuilder.group({
        HP: [0, Validators.required],
        ATK: [0, Validators.required],
        DEF: [0, Validators.required],
        SPATK: [0, Validators.required],
        SPDEF: [0, Validators.required],
        VEL: [0, Validators.required],
      }),
    });
  }
}
