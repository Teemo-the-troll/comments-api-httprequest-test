import { TestBed } from '@angular/core/testing';

import { InfoServantService } from './info-servant.service';

describe('InfoServantService', () => {
  let service: InfoServantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoServantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
