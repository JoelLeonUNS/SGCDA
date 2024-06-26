import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAgregarComponent } from './buscar-agregar.component';

describe('BuscarAgregarComponent', () => {
  let component: BuscarAgregarComponent;
  let fixture: ComponentFixture<BuscarAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
