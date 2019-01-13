import { TestBed, inject } from '@angular/core/testing';

import { IcsService } from './ics.service';

describe('IcsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IcsService]
    });
  });

  it('should be created', inject([IcsService], (service: IcsService) => {
    expect(service).toBeTruthy();
  }));
});
