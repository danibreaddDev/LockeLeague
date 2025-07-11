import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClasification } from './table-clasification';

describe('TableClasification', () => {
  let component: TableClasification;
  let fixture: ComponentFixture<TableClasification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableClasification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableClasification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
