import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirigiendoRutaComponent } from './redirigiendo-ruta.component';

describe('RedirigiendoRutaComponent', () => {
  let component: RedirigiendoRutaComponent;
  let fixture: ComponentFixture<RedirigiendoRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirigiendoRutaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedirigiendoRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
