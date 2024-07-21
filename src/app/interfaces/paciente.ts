export interface RespuestaPacientes {
  //cuando obtenemos todos los pacientes
  ok: boolean;
  pacientes: Paciente[];
  error?: string;
}

export interface RespuestaPaciente {
  //para cuando se crea el paciente
  ok: boolean;
  paciente: Paciente;
  error?: string;
}

export interface Paciente {
  id: number;
  nombre: string;
  edad: number;
  direccion: string;
  genero: string;
  email: string;
  telefono: string;
  observaciones: string;
}
