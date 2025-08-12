import {
  Component,
  computed,
  effect,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
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
  imagePokemon: string = '';
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
    @Inject(DIALOG_DATA) public data: { id: any; pokemonId: any },
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
      .editPokemon(this.data.id, this.data.pokemonId, this.form.value)
      .then((err) => {
        if (err.errorUpdateTeam?.error === null) {
          this.dialogRef.close(true);
        } else {
          console.log(err.errorUpdateTeam?.error);
          alert(err.errorUpdateTeam?.error);
        }
      });
  }
  changeEditPokemon(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.imagePokemon = value;
    this.getTypes(value);
  }

  private getAllInfo() {
    this.pokemonService
      .getPokemon(this.data.id, this.data.pokemonId)
      .then((res: any) => {
        this.infoPokemon.set(res.data[0]);
        console.log('info del pokemon en el form', this.infoPokemon());
        this.imagePokemon = this.infoPokemon().pokemon_id;
        this.form.patchValue({
          pokemonId: this.infoPokemon().pokemon_id,
          item: this.infoPokemon().item,
          moves: {
            move1: this.infoPokemon().moves[0],
            move2: this.infoPokemon().moves[1],
            move3: this.infoPokemon().moves[2],
            move4: this.infoPokemon().moves[3],
          },
          IVS: {
            HP: this.infoPokemon().ivs.HP,
            ATK: this.infoPokemon().ivs.ATK,
            DEF: this.infoPokemon().ivs.DEF,
            SPATK: this.infoPokemon().ivs.SPATK,
            SPDEF: this.infoPokemon().ivs.SPDEF,
            VEL: this.infoPokemon().ivs.VEL,
          },
          EVS: {
            HP: this.infoPokemon().evs.HP,
            ATK: this.infoPokemon().evs.ATK,
            DEF: this.infoPokemon().evs.DEF,
            SPATK: this.infoPokemon().evs.SPATK,
            SPDEF: this.infoPokemon().evs.SPDEF,
            VEL: this.infoPokemon().evs.VEL,
          },
        });
        this.isChargingForm.set(false);
        this.isloading.set(false);
      })
      .catch((err) => console.error(err));
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
    this.getTypes(this.data.pokemonId);
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
