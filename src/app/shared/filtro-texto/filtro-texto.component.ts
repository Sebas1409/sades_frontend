import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'filtro-texto',
  templateUrl: './filtro-texto.component.html'
})
export class FiltroTextoComponent implements OnInit {

  @Output() buscar_datos = new EventEmitter<string>();
  @Output() exportar = new EventEmitter();

  ftexto = null;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }

  exportar_excel() {
    this.exportar.emit(true);
  }

  async listar_datos() {
    this.buscar_datos.emit(this.ftexto);
  }

}
