import { Component, Input, OnInit } from '@angular/core';
import { Matriculas } from 'src/app/interfaces/matriculas';
import { FormPagoMatriculaComponent } from 'src/app/modales/form-pago-matricula/form-pago-matricula.component';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mat-pagos',
  templateUrl: './mat-pagos.component.html'
})

export class MatPagosComponent implements OnInit {

  @Input() item: any;

  pagos_matricula = [];

  total_pagos = 0;

  constructor(private fmatri: FmatriculasService, private funciones: FuncionesService, private fmysql: FmysqlService) { }

  ngOnInit() {
    this.buscar_datos();
  }

  buscar_datos() {
    this.fmysql.buscar_id(environment.matriculas._api, this.item.idmatricula).subscribe(res => {
      this.item = res.data[0];

      this.fmatri.buscar_pagos(this.item.idmatricula).then((pag: any) => {
        console.log('Pagos:', pag);
        this.pagos_matricula = pag;
      })
    })
  }

  mostrar_modal_pagos() {
    this.funciones.mostrar_modal(FormPagoMatriculaComponent, 40, {
      editar: false,
      item: this.item,
      params: {
        idmat: this.item.idmatricula,
        idsec: this.item.idsector
      }
    }, () => {
      this.buscar_datos();
    })
  }

  eliminar_pago(idpago: number) {
    this.fmysql.borrar(environment.ventas.pagos, idpago, () => {
      this.buscar_datos();
    })
  }

}
