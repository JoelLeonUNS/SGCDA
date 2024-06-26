import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTablaComponent } from './buscador-tabla.component';

describe('BuscadorTablaComponent', () => {
  let component: BuscadorTablaComponent;
  let fixture: ComponentFixture<BuscadorTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
