import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-reportes',
  templateUrl: './modal-reportes.component.html',
  styleUrls: ['./modal-reportes.component.scss']
})
export class ModalReportesComponent implements OnInit {

  listado_reportes = [
    { nombre: 'Reporte de Ventas', url: '/dash/reportes/rep-ventas' }
  ];

  constructor(private router: Router, private dlgref: MatDialogRef<ModalReportesComponent>) { }

  ngOnInit(): void {
  }

  abrir_link(url) {
    this.router.navigate([url]);
    this.dlgref.close();
  }

}
