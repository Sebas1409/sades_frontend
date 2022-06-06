// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { environment } from 'src/environments/environment';
import { SnackmsgService } from 'src/app/services/snackmsg.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { boleta_asistencia, formatoGuardar } from 'src/app/interfaces/estructuras';
import { ListasSistema } from 'src/app/services/listas-sistema';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html'
})
export class AsistenciaComponent implements OnInit {
  _titulo_componente = 'Registro de Asistencia';
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

  verificar_si_existen_asistencias() {
    let url_verificacion = environment.api_verificar_si_existen_asistencias + this.idbimestre + "/" + this.idseccion + "/" + this.anio_lectivo;
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

  registrar_notas(lista_notas: Asistencia[]) {
    let verificacion_finalizada = 0;
    lista_notas.forEach(nota => {
      let notas_a_registrar: formatoGuardar = {
        datos: [
          nota.idasistencia,
          nota.idalumno,
          nota.idperiodo,
          nota.idbimestre,
          nota.idgrado,
          nota.idseccion,
          nota.iddocente,
          nota.asistencias,
          nota.faltas_justificadas,
          nota.faltas_injustificadas,
          nota.tardanzas_justificadas,
          nota.tardanzas_injustificadas,
          nota.aaprobadas,
          nota.adesaprobadas,
          nota.sinevaluar,
          nota.vigencia,
          nota.creacion,
          nota.modificacion
        ]
      };

      this.fmysql.registrar(environment.api_asistencia, notas_a_registrar).subscribe(res => {
        if (res.ok) {
          verificacion_finalizada++;
          if (verificacion_finalizada == lista_notas.length) {
            this.snak.mostrar("Asistencias registradas correctamente");
            this.verificar_si_existen_asistencias();
          }
        } else {
          console.error(res);
        }
      });
    });
  }

  generar_boleta_para_guardar() {
    let notas_para_registrar = [];
    let grado = this.tutorias_asignadas.find(tut => tut.idseccion == this.idseccion);
    console.log("Tutoria: ", grado);

    // Generando NOTAS DEL CURSO
    this.boleta_notas_aula.forEach(element => {
      let minotas: Asistencia = {
        idasistencia: null,
        idalumno: element.alumno.idalumno,
        idperiodo: this.anio_lectivo,
        idbimestre: this.idbimestre,
        idgrado: grado.idgrado,
        idseccion: this.idseccion,
        iddocente: this.iddocente,
        asistencias: element.asistencia,
        faltas_justificadas: element.faltas_justificadas,
        faltas_injustificadas: element.faltas_injustificadas,
        tardanzas_justificadas: element.tardanzas_justificadas,
        tardanzas_injustificadas: element.tardanzas_injustificadas,
        aaprobadas: element.aprobadas,
        adesaprobadas: element.desaprobadas,
        sinevaluar: element.sin_evaluar,
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
      ele.asistencia = ele.asistencia == null ? 0 : ele.asistencia;
      ele.faltas_justificadas = ele.faltas_justificadas == null ? 0 : ele.faltas_justificadas;
      ele.faltas_injustificadas = ele.faltas_injustificadas == null ? 0 : ele.faltas_injustificadas;
      ele.tardanzas_justificadas = ele.tardanzas_justificadas == null ? 0 : ele.tardanzas_justificadas;
      ele.tardanzas_injustificadas = ele.tardanzas_injustificadas == null ? 0 : ele.tardanzas_injustificadas;
      ele.aprobadas = ele.aprobadas == null ? 0 : ele.aprobadas;
      ele.desaprobadas = ele.desaprobadas == null ? 0 : ele.desaprobadas;
      ele.sin_evaluar = ele.sin_evaluar == null ? 0 : ele.sin_evaluar;

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
      let item: boleta_asistencia = {
        alumno: null,
        asistencias: null,
        faltas_justificadas: null,
        faltas_injustificadas: null,
        tardanzas_justificadas: null,
        tardanzas_injustificadas: null,
        aprobadas: null,
        desaprobadas: null,
        sin_evaluar: null
      };

      item.alumno = alu;
      this.boleta_notas_aula.push(item);
    });
  }

  buscar_alumnos() {
    console.log(this.tutoria_seleccionada);
    this.verificar_si_existen_asistencias();
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
