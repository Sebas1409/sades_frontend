export interface Asistencia {
	idasistencia?: number; // int(11)
	idalumno?: number; // int(11)
	idperiodo?: number; // int(11)
	idbimestre?: number; // int(11)
	idgrado?: number; // int(11)
	idseccion?: number; // int(11)
	iddocente?: number; // int(11)
	asistencias?: string; // date
	faltas_justificadas?: boolean; // int(1)
	faltas_injustificadas?: string; // varchar(50)
	tardanzas_justificadas?: string; // varchar(50)
	tardanzas_injustificadas?: string; // varchar(50)
	aaprobadas?: string; // varchar(50)
	adesaprobadas?: string; // varchar(50)
	sinevaluar?: string; // varchar(50)
	vigencia?: boolean; // int(1)
	creacion?: string; // datetime
	modificacion?: string; // datetime
}