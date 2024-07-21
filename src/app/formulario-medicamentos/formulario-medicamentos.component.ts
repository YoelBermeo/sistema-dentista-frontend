import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Medicamento } from '../interfaces';
import { MedicamentoService } from '../services/medicamento/medicamento.service';

@Component({
  selector: 'app-formulario-medicamentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './formulario-medicamentos.component.html',
  styleUrl: './formulario-medicamentos.component.css',
  providers: [MedicamentoService]
})
export class FormularioMedicamentosComponent implements OnInit {
  medForm: FormGroup;
  medicamento: Medicamento | undefined;
  isUpdating: boolean = false;
  medicamentoId: number | null = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService
  ) {
    this.medForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      indicaciones: [''],
      contradicciones: [''], 
      dosis: [''], 
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const medicamentoId = Number(params.get('id'));
      if (medicamentoId) {
        this.isUpdating = true;
        this.medicamentoId = medicamentoId;
        this.obtenerMedicamento(medicamentoId);
      }
    });
  }

  onSubmit() {
    if (this.medForm.valid) {
      if (this.isUpdating && this.medicamento && this.medicamentoId) {
        // Asumiendo que tienes un método para actualizar el medicamento
        this.medicamentoService.actualizarMedicamento(this.medicamentoId, this.medForm.value).subscribe(
          response => {
            this.router.navigate(['/medicamentos']); // Redirige a la lista de medicamentos
          },
          error => {
            console.error('Error al actualizar el medicamento', error);
          }
        );
      } else {
        // Asumiendo que tienes un método para crear un nuevo medicamento
        this.medicamentoService.crearMedicamento(this.medForm.value).subscribe(
          response => {
            // this.router.navigate(['/medicamentos']); // Redirige a la lista de medicamentos
            this.medForm.reset(); // Opcional: reinicia el formulario
          },
          error => {
            console.error('Error al enviar los datos', error);
          }
        );
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  obtenerMedicamento(id: number) {
    this.medicamentoService.obtenerMedicamentoPorID(id).subscribe(
      (data) => {
        // console.log(data);
        if (data.ok) {
          this.medicamento = data.medicamento;
          this.medForm.patchValue({
            nombre: this.medicamento.nombre,
            descripcion: this.medicamento.descripcion,
            indicaciones: this.medicamento.indicaciones,
            contradicciones: this.medicamento.contradicciones,
            dosis: this.medicamento.dosis,
          });
        }
      },
      (error) => {
        console.error('Error al obtener el medicamento', error);
      }
    );
  }
}
