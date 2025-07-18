import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockeUserInfo } from './locke-user-info';

describe('LockeUserInfo', () => {
  let component: LockeUserInfo;
  let fixture: ComponentFixture<LockeUserInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockeUserInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockeUserInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
