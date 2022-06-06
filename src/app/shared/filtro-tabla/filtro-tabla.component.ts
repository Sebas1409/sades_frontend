//tslint:disable
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { campoFiltro, formatoPaginacion, paramsURL } from 'src/app/interfaces/estructuras';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'filtro-tabla',
  templateUrl: './filtro-tabla.component.html'
})
export class FiltroTablaComponent implements OnInit {

  @Input() listado_filtros = [];
  @Input() cant_datos: number = 0;

  @Input() idarea?: number = null;

  @Input() confechas?: boolean = true;
  @Input() conpaginado?: boolean = true;

  @Output() buscar_datos = new EventEmitter<formatoPaginacion>();
  @Output() exportar = new EventEmitter();

  nrofilas = 25;
  nropag = 0;
  finicio = this.funciones.get_fecha_local()._fecha_actual;
  ffinal = this.funciones.get_fecha_local()._fecha_actual;
  filtros_asignados = [];
  cantidad_filas = [25, 50, 100, 200, 500, 1000];

  campofiltro = null;
  operadorfiltro = null;
  valorfiltro = null;
  filtrosel: campoFiltro = {
    campo: null,
    nombre: null,
    input: false
  };

  constructor(private funciones: FuncionesService, private fpre: FprecargadosService) { }

  ngOnInit() {
    console.log('Filtros al Inicio:', this.listado_filtros);

    setTimeout(() => {
      this.listar_datos();
    }, 200)
  }

  ngOnChanges() {
    console.log('Filtros al Cambio:', this.listado_filtros);
  }

  validar_finicio(fecha) {
    this.finicio = fecha;
    this.listar_datos();
  }

  validar_ffinal(fecha) {
    this.ffinal = fecha;
    this.listar_datos();
  }

  exportar_excel() {
    this.exportar.emit(true);
  }

  async listar_datos() {
    let filtros: formatoPaginacion = {
      nrofilas: this.nrofilas,
      nropag: this.nropag,
      idarea: this.idarea ? this.idarea : null,
      finicio: this.finicio,
      ffinal: this.ffinal,
      filtros: this.filtros_asignados
    };

    this.buscar_datos.emit(filtros);
  }

  agregar_filtro() {
    let filtro = this.funciones.generar_filtro(this.filtrosel, this.operadorfiltro, this.valorfiltro);
    if (filtro) { this.filtros_asignados.push(filtro) }
    console.log('Filtros Asignados:', this.filtros_asignados);
    this.listar_datos();
  }

  quitar_filtro(ind: number) {
    console.log('Quitando:', ind);
    this.filtros_asignados.splice(ind, 1);
    console.log('Filtros Asignados:', this.filtros_asignados);
    this.listar_datos();
  }

  mostrar_opciones_filtro() {
    this.valorfiltro = null;
    this.operadorfiltro = null;
    this.filtrosel = this.listado_filtros.find(fil => fil.campo == this.campofiltro);
    this.operadorfiltro = this.filtrosel.operadores[0].codigo;
    console.log('Filtro Seleccionado:', this.filtrosel);
  }

  pagina_anterior() {
    this.nropag--;
    this.listar_datos();
  }

  pagina_siguiente() {
    this.nropag++;
    this.listar_datos();
  }

}
