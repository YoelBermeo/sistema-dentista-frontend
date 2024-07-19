import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPacientesComponent } from './formulario-pacientes.component';

describe('FormularioPacientesComponent', () => {
  let component: FormularioPacientesComponent;
  let fixture: ComponentFixture<FormularioPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPacientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
