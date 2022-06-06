import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { campoFiltro, formatoPaginacion, paramsURL } from 'src/app/interfaces/estructuras';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListaFiltros } from 'src/app/services/listas-filtros';
import { ListasSistema } from 'src/app/services/listas-sistema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rep-ventas',
  templateUrl: './rep-ventas.component.html'
})

export class RepVentasComponent implements OnInit {

  listado_filtros = new ListaFiltros().filtros_ventas;
  mifiltro: formatoPaginacion = null;

  listado_datos = [];
  total_ventas = 0;

  constructor(private funciones: FuncionesService, private router: Router, private fmysql: FmysqlService,
    private fpre: FprecargadosService) { }

  async ngOnInit() {
    this.agregar_filtro_vendedor();
    this.agregar_filtro_areas();
    this.agregar_filtro_sectores();
  }

  exportar_excel() { }

  async agregar_filtro_vendedor() {
    this.fmysql.listar(environment.empleados.empleados).subscribe(res => {
      let filtro_sedes: campoFiltro = {
        input: false, campo: 'idempleado', nombre: 'Empleado',
        operadores: []
      }
      res.data.forEach(filtro => {
        filtro_sedes.operadores.push(
          { codigo: filtro.idempleado, nombre: 'es ' + filtro.nombres, valor: " = " + filtro.idempleado + " " }
        );
      })
      console.log('Nuevo Filtro:', filtro_sedes);
      this.listado_filtros.push(filtro_sedes);
    })
  }

  async agregar_filtro_sectores() {
    let listado_areas = await this.fpre.listar_sectores();
    let filtro_sedes: campoFiltro = {
      input: false, campo: 'idsector', nombre: 'Sector',
      operadores: []
    }
    listado_areas.forEach(filtro => {
      filtro_sedes.operadores.push(
        { codigo: filtro.idsector, nombre: 'es ' + filtro.nombre, valor: " = " + filtro.idsector + " " }
      );
    })
    console.log('Nuevo Filtro:', filtro_sedes);
    this.listado_filtros.push(filtro_sedes);
  }

  async agregar_filtro_areas() {
    let listado_areas = await this.fpre.listar_areas();
    let filtro_sedes: campoFiltro = {
      input: false, campo: 'idarea', nombre: 'Area',
      operadores: []
    }
    listado_areas.forEach(filtro => {
      filtro_sedes.operadores.push(
        { codigo: filtro.idarea, nombre: 'es ' + filtro.nombre, valor: " = " + filtro.idarea + " " }
      );
    })
    console.log('Nuevo Filtro:', filtro_sedes);
    this.listado_filtros.push(filtro_sedes);
  }

  listar_datos(filtro: formatoPaginacion) {
    this.mifiltro = filtro;
    this.fmysql.enviar_post(environment.ventas.paginado, filtro).subscribe(res => {
      console.log('Listado:', res);
      this.listado_datos = res.data;
      this.calcular_total();
    })
  }

  calcular_total() {
    this.total_ventas = 0;

    this.listado_datos.forEach(ven => {
      this.total_ventas += ven.total_venta;
    })
  }

}
