import { Alumnos } from "./alumnos";

// tslint:disable
export interface paramsURL {
  esadmin: boolean,
  idarea: number,
  idsel?: number,
  finicio?: string,
  ffinal?: string
};

export interface paraModal {
  editar?: boolean,
  item?: any,
  idarea?: number,
  params?: any,
  cerrable?: boolean
};

export interface formatoModificacion {
  idcampo: { nombre: string, valor: number },
  campos: string[],
  valores: any[]
};

export interface formatoPaginacion {
  nrofilas: number;
  nropag: number;
  idarea?: number;
  finicio?: string;
  ffinal?: string;
  filtros: { chip: string, sql: string }[]
};

export interface formatoFiltroSeleccion {
  nrofilas: number;
  nropag: number;
  finicio?: string;
  ffinal?: string;
  iditem?: number;
};

export interface formatoEjecutar {
  sql: string,
  metodo: "put" | "get"
}

export interface formatoGuardar {
  datos: any[]
}

export interface nmedicaData {
  tipo: number;
  usuario: any;
}

export interface respuestaAPI {
  ok?: boolean,
  error?: boolean,
  sql?: string,
  data?: any[],
  msg?: string,
  id?: number,
  nombre?: string
}

export interface opcionesEnLista {
  codigo: any,
  nombre: any,
  alias?: string
}

export interface campoFiltro {
  campo: string;
  nombre: string;
  input: boolean;
  operadores?: opcionFiltro[];
  opciones?: opcionFiltro[];
}

export interface opcionFiltro {
  codigo?: number;
  nombre: string;
  valor: any;
}

export interface boleta_asistencia {
  alumno: Alumnos;
  asistencias: number,
  faltas_justificadas: number,
  faltas_injustificadas: number,
  tardanzas_justificadas: number,
  tardanzas_injustificadas: number,
  aprobadas: number,
  desaprobadas: number,
  sin_evaluar: number,
}

export interface boleta_observaciones {
  alumno: Alumnos;
  observaciones: number;
}
