import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPreviaCredencialComponent } from './vista-previa-credencial.component';

describe('VistaPreviaCredencialComponent', () => {
  let component: VistaPreviaCredencialComponent;
  let fixture: ComponentFixture<VistaPreviaCredencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaPreviaCredencialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaPreviaCredencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
