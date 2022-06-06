//tslint:disable
import { opcionesEnLista } from "../interfaces/estructuras";

export class ListasSistema {

  listado_meses: opcionesEnLista[] = [
    { codigo: 1, nombre: 'Enero' },
    { codigo: 2, nombre: 'Febrero' },
    { codigo: 3, nombre: 'Marzo' },
    { codigo: 4, nombre: 'Abril' },
    { codigo: 5, nombre: 'Mayo' },
    { codigo: 6, nombre: 'Junio' },
    { codigo: 7, nombre: 'Julio' },
    { codigo: 8, nombre: 'Agosto' },
    { codigo: 9, nombre: 'Setiembre' },
    { codigo: 10, nombre: 'Octubre' },
    { codigo: 11, nombre: 'Noviembre' },
    { codigo: 12, nombre: 'Diciembre' }
  ];

  metodos_pago: opcionesEnLista[] = [
    { codigo: 0, nombre: 'Efectivo' },
    { codigo: 1, nombre: 'Transferencia' },
    { codigo: 2, nombre: 'Tarjeta' },
    { codigo: 3, nombre: 'Por Cobrar' },
    { codigo: 4, nombre: 'Yape' },
    { codigo: 5, nombre: 'Plin' }
  ];

  tipos_booleanos: opcionesEnLista[] = [
    { codigo: 1, nombre: 'SI' },
    { codigo: 0, nombre: 'NO' }
  ];

  estados_personal: opcionesEnLista[] = [
    { codigo: 1, nombre: 'Activo' },
    { codigo: 0, nombre: 'Inactivo' }
  ];

  origen_venta: opcionesEnLista[] = [
    { codigo: 1, nombre: 'Activo' },
    { codigo: 0, nombre: 'Inactivo' }
  ];

  tipos_sexos: opcionesEnLista[] = [
    { codigo: 1, nombre: 'Masculino' },
    { codigo: 0, nombre: 'Femenino' }
  ];

  tipos_movimientos: opcionesEnLista[] = [
    { codigo: 1, nombre: 'Ingreso' },
    { codigo: 0, nombre: 'Salida' }
  ];

  tipos_documentos_venta: opcionesEnLista[] = [
    { codigo: 0, nombre: 'Nota Venta', alias: 'NV01' },
    { codigo: 1, nombre: 'Factura Electrónica', alias: 'F001' },
    { codigo: 3, nombre: 'Boleta Electrónica', alias: 'B001' }
  ];

  listado_sexos: opcionesEnLista[] = [
    { codigo: 1, nombre: 'Masculino' },
    { codigo: 2, nombre: 'Femenino' }
  ];

  listado_dias_semana: opcionesEnLista[] = [
    { codigo: 1, nombre: 'Lunes' },
    { codigo: 2, nombre: 'Martes' },
    { codigo: 3, nombre: 'Miercoles' },
    { codigo: 4, nombre: 'Jueves' },
    { codigo: 5, nombre: 'Viernes' },
    { codigo: 6, nombre: 'Sábado' }
  ];

  listado_estadocivil: opcionesEnLista[] = [
    { codigo: 0, nombre: 'Soltero' },
    { codigo: 1, nombre: 'Casado' },
    { codigo: 3, nombre: 'Conviviente' },
    { codigo: 4, nombre: 'Viudo (a)' },
    { codigo: 5, nombre: 'Divorciado (a)' }
  ];

  tipos_documentos_identidad: opcionesEnLista[] = [
    //{ codigo: 1, nombre: 'Sin documento', alias: '0' },
    { codigo: 2, nombre: 'DNI', alias: '1' },
    { codigo: 3, nombre: 'CE', alias: '4' },
    { codigo: 4, nombre: 'RUC', alias: '6' },
    { codigo: 5, nombre: 'PASAPORTE', alias: '7' }
  ];

  listado_anios: opcionesEnLista[] = [
    { codigo: 2019, nombre: '2019' },
    { codigo: 2020, nombre: '2020' },
    { codigo: 2021, nombre: '2021' },
    { codigo: 2022, nombre: '2022' }
  ];

  listado_tipo_matricula: any[] = [
    { codigo: 1, nombre: 'MATRICULA NORMAL', monto_mensual:160, monto_matricula:100},
    { codigo: 2, nombre: 'MATRICULA MENOR', monto_mensual:100,monto_matricula:80},
  ];

  listado_tipo_pago: opcionesEnLista[] = [
    { codigo: 1, nombre: 'AL CONTADO' },
    { codigo: 2, nombre: 'POR PARTES' },
  ];

  listado_aula: opcionesEnLista[] = [
    { codigo: 1, nombre: 'AULA 1' },
    { codigo: 2, nombre: 'AULA 2' },
  ];

  listado_cursos: opcionesEnLista[] = [
    { codigo: 1, nombre: 'INGLES BÁSICO I' },
    { codigo: 2, nombre: 'INGLES BÁSICO II' },
    { codigo: 3, nombre: 'FRANCES BÁSICO I' },
    { codigo: 4, nombre: 'ITALIANO BÁSICO I' },
  ];

}
