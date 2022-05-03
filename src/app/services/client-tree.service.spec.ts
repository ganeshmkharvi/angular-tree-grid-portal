import { TestBed } from '@angular/core/testing';

import { ClientTreeService } from './client-tree.service';

describe('ClientTreeService', () => {
  let service: ClientTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
