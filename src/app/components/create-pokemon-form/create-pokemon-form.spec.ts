import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokemonForm } from './create-pokemon-form';

describe('CreatePokemonForm', () => {
  let component: CreatePokemonForm;
  let fixture: ComponentFixture<CreatePokemonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePokemonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePokemonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
