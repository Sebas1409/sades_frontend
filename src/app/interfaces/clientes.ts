export interface Clientes {
	idcliente?: number; // int(11)
	idempleado?: number; // int(11)
	nrodni?: string; // varchar(11)
	apellidos?: string; // varchar(255)
	nombres?: string; // varchar(255)
	fnacimiento?: string; // date
	celular?: number; // int(11)
	domicilio?: string; // text
	sexo?: number; // int(11)
	imagen?: string; // text
	facebook?: string; // text
	messenger?: string; // text
	instagram?: string; // text
	whatsapp?: number; // int(11)
	vigencia?: number; // tinyint(1)
	creacion?: string; // datetime
	modificacion?: string; // datetime

	nombre_completo?: string;
}