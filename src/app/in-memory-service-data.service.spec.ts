import { TestBed, inject } from '@angular/core/testing';

import { InMemoryServiceDataService } from './in-memory-service-data.service';

describe('InMemoryServiceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryServiceDataService]
    });
  });

  it('should be created', inject([InMemoryServiceDataService], (service: InMemoryServiceDataService) => {
    expect(service).toBeTruthy();
  }));
});
