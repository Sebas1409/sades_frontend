import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dietas } from 'src/app/interfaces/dietas';
import { formatoModificacion } from 'src/app/interfaces/estructuras';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { CuadroTextoComponent } from 'src/app/shared/cuadro-texto/cuadro-texto.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-dieta',
  templateUrl: '../crear-dieta/crear-dieta.component.html'
})

export class EditarDietaComponent implements OnInit {

  //@ViewChildren('textbox') textbox: CuadroTextoComponent;
  @ViewChild('textbox', { static: true }) textbox: CuadroTextoComponent;

  _params = null;
  _edicion = false;
  _guardando = false;
  _titulo = 'Editar Dieta';

  item: Dietas = {
    iddieta: null,
    nombre: null,
    contenido: null,
    vigencia: null,
    creacion: null,
    modificacion: null
  }

  tnombre = this.controles._requerido();

  constructor(private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private router: Router, private state: ActivatedRoute) { }

  async ngOnInit() {
    this._params = await this.funciones.desencripta(this.state.snapshot.params.params);
    console.log('Parametros en Edicion:', this._params);
    this.buscar_item(this._params.idsel);
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  buscar_item(idsel) {
    this.fmysql.buscar_id(environment.historico.dietas, idsel).subscribe(res => {
      this.item = res.data[0];
    })
  }

  texto_terminado(datos) {
    console.log('Datos:', datos);
  }

  validar_accion() {
    this.item.contenido = this.textbox.cadena;
    this.registrar_item();
  }

  registrar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoModificacion = {
      idcampo: { nombre: 'iddieta', valor: this.item.iddieta },
      campos: [
        'nombre',
        'contenido',
        'modificacion'
      ],
      valores: [
        this.item.nombre,
        this.item.contenido,
        'now()',
      ]
    };
    this.fmysql.modificar(environment.historico.dietas, datos).subscribe(res => {
      console.log('Respues de API:', res);
      this.funciones.terminar_loader();
      if (res.ok) {
        this.volver_listado(true);
      } else {
        this.volver_listado(true);
      }
    })
  }

  volver_listado(respuesta?: any) {
    this.router.navigate(['/dash/dietas/', this.state.snapshot.params.params]);
  }

}
