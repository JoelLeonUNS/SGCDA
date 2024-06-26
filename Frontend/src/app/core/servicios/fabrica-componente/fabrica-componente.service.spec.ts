import { TestBed } from '@angular/core/testing';

import { FabricaComponenteService } from './fabrica-componente.service';

describe('FabricaComponenteService', () => {
  let service: FabricaComponenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricaComponenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
