// tslint:disable
import { Component, OnInit } from '@angular/core';
import { boleta_observaciones,formatoGuardar } from 'src/app/interfaces/estructuras';
import { Observaciones } from 'src/app/interfaces/observaciones';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListasSistema } from 'src/app/services/listas-sistema';
import { SnackmsgService } from 'src/app/services/snackmsg.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html'
})
export class ObservacionesComponent implements OnInit {

  listado_de_talleres = [];
  listado_de_bimestres = [];
  listado_de_secciones = [];
  listado_alumnos = [];
  listado_criterios = [];

  anio_lectivo = this.funciones.getPeriodoLectivoActual().anio;
  iddocente = Number(localStorage.getItem("sades_iddocente"));
  idbimestre = 1;
  tutoria_seleccionada = null;
  idtaller = null;
  idseccion = null;
  cant_criterios: number;
  ancho_columnas_criterio: number;

  boleta_notas_aula = [];
  msg_validacion = null;
  grado: any;
  existen_notas: boolean = true;
  tutorias_asignadas: any[];

  constructor(private fmysql: FmysqlService, private snak: SnackmsgService, private funciones: FuncionesService) { }

  ngOnInit() {
    this.listar_tutorias_asignadas();
    this.listar_bimestre();
  }

  verificar_si_existen_notas() {
    let url_verificacion = environment.api_verificar_si_existen_observaciones + this.idbimestre + "/" + this.idseccion + "/" + this.anio_lectivo;
    let url_matriculados = environment.api_alumnos_por_seccion + this.anio_lectivo + "/" + this.idseccion;

    this.fmysql.listar_api(url_verificacion)
      .subscribe(res => {
        if (res.data[0].existe == 0) {
          this.existen_notas = false;
          this.msg_validacion = null;
          this.fmysql.listar_api(url_matriculados).subscribe(resp => {
            this.listado_alumnos = resp.data;
            this.armar_boleta();
          });
        } else {
          this.existen_notas = true;
          this.listado_alumnos = [];
          this.listado_criterios = [];
          this.boleta_notas_aula = [];
          this.msg_validacion = "Lo sentimos, ya ha registrado notas en el curso seleccionado, correspondientes a este bimestre, si desea modificar las notas, comunicarse con el Administrador";
        }
      });
  }

  registrar_boleta() {
    this.validar_notas();
  }

  registrar_notas(lista_notas: Observaciones[]) {
    let verificacion_finalizada = 0;
    lista_notas.forEach(nota => {
      let notas_a_registrar: formatoGuardar = {
        datos: [
          nota.idobservacion,
          nota.idalumno,
          nota.idperiodo,
          nota.idbimestre,
          nota.idgrado,
          nota.idseccion,
          nota.iddocente,
          nota.observacion,
          nota.vigencia,
          nota.creacion,
          nota.modificacion
        ]
      };

      this.fmysql.registrar(environment.api_observaciones, notas_a_registrar).subscribe(res => {
        if (res.ok) {
          verificacion_finalizada++;
          if (verificacion_finalizada == lista_notas.length) {
            this.snak.mostrar("Observaciones registradas correctamente");
            this.verificar_si_existen_notas();
          }
        } else {
          console.error(res);
        }
      });
    });
  }

  generar_boleta_para_guardar() {
    let notas_para_registrar: Observaciones[] = [];
    let grado = this.tutorias_asignadas.find(tut => tut.idseccion == this.idseccion);
    console.log("Tutoria: ", grado);

    // Generando NOTAS DEL CURSO
    this.boleta_notas_aula.forEach(element => {
      let minotas: Observaciones = {
        idobservacion: null,
        idalumno: element.alumno.idalumno,
        idperiodo: this.anio_lectivo,
        idbimestre: this.idbimestre,
        idgrado: grado.idgrado,
        idseccion: this.idseccion,
        iddocente: this.iddocente,
        observacion: element.observaciones,
        vigencia: true,
        creacion: 'now()',
        modificacion: null
      }
      notas_para_registrar.push(minotas);
    });

    this.registrar_notas(notas_para_registrar);
  }

  validar_notas() {
    this.msg_validacion = null;
    let verificacion_finalizada = 0;
    for (let ele of this.boleta_notas_aula) {
      if (!ele.observaciones || ele.observaciones == null) {
        this.msg_validacion = "Falta observacion de " + ele.alumno.nombres + " " + ele.alumno.apellidos;
        let elmnt = document.getElementById("row_" + ele.alumno.idalumno);
        elmnt.scrollIntoView();
        break;
      }

      verificacion_finalizada++;
      if (verificacion_finalizada == this.boleta_notas_aula.length) {
        this.generar_boleta_para_guardar();
      }
    };
  }

  nueva_busqueda() {
    this.listado_de_secciones = [];
    this.listado_alumnos = [];
    this.listado_criterios = [];
    this.boleta_notas_aula = [];
  }

  armar_boleta() {
    this.listado_alumnos.forEach(alu => {
      let item: boleta_observaciones = {
        alumno: null,
        observaciones: null
      };

      item.alumno = alu;
      this.boleta_notas_aula.push(item);
    });
  }

  buscar_alumnos() {
    console.log(this.tutoria_seleccionada);
    this.verificar_si_existen_notas();
  }

  listar_tutorias_asignadas() {
    this.tutorias_asignadas = new ListasSistema().listado_cursos;
    /*this.fmysql.buscar_id(environment.api_tutorias, this.iddocente).subscribe(res => {
      if (res.ok) {
        this.tutorias_asignadas = res.data;
      }
    });*/
  }

  listar_bimestre() {
    this.fmysql.listar_api(environment.api_bimestres_activos)
      .subscribe(res => {
        this.listado_de_bimestres = res.data;
      });
  }

}
