import { TestBed } from '@angular/core/testing';

import { TranslateRestService } from './translate-rest.service';

describe('TranslateRestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslateRestService = TestBed.get(TranslateRestService);
    expect(service).toBeTruthy();
  });
});
