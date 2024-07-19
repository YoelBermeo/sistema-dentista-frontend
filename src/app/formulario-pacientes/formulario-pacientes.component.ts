import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PacienteService } from '../services/paciente/paciente.service'

@Component({
  selector: 'app-formulario-pacientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './formulario-pacientes.component.html',
  styleUrl: './formulario-pacientes.component.css',
  providers: [PacienteService]
})
export class FormularioPacientesComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private pacienteService: PacienteService) {
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

  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.valid) {
      // console.log('Formulario enviado', this.userForm.value);
      this.pacienteService.crearPaciente(this.userForm.value).subscribe(
        (response) => {
          console.log('Datos enviados exitosamente', response);
          this.userForm.reset(); // Opcional: reinicia el formulario
        },
        (error) => {
          console.error('Error al enviar los datos', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
