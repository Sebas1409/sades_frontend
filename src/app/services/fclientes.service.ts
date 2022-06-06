import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Antecedentes } from '../interfaces/antecedentes';
import { Clientes } from '../interfaces/clientes';
import { formatoGuardar, formatoModificacion } from '../interfaces/estructuras';
import { FmysqlService } from './fmysql.service';
import { FuncionesService } from './funciones.service';

@Injectable({
  providedIn: 'root'
})
export class FclientesService {

  constructor(private fmysql: FmysqlService, private funciones: FuncionesService) { }

  buscar_cliente_xdni(nrodni: string) {
    this.funciones.iniciar_loader();
    return new Promise((resolve) => {
      this.fmysql.listar_api(environment.clientes.buscarxdni + nrodni).subscribe(res => {
        this.funciones.terminar_loader();
        console.log('Busqueda por DNI:', res);
        if (res.data.length > 0) {
          resolve(res.data[0]);
        } else {
          resolve(null);
        }
      })
    });
  }

  buscar_cliente_xid(idcliente: number) {
    this.funciones.iniciar_loader();
    return new Promise((resolve) => {
      this.fmysql.buscar_id(environment.clientes._api, idcliente).subscribe(res => {
        this.funciones.terminar_loader();
        if (res.data.length == 1) {
          resolve(res.data[0]);
        } else {
          this.funciones.mostrar_snack('Ocurrio un error al consultar el cliente!');
        }
      })
    });
  }

  modificar_cliente(cliente: Clientes) {
    this.funciones.iniciar_loader();
    return new Promise((resolve) => {
      let datos: formatoModificacion = {
        idcampo: { nombre: 'idcliente', valor: cliente.idcliente },
        campos: [
          'nrodni',
          'apellidos',
          'nombres',
          'fnacimiento',
          'celular',
          'domicilio',
          'sexo',
          'imagen',
          'facebook',
          'messenger',
          'instagram',
          'whatsapp',
          'modificacion'
        ],
        valores: [
          cliente.nrodni,
          cliente.apellidos,
          cliente.nombres,
          cliente.fnacimiento,
          cliente.celular,
          cliente.domicilio,
          cliente.sexo,
          cliente.imagen,
          cliente.facebook,
          cliente.messenger,
          cliente.instagram,
          cliente.whatsapp,
          'now()'
        ]
      }
      this.fmysql.modificar(environment.clientes._api, datos).subscribe(res => {
        this.funciones.terminar_loader();
        console.log('Modificar Cliente:', res);
        if (res.ok) {
          resolve(res.id);
        }
      })
    });
  }

  registrar_cliente(cliente: Clientes) {
    this.funciones.iniciar_loader();
    return new Promise((resolve) => {
      let datos: formatoGuardar = {
        datos: [
          null,
          cliente.idempleado,
          cliente.nrodni,
          cliente.apellidos,
          cliente.nombres,
          cliente.fnacimiento,
          cliente.celular,
          cliente.domicilio,
          cliente.sexo,
          cliente.imagen,
          cliente.facebook,
          cliente.messenger ? cliente.messenger : cliente.facebook,
          cliente.instagram,
          cliente.whatsapp ? cliente.whatsapp : cliente.celular,
          1,
          'now()',
          null
        ]
      }
      this.fmysql.registrar(environment.clientes._api, datos).subscribe(res => {
        this.funciones.terminar_loader();
        console.log('Guardar Cliente:', res);
        if (res.ok) {
          resolve(res.id);
        }
      })
    });
  }

  registrar_antecedentes(idcliente: number, antece: Antecedentes) {
    this.funciones.iniciar_loader();
    return new Promise((resolve) => {
      let datos: formatoGuardar = {
        datos: [
          null,
          idcliente,
          1,
          antece.a_diabetes,
          antece.a_gastritis,
          antece.a_hipertension,
          antece.a_ansiedad,
          antece.a_operaciones,
          antece.a_hormonales,
          antece.a_cesarea,
          antece.a_anticonceptivos,
          antece.a_cigarro_alcohol,
          antece.a_otros,
          'now()', null
        ]
      }
      this.fmysql.registrar(environment.historico.antecedentes, datos).subscribe(res => {
        this.funciones.terminar_loader();
        console.log('Registrar Antecedentes:', res);
        if (res.ok) {
          resolve(res.id);
        }
      })
    });
  }

  modificar_antecedentes(antece: Antecedentes) {
    this.funciones.iniciar_loader();
    return new Promise((resolve) => {
      let datos: formatoModificacion = {
        idcampo: { nombre: 'idantecedente', valor: antece.idantecedente },
        campos: [
          'a_diabetes',
          'a_gastritis',
          'a_hipertension',
          'a_ansiedad',
          'a_operaciones',
          'a_hormonales',
          'a_cesarea',
          'a_anticonceptivos',
          'a_cigarro_alcohol',
          'a_otros',
          'modificacion'
        ],
        valores: [
          antece.a_diabetes,
          antece.a_gastritis,
          antece.a_hipertension,
          antece.a_ansiedad,
          antece.a_operaciones,
          antece.a_hormonales,
          antece.a_cesarea,
          antece.a_anticonceptivos,
          antece.a_cigarro_alcohol,
          antece.a_otros,
          'now()'
        ]
      }
      this.fmysql.modificar(environment.historico.antecedentes, datos).subscribe(res => {
        this.funciones.terminar_loader();
        console.log('Modificar ANtecedentes:', res);
        if (res.ok) {
          resolve(res.id);
        }
      })
    });
  }

}
