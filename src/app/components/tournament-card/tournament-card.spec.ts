import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentCard } from './tournament-card';

describe('TournamentCard', () => {
  let component: TournamentCard;
  let fixture: ComponentFixture<TournamentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
