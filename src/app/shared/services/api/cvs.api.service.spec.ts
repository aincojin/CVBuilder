import { TestBed } from '@angular/core/testing';

import { CvsApiService } from './cvs.api.service';

describe('CvsApiService', () => {
  let service: CvsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
