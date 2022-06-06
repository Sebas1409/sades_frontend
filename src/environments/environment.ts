export const environment = {
  production: false,

  //url_servidor: 'http://localhost/gymapp/',
  url_servidor: 'http://localhost/apiamericaschool/',

  reportes: {
    rep_caja: 'reportes/rep-caja/'
  },

  matriculas: {
    _api: 'matriculas/',

    matxnrodoc: 'matriculas/matxnrodoc/',
    paginado: 'matriculas/paginado/',

    asistencia: 'asistencias/'
  },

  historico: {
    antecedentes: 'antecedentes/',
    medidas: 'medidas/',
    dietas: 'dietas/',
    dietas_asignadas: 'dietas_asignadas/',
    imagenes: 'imagenes/',
  },

  cajas: {
    _api: 'cajas/',
    verificar: 'cajas/verificar/'
  },

  ventas: {
    _api: 'ventas/',
    nromax: 'ventas/nromax/',
    paginado: 'ventas/paginado/',

    detalle_venta: 'detalle_venta/regenmasa/',
    detalle_regenmasa: 'detalle_venta/regenmasa/',

    pagos: 'pagos/'
  },

  clientes: {
    _api: 'clientes/',
    buscarxdni: 'clientes/buscarxdni/',
    paginado: 'clientes/paginado/'
  },

  empleados: {
    empleados: 'empleados/',
    paginado: 'empleados/paginado/',
    loguear: 'empleados/loguear/'
  },

  productos: {
    _api: 'productos/',
    paginado: 'productos/paginado/',

    catalogo: 'productos/catalogo/',

    marcas: 'marca/',
    unidades: 'unidades/',
    tipos_producto: 'tipo_producto/',

    kardex: 'kardex_productos/',
    kardex_paginado: 'kardex_productos/paginado/',
    kardex_historial: 'kardex_productos/historial/',

    stockxsector: 'kardex_productos/stockxsector/',
    stockxarea: 'kardex_productos/stockxarea/',
  },

  servicios: {
    _api: 'servicios/',
    paginado: 'servicios/paginado/'
  },

  precargados: {
    areas: 'areas/',
    sectores: 'sectores/',
    cargos: 'cargos/',
    motivo_movimiento: 'motivo_movimiento/',
    estados_matricula: 'estados_matricula/'
  },

  jwt: {
    encriptado: 'jwt/encriptar/',
    desencriptado: 'jwt/desencriptar/'
  },

  uploads: {
    _api: 'uploads/subir/',
    path: 'uploads/subidas/'
  },

  
  api_login: 'admin/login/',
  api_por_anios: {
    alumnos_matriculados: 'matricula/listado_por_anio/',
    tipos_de_matricula: 'tipo_matricula/',
    verificar_si_ya_esta_matriculado: 'matricula/existe_matricula_anio/',
  },
  api_asistencia: 'asistencia/',
  api_verificar_si_existen_asistencias: 'asistencia/verificar/',
  api_asistencias_por_alumno: 'boleta/asistencias/',
  api_alumnos_por_seccion: 'matricula/matriculados/',
  api_tutorias: 'tutorias/',
  api_bimestres_activos: 'bimestres/activos/',
  api_verificar_si_existen_observaciones: 'tutorias/verificar/',
  api_observaciones: 'observaciones/',


};
