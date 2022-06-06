import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'titulo-modal',
  templateUrl: './titulo-modal.component.html',
  styleUrls: ['./titulo-modal.component.scss']
})
export class TituloModalComponent implements OnInit {

  @Input() titulo: string;

  constructor() { }

  ngOnInit() {
  }

}
