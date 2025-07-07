import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lockes } from './lockes';

describe('Lockes', () => {
  let component: Lockes;
  let fixture: ComponentFixture<Lockes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lockes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lockes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
