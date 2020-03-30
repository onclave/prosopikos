import { TestBed } from '@angular/core/testing';

import { CovidAnalysisService } from './covid-analysis.service';

describe('CovidAnalysisService', () => {
  let service: CovidAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
