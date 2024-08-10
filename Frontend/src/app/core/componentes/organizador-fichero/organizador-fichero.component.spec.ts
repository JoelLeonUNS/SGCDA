import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadorFicheroComponent } from './organizador-fichero.component';

describe('OrganizadorFicheroComponent', () => {
  let component: OrganizadorFicheroComponent;
  let fixture: ComponentFixture<OrganizadorFicheroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizadorFicheroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizadorFicheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
