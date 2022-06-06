import { Component, OnInit } from '@angular/core';
import { ListasSistema } from 'src/app/services/listas-sistema';

@Component({
  selector: 'app-asignacion-examen',
  templateUrl: './asignacion-examen.component.html',
  styleUrls: ['./asignacion-examen.component.scss']
})
export class AsignacionExamenComponent implements OnInit {

  nombre_evento: string = 'EXAMEN BÁSICO DE INGLES I - TRIMESTRE'
  item = {
    curso: null,
    docente: null,
    nombre_completo: null
  }
  public listado_cursos: any[] = new ListasSistema().listado_cursos;
  public listado_asignaciones = [];

  public _titulo_componente = 'Asignación Evento Examen - ' + this.nombre_evento;
  constructor() { }

  ngOnInit(): void {
  }

  asignacionDocente() {
    let docente: any = {
      docente_asigando: this.item.nombre_completo,
      curso_asignado: this.listado_cursos.find(ele=>ele.codigo == this.item.curso).nombre,
      fecha_asignacion: new Date()
    }
    this.listado_asignaciones.push(docente);
    this.limpiarCampos();
  }
  
  limpiarCampos(){
    this.item = {
      curso: null,
      docente: null,
      nombre_completo: null
    }
  }
}
