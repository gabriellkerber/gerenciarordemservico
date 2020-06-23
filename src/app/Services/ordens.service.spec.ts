import { TestBed } from '@angular/core/testing';

import { OrdensService } from './ordens.service';

describe('OrdensService', () => {
  let service: OrdensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
