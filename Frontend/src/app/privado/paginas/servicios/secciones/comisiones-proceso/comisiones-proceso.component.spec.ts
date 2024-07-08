import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionesProcesoComponent } from './comisiones-proceso.component';

describe('ComisionesProcesoComponent', () => {
  let component: ComisionesProcesoComponent;
  let fixture: ComponentFixture<ComisionesProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionesProcesoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComisionesProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
