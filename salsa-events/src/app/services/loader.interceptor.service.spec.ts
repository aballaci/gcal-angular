import { TestBed, inject } from '@angular/core/testing';

import { LoaderInterceptorService } from './loader.interceptor.service';

describe('Loader.InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderInterceptorService]
    });
  });

  it('should be created', inject([LoaderInterceptorService], (service: LoaderInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
