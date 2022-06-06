import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackmsgService {

  constructor(public snackBar: MatSnackBar) { }

  mostrar(msg: string) {
    this.snackBar.open(msg, null, {
      duration: 2000
    });
  }

}
