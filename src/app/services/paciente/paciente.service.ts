import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Paciente,
  RespuestaEliminacion,
  RespuestaPaciente,
  RespuestaPacientes,
} from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient) {}

  crearPaciente(paciente: Paciente): Observable<RespuestaPaciente> {
    return this.http.post<RespuestaPaciente>(
      this.apiUrl + '/add-paciente',
      paciente
    );
  }

  obtenerPacientes(): Observable<RespuestaPacientes> {
    return this.http.get<RespuestaPacientes>(this.apiUrl + '/pacientes');
  }

  obtenerPacientePorID(id: number): Observable<RespuestaPaciente> {
    return this.http.get<RespuestaPaciente>(this.apiUrl + `/paciente/${id}`);
  }

  actualizarPaciente(
    id: number,
    paciente: Paciente
  ): Observable<RespuestaPacientes> {
    return this.http.put<RespuestaPacientes>(
      this.apiUrl + `/actualizar-paciente/${id}`,
      paciente
    );
  }

  eliminarPaciente(id: number): Observable<RespuestaEliminacion> {
    return this.http.delete<RespuestaEliminacion>(
      this.apiUrl + `/eliminar-paciente/${id}`
    );
  }
}
