import { TestBed, inject } from '@angular/core/testing';

import { UpdatepackageService } from './updatepackage.service';

describe('UpdatepackageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatepackageService]
    });
  });

  it('should be created', inject([UpdatepackageService], (service: UpdatepackageService) => {
    expect(service).toBeTruthy();
  }));
});
