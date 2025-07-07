import { TestBed } from '@angular/core/testing';

import { LockeService } from './locke-service';

describe('LockeService', () => {
  let service: LockeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
