import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBestLockes } from './profile-best-lockes';

describe('ProfileBestLockes', () => {
  let component: ProfileBestLockes;
  let fixture: ComponentFixture<ProfileBestLockes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBestLockes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBestLockes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
