import { TestBed } from '@angular/core/testing';

import { GeneradorExcelService } from './generador-excel.service';

describe('GeneradorExcelService', () => {
  let service: GeneradorExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneradorExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
