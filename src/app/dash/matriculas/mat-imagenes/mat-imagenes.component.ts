import { Component, Input, OnInit } from '@angular/core';
import { FormAsignarDietasComponent } from 'src/app/modales/form-asignar-dietas/form-asignar-dietas.component';
import { FormImagenesComponent } from 'src/app/modales/form-imagenes/form-imagenes.component';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'mat-imagenes',
  templateUrl: './mat-imagenes.component.html'
})

export class MatImagenesComponent implements OnInit {

  @Input() idmat: number;

  listado_imagenes = [];

  constructor(private fmatri: FmatriculasService, private fmysql: FmysqlService, private funciones: FuncionesService,
    private _lightbox: Lightbox) { }

  ngOnInit() {
    console.log('IDMAT:', this.idmat);
    this.buscar_datos();
  }

  mostrar_imagen(index: number): void {
    // open lightbox
    this._lightbox.open(this.listado_imagenes, index);
  }

  buscar_datos() {
    this.fmatri.buscar_imagenes(this.idmat).then((asis: any) => {
      asis.forEach(img => {
        this.listado_imagenes.push({
          src: img.imagen,
          caption: img.observaciones,
          thumb: img.imagen,
          date: img.fecha
        })
      });
    })
  }

  eliminar_asistencia(iddietaasignada: number) {
    this.fmysql.borrar(environment.historico.dietas_asignadas, iddietaasignada, () => {
      this.buscar_datos();
    })
  }

  mostrar_modal_imagenes() {
    this.funciones.mostrar_modal(FormImagenesComponent, 40, {
      editar: null,
      item: null,
      params: this.idmat
    }, () => {
      this.buscar_datos();
    })
  }

}
