import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Empleados } from 'src/app/interfaces/empleados';
import { FusuariosService } from 'src/app/services/fusuarios.service';

@Component({
  selector: 'encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  @Input() modulo: string;

  ulogin: Empleados = null;

  constructor(private fusuario: FusuariosService) { }

  async ngOnInit() {
    this.ulogin = await this.fusuario.get_usuario_logueado();
    switch (this.ulogin.idarea) {
      case 1:
        this.modulo = 'AREA DE FITNNESS CLUB';
        break;
      case 2:
        this.modulo = 'AREA DE BELETZA';
        break;

      default:
        this.modulo = 'PANEL ADMINISTRADOR';
        break;
    }
    console.log('Ulogin:', this.ulogin);
  }

}
