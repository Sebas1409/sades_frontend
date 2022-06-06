import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Dietas } from 'src/app/interfaces/dietas';
import { formatoGuardar } from 'src/app/interfaces/estructuras';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { CuadroTextoComponent } from 'src/app/shared/cuadro-texto/cuadro-texto.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-dieta',
  templateUrl: './crear-dieta.component.html'
})

export class CrearDietaComponent implements OnInit {

  //@ViewChildren('textbox') textbox: CuadroTextoComponent;
  @ViewChild('textbox', { static: true }) textbox: CuadroTextoComponent;

  _edicion = false;
  _guardando = false;
  _titulo = 'Crear Dieta';

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

  async ngOnInit() { }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
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
    let datos: formatoGuardar = {
      datos: [
        null,
        this.item.nombre,
        this.item.contenido,
        1, 'now()', null
      ]
    };
    this.fmysql.registrar(environment.historico.dietas, datos).subscribe(res => {
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
