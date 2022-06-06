export interface Empleados {
	idempleado?: number; // int(11)
	idarea?: number; // int(11)
	idcargo?: number; // int(11)
	nrodni?: string; // varchar(11)
	apellidos?: string; // varchar(255)
	nombres?: string; // varchar(255)
	clave?: string; // text
	estado?: number; // tinyint(1)
	vigencia?: number; // tinyint(1)
	creacion?: string; // datetime
	modificacion?: string; // datetime

	nivel?: number;
}