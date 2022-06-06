import { Component, Input, OnInit } from '@angular/core';
import { FormAsistenciaMatriculaComponent } from 'src/app/modales/form-asistencia-matricula/form-asistencia-matricula.component';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mat-asistencias',
  templateUrl: './mat-asistencias.component.html'
})

export class MatAsistenciasComponent implements OnInit {

  @Input() idmat: number;
  @Input() idestadomat: number;

  asistencias_matricula = [];

  constructor(private fmatri: FmatriculasService, private fmysql: FmysqlService, private funciones: FuncionesService) { }

  ngOnInit() {
    console.log('IDMAT:', this.idmat);
    this.buscar_datos();
  }

  buscar_datos() {
    this.fmatri.buscar_asistencias(this.idmat).then((asis: any) => {
      this.asistencias_matricula = asis;
    })
  }

  eliminar_asistencia(idasistencia: number) {
    this.fmysql.borrar(environment.matriculas.asistencia, idasistencia, () => {
      this.buscar_datos();
    })
  }

  mostrar_modal_asistencia(editar: boolean, item?: any) {
    this.funciones.mostrar_modal(FormAsistenciaMatriculaComponent, 30, {
      editar: editar,
      item: item,
      params: this.idmat
    }, () => {
      this.buscar_datos();
    })
  }

}
