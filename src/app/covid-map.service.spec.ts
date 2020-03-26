import { TestBed } from '@angular/core/testing';

import { CovidMapService } from './covid-map.service';

describe('CovidMapService', () => {
  let service: CovidMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
