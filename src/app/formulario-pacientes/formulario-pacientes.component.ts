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

import { PacienteService } from '../services/paciente/paciente.service';
import { Paciente } from '../interfaces';

@Component({
  selector: 'app-formulario-pacientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './formulario-pacientes.component.html',
  styleUrl: './formulario-pacientes.component.css',
  providers: [PacienteService],
})
export class FormularioPacientesComponent implements OnInit {
  userForm: FormGroup;
  paciente: Paciente | undefined;
  isUpdating: boolean = false;
  pacienteId: number | null = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private pacienteService: PacienteService
  ) {
    this.userForm = this.fb.group({
      // id: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Solo números
      nombre: ['', [Validators.required]],
      edad: [
        null,
        [Validators.required, Validators.min(1), Validators.max(120)],
      ],
      direccion: [''],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], // Validación de email
      telefono: ['', [Validators.pattern('^[0-9]*$')]], // Solo números
      observaciones: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pacienteId = Number(params.get('id'));
      if (pacienteId) {
        this.isUpdating = true;
        this.pacienteId = pacienteId;
        this.obtenerPaciente(pacienteId);
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isUpdating && this.paciente && this.pacienteId) {
        this.pacienteService.actualizarPaciente(this.pacienteId, {...this.userForm.value}).subscribe(
          (response) => {
            this.pacienteId = null;
            this.isUpdating = false;
            this.router.navigate(['/pacientes']); // Redirige a la lista de pacientes
          },
          (error) => {
            console.error('Error al actualizar los datos', error);
          }
        );
      } else {
        this.pacienteService.crearPaciente(this.userForm.value).subscribe(
          (response) => {
            this.router.navigate(['/pacientes']); // Redirige a la lista de pacientes
            this.userForm.reset(); // Opcional: reinicia el formulario
          },
          (error) => {
            console.error('Error al enviar los datos', error);
          }
        );
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  obtenerPaciente(id: number) {
    this.pacienteService.obtenerPacientePorID(id).subscribe(
      (data) => {
        // console.log(data);
        if (data.ok) {
          this.paciente = data.paciente;
          this.userForm.patchValue({
            nombre: this.paciente.nombre,
            edad: this.paciente.edad,
            direccion: this.paciente.direccion,
            genero: this.paciente.genero,
            email: this.paciente.email,
            telefono: this.paciente.telefono,
            observaciones: this.paciente.observaciones,
          });
        }
      },
      (error) => {
        console.error('Error al obtener el paciente', error);
      }
    );
  }
}
