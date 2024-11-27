import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradorTablaComponent } from './filtrador-tabla.component';

describe('FiltradorTablaComponent', () => {
  let component: FiltradorTablaComponent;
  let fixture: ComponentFixture<FiltradorTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltradorTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltradorTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
