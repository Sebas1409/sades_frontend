//tslint:disable
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FuncionesService } from 'src/app/services/funciones.service';
import { FuploaderService } from 'src/app/services/fuploader.service';

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Input() url_imagen: string;
  @Output() guardado = new EventEmitter<any>();

  error_subida = false;

  constructor(private funciones: FuncionesService, private fuploader: FuploaderService) { }

  ngOnInit() {
  }

  seleccionar_archivo(event: FileList) {
    this.funciones.iniciar_loader();
    this.fuploader._subir_imagen(event, 'subidas').then((res: any) => {
      console.log(res);
      this.error_subida = false;
      this.funciones.terminar_loader();
      this.guardado.emit(res);
    }).catch(res => {
      console.error(res);
      this.error_subida = true;
      this.funciones.terminar_loader();
      this.guardado.emit(res);
    });
  }

}
