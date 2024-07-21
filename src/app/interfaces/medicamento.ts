export interface RespuestaMedicamentos {
  //cuando obtenemos todos los pacientes
  ok: boolean;
  medicamentos: Medicamento[];
  error?: string;
}

export interface RespuestaMedicamento {
  //para cuando se crea el paciente
  ok: boolean;
  medicamento: Medicamento;
  error?: string;
}

export interface RespuestaEliminacion {
  ok: boolean;
  error?: string;
}

export interface Medicamento {
  id: number;
  nombre: string;
  descripcion: string;
  indicaciones: string;
  contradicciones: string;
  dosis: string;
}
