import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMedicamentosComponent } from './formulario-medicamentos.component';

describe('FormularioMedicamentosComponent', () => {
  let component: FormularioMedicamentosComponent;
  let fixture: ComponentFixture<FormularioMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioMedicamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
