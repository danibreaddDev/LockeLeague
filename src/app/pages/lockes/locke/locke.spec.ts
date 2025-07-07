import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Locke } from './locke';

describe('Locke', () => {
  let component: Locke;
  let fixture: ComponentFixture<Locke>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Locke]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Locke);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
