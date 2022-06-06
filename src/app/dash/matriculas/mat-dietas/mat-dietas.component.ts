import { Component, Input, OnInit } from '@angular/core';
import { FormAsignarDietasComponent } from 'src/app/modales/form-asignar-dietas/form-asignar-dietas.component';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mat-dietas',
  templateUrl: './mat-dietas.component.html'
})

export class MatDietasComponent implements OnInit {

  @Input() idpaciente: number;
  @Input() idmat: number;
  @Input() idestadomat: number;

  dietas_asignadas = [];

  constructor(private fmatri: FmatriculasService, private fmysql: FmysqlService, private funciones: FuncionesService) { }

  ngOnInit() {
    console.log('IDMAT:', this.idmat);
    this.buscar_datos();
  }

  buscar_datos() {
    this.fmatri.buscar_dietas(this.idmat).then((asis: any) => {
      this.dietas_asignadas = asis;
    })
  }

  eliminar_asistencia(iddietaasignada: number) {
    this.fmysql.borrar(environment.historico.dietas_asignadas, iddietaasignada, () => {
      this.buscar_datos();
    })
  }

  mostrar_modal_dietas(editar: boolean, item?: any) {
    this.funciones.mostrar_modal(FormAsignarDietasComponent, 30, {
      editar: editar,
      item: item,
      params: this.idmat
    }, () => {
      this.buscar_datos();
    })
  }

}
