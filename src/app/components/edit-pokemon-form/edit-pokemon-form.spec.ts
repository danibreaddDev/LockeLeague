import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPokemonForm } from './edit-pokemon-form';

describe('EditPokemonForm', () => {
  let component: EditPokemonForm;
  let fixture: ComponentFixture<EditPokemonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPokemonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPokemonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
