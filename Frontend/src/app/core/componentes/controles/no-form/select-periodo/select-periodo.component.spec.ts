import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPeriodoComponent } from './select-periodo.component';

describe('SelectPeriodoComponent', () => {
  let component: SelectPeriodoComponent;
  let fixture: ComponentFixture<SelectPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPeriodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
