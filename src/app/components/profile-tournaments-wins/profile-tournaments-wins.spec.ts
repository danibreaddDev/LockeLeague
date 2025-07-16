import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTournamentsWins } from './profile-tournaments-wins';

describe('ProfileTournamentsWins', () => {
  let component: ProfileTournamentsWins;
  let fixture: ComponentFixture<ProfileTournamentsWins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTournamentsWins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTournamentsWins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
