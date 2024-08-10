import { TestBed } from '@angular/core/testing';

import { CargadorDatosService } from './cargador-datos.service';

describe('CargadorDatosService', () => {
  let service: CargadorDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargadorDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
