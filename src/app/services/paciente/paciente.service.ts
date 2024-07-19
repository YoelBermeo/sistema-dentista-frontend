import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:3000'; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient) { }

  crearPaciente(paciente: any): Observable<any> {
    return this.http.post(this.apiUrl + '/add-paciente', paciente);
  }
}
