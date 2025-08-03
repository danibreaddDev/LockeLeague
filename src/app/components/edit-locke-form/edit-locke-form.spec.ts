import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLockeForm } from './edit-locke-form';

describe('EditLockeForm', () => {
  let component: EditLockeForm;
  let fixture: ComponentFixture<EditLockeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLockeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLockeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
