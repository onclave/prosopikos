import { TestBed } from '@angular/core/testing';

import { CovidDatasetViewerService } from './covid-dataset-viewer.service';

describe('CovidDatasetViewerService', () => {
  let service: CovidDatasetViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidDatasetViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
