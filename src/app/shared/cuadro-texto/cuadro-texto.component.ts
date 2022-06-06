import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'cuadro-texto',
  templateUrl: './cuadro-texto.component.html'
})

export class CuadroTextoComponent implements OnInit {

  @Input() cadena: string = null;
  @Output() terminado = new EventEmitter<string>();

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['redo'],
      [
        'customClasses',
        'unlink',
        'insertImage',
        'insertVideo',
        'removeFormat',
      ]
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  obtener_contenido() {
    console.log(this.cadena);
    this.terminado.emit(this.cadena);
  }

}
