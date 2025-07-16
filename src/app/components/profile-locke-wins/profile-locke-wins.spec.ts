import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLockeWins } from './profile-locke-wins';

describe('ProfileLockeWins', () => {
  let component: ProfileLockeWins;
  let fixture: ComponentFixture<ProfileLockeWins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLockeWins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLockeWins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
