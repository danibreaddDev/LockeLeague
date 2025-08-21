import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTournamentDetail } from './modal-tournament-detail';

describe('ModalTournamentDetail', () => {
  let component: ModalTournamentDetail;
  let fixture: ComponentFixture<ModalTournamentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTournamentDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTournamentDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
