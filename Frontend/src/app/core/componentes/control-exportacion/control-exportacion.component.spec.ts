import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlExportacionComponent } from './control-exportacion.component';

describe('ControlExportacionComponent', () => {
  let component: ControlExportacionComponent;
  let fixture: ComponentFixture<ControlExportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlExportacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
