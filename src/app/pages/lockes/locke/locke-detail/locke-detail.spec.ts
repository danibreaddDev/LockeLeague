import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockeDetail } from './locke-detail';

describe('LockeDetail', () => {
  let component: LockeDetail;
  let fixture: ComponentFixture<LockeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockeDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
