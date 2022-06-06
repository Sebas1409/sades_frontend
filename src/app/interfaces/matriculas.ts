export interface Matriculas {
	idmatricula?: number; // int(11)
	idservicio?: number; // int(11)
	idcliente?: number; // int(11)
	idempleado?: number; // int(11)
	idestadomat?: number; // int(11)
	idcaja?: number; // int(11)
	fmatricula?: string; // date
	precio_mat?: number; // double(20,6)
	diasextra?: number; // double(20,6)
	observaciones?: string; // text
	vigencia?: number; // tinyint(1)
	creacion?: string; // datetime
	modificacion?: string; // datetime

	cliente?: string;
	servicio?: string;
	finicio?: string;
	ffinal?: string;
	estado?: string;
	dias_restantes?: number;
	pago_total?: number;
	total_deuda?: number;
}