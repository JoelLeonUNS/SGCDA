import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarProcesoPeriodoComponent } from './mostrar-proceso-periodo.component';

describe('MostrarProcesoPeriodoComponent', () => {
  let component: MostrarProcesoPeriodoComponent;
  let fixture: ComponentFixture<MostrarProcesoPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarProcesoPeriodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarProcesoPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
