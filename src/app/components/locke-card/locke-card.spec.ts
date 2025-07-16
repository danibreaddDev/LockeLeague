import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockeCard } from './locke-card';

describe('LockeCard', () => {
  let component: LockeCard;
  let fixture: ComponentFixture<LockeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
