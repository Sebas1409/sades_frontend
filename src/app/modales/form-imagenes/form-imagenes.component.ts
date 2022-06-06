import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatoGuardar, paraModal } from 'src/app/interfaces/estructuras';
import { Imagenes } from 'src/app/interfaces/imagenes';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-imagenes',
  templateUrl: './form-imagenes.component.html'
})

export class FormImagenesComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: Imagenes = {
    idimagen: null,
    idmatricula: null,
    fecha: this.funciones.get_fecha_local()._fecha_actual,
    imagen: null,
    observaciones: null,
    vigencia: null,
    creacion: null,
    modificacion: null,
  }

  tfecha = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormImagenesComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this.item.idmatricula = this.data.params;
    this._titulo = "Registar Imagen";
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  imagen_subida(imgup) {
    this.item.imagen = imgup.msg;
  }

  validar_accion() {
    this.registrar_item();
  }

  registrar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoGuardar = {
      datos: [
        null,
        this.item.idmatricula,
        this.item.fecha,
        this.item.imagen,
        this.item.observaciones,
        1, 'now()', null
      ]
    };
    this.fmysql.registrar(environment.historico.imagenes, datos).subscribe(res => {
      console.log('Respues de API:', res);
      this.funciones.terminar_loader();
      if (res.ok) {
        this.cerrar_ventana(true);
      } else {
        this.cerrar_ventana(true);
      }
    })
  }

  cerrar_ventana(respuesta: any) {
    this.dialogRef.close(respuesta);
  }

}
