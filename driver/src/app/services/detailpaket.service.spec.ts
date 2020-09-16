import { TestBed } from '@angular/core/testing';

import { DetailpaketService } from './detailpaket.service';

describe('DetailpaketService', () => {
  let service: DetailpaketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailpaketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
