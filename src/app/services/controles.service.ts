// tslint:disable
import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable()
export class ControlesService {

  constructor() { }

  txtApellidos = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z -]+$')]);
  txtClave = new FormControl('', [Validators.required]);


  /*
    Funcion para usar un atributo directamente
    para usar el [formControl] para hacer el dataBinding
    para acceder al campo seria: micampo.value
  _requerido(propiedad): FormControl{
    return new FormControl(propiedad, [Validators.required]);
  }*/

  _requerido(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  _numero_limites(minimo: number, maximo: number): FormControl {
    return new FormControl('', [Validators.required, Validators.min(minimo), Validators.max(maximo)]);
  }

  _max_requerido(maximo: number): FormControl {
    return new FormControl('', [Validators.required, Validators.min(0), Validators.max(maximo)]);
  }

  _nrodoc(): FormControl {
    let control = new FormControl('', [Validators.minLength(8), Validators.maxLength(11), Validators.required, Validators.pattern('^[0-9]+$')]);
    control.updateValueAndValidity();
    return control;
  }

  _solo_numeros(requerido?: boolean): FormControl {
    //let control = new FormControl('', [Validators.pattern('^[0-9]+$')]);
    let regex = '^[0-9]+(\.[0-9]{1,' + 2 + '})?$';
    let control = new FormControl('', [Validators.pattern(regex)]);
    if (requerido) {
      control.setValidators([Validators.pattern(regex), Validators.required]);
    }
    control.updateValueAndValidity();
    return control;
  }

  _solo_letras(requerido?: boolean): FormControl {
    let control = new FormControl('', [Validators.pattern('^[A-Za-z -]+$')]);
    if (requerido) {
      control.setValidators([Validators.required, Validators.pattern('^[A-Za-z -]+$')]);
    }
    control.updateValueAndValidity();
    return control;
  }

  _email(requerido?: boolean): FormControl {
    let formato_email = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    let control = new FormControl('', [Validators.email, Validators.pattern(formato_email)]);
    if (requerido) {
      control.setValidators([Validators.required, Validators.email, Validators.pattern(formato_email)]);
    }
    control.updateValueAndValidity();
    return control;
  }

}
