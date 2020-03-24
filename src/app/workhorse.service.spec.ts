import { TestBed } from '@angular/core/testing';

import { WorkhorseService } from './workhorse.service';

describe('WorkhorseService', () => {
  let service: WorkhorseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkhorseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
