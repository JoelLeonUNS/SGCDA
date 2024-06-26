import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAgregarMultipleComponent } from './buscar-agregar-multiple.component';

describe('BuscarAgregarMultipleComponent', () => {
  let component: BuscarAgregarMultipleComponent;
  let fixture: ComponentFixture<BuscarAgregarMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarAgregarMultipleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarAgregarMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
