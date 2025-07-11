import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileClasification } from './profile-clasification';

describe('ProfileClasification', () => {
  let component: ProfileClasification;
  let fixture: ComponentFixture<ProfileClasification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileClasification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileClasification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
