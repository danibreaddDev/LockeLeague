import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockeList } from './locke-list';

describe('LockeList', () => {
  let component: LockeList;
  let fixture: ComponentFixture<LockeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
