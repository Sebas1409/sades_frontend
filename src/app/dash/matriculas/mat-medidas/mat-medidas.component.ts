import { Component, Input, OnInit } from '@angular/core';
import { FormAsignarDietasComponent } from 'src/app/modales/form-asignar-dietas/form-asignar-dietas.component';
import { FormMedidasComponent } from 'src/app/modales/form-medidas/form-medidas.component';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mat-medidas',
  templateUrl: './mat-medidas.component.html'
})

export class MatMedidasComponent implements OnInit {

  @Input() idmat: number;

  listado_medidas = [];

  constructor(private fmatri: FmatriculasService, private fmysql: FmysqlService, private funciones: FuncionesService) { }

  ngOnInit() {
    console.log('IDMAT:', this.idmat);
    this.buscar_datos();
  }

  buscar_datos() {
    this.fmatri.buscar_medidas(this.idmat).then((asis: any) => {
      this.listado_medidas = asis;
    })
  }

  eliminar_asistencia(iditem: number) {
    this.fmysql.borrar(environment.historico.medidas, iditem, () => {
      this.buscar_datos();
    })
  }

  mostrar_modal_dietas(editar: boolean, item?: any) {
    this.funciones.mostrar_modal(FormMedidasComponent, 60, {
      editar: editar,
      item: item,
      params: this.idmat
    }, () => {
      this.buscar_datos();
    })
  }

}
