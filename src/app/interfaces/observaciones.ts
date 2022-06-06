export interface Observaciones {
	idobservacion?: number; // int(11)
	idalumno?: number; // int(11)
	idperiodo?: number; // int(11)
	idbimestre?: number; // int(11)
	idgrado?: number; // int(11)
	idseccion?: number; // int(11)
	iddocente?: number; // int(11)
	observacion?: string; // text
	vigencia?: boolean; // int(1)
	creacion?: string; // datetime
	modificacion?: string; // datetime
}