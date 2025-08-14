import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRuleForm } from './create-rule-form';

describe('CreateRuleForm', () => {
  let component: CreateRuleForm;
  let fixture: ComponentFixture<CreateRuleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRuleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRuleForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
