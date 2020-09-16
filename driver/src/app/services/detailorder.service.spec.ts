import { TestBed } from '@angular/core/testing';

import { DetailorderService } from './detailorder.service';

describe('DetailorderService', () => {
  let service: DetailorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
