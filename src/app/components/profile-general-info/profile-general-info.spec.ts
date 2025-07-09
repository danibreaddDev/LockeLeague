import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGeneralInfo } from './profile-general-info';

describe('ProfileGeneralInfo', () => {
  let component: ProfileGeneralInfo;
  let fixture: ComponentFixture<ProfileGeneralInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileGeneralInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileGeneralInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
