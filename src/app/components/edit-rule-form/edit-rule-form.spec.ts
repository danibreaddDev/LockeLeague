import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRuleForm } from './edit-rule-form';

describe('EditRuleForm', () => {
  let component: EditRuleForm;
  let fixture: ComponentFixture<EditRuleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRuleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRuleForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
