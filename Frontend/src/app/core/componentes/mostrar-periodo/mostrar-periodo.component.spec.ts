import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPeriodoComponent } from './mostrar-periodo.component';

describe('MostrarPeriodoComponent', () => {
  let component: MostrarPeriodoComponent;
  let fixture: ComponentFixture<MostrarPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarPeriodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
