import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PacienteService } from '../services/paciente/paciente.service'
import { Paciente } from '../interfaces'

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
  providers: [PacienteService]
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];

  constructor(private pacienteService: PacienteService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes() {
    this.pacienteService.obtenerPacientes().subscribe(
      (data) => {
        // console.log(data);
        this.pacientes = data.pacientes;
      },
      error => {
        console.error('Error al obtener los pacientes', error);
      }
    );
  }

  actualizarPaciente(paciente: Paciente) {
   // Redirige a la pantalla de formulario de edición
   this.router.navigate(['/form-pacientes/', paciente.id]);
  }

  eliminarPaciente(id: number) {
    // Lógica para eliminar el paciente
    // console.log('Eliminar paciente con ID:', id);

    this.pacienteService.eliminarPaciente(id).subscribe(
      (data) => {
        // console.log(data);
        if(data.ok) {
          console.log('Paciente eliminado exitosamente!');
          this.obtenerPacientes();
        }
      },
      error => {
        console.error('Error al obtener los pacientes', error);
      }
    );
  }
}
