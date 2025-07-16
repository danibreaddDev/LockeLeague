import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLockeForm } from './create-locke-form';

describe('CreateLockeForm', () => {
  let component: CreateLockeForm;
  let fixture: ComponentFixture<CreateLockeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLockeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLockeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
