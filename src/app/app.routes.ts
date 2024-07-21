import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PacientesComponent } from './pacientes/pacientes.component';

import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { FormularioPacientesComponent } from './formulario-pacientes/formulario-pacientes.component';
import { FormularioMedicamentosComponent } from './formulario-medicamentos/formulario-medicamentos.component';
import { FormDosisComponent } from './form-dosis/form-dosis.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'pacientes', title: 'Pagina pacientes', component: PacientesComponent },
  { path: 'form-pacientes', title: 'Formulario de pacientes', component: FormularioPacientesComponent },
  { path: 'form-pacientes/:id', title: 'Formulario de pacientes', component: FormularioPacientesComponent },
  
  { path: 'medicamentos', title: 'Pagina medicamentos', component: MedicamentosComponent },
  { path: 'form-medicamentos', title: 'Formulario de medicamentos', component: FormularioMedicamentosComponent },
  { path: 'form-medicamentos/:id', title: 'Formulario de medicamentos', component: FormularioMedicamentosComponent },

  { path: 'dosis', title: 'Calculo de dosis', component: FormDosisComponent },
  
  { path: '**', redirectTo: '' }
];
