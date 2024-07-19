import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { FormularioPacientesComponent } from './formulario-pacientes/formulario-pacientes.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'pacientes', title: 'Pagina pacientes', component: PacientesComponent },
  { path: 'form-pacientes', title: 'Formulario de pacientes', component: FormularioPacientesComponent },
];
