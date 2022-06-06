//tslint:disable
import { campoFiltro, opcionFiltro } from "../interfaces/estructuras";

export class ListaFiltros {

  private _ES_IGUAL: opcionFiltro = { codigo: 1, nombre: 'es', valor: " = " };
  private _NO_ES_IGUAL: opcionFiltro = { codigo: 2, nombre: 'no es', valor: " <> " };
  private _VACIO: opcionFiltro = { codigo: 3, nombre: 'esta vacío', valor: " IS NULL " };
  private _LLENO: opcionFiltro = { codigo: 4, nombre: 'no esta vacío', valor: " IS NOT NULL " };
  private _CONTIENE: opcionFiltro = { codigo: 5, nombre: 'contiene', valor: " LIKE '%" };
  private _MAYOR_IGUAL: opcionFiltro = { codigo: 6, nombre: 'mayor igual', valor: " >= " };
  private _MENOR_IGUAL: opcionFiltro = { codigo: 7, nombre: 'mayor igual', valor: " <= " };
  private _VERDADERO: opcionFiltro = { codigo: 8, nombre: 'tiene', valor: " = 1 " };
  private _FALSE: opcionFiltro = { codigo: 9, nombre: 'no tiene', valor: " = 0 " };
  private _MASCULINO: opcionFiltro = { codigo: 10, nombre: 'masculino', valor: " = 0 " };
  private _FEMENINO: opcionFiltro = { codigo: 11, nombre: 'femenino', valor: " = 1 " };

  filtros_ventas: campoFiltro[] = [
    { input: true, campo: 'codigo_doc', nombre: 'Codigo', operadores: [this._ES_IGUAL] },
    { input: true, campo: 'cliente', nombre: 'Cliente', operadores: [this._CONTIENE] },
    {
      input: false, campo: 'idmatricula', nombre: 'Origen', operadores: [
        { codigo: 3, nombre: 'MATRICULA', valor: " IS NOT NULL " },
        { codigo: 4, nombre: 'VENTAS', valor: " IS NULL " }
      ]
    },
  ];

  filtros_matriculas: campoFiltro[] = [
    { input: true, campo: 'cliente', nombre: 'Cliente', operadores: [this._CONTIENE] },
    { input: true, campo: 'dias_restantes', nombre: 'Dias restantes', operadores: [this._MAYOR_IGUAL, this._MENOR_IGUAL] },
  ];

  filtros_basicos: campoFiltro[] = [
    { input: true, campo: 'nombre', nombre: 'Nombre', operadores: [this._CONTIENE] },
  ];

  filtros_empleados: campoFiltro[] = [
    { input: true, campo: 'nombre_completo', nombre: 'Nombre', operadores: [this._CONTIENE] },
    { input: true, campo: 'nrodni', nombre: 'Nro. DNI', operadores: [this._CONTIENE] },
  ];

  filtros_usuarios: campoFiltro[] = [
    { input: true, campo: 'nrodni', nombre: 'Nro. DNI', operadores: [this._ES_IGUAL] },
    { input: true, campo: 'firstname', nombre: 'Nombres', operadores: [this._CONTIENE, this._ES_IGUAL] },
    { input: true, campo: 'lastname', nombre: 'Apellidos', operadores: [this._CONTIENE, this._ES_IGUAL] },
  ];

  filtros_clientes: campoFiltro[] = [
    { input: true, campo: 'nrodni', nombre: 'Nro. DNI', operadores: [this._ES_IGUAL] },
    { input: true, campo: 'nombre_completo', nombre: 'Nombres', operadores: [this._CONTIENE] }
  ];

  filtros_pacientes: campoFiltro[] = [
    { input: true, campo: 'dni', nombre: 'Nro. DNI', operadores: [this._ES_IGUAL] },
    {
      input: false, campo: 'flg_cancer', nombre: 'Cáncer',
      operadores: [this._VERDADERO, this._FALSE],
    },
  ];

}
