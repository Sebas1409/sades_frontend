// tslint:disable
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'titulo-seccion',
  templateUrl: './titulo-seccion.component.html',
  styleUrls: ['./titulo-seccion.component.scss']
})
export class TituloSeccionComponent implements OnInit {

  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() pretitulo: string;

  @Input() anterior: boolean;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  regresar() {
    this.location.back()
  }

}
