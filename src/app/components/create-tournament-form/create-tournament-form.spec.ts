import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournamentForm } from './create-tournament-form';

describe('CreateTournamentForm', () => {
  let component: CreateTournamentForm;
  let fixture: ComponentFixture<CreateTournamentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTournamentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTournamentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
