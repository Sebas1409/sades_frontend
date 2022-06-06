//tslint:disable
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { paraModal } from 'src/app/interfaces/estructuras';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html'
})
export class ModalConfirmacionComponent implements OnInit {

  titulo = 'Desea eliminar el item?';

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<ModalConfirmacionComponent>,
    private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.data.item) {
      this.titulo = this.data.item;
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  seleccionar_opcion(opt: boolean) {
    this.dialogRef.close(opt);
  }

}
