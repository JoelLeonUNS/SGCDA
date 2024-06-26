import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupFrontComponent } from './radio-group-front.component';

describe('RadioGroupFrontComponent', () => {
  let component: RadioGroupFrontComponent;
  let fixture: ComponentFixture<RadioGroupFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupFrontComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadioGroupFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
