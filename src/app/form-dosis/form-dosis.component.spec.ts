import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDosisComponent } from './form-dosis.component';

describe('FormDosisComponent', () => {
  let component: FormDosisComponent;
  let fixture: ComponentFixture<FormDosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDosisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
