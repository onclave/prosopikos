import { TestBed } from '@angular/core/testing';

import { RequestMapperService } from './request-mapper.service';

describe('RequestMapperService', () => {
  let service: RequestMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
