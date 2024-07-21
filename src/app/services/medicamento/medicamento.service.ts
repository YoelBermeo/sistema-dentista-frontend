import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Medicamento,
  RespuestaEliminacion,
  RespuestaMedicamento,
  RespuestaMedicamentos,
} from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con tu URL de la API
  constructor(private http: HttpClient) {}

  
  crearMedicamento(medicamento: Medicamento): Observable<RespuestaMedicamento> {
    return this.http.post<RespuestaMedicamento>(
      this.apiUrl + '/add-medicamento',
      medicamento
    );
  }

  obtenerMedicamentos(): Observable<RespuestaMedicamentos> {
    return this.http.get<RespuestaMedicamentos>(this.apiUrl + '/medicamentos');
  }

  obtenerMedicamentoPorID(id: number): Observable<RespuestaMedicamento> {
    return this.http.get<RespuestaMedicamento>(this.apiUrl + `/medicamento/${id}`);
  }

  actualizarMedicamento(
    id: number,
    medicamento: Medicamento
  ): Observable<RespuestaMedicamento> {

    return this.http.put<RespuestaMedicamento>(
      this.apiUrl + `/actualizar-medicamento/${id}`,
      medicamento
    );
  }

  eliminarMedicamento(id: number): Observable<RespuestaEliminacion> {
    return this.http.delete<RespuestaEliminacion>(
      this.apiUrl + `/eliminar-medicamento/${id}`
    );
  }
}
