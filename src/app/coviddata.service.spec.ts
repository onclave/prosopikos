import { TestBed } from '@angular/core/testing';

import { CoviddataService } from './coviddata.service';

describe('CoviddataService', () => {
  let service: CoviddataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoviddataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
