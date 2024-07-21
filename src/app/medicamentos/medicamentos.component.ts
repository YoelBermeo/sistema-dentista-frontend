import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MedicamentoService } from '../services/medicamento/medicamento.service';
import { Medicamento } from '../interfaces'

@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.css',
  providers: [MedicamentoService]
})
export class MedicamentosComponent implements OnInit {
  medicamentos: Medicamento[] = [];

  constructor(private medicamentoService: MedicamentoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerMedicamentos();
  }

  obtenerMedicamentos() {
    this.medicamentoService.obtenerMedicamentos().subscribe(
      (data) => {
        // console.log(data);
        this.medicamentos = data.medicamentos;
      },
      error => {
        console.error('Error al obtener los medicamentos', error);
      }
    );
  }

  actualizarMedicamento(medicamento: Medicamento) {
   // Redirige a la pantalla de formulario de edición
   this.router.navigate(['/form-medicamentos/', medicamento.id]);
  }

  eliminarMedicamento(id: number) {
    // Lógica para eliminar el paciente
    // console.log('Eliminar paciente con ID:', id);

    this.medicamentoService.eliminarMedicamento(id).subscribe(
      (data) => {
        // console.log(data);
        if(data.ok) {
          console.log('Medicamento eliminado exitosamente!');
          this.obtenerMedicamentos();
        }
      },
      error => {
        console.error('Error al obtener los medicamentos', error);
      }
    );
  }
}
