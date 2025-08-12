import { Component, computed, effect, Inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getFormatted } from '../../../utils/functions';
import { PokemonService } from '../../core/services/pokemon-service';
import { Loader } from '../../shared/components/loader/loader';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

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
  totalEvsReamining = signal<number>(508);
  constructor(
    private formBuilder: FormBuilder,
    @Inject(DIALOG_DATA) public data: { userId: string },
    private pokemonService: PokemonService,
    private dialogRef: DialogRef
  ) {}
  ngOnInit(): void {
    this.getAllInfo();
    this.initForm();
  }
  closeModal() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (!this.form.valid) {
      alert('formulario no crrecto');
      return;
    }
    console.log(this.form.value);
    this.pokemonService
      .addPokemon(this.data.userId, this.form.value)
      .then((err) => {
        if (err.error === null) {
          this.dialogRef.close(true);
        } else {
          console.log(err.error);
          alert(err.error);
        }
      });
  }
  resetForm() {
    this.initForm();
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
        HP: [0, [Validators.required, Validators.max(31)]],
        ATK: [0, [Validators.required, Validators.max(31)]],
        DEF: [0, [Validators.required, Validators.max(31)]],
        SPATK: [0, [Validators.required, Validators.max(31)]],
        SPDEF: [0, [Validators.required, Validators.max(31)]],
        VEL: [0, [Validators.required, Validators.max(31)]],
      }),

      EVS: this.formBuilder.group({
        HP: [0, [Validators.required, Validators.max(255)]],
        ATK: [0, [Validators.required, Validators.max(255)]],
        DEF: [0, [Validators.required, Validators.max(255)]],
        SPATK: [0, [Validators.required, Validators.max(255)]],
        SPDEF: [0, [Validators.required, Validators.max(255)]],
        VEL: [0, [Validators.required, Validators.max(255)]],
      }),
    });
  }
}
