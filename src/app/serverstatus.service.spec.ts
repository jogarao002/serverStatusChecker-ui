import { TestBed } from '@angular/core/testing';

import { ServerstatusService } from './serverstatus.service';

describe('ServerstatusService', () => {
  let service: ServerstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
