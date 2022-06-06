import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatoGuardar, formatoModificacion, paraModal } from 'src/app/interfaces/estructuras';
import { Medidas } from 'src/app/interfaces/medidas';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-medidas',
  templateUrl: './form-medidas.component.html'
})

export class FormMedidasComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: Medidas = {
    idmedidas: null,
    idmatricula: null,
    fecha: this.funciones.get_fecha_local()._fecha_actual,
    talla: null,
    peso: null,
    edad: null,
    busto_alto: null,
    busto_bajo: null,
    cintura: null,
    cadera_abdomen: null,
    cadera_gluteos: null,
    brazo_derecho: null,
    brazo_izquierdo: null,
    pierna_derecha: null,
    pierna_izquierda: null,
    guia_nutricional: null,
    vigencia: null
  }

  tfecha = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormMedidasComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;
    this.item.idmatricula = this.data.params;

    if (this._edicion) {
      this._titulo = "Editar Medidas";
      this.item = this.data.item;
    } else {
      this._titulo = "Registar Medidas";
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  validar_accion() {
    if (this._edicion) {
      this.modificar_item();
    } else {
      this.registrar_item();
    }
  }

  registrar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoGuardar = {
      datos: [
        null,
        this.item.idmatricula,
        this.item.fecha,
        this.item.talla,
        this.item.peso,
        this.item.edad,
        this.item.busto_alto,
        this.item.busto_bajo,
        this.item.cintura,
        this.item.cadera_abdomen,
        this.item.cadera_gluteos,
        this.item.brazo_derecho,
        this.item.brazo_izquierdo,
        this.item.pierna_derecha,
        this.item.pierna_izquierda,
        this.item.guia_nutricional,
        1
      ]
    };
    this.fmysql.registrar(environment.historico.medidas, datos).subscribe(res => {
      console.log('Respues de API:', res);
      this.funciones.terminar_loader();
      if (res.ok) {
        this.cerrar_ventana(true);
      } else {
        this.cerrar_ventana(true);
      }
    })
  }

  modificar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoModificacion = {
      idcampo: { nombre: 'idmedidas', valor: this.item.idmedidas },
      campos: [
        'fecha',
        'talla',
        'peso',
        'edad',
        'busto_alto',
        'busto_bajo',
        'cintura',
        'cadera_abdomen',
        'cadera_gluteos',
        'brazo_derecho',
        'brazo_izquierdo',
        'pierna_derecha',
        'pierna_izquierda',
        'guia_nutricional'
      ],
      valores: [
        this.item.fecha,
        this.item.talla,
        this.item.peso,
        this.item.edad,
        this.item.busto_alto,
        this.item.busto_bajo,
        this.item.cintura,
        this.item.cadera_abdomen,
        this.item.cadera_gluteos,
        this.item.brazo_derecho,
        this.item.brazo_izquierdo,
        this.item.pierna_derecha,
        this.item.pierna_izquierda,
        this.item.guia_nutricional
      ]
    };
    this.fmysql.modificar(environment.historico.medidas, datos).subscribe(res => {
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
